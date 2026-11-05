"""Discover IDE releases and prepare a compatibility-only patch release (stdlib only)."""

import argparse
from datetime import date
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import tarfile
from urllib.parse import urlparse
from urllib.request import Request, urlopen


FEED = "https://data.services.jetbrains.com/products/releases?code=IIU&latest=true&type="


def get_json(url):
    request = Request(url, headers={"User-Agent": "catppuccin-jetbrains-compatibility"})
    with urlopen(request, timeout=60) as response:
        return json.load(response)


def properties(text):
    return dict(re.findall(r"^([\w.]+)\s*=\s*(.*?)\s*$", text, re.M))


def build_number(value):
    if not re.fullmatch(r"\d{3,}(?:\.\d+)+", value):
        raise ValueError(f"Invalid IDE build number: {value!r}")
    return tuple(int(part) for part in value.split("."))


def version_number(value):
    if not re.fullmatch(r"\d+\.\d+\.\d+", value):
        raise ValueError(f"Expected a stable semantic plugin version: {value!r}")
    return tuple(int(part) for part in value.split("."))


def download_url(value):
    parsed = urlparse(value)
    if parsed.scheme != "https" or parsed.hostname != "download.jetbrains.com":
        raise ValueError(f"Unexpected JetBrains download URL: {value!r}")
    return value


def make_plan(props, stable, preview, released_version):
    if not stable:
        raise ValueError("JetBrains returned no stable IntelliJ IDEA release")
    newest = max(stable, key=lambda item: build_number(item["build"]))
    targets = [dict(newest, channel="release")]
    if preview:
        candidate = max(preview, key=lambda item: build_number(item["build"]))
        if build_number(candidate["build"]) > build_number(newest["build"]):
            targets.append(dict(candidate, channel="eap"))
    current_until = props["pluginUntilBuild"]
    if not re.fullmatch(r"\d{3,}\.\*", current_until):
        raise ValueError("Automatic extension requires a bounded NNN.* pluginUntilBuild")
    current_branch = int(current_until.split(".")[0])
    branch = max(current_branch, *(build_number(item["build"])[0] for item in targets))
    current_version = version_number(props["pluginVersion"])
    published_version = version_number(released_version.removeprefix("v"))
    if current_version < published_version:
        raise ValueError("main is behind the published plugin version; reconcile it before releasing")
    release_needed = branch > current_branch or current_version > published_version
    if branch > current_branch and current_version == published_version:
        current_version = (*current_version[:2], current_version[2] + 1)
    matrix = []
    for item in targets:
        linux = item["downloads"]["linux"]
        matrix.append({
            "channel": item["channel"], "version": item["version"], "build": item["build"],
            "url": download_url(linux["link"]),
            "checksum_url": download_url(linux["checksumLink"]),
        })
    return {
        "version": ".".join(map(str, current_version)), "until_build": f"{branch}.*",
        "previous_until_build": current_until, "release_needed": release_needed,
        "targets": matrix,
    }


def prepare(root, plan, today=None):
    path = root / "gradle.properties"
    text = path.read_text(encoding="utf-8")
    for name, value in (("pluginVersion", plan["version"]), ("pluginUntilBuild", plan["until_build"])):
        text, count = re.subn(rf"^{name}\s*=.*$", f"{name} = {value}", text, flags=re.M)
        if count != 1:
            raise ValueError(f"Expected exactly one {name} property")
    versions = ", ".join(f"{item['version']} ({item['channel']}, {item['build']})" for item in plan["targets"])
    note = f"- Support IntelliJ IDEA builds through {plan['until_build']}; verified against {versions}."
    changelog = root / "CHANGELOG.md"
    history = changelog.read_text(encoding="utf-8")
    version_header = f"## {plan['version']} - "
    if plan["release_needed"] and version_header in history:
        start = history.index(version_header)
        following = re.search(r"^## ", history[start + 3:], re.M)
        end = start + 3 + following.start() if following else len(history)
        section = history[start:end]
        lines = [line for line in section.splitlines()[1:] if line.strip() and not line.startswith("### ")]
        if len(lines) != 1 or not lines[0].startswith("- Support IntelliJ IDEA builds through "):
            raise ValueError("Existing unpublished release notes require maintainer review")
        history = history[:start] + section.replace(lines[0], note) + history[end:]
    elif plan["release_needed"]:
        match = re.search(r"^## \[Unreleased\]\s*$", history, re.M)
        if match is None:
            raise ValueError("Missing [Unreleased] changelog section")
        remaining = history[match.end():]
        next_version = re.search(r"^## \d", remaining, re.M)
        if next_version is None:
            raise ValueError("Missing released changelog history")
        unreleased = remaining[:next_version.start()].strip()
        # A compatibility release must not silently ship unrelated unreleased work.
        content = [line for line in unreleased.splitlines() if line.strip() and not line.startswith("### ")]
        if content:
            raise ValueError("Unreleased changes need a maintainer release before automatic compatibility publishing")
        header = f"{version_header}{today or date.today().isoformat()}\n\n### Added\n\n{note}\n\n"
        history = history[:match.end()] + "\n\n" + unreleased + "\n\n" + header + remaining[next_version.start():]
    path.write_text(text, encoding="utf-8")
    changelog.write_text(history, encoding="utf-8")
    start = history.index(version_header)
    following = re.search(r"^## ", history[start + 3:], re.M)
    end = start + 3 + following.start() if following else len(history)
    return history[start:end].strip() + "\n"


