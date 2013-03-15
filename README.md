
# Simple Handlebars loader plugin for RequireJS

Simpler version of [SlexAxton/require-handlebars-plugin][] without any extra
helpers and dependencies to configure (i18n, json2 etc.). Just simple
[Handlebars][] loader and precompiler for [RequireJS][].

## Usage

The loader uses the AMD [text] loader plugin to handle all ajax stuff so make
sure you have it and a Handlebars fork with an AMD definition in your setup.
Handlebars fork can be grabbed from the
[SlexAxton/require-handlebars-plugin][hbs-fork] repo.

After that require-hbs can be used like the original Handlebars plugin:

```javascript
require(['hbs!App/Template/One'], function ( tmplOne ) {
  // Use whatever you would to render the template function
  document.body.innerHTML = tmplOne({adjective: "favorite"});
});
```

[Handlebars]: http://handlebarsjs.com/
[RequireJS]: http://requirejs.org/
[SlexAxton/require-handlebars-plugin]: https://github.com/SlexAxton/require-handlebars-plugin
[hbs-fork]: https://github.com/SlexAxton/require-handlebars-plugin/blob/master/Handlebars.js
[text]: https://github.com/requirejs/text
