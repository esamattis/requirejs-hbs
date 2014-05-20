// This is a build configuration file aimed to use the handlebars-runtime
// library only.
({
  baseUrl: "assets",

  paths: {
    // The handlebars library we include is the runtime one
    "handlebars": "lib/handlebars-runtime",

    // Let's define the compiler to the full one, so the hbs-builder can
    // precompile templates
    "handlebars-compiler": "lib/handlebars",

    text: "lib/text"
  },

  hbs: {
    templateExtension: ".html"
  },

  shim: {
    handlebars: {
      exports: "Handlebars"
    },

    // Handlebars-compiler needs its shim too.
    "handlebars-compiler": {
      exports: "Handlebars"
    },
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
  // handlebars-runtime). Exclude it from any module you define.
  excludeShallow: ["handlebars-compiler"],

  dir: "assets-build"
})
