
require.config({

  baseUrl: "assets/",

  paths: {
    handlebars: "lib/handlebars",
    text: "lib/text",
    "foo/bar": "boz"
  },

  shim: {
    handlebars: {
      exports: "Handlebars"
    }
  },

  packages: [{
    // Include hbs as a package, so it will find hbs-builder when needed
    name: "hbs",
    location: "lib/hbs",
    main: "hbs"
  }],

  hbs: {
    templateExtension: ".html",
    compilerPath: "lib/handlebars"
  }

});
