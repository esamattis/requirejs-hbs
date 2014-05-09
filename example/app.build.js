// This is a build configuration file aimed to use the full handlebars library.
({
  baseUrl: "assets",

  paths: {
    // The handlebars library we include is the full one
    "handlebars": "lib/handlebars",

    text: "lib/text"
  },

  // Alias handlebars-compiler to the handlebars library
  map: {
    "*": {
      "handlebars-compiler": "handlebars"
    }
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
    // Include hbs as a package, so it will find hbs-builder when needed
    {
      name: "hbs",
      location: "lib/hbs",
      main: "hbs"
    }
  ],

  name: "js/main",

  // We don't need handlebars-compiler in the final module (we already have
  // handlebars). Exclude it from any module you define.
  excludeShallow: ["handlebars-compiler"],

  dir: "assets-build"
})
