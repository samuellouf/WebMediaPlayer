const fs = require("fs");
const pathUtil = require("path");
const { mkdirp, recursiveReadDirectory } = require("./fs-utils");

/**
 * @typedef {'player'} Mode
 */

class BuildFile {
  constructor(source) {
    this.sourcePath = source;
  }

  getType() {
    return pathUtil.extname(this.sourcePath);
  }

  getLastModified() {
    return fs.statSync(this.sourcePath).mtimeMs;
  }

  read() {
    return fs.readFileSync(this.sourcePath);
  }

  validate() {
    // no-op by default
  }

  /**
   * @returns {Record<string, Record<string, TranslatableString>>|null}
   */
  getStrings() {
    // no-op by default, to be overridden
    return null;
  }
}

class Build {
  constructor() {
    /** @type {Record<string, BuildFile>} */
    this.files = {};
  }

  getFile(path) {
    return (
      this.files[path] ||
      this.files[`${path}.html`] ||
      this.files[`${path}index.html`] ||
      null
    );
  }

  export(root) {
    mkdirp(root);

    for (const [relativePath, file] of Object.entries(this.files)) {
      const directoryName = pathUtil.dirname(relativePath);
      fs.mkdirSync(pathUtil.join(root, directoryName), {
        recursive: true,
      });
      fs.writeFileSync(pathUtil.join(root, relativePath), file.read());
    }
  }
}

class Builder {
  /**
   * @param {Mode} mode
   */
  constructor(mode) {
    if (process.argv.includes("--player")) {
      this.mode = "player";
    } else {
      this.mode = "player";
    }

    if (this.mode == "player") {
      this.websiteRoot = pathUtil.join(__dirname, "../player");
    }

    this.additionalFiles = ["package.json", "updates.json"];
  }

  build() {
    const build = new Build(this.mode);

    for (const [filename, absolutePath] of recursiveReadDirectory(
      this.websiteRoot,
    )) {
      build.files[`/${filename}`] = new BuildFile(absolutePath);
    }

    for (const [filename, absolutePath] of this.additionalFiles.map((file) => [
      file,
      pathUtil.join(__dirname, "../", file),
    ])) {
      if (fs.existsSync(absolutePath))
        build.files[`/${filename}`] = new BuildFile(absolutePath);
    }

    return build;
  }

  tryBuild(...args) {
    const start = new Date();
    process.stdout.write(`[${start.toLocaleTimeString()}] Building... `);

    try {
      const build = this.build(...args);
      const time = Date.now() - start.getTime();
      console.log(`done in ${time}ms`);
      return build;
    } catch (error) {
      console.log("error");
      console.error(error);
    }

    return null;
  }

  startWatcher(callback) {
    // Load chokidar lazily.
    const chokidar = require("chokidar");
    callback(this.tryBuild());
    chokidar
      .watch([this.websiteRoot], {
        ignoreInitial: true,
      })
      .on("all", () => {
        callback(this.tryBuild());
      });
  }

  validate() {
    const errors = [];
    const build = this.build();
    for (const [fileName, file] of Object.entries(build.files)) {
      try {
        file.validate();
      } catch (e) {
        errors.push({
          fileName,
          error: e,
        });
      }
    }
    return errors;
  }
}

module.exports = Builder;
