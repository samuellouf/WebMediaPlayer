const fs = require("fs");
const path = require("path");
const child_process = require("child_process");
const https = require("https");
const decompress = require("decompress");
const archiver = require("archiver");
const chokidar = require("chokidar");
const net = require("net");

function watchPaths(callback, ...paths) {
  chokidar
    .watch(paths, {
      ignoreInitial: true,
    })
    .on("all", () => {
      callback(callback);
    });
}

function watchPathsSync(...paths) {
  return new Promise((resolve) => {
    watchPaths(resolve, ...paths);
  });
}

function waitForElementEvent(element, type) {
  return new Promise((resolve) => {
    var listener = (event) => {
      resolve(event);
      element.removeEventListener(type, listener);
    };
    element.addEventListener(type, listener);
  });
}

async function cleanDirectory(dirPath, exceptions = []) {
  try {
    const items = await fs.readdirSync(dirPath);

    for (var item of items) {
      item = item.replaceAll("\\", "/");
      if (
        exceptions.includes(item) ||
        exceptions.includes(item.replace(dirPath, ""))
      ) {
        console.log(`Skipping: ${item}`);
        continue; // Skip files in the exception list
      }

      const itemPath = path.join(dirPath, item);
      const stat = await fs.lstatSync(itemPath);

      if (stat.isDirectory()) {
        // Recursively delete folder
        await fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`Deleted folder: ${itemPath}`);
      } else {
        // Delete file
        await fs.unlinkSync(itemPath);
        console.log(`Deleted file: ${itemPath}`);
      }
    }
  } catch (error) {
    console.error(`Error cleaning directory: ${error.message}`);
  }
}

async function cleanDirectoryRecursive(
  dirPath,
  exceptions = [],
  originalPath = "",
) {
  if (!originalPath) originalPath = dirPath;
  try {
    const items = await fs.readdirSync(dirPath);

    for (var item of items) {
      item = item.replaceAll("\\", "/");
      var itemPath = path.join(dirPath, item).replaceAll("\\", "/");
      console.log([itemPath, exceptions]);
      if (exceptions.includes(itemPath.replace(originalPath + "/", ""))) {
        console.log(`Skipping: ${itemPath}`);
        continue; // Skip files/folders in the exception list
      }

      const stat = await fs.lstatSync(itemPath);

      if (stat.isDirectory()) {
        // Recursively clean subdirectory before deleting it
        await cleanDirectoryRecursive(itemPath, exceptions, originalPath);

        // Check again if the folder is empty after cleaning
        const remainingFiles = await fs.readdirSync(itemPath);
        if (remainingFiles.length === 0) {
          await fs.rmdirSync(itemPath);
          console.log(`Deleted empty folder: ${itemPath}`);
        }
      } else {
        // Delete file
        await fs.unlinkSync(itemPath);
        console.log(`Deleted file: ${itemPath}`);
      }
    }
  } catch (error) {
    console.error(`Error cleaning directory: ${error.message}`);
  }
}

async function zipDir(inputFolder, outputFile, compressionLevel = 9) {
  const archive = archiver("zip", { zlib: { level: compressionLevel } });
  const stream = fs.createWriteStream(outputFile);

  return new Promise((resolve, reject) => {
    archive
      .directory(inputFolder, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}

async function unzipFile(inputFile, outputFolder) {
  try {
    await decompress(inputFile, outputFolder);
  } catch (err) {
    return false;
  }
  return true;
}

function downloadGitHubZip(owner, repo, branch, fileName) {
  const url = `https://github.com/${owner}/${repo}/archive/refs/heads/${branch}.zip`;

  const file = fs.createWriteStream(fileName);

  console.log(`Downloading from: ${url}`);

  return new Promise((resolve) => {
    https
      .get(url, async (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          console.log("Redirecting to:", response.headers.location);
          resolve(
            await downloadRepoFromRedirect(response.headers.location, fileName),
          );
        }

        if (response.statusCode !== 200) {
          console.error(
            `Failed to download. HTTP Status: ${response.statusCode}`,
          );
          response.resume(); // Consume response to free memory
          resolve(false);
        }

        response.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log(`Downloaded: ${fileName}`);
          resolve(true);
        });
      })
      .on("error", (err) => {
        console.error(`Error: ${err.message}`);
        resolve(false);
      });
  });
}

function downloadRepoFromRedirect(url, fileName) {
  return new Promise((resolve) => {
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          console.error(
            `Redirected request failed. HTTP Status: ${response.statusCode}`,
          );
          resolve(false);
        }

        const file = fs.createWriteStream(fileName);
        response.pipe(file);

        file.on("finish", () => {
          file.close();
          console.log(`Downloaded: ${fileName}`);
          resolve(true);
        });
      })
      .on("error", (err) => {
        console.error(`Error: ${err.message}`);
        resolve(false);
      });
  });
}

