({
  baseUrl: "assets",

  paths: {
    "handlebars": "lib/handlebars",

    text: "lib/text"
  },

  hbs: {
    templateExtension: ".html"
  },

  shim: {
    handlebars: {
      exports: "Handlebars"
    }
  },

  packages: [
    // Include hbs as a package
    {
      name: "hbs",
      location: "lib/hbs",
      main: "hbs"
    }
  ],

  name: "js/main",

  dir: "assets-build"
})
