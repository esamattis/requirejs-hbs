define(function (require) {
  var template = require("hbs!template");
  var Handlebars = require("handlebars");
  Handlebars.registerHelper("foo", function () {
    return "bar";
  });
  var context = {
    usingHandlebarsRuntime: Handlebars.precompile ? "nope" : "yep"
  };
  var content = template(context);
  document.body.insertAdjacentHTML("beforeend", content);
});
