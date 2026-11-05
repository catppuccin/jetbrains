"""Validate the shipped plugin, not just the source templates (stdlib only)."""

import argparse
import io
import json
from pathlib import Path
import re
import xml.etree.ElementTree as ET
import zipfile


def verify(path, version=None, until_build=None):
    with zipfile.ZipFile(path) as package:
        jars = [name for name in package.namelist() if name.endswith(".jar")]
        if len(jars) != 1:
            raise ValueError("Expected exactly one theme JAR in the distribution")
        with zipfile.ZipFile(io.BytesIO(package.read(jars[0]))) as jar:
            plugin = ET.fromstring(jar.read("META-INF/plugin.xml"))
            if plugin.findtext("id") != "com.github.catppuccin.jetbrains":
                raise ValueError("Wrong plugin identity")
            if version and plugin.findtext("version") != version:
                raise ValueError("Wrong packaged plugin version")
            if until_build and plugin.find("idea-version").get("until-build") != until_build:
                raise ValueError("Wrong packaged compatibility ceiling")
            themes = plugin.findall("./extensions/themeProvider")
            schemes = plugin.findall("./extensions/bundledColorScheme")
            if len(themes) != 8 or len(schemes) != 8:
                raise ValueError("Expected all eight UI variants and eight editor schemes")
            for nodes in (themes, schemes):
                if len({node.get("id") for node in nodes}) != len(nodes):
                    raise ValueError("Duplicate extension identity")
            for theme in themes:
                path = theme.get("path").lstrip("/")
                raw = jar.read(path).decode("utf-8")
                if "{{" in raw or "{%" in raw:
                    raise ValueError("Unrendered UI template")
                data = json.loads(raw)
                if not isinstance(data.get("dark"), bool) or not data.get("ui"):
                    raise ValueError("Invalid theme metadata/UI map")
                if data["dark"] == ("latte" in path):
                    raise ValueError("Wrong light/dark flavor metadata")
                if "islands" in path and not data.get("parentTheme", "").startswith("Islands "):
                    raise ValueError("Islands variant has no Islands parent")
                for color in data["colors"].values():
                    if not re.fullmatch(r"#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?", color):
                        raise ValueError(f"Invalid palette color: {color}")
                ET.fromstring(jar.read(data["editorScheme"].lstrip("/")))
            for scheme in schemes:
                raw = jar.read(scheme.get("path").lstrip("/") + ".xml").decode("utf-8")
                if "{{" in raw or "{%" in raw:
                    raise ValueError("Unrendered editor template")
                if ET.fromstring(raw).tag != "scheme":
                    raise ValueError("Invalid editor scheme root")
    return "Validated plugin metadata, all 8 UI themes, all 8 editor schemes and bundled references"


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("archive", type=Path)
    parser.add_argument("--version")
    parser.add_argument("--until-build")
    args = parser.parse_args()
    print(verify(args.archive, args.version, args.until_build))
