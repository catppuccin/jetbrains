import org.jetbrains.changelog.Changelog
import org.jetbrains.changelog.date
import org.jetbrains.kotlin.gradle.dsl.JvmTarget
import org.jetbrains.kotlin.gradle.dsl.KotlinVersion
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

fun properties(key: String) = project.findProperty(key).toString()

plugins {
    // Java support
    id("java")
    // Kotlin support
    id("org.jetbrains.kotlin.jvm") version "2.2.10"
    // Gradle IntelliJ Platform Plugin
    id("org.jetbrains.intellij.platform") version "2.9.0"
    // Gradle Changelog Plugin
    id("org.jetbrains.changelog") version "2.4.0"
}

group = properties("pluginGroup")
version = properties("pluginVersion")

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
    id.set(properties("pluginGroup"))
    name.set(properties("pluginName"))
    version.set(properties("pluginVersion"))

    changelog {
      version.set(properties("pluginVersion"))
      path.set(file("CHANGELOG.md").canonicalPath)
      header.set(provider { "${version.get()} - ${date()}" })
      headerParserRegex.set("""(\d\.\d+\.\d+)""".toRegex())
      itemPrefix.set("-")
      keepUnreleasedSection.set(true)
      unreleasedTerm.set("[Unreleased]")
      groups.set(listOf("Added", "Changed", "Deprecated", "Removed", "Fixed", "Security"))
    }
  }

  pluginVerification {
    ides {
      create(providers.gradleProperty("platformType"), providers.gradleProperty("platformVersion"))
    }
  }
}

tasks {
    // Set the JVM compatibility versions
    properties("javaVersion").let {
        withType<JavaCompile> {
            sourceCompatibility = it
            targetCompatibility = it
        }
        withType<KotlinCompile> {
            compilerOptions {
              apiVersion = KotlinVersion.KOTLIN_1_8
              jvmTarget = JvmTarget.fromTarget(properties("javaVersion"))
            }
        }
    }

    wrapper {
        gradleVersion = properties("gradleVersion")
    }

    patchPluginXml {
        pluginVersion.set(properties("pluginVersion"))
        sinceBuild.set(properties("pluginSinceBuild"))
        untilBuild.set(properties("pluginUntilBuild"))

        // Get the latest available change notes from the changelog file
        changeNotes.set(
          provider { changelog.renderItem(changelog.getLatest(), Changelog.OutputType.HTML) }
        )
    }

    signPlugin {
        certificateChain.set(System.getenv("CERTIFICATE_CHAIN"))
        privateKey.set(System.getenv("PRIVATE_KEY"))
        password.set(System.getenv("PRIVATE_KEY_PASSWORD"))
    }

    publishPlugin {
        dependsOn("patchChangelog")
        token.set(System.getenv("PUBLISH_TOKEN"))
        channels.set(listOf("default"))
    }
}
