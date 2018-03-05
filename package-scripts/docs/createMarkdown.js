const typedoc = require("typedoc");
const typeDocApp = new typedoc.Application();
const fs = require("fs-extra");
const glob = require("glob");

const tsFiles = glob.sync("./lib/**/*", {
  nodir: true
});

tsFiles.unshift("./custom_typings/system.d.ts");

tsFiles.map((file) => {
  console.log(file);
});

// typeDocApp.exclude = ["bignumber.js"];

// const options = typeDocApp.options.getCompilerOptions();
// Object.assign(options, {
//   "target": "es6",
//   "module": "commonjs",
//   "exclude": "./lib/test/**/*"
// });

// typeDocApp.options.setValue("target", "es6");
// typeDocApp.options.setValue("module", "commonjs");
// typeDocApp.options.setValue("exclude", "./lib/test/**/*");
// typeDocApp.options.setValue("excludeExternals", false);
// typeDocApp.options.setValue("hideGenerator", true);
// typeDocApp.options.setValue("readme", "none");

// typeDocApp.generateDocs(tsFiles, "./docs/Api");

function () {
  var options = this.options({});
  if (!options.out && !options.json) {
    grunt.log.error('You must either specify the \'out\' or \'json\' option.');
    return false;
  }

  if (this.filesSrc.length == 0) {
    grunt.log.error('No source files specified.');
    return false;
  }

  var out = options.out;
  var json = options.json;
  delete options.out;
  delete options.json;

  options.logger = function (message, level, newLine) {
    switch (level) {
      case TypeDoc.LogLevel.Success:
        grunt.log.ok(message);
        break;
      case TypeDoc.LogLevel.Info:
      case TypeDoc.LogLevel.Warn:
        if (newLine) {
          grunt.log.writeln(message);
        } else {
          grunt.log.write(message);
        }
        break;
      case TypeDoc.LogLevel.Error:
        grunt.log.error(message);
        break;
      default:
        grunt.verbose.write(message);
        break;
    }
  };

  var app = new TypeDoc.Application(options);
  var project = app.convert(app.expandInputFiles(this.filesSrc));
  if (!project) {
    return false;
  }

  if (out) app.generateDocs(project, out);
  if (json) app.generateJson(project, json);
  return true;
}
