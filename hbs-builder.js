define(["handlebars-compiler"], function (Handlebars) {
  var buildMap = {},
      templateExtension = ".hbs";

  var fs = nodeRequire("fs");
  var vm = nodeRequire("vm");

  return {

    // http://requirejs.org/docs/plugins.html#apiload
    load: function (name, parentRequire, onload, config) {

      // Load the Handlebars library using the path provided by the configuration.
      if (!Handlebars) {
        var handlebarsPath = parentRequire.toUrl((config.hbs && config.hbs.compilerPath) || "handlebars");

        // Add the extension if not present.
        if (handlebarsPath.indexOf(".js", handlebarsPath.length - 3) < 0) {
          handlebarsPath += ".js";
        }

        var context = {};
        vm.runInNewContext(fs.readFileSync(handlebarsPath), context, handlebarsPath);
        Handlebars = context.Handlebars;
      }

      // Get the template extension.
      var ext = (config.hbs && config.hbs.templateExtension ? config.hbs.templateExtension : templateExtension);

      // Use node.js file system module to load the template.
      // Sorry, no Rhino support.
      var fsPath = parentRequire.toUrl(name + ext);

      buildMap[name] = fs.readFileSync(fsPath).toString();
      parentRequire(["handlebars"], function () {
        onload();
      });
    },

    // http://requirejs.org/docs/plugins.html#apiwrite
    write: function (pluginName, name, write) {
      var compiled = Handlebars.precompile(buildMap[name]);
      // Write out precompiled version of the template function as AMD
      // definition.
      write(
        "define('hbs!" + name + "', ['handlebars'], function(Handlebars){ \n" +
          "Handlebars = Handlebars || this.Handlebars;\n" +
          "return Handlebars.template(" + compiled.toString() + ");\n" +
        "});\n"
      );
    }

  };
});
