const os = require("os");
const fs = require("fs");
const path = require("path");
const utils = require("./utils");
const dialogs = require("@samuellouf/dialogs");

/**
 * Updates WebMediaPlayer to a specified version.
 * @param {number} version - The version to update to.
 * @param {Console | {log: Function, warn: Function, error: Function}} logger - The logger to use for logging.
 */
async function updateToVersion(version, logger = console) {
  // Creating temp dir
  logger.log("Creating temporary directory...");
  var id, updaterPath;
  id = utils.generateRandomID(5);
  updaterPath = path.join(__dirname, ".temp", "WebMediaPlayer-Updater-" + id);
  try {
    await fs.mkdirSync(updaterPath);
  } catch (e) {
    logger.error("Could not create temporary folder");
    return;
  }
  logger.log("Temporary directory created!");
  logger.log("See at " + updaterPath);
  // Downloading WebMediaPlayer into temp dir
  logger.log(
    `Downloading WebMediaPlayer v${version} from the GitHub repository...`,
  );
  const updaterZipPath = path.join(updaterPath, "update.zip");
  const updaterExtractedZipPath = path.join(updaterPath, "update");

  // Fetching WebMediaPlayer
  var version_ = version;
  var response = await utils.downloadGitHubZip(
    "samuellouf",
    "WebMediaPlayer",
    version_,
    updaterZipPath,
  );
  if (!response) {
    logger.error("Could not fetch the GitHub repository");
    return;
  }
  logger.log("Repository downloaded successfully!");

  // Decompressing WebMediaPlayer
  logger.log("Decompressiong the repository");

  if (!(await utils.unzipFile(updaterZipPath, updaterExtractedZipPath))) {
    logger.error("Couldn't decompress the repository");
    return;
  }

  logger.log("The repository was successfully decompressed");

  // Compare the versions
  const realUpdaterExtractedZipPath = path.join(
    updaterExtractedZipPath,
    (await fs.readdirSync(updaterExtractedZipPath))[0],
  );
  var updateVersion = (await fs.existsSync(
    path.join(realUpdaterExtractedZipPath, "package.json"),
  ))
    ? JSON.parse(
        await fs.readFileSync(
          path.join(realUpdaterExtractedZipPath, "package.json"),
        ),
      ).version
    : JSON.parse(
        await fs.readFileSync(
          path.join(realUpdaterExtractedZipPath, "updates.json"),
        ),
      ).lastest_version;

  switch (utils.compareVersions(updateVersion, utils.getVersion())) {
    case 1:
      // The version is newer than the current one
      break;
    case 0:
      // The version is the same as the current one
      logger.warn("The version is the same as the current one");
      if (
        /no/.test(
          await dialogs.createMessageBox(
            "Warning : Reinstall?",
            "The version is the same as the current one. Do you wish to continue and reinstall WebMediaPlayer?",
            "yesno",
            "error",
          ),
        )
      ) {
        return;
      }
      break;
    case -1:
      // The version is older than the current one
      logger.warn(
        "The version of the update is older than the current version",
      );
      if (
        /no/.test(
          await dialogs.createMessageBox(
            "Warning : Downgrade?",
            "The version of the update is older than the current version. Do you wish to continue?",
            "yesno",
            "error",
          ),
        )
      ) {
        return;
      }
      break;
  }

  // Remove the files
  await utils.cleanDirectoryRecursive("", [
    "utils.js",
    "update.js",
    ".temp",
    "node_modules",
  ]);

  // Install WebMediaPlayer
  await utils.unzipFile(realUpdaterExtractedZipPath);

  if (utils.compareVersions(version, "2.0.0") >= 0) return;
  // Create a package.json
  var scripts = {
    update: "node update.js",
    reinstall: "node update.js --reinstall",
    format: "prettier . --write",
    "check-format": "prettier . --check",
  };

  if (utils.compareVersions(version, "2.0.0") >= 0) {
    scripts.start = "node server/server.js --player";
    scripts.server = "node server/server.js --player";
  }

  var package = {
    name: "webmediaplayer",
    version: "2.0.0",
    description: "My own little HTML/CSS/JS media player.",
    main: "",
    scripts: scripts,
    repository: {
      type: "git",
      url: "git+https://github.com/samuellouf/WebMediaPlayer.git",
    },
    keywords: ["WebMediaPlayer", "Web", "Media", "Player"],
    author: "SamuelLouf",
    license: "MIT",
    bugs: {
      url: "https://github.com/samuellouf/WebMediaPlayer/issues",
    },
    homepage: "https://github.com/samuellouf/WebMediaPlayer#readme",
    dependencies: {
      "@samuellouf/dialogs": "^1.1.0",
      archiver: "^7.0.1",
      "body-parser": "^1.20.3",
      decompress: "^4.2.1",
      express: "^4.21.2",
    },
    devDependencies: {
      "@playwright/test": "^1.51.1",
      "@types/node": "^22.14.0",
      prettier: "^3.5.1",
    },
  };

  fs.writeFileSync(
    path.join(__dirname, "package.json"),
    JSON.stringify(package, null, 2),
  );
}

function main() {
  updateToVersion(
    utils.hasArgument("version")
      ? utils.getArgument("version")
      : utils.hasArgument("reinstall")
        ? utils.getVersion()
        : utils.getLastestVersion(),
  );
}

if (require.main === module) {
  main();
}

module.exports = {
  updateToVersion,
};
