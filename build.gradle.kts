import org.jetbrains.changelog.Changelog
import org.jetbrains.changelog.date
import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.dsl.KotlinVersion
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    // Java support
    id("java")
    // Kotlin support
    id("org.jetbrains.kotlin.jvm") version "2.3.10"
    // Gradle IntelliJ Platform Plugin
    id("org.jetbrains.intellij.platform") version "2.11.0"
    // Gradle Changelog Plugin
    id("org.jetbrains.changelog") version "2.5.0"
}

group = providers.gradleProperty("pluginGroup").get()
version = providers.gradleProperty("pluginVersion").get()

// Configure project's dependencies
repositories {
  mavenCentral()
  intellijPlatform {
    defaultRepositories()
  }
}

dependencies {
  intellijPlatform {
    create(providers.gradleProperty("platformType"), providers.gradleProperty("platformVersion"))
  }
}

intellijPlatform {
  buildSearchableOptions = false

  pluginConfiguration {
    id.set(providers.gradleProperty("pluginGroup"))
    name.set(providers.gradleProperty("pluginName"))
    version.set(providers.gradleProperty("pluginVersion"))

    changelog {
      version.set(providers.gradleProperty("pluginVersion"))
      path.set(file("CHANGELOG.md").canonicalPath)
      header.set(provider { "${version.get()} - ${date()}" })
      headerParserRegex.set("""(\d\.\d+\.\d+)""".toRegex())
      itemPrefix.set("-")
      keepUnreleasedSection.set(true)
      unreleasedTerm.set("[Unreleased]")
      groups.set(listOf("Added", "Changed", "Deprecated", "Removed", "Fixed", "Security"))
    }

    ideaVersion {
      sinceBuild.set(providers.gradleProperty("pluginSinceBuild"))
    }
  }

  signing {
    certificateChain = providers.environmentVariable("CERTIFICATE_CHAIN")
    privateKey = providers.environmentVariable("PRIVATE_KEY")
    password = providers.environmentVariable("PRIVATE_KEY_PASSWORD")
  }

  publishing {
    token.set(providers.environmentVariable("PUBLISH_TOKEN"))
    channels.set(listOf("default"))
  }

  pluginVerification {
    ides {
      create(providers.gradleProperty("platformType"), providers.gradleProperty("platformVersion"))
    }
  }
}

tasks {
    // Set the JVM compatibility versions
    providers.gradleProperty("javaVersion").get().let {
        withType<JavaCompile> {
            sourceCompatibility = it
            targetCompatibility = it
        }
        withType<KotlinCompile> {
            compilerOptions {
              apiVersion = KotlinVersion.KOTLIN_1_8
              jvmTarget = JvmTarget.fromTarget(it)
            }
        }
    }

    wrapper {
        gradleVersion = providers.gradleProperty("gradleVersion").get()
    }

    patchPluginXml {
        pluginVersion.set(providers.gradleProperty("pluginVersion"))
        sinceBuild.set(providers.gradleProperty("pluginSinceBuild"))
        untilBuild.set(providers.gradleProperty("pluginUntilBuild"))

        // Get the latest available change notes from the changelog file
        changeNotes.set(
          provider { changelog.renderItem(changelog.getLatest(), Changelog.OutputType.HTML) }
        )
    }

    publishPlugin {
        dependsOn("patchChangelog")
    }
}
