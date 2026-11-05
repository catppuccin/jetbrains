import copy
import hashlib
import io
import json
from pathlib import Path
import sys
import tarfile
import tempfile
import unittest
from unittest.mock import patch
import zipfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from jetbrains_compatibility import download_ide, make_plan, prepare
from verify_theme_archive import compare_archives, verify


def release(build, channel="release"):
    return {"version": "2026.3", "build": build, "type": channel, "downloads": {"linux": {
        "link": f"https://download.jetbrains.com/idea/idea-{build}.tar.gz",
        "checksumLink": f"https://download.jetbrains.com/idea/idea-{build}.tar.gz.sha256",
    }}}


class ReleasePlanningTest(unittest.TestCase):
    def setUp(self):
        self.props = {"pluginVersion": "3.6.1", "pluginUntilBuild": "262.*"}
        self.stable = [release("263.7307.200")]

    def plan(self, previews=None, published="v3.6.1"):
        return make_plan(self.props, self.stable, previews or [], published)

    def test_numeric_build_sorting_and_no_stale_eap(self):
        self.stable.append(release("263.999.999"))
        plan = self.plan([release("263.7307.44", "eap")])
        self.assertEqual([item["build"] for item in plan["targets"]], ["263.7307.200"])
        self.assertEqual((plan["version"], plan["until_build"]), ("3.6.2", "263.*"))

    def test_future_preview_is_tested_and_extends_ceiling(self):
        plan = self.plan([release("271.12.4", "eap")])
        self.assertEqual([item["channel"] for item in plan["targets"]], ["release", "eap"])
        self.assertEqual(plan["until_build"], "271.*")

    def test_patch_releases_do_not_republish_same_ceiling(self):
        self.props.update(pluginVersion="3.6.2", pluginUntilBuild="263.*")
        self.assertFalse(self.plan(published="v3.6.2")["release_needed"])

    def test_unpublished_main_version_is_retried_without_incrementing(self):
        self.props.update(pluginVersion="3.6.2", pluginUntilBuild="263.*")
        plan = self.plan()
        self.assertTrue(plan["release_needed"])
        self.assertEqual(plan["version"], "3.6.2")

    def test_already_bumped_version_is_not_incremented_again(self):
        self.props["pluginVersion"] = "3.6.2"
        self.assertEqual(self.plan()["version"], "3.6.2")

    def test_ceiling_never_shrinks_when_preview_disappears(self):
        self.props.update(pluginVersion="3.6.2", pluginUntilBuild="271.*")
        plan = self.plan(published="v3.6.2")
        self.assertEqual(plan["until_build"], "271.*")
        self.assertFalse(plan["release_needed"])

    def test_missing_stable_and_malformed_or_untrusted_inputs_fail_closed(self):
        for change in ("empty", "bad-build", "bad-url", "unbounded", "behind"):
            with self.subTest(change=change):
                props, stable = dict(self.props), copy.deepcopy(self.stable)
                if change == "empty":
                    stable = []
                elif change == "bad-build":
                    stable[0]["build"] = "263; echo unsafe"
                elif change == "bad-url":
                    stable[0]["downloads"]["linux"]["link"] = "https://example.com/ide.tar.gz"
                elif change == "unbounded":
                    props["pluginUntilBuild"] = ""
                elif change == "behind":
                    props["pluginVersion"] = "3.5.0"
                with self.assertRaises(ValueError):
                    make_plan(props, stable, [], "v3.6.1")


class ReleasePreparationTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        (self.root / "gradle.properties").write_text("pluginVersion = 3.6.1\npluginUntilBuild = 262.*\n")
        (self.root / "CHANGELOG.md").write_text("# Changelog\n\n## [Unreleased]\n\n### Added\n\n### Fixed\n\n## 3.6.1 - 2026-07-18\n\n- Old notes\n")
        self.plan = make_plan({"pluginVersion": "3.6.1", "pluginUntilBuild": "262.*"}, [release("263.1.2")], [], "v3.6.1")

    def test_preparation_preserves_history_and_is_idempotent(self):
        notes = prepare(self.root, self.plan, "2026-11-05")
        text = (self.root / "CHANGELOG.md").read_text()
        self.assertIn("## 3.6.2 - 2026-11-05", text)
        self.assertIn("- Old notes", text)
        self.assertIn("263.*", notes)
        prepare(self.root, self.plan, "2026-11-06")
        self.assertEqual((self.root / "CHANGELOG.md").read_text(), text)

    def test_unrelated_unreleased_work_stops_automatic_publication(self):
        path = self.root / "CHANGELOG.md"
        path.write_text(path.read_text().replace("### Added", "### Added\n\n- New theme behavior"))
        with self.assertRaisesRegex(ValueError, "Unreleased changes"):
            prepare(self.root, self.plan)
        self.assertIn("3.6.1", (self.root / "gradle.properties").read_text())

    def test_retry_refreshes_compatibility_notes_without_changing_the_date(self):
        prepare(self.root, self.plan, "2026-11-05")
        self.plan["until_build"] = "271.*"
        notes = prepare(self.root, self.plan, "2026-11-06")
        self.assertIn("271.*", notes)
        self.assertIn("2026-11-05", notes)

    def test_unpublished_human_release_is_not_silently_published(self):
        path = self.root / "CHANGELOG.md"
        path.write_text(path.read_text().replace("## 3.6.1", "## 3.6.2"))
        with self.assertRaisesRegex(ValueError, "maintainer review"):
            prepare(self.root, self.plan)


def theme_archive(path, mutation=None):
    resources, extensions = {}, []
    for flavor in ("latte", "frappe", "macchiato", "mocha"):
        for variant in ("", "-islands"):
            name = f"themes/{flavor}{variant}.theme.json"
            data = {"dark": flavor != "latte", "ui": {"*": {"background": "base"}},
                    "colors": {"base": "#112233"}, "editorScheme": f"/themes/{flavor}.xml"}
            if variant:
                data["parentTheme"] = "Islands Light" if flavor == "latte" else "Islands Dark"
            resources[name] = json.dumps(data)
            extensions.append(f'<themeProvider id="{flavor}{variant}" path="/{name}"/>')
        for variant in ("", "-no-italics"):
            name = f"themes/{flavor}{variant}"
            resources[name + ".xml"] = '<scheme name="Example"/>'
            extensions.append(f'<bundledColorScheme id="{flavor}{variant}" path="/{name}"/>')
    resources["META-INF/plugin.xml"] = ('<idea-plugin><id>com.github.catppuccin.jetbrains</id>'
        '<version>3.6.2</version><idea-version since-build="231" until-build="263.*"/>'
        '<extensions>' + "".join(extensions) + '</extensions></idea-plugin>')
    resources["META-INF/MANIFEST.MF"] = 'Manifest-Version: 1.0\r\nVersion: 3.6.2\r\nBuild-OS: Linux 7.0\r\nBuild-JVM: 21\r\n'
    if mutation:
        mutation(resources)
    inner = io.BytesIO()
    with zipfile.ZipFile(inner, "w") as jar:
        for name, content in resources.items():
            jar.writestr(name, content)
    with zipfile.ZipFile(path, "w") as package:
        package.writestr("Catppuccin Theme/lib/theme.jar", inner.getvalue())


class PackagedResourcesTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.path = Path(self.temp.name) / "plugin.zip"

    def test_complete_distribution(self):
        theme_archive(self.path)
        verify(self.path, "3.6.2", "263.*")

    def test_missing_editor_reference_is_rejected(self):
        theme_archive(self.path, lambda files: files.pop("themes/mocha.xml"))
        with self.assertRaises(KeyError):
            verify(self.path)

    def test_wrong_dark_flag_and_invalid_palette_are_rejected(self):
        for field, value in (("dark", True), ("colors", {"base": "{{ unrendered }}"})):
            with self.subTest(field=field):
                def mutate(files):
                    data = json.loads(files["themes/latte.theme.json"])
                    data[field] = value
                    files["themes/latte.theme.json"] = json.dumps(data)
                theme_archive(self.path, mutate)
                with self.assertRaises(ValueError):
                    verify(self.path)

    def test_wrong_packaged_version_and_ceiling_are_rejected(self):
        theme_archive(self.path)
        with self.assertRaises(ValueError):
            verify(self.path, "3.6.3")
        with self.assertRaises(ValueError):
            verify(self.path, until_build="271.*")

    def test_publication_retry_allows_runner_metadata_changes(self):
        other = Path(self.temp.name) / "other.zip"
        theme_archive(self.path)
        def change_runner(files):
            files["META-INF/MANIFEST.MF"] = files["META-INF/MANIFEST.MF"].replace(
                'Build-OS: Linux 7.0', 'Build-OS: Linux 7.1').replace(
                'Build-JVM: 21', 'Build-JVM: 21.0.13\r\n  vendor details')
        theme_archive(other, change_runner)
        compare_archives(self.path, other)

    def test_publication_retry_rejects_theme_and_version_collisions(self):
        other = Path(self.temp.name) / "other.zip"
        theme_archive(self.path)
        for entry in ("META-INF/MANIFEST.MF", "themes/mocha.theme.json"):
            with self.subTest(entry=entry):
                def change_content(files):
                    files[entry] = files[entry].replace('Version: 3.6.2', 'Version: 3.6.3').replace('#112233', '#223344')
                theme_archive(other, change_content)
                with self.assertRaisesRegex(ValueError, "different packaged content"):
                    compare_archives(self.path, other)


class IdeDownloadTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.directory = Path(self.temp.name) / "263.1.2"
        self.target = {"build": "263.1.2", "url": "https://download.jetbrains.com/idea/ide.tar.gz",
                       "checksum_url": "https://download.jetbrains.com/idea/ide.tar.gz.sha256"}

    def archive(self, filename="idea/product-info.json", product="IU"):
        output = io.BytesIO()
        data = json.dumps({"productCode": product, "buildNumber": "263.1.2"}).encode()
        with tarfile.open(fileobj=output, mode="w:gz") as package:
            info = tarfile.TarInfo(filename)
            info.size = len(data)
            package.addfile(info, io.BytesIO(data))
        return output.getvalue()

    def responses(self, archive, checksum=None):
        digest = checksum or hashlib.sha256(archive).hexdigest()
        return [io.BytesIO((digest + "  ide.tar.gz").encode()), io.BytesIO(archive)]

    def test_download_verifies_identity_and_reuses_completed_cache(self):
        with patch("jetbrains_compatibility.urlopen", side_effect=self.responses(self.archive())) as request:
            ide = download_ide(self.target, self.directory)
            self.assertTrue((ide / "product-info.json").is_file())
            self.assertEqual(download_ide(self.target, self.directory), ide)
            self.assertEqual(request.call_count, 2)

    def test_bad_checksum_prevents_extraction(self):
        with patch("jetbrains_compatibility.urlopen", side_effect=self.responses(self.archive(), "0" * 64)):
            with self.assertRaisesRegex(ValueError, "checksum mismatch"):
                download_ide(self.target, self.directory)
        self.assertFalse((self.directory / "ide").exists())

    def test_wrong_product_is_rejected(self):
        with patch("jetbrains_compatibility.urlopen", side_effect=self.responses(self.archive(product="PY"))):
            with self.assertRaisesRegex(ValueError, "does not match"):
                download_ide(self.target, self.directory)

    def test_archive_cannot_write_outside_extraction_directory(self):
        with patch("jetbrains_compatibility.urlopen", side_effect=self.responses(self.archive("../../escape"))):
            with self.assertRaises(tarfile.TarError):
                download_ide(self.target, self.directory)
        self.assertFalse((Path(self.temp.name) / "escape").exists())


if __name__ == "__main__":
    unittest.main()
