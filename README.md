# Simple precompiling Handlebars plugin for RequireJS

Simpler version of [SlexAxton/require-handlebars-plugin][] without any extra
helpers to configure (i18n). Just a simple
[Handlebars][] loader and precompiler for [RequireJS][].


## Quick start

This plugin uses the AMD [text][] loader plugin to handle all templates loads.
You will have to grab a copy of the [Handlebars][] library too.

Download all this and put it in a public folder, then add the following
RequireJS configuration:

```javascript
require.config({
  baseUrl: ...,

  paths: {
    handlebars: 'path/to/handlebars',
    text: 'path/to/text'
  },

  shim: {
    handlebars: {
      exports: 'Handlebars'
    }
  },

  packages: [
    {
      name: 'hbs',
      location: 'path/to/hbs/folder',
      main: 'hbs'
    }
  ]
});
```

After that requirejs-hbs can be used like the original Handlebars plugin:

```javascript
require(['hbs!app/templates/hello'], function (template) {
  document.body.innerHTML = template({name: "Epeli"});
});
```

## Configure

Currently only overriding the template extension is configurable.
In your RequireJS config file, you could optionally add a hbs entry:

```javascript
require.config({
  paths: { ... },

  hbs: {
    templateExtension: ".html"
  },

  shim : { ... },
});
```

Otherwise the template extension defaults to '.hbs'.


## Build

Two use cases here: either you want to keep the full Handlebars library in your
bundle, or you prefer to use the smaller Handlebars-runtime only. The strategy
is to define an extra module named `handlebars-compiler`, that will always
point to the full version of Handlebars.

In the first case, you can create a module alias by map `handlebars-compiler`
to `handlebars` with the [map][] directive.

In the second case, change the `handlebars` path to the runtime version, and
set the `handlebars-compiler` path.

See the build scripts for the [first](/example/app.build.js) and
[second](/example/app.build.runtime.js) cases to get a configuration example.


## Example

First of all, serve the files of the `example` directory with a HTTP server. If
you have python installed, you can run the `serve` script that will start a
server on port 8000.

The small example should run without any problem. You can see in the browser
developer tools that all the files are loaded uncompressed.

Next, use the r.js command to build either the version including the whole
Handlebars library, or the version including the Handlebars runtime only. The
file `index-build.html` will use the resulting build to run the example. Only
the minified versions of `require.js` and `main.js` should load this time.

```
$ cd example
$ ./serve
$ firefox http://localhost:8000
$ r.js -o app.build.runtime.js
$ firefox http://localhost:8000/index-build.html
```


[Handlebars]: http://handlebarsjs.com/
[RequireJS]: http://requirejs.org/
[SlexAxton/require-handlebars-plugin]: https://github.com/SlexAxton/require-handlebars-plugin
[text]: https://github.com/requirejs/text
[map]: http://requirejs.org/docs/api.html#config-map
