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


## Example

First of all, serve the files of the `example` directory with a HTTP server. If
you have python installed, you can run the `serve` script that will start a
server on port 8000.

The small example should run without any problem. You can see in the browser
developer tools that all the files are loaded uncompressed.

Next, use the r.js command to build the project. The
file `index-build.html` will use the resulting build to run the example. Only
the minified versions of `require.js` and `main.js` should load this time.

```
$ cd example
$ ./serve
$ firefox http://localhost:8000
$ r.js -o app.build.js
$ firefox http://localhost:8000/index-build.html
```


[Handlebars]: http://handlebarsjs.com/
[RequireJS]: http://requirejs.org/
[SlexAxton/require-handlebars-plugin]: https://github.com/SlexAxton/require-handlebars-plugin
[hbs-fork]: https://github.com/SlexAxton/require-handlebars-plugin/blob/master/Handlebars.js
[text]: https://github.com/requirejs/text
