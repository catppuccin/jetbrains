# JetBrains compatibility releases

The theme has no executable classes, but `pluginUntilBuild` can still make an otherwise
working theme unavailable after a new IntelliJ Platform branch ships. The
`JetBrains compatibility` workflow checks this before users have to build it themselves.

## Daily checks

The workflow runs daily at 06:23 UTC, on demand, and for pull requests that change
the automation. It uses JetBrains' public products API to discover the latest
IntelliJ IDEA Ultimate stable release and, when newer, its EAP release. JetBrains
publishes its IntelliJ beta and release-candidate builds in the EAP feed. Old EAP
builds are excluded after the corresponding stable release overtakes them.

Every run:

1. Runs the release-planning and archive-validation unit tests.
2. Prepares a candidate with a ceiling that covers the discovered branches, keeping
   `pluginSinceBuild` and the build SDK unchanged.
3. Generates every Whiskers flavor, builds the ZIP, and runs Gradle checks and
   `verifyPluginStructure`.
4. Opens the actual ZIP and nested JAR, validating its identity, version, build
   ceiling, all eight theme providers, all eight editor schemes, palette syntax,
   light/dark metadata, Islands inheritance, and bundled resource references.
5. Downloads each exact Ultimate IDE, checks the official SHA-256, and verifies
   the same ZIP with JetBrains Plugin Verifier. IDE downloads are cached by build.
6. Retains the candidate ZIP and per-IDE verification reports as workflow artifacts.

Failures stop publication. A newer preview failure also stops the compatibility
release, so an advertised preview branch must pass alongside stable. When no
preview is newer, the stable build alone is checked.

## Automatic publication

Scheduled runs publish when the supported build branch increases, or when `main`
already contains an unpublished plugin version. Manual runs default to validation
only; select `publish` to permit a release. Pull-request and fork runs never publish.

The automation increments the patch version only when a new version is needed;
an already bumped version is reused. It finalizes the compatibility changelog entry
before building, so the verified ZIP contains the correct release notes. Unrelated
unreleased changelog content stops the run for a maintainer release rather than
being silently included in a compatibility release.

Changes to `src/` or `templates/` since the latest published tag also stop the run.
Those changes need a maintainer release first; this workflow only publishes
compatibility updates to an already released theme.

After every verification succeeds, the release job:

1. Checks that `main` is still the exact source revision that was tested.
2. Commits only the candidate `gradle.properties` and `CHANGELOG.md`, then pushes
   that commit and its version tag atomically, without force.
3. Uploads the already tested ZIP to the default Marketplace channel using the
   existing `JETBRAINS_MARKETPLACE_TOKEN` secret.
4. Publishes a GitHub release containing that ZIP and the verification notes.

No PAT is required. Tags pushed by `GITHUB_TOKEN` do not trigger the existing
tag-based Publish workflow, so this job explicitly uploads the tested artifact.
The existing manual tag workflow remains available.

Maintainers must allow the release job's `GITHUB_TOKEN` to push the release commit
and tag under the repository's branch/tag rules. If repository protections reject
the atomic push, nothing is uploaded. This workflow does not bypass those rules.
The Marketplace token must retain permission to upload this plugin. Marketplace
approval can still delay availability after upload.

If Marketplace or GitHub publication fails after the source push, the next daily
run sees the still-unpublished version and retries it without another version bump.
An existing matching tag and Marketplace update are reused. If `main` changes
during verification, rerun the workflow against the new revision.

## Limits and visual regression checks

Plugin Verifier checks compatibility; it does not prove every UI color or contrast
is correct. These checks cover the latest stable and newer EAP Ultimate builds on
Linux. They do not certify every supported old build, OS, or JetBrains product.
Keep visual checks for editor selection/search, completion popups, Settings,
Git diffs, terminal colors, and all four flavors (including light Latte and Islands).
An automated screenshot baseline would be a separate extension to this workflow.

## Local checks

Python 3.12 or later is required for safe IDE archive extraction. The unit tests
and ZIP validator have no third-party Python dependencies.

```sh
python -m unittest discover -s tests -v
python scripts/jetbrains_compatibility.py discover --released-version v3.6.1
python scripts/jetbrains_compatibility.py prepare
whiskers templates/ui.theme.tera
whiskers templates/editor.tera
./gradlew buildPlugin check verifyPluginStructure
python scripts/verify_theme_archive.py 'build/distributions/Catppuccin Theme-3.6.2.zip' --version 3.6.2 --until-build '263.*'
./gradlew verifyPlugin -PverificationIdePath=/path/to/idea -PverificationArchivePath=/path/to/plugin.zip
```

The version and ceiling in the example depend on the current release feed. Use
the values in `build/compatibility/plan.json` for a live run. The optional Gradle
properties only change verification inputs; the normal development SDK stays fixed.

References:

- [IntelliJ Plugin Verifier configuration](https://plugins.jetbrains.com/docs/intellij/tools-intellij-platform-gradle-plugin-extension.html#intellijPlatform-pluginVerification)
- [Marketplace upload API](https://plugins.jetbrains.com/docs/marketplace/plugin-upload.html)
- [JetBrains stable release feed](https://data.services.jetbrains.com/products/releases?code=IIU&latest=true&type=release)
- [JetBrains EAP release feed](https://data.services.jetbrains.com/products/releases?code=IIU&latest=true&type=eap)