/**
 * Executes a command.
 * @param {string} command - The command to execute.
 * @param {object} options - The options for the command.
 * @returns {Promise<{error, stderr, stdout}>} - The result of the command.
 */
function exec(command, options = null) {
  return new Promise((resolve) => {
    child_process.exec(command, options, (error, stdout, stderr) =>
      resolve({ error, stderr, stdout }),
    );
  });
}

/**
 * Generates an ID sting of random characters.
 * @param {number} length - The numbers of characters in the ID.
 * @param {string} characters - The characters to use to compose the ID.
 */
function generateRandomID(
  length,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
) {
  var idx = "";
  for (let i = 0; i < length; i++) {
    idx += characters[Math.round(Math.random() * characters.length) - 1];
  }
  return idx;
}

/**
 * Gets the version of this WebMediaPlayer
 */
function getVersion() {
  if (fs.existsSync("./package.json")) {
    return require("./package.json").version;
  } else if (fs.existsSync("./updates.json")) {
    return require("./updates.json").lastest_version;
  }
  return null;
}

async function getLastestVersion() {
  return (
    (await fetch("https://samuellouf.github.io/WebMediaPlayer/package.json")
      .then((r) => r.json())
      .then((r) => r.version)
      .catch((err) => null)) ||
    (await fetch("https://samuellouf.github.io/WebMediaPlayer/updates.json")
      .then((r) => r.json())
      .then((r) => r.lastest_version)
      .catch((err) => null))
  );
}

/**
 * Compares two versions
 */
function compareVersions(v1, v2) {
  const compare = (item1, item2) =>
    item1 == item2 ? 0 : item1 < item2 ? -1 : 1;
  return (
    compare(
      Number(v1.split(".").slice(0, 2).join(".")),
      Number(v2.split(".").slice(0, 2).join(".")),
    ) ||
    compare(
      Number(v1.split(".").slice(1, 3).join(".")),
      Number(v2.split(".").slice(0, 3).join(".")),
    )
  );
}

async function isUpdateAvailable() {
  if (!bridge && isLocalServer()) return false;
  var current_version = await getVersion();
  var lastest_version = await getLastestVersion();
  return compareVersions(current_version, lastest_version) == -1;
}

function generateTimeStampFromDate(date) {
  return `${(String(date.getDate()).length == 1 ? "0" : "") + date.getDate()}-${(String(date.getMonth()).length == 1 ? "0" : "") + date.getMonth()}-${date.getFullYear()}--${(String(date.getHours()).length == 1 ? "0" : "") + date.getHours()}-${(String(date.getMinutes()).length == 1 ? "0" : "") + date.getMinutes()}-${(String(date.getSeconds()).length == 1 ? "0" : "") + date.getSeconds()}-${(String(date.getMilliseconds()).length == 1 ? "00" : String(date.getMilliseconds()).length == 2 ? "0" : "") + date.getMilliseconds()}`;
}

function getArgument(arg) {
  for (let arg_ of process.argv) {
    if (arg_.startsWith("-" + arg) || arg_.startsWith("--" + arg)) {
      if (arg_.includes("=")) {
        return arg_.split("=")[1];
      } else {
        return "";
      }
    }
  }
  return null;
}

function hasArgument(arg) {
  return getArgument(arg) != null;
}

function fixVersion(version) {
  return version.split(".").length - 1 == 0
    ? version + ".0.0"
    : version.split(".").length - 1 == 1
      ? version + ".0"
      : version;
}

function clearConsole() {
  if (console.clear) {
    console.clear();
  } else if (console.log) {
    console.log("\x1Bc");
  } else {
    process.stdout.write("\x1Bc");
  }
}

function isPortOpen(port, host = "localhost") {
  var socket = new net.Socket();
  return new Promise((resolve) => {
    socket.once("connect", () => {
      resolve(false);
    });

    socket.once("error", (error) => {
      resolve(true);
    });

    socket.connect({ port: port, host: host }, () => {});
  });
}

function getOpenPort(host = "localhost", startPort = 0, endPort = Infinity) {
  return new Promise(async (resolve) => {
    for (var port = startPort; port <= endPort; port++) {
      if (await isPortOpen(port, host)) {
        resolve(port);
        return;
      }
    }
    resolve(null);
  });
}

module.exports = {
  watchPaths,
  watchPathsSync,
  zipDir,
  unzipFile,
  downloadGitHubZip,
  generateRandomID,
  getVersion,
  getLastestVersion,
  isUpdateAvailable,
  exec,
  waitForElementEvent,
  compareVersions,
  generateTimeStampFromDate,
  cleanDirectory,
  cleanDirectoryRecursive,
  getArgument,
  hasArgument,
  fixVersion,
  clearConsole,
  isPortOpen,
  getOpenPort,
};
