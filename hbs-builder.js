define(["handlebars-compiler"], function (Handlebars) {
  var buildMap = {},
      templateExtension = ".hbs";

  return {

    // http://requirejs.org/docs/plugins.html#apiload
    load: function (name, parentRequire, onload, config) {

      // Get the template extension.
      var ext = (config.hbs && config.hbs.templateExtension ? config.hbs.templateExtension : templateExtension);

      // Use node.js file system module to load the template.
      // Sorry, no Rhino support.
      var fs = nodeRequire("fs");
      var fsPath = config.dirBaseUrl + "/" + name + ext;
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
          "return Handlebars.template(" + compiled.toString() + ");\n" +
        "});\n"
      );
    }

  };
});
