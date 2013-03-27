# Simple precompiling Handlebars plugin for RequireJS

Simpler version of [SlexAxton/require-handlebars-plugin][] without any extra
helpers to configure (i18n). Just a simple
[Handlebars][] loader and precompiler for [RequireJS][].

While this plugin precompiles the templates it does not swap out the Handlebars dependecy to runtime only
version on builds automatically. Yet. Pull requests welcome :)

## Usage

The loader uses the AMD [text] loader plugin to handle all ajax stuff so make
sure you have it and a Handlebars fork with an AMD definition in your setup.
Handlebars fork can be grabbed from the
[SlexAxton/require-handlebars-plugin][hbs-fork] repo.

After that requirejs-hbs can be used like the original Handlebars plugin:

```javascript
require(['hbs!app/templates/hello'], function ( template ) {
  document.body.innerHTML = template({name: "Epeli"});
});
```

[Handlebars]: http://handlebarsjs.com/
[RequireJS]: http://requirejs.org/
[SlexAxton/require-handlebars-plugin]: https://github.com/SlexAxton/require-handlebars-plugin
[hbs-fork]: https://github.com/SlexAxton/require-handlebars-plugin/blob/master/Handlebars.js
[text]: https://github.com/requirejs/text
