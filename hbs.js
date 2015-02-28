define(["handlebars"], function (Handlebars) {
  'use strict';

  var buildMap = {},
      templateExtension = ".hbs";

  return {
    // http://requirejs.org/docs/plugins.html#apiload
    load: function (name, req, onload, config) {
      // Get the template extension.
      var ext = (config.hbs && config.hbs.templateExtension ? config.hbs.templateExtension : templateExtension);

      if (config.isBuild) {
        var fs = nodeRequire("fs");
        var vm = nodeRequire("vm");

        if (!Handlebars) {
          var handlebarsPath = req.toUrl((config.hbs && config.hbs.compilerPath) || "handlebars");

          // Add the extension if not present.
          if (handlebarsPath.indexOf(".js", handlebarsPath.length - 3) < 0) {
            handlebarsPath += ".js";
          }

          // Get the template extension.
          var context = {};
          vm.runInNewContext(fs.readFileSync(handlebarsPath), context, handlebarsPath);
          Handlebars = context.Handlebars;
        }

        // Use node.js file system module to load the template.
        // Sorry, no Rhino support.
        var fsPath = req.toUrl(name + ext);

        buildMap[name] = fs.readFileSync(fsPath).toString();
        req(["handlebars"], function () {
          onload();
        });
      } else {
        // In browsers use the text-plugin to the load template. This way we
        // don't have to deal with ajax stuff
        req(["text!" + name + ext], function (raw) {
          // Just return the compiled template
          onload(Handlebars.compile(raw));
        });
      }
    },

    // http://requirejs.org/docs/plugins.html#apiwrite
    write: function (pluginName, name, write) {
      var compiled = Handlebars.precompile(buildMap[name]);
      // Write out precompiled version of the template function as AMD
      // definition.
      write(
        "define('hbs!" + name + "', ['handlebars'], function (Handlebars) { \n" +
          "Handlebars = Handlebars || this.Handlebars;\n" +
          "return Handlebars.template(" + compiled.toString() + ");\n" +
        "});\n"
      );
    }

  };
});