def download_ide(target, directory):
    """Cache a checksum-verified, safely extracted Linux IDE by exact build."""
    directory.mkdir(parents=True, exist_ok=True)
    marker = directory / ".verified-build"
    if marker.exists() and marker.read_text().strip() == target["build"]:
        return directory / "ide"
    archive = directory / "ide.tar.gz"
    with urlopen(download_url(target["checksum_url"]), timeout=60) as response:
        checksum = response.read().decode().split()[0].lower()
    if not re.fullmatch(r"[0-9a-f]{64}", checksum):
        raise ValueError("Invalid JetBrains SHA-256 checksum")
    digest = hashlib.sha256()
    with urlopen(download_url(target["url"]), timeout=120) as response, archive.open("wb") as output:
        while chunk := response.read(1024 * 1024):
            output.write(chunk)
            digest.update(chunk)
    if digest.hexdigest() != checksum:
        raise ValueError("IDE archive checksum mismatch")
    extracted = directory / "extracted"
    extracted.mkdir(exist_ok=True)
    with tarfile.open(archive) as package:
        package.extractall(extracted, filter="data")
    roots = list(extracted.iterdir())
    if len(roots) != 1 or not (roots[0] / "product-info.json").is_file():
        raise ValueError("Unexpected IDE archive layout")
    info = json.loads((roots[0] / "product-info.json").read_text())
    if info["buildNumber"] != target["build"] or info["productCode"] != "IU":
        raise ValueError("Downloaded IDE does not match requested Ultimate build")
    shutil.move(str(roots[0]), directory / "ide")
    archive.unlink()
    extracted.rmdir()
    marker.write_text(target["build"])
    return directory / "ide"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=["discover", "prepare", "download"])
    parser.add_argument("--plan", type=Path, default=Path("build/compatibility/plan.json"))
    parser.add_argument("--root", type=Path, default=Path("."))
    parser.add_argument("--released-version")
    parser.add_argument("--build")
    parser.add_argument("--directory", type=Path)
    args = parser.parse_args()
    if args.command == "discover":
        if not args.released_version:
            parser.error("discover requires --released-version")
        props = properties((args.root / "gradle.properties").read_text())
        stable = get_json(FEED + "release").get("IIU", [])
        preview = get_json(FEED + "eap").get("IIU", [])
        plan = make_plan(props, stable, preview, args.released_version)
        args.plan.parent.mkdir(parents=True, exist_ok=True)
        args.plan.write_text(json.dumps(plan, indent=2) + "\n")
        if os.environ.get("GITHUB_OUTPUT"):
            with open(os.environ["GITHUB_OUTPUT"], "a", encoding="utf-8") as output:
                output.write(f"matrix={json.dumps({'include': plan['targets']})}\n")
                output.write(f"release_needed={str(plan['release_needed']).lower()}\n")
        print(json.dumps(plan, indent=2))
        return
    plan = json.loads(args.plan.read_text())
    if args.command == "prepare":
        notes = prepare(args.root, plan)
        (args.plan.parent / "release-notes.md").write_text(notes, encoding="utf-8")
    else:
        target = next(item for item in plan["targets"] if item["build"] == args.build)
        if not args.directory:
            parser.error("download requires --directory")
        print(download_ide(target, args.directory).resolve())


if __name__ == "__main__":
    main()
