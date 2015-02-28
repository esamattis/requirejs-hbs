
require.config({

  baseUrl: "assets/",

  paths: {
    handlebars: "lib/handlebars",
    text: "lib/text",
    hbs: "lib/hbs",
    "foo/bar": "boz"
  },

  shim: {
    handlebars: {
      exports: "Handlebars"
    }
  },

  hbs: {
    templateExtension: ".html"
  }

});
