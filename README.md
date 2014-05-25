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

In your RequireJS config file, you could optionally add a hbs entry to
configure this plugin:

```javascript
require.config({
  paths: { ... },

  hbs: {
    templateExtension: ".html",
    compilerPath: "path/to/handlebars/full"
  },

  shim : { ... },
});
```

### templateExtension

This value is the template files extension. Its default is `".hbs"`.

### compilerPath

This is the path of the full version of Handlebars. The plugin will use this at
build time to precompile the templates. Its default is `"handlebars"`, but you
will have to override it if you want your client-side handlebars module to be
the runtime only.


## Build

To avoid the need to load and compile all templates in the client in a
production environment, a project should be precompiled. Use the requirejs
`r.js` command to do so. The hbs plugin will use Handlebars to precompile the
your templates files you specify as dependency of a module.

Once precompiled, a template does not need the full Handlebars library to be
rendered, the Handlebars runtime will be sufficient. So feel free to set the
handlebars module path to a runtime only library in your build file (see
[the example](/example/app.build.js). If you do so, make sure you define the
`compilerPath` configuration value as mentioned above.


## Example

First of all, serve the files of the `example` directory with a HTTP server. If
you have python installed, you can run the `serve` script that will start a
server on port 8000.

The example should run without any problem. You can see in the browser
developer tools that all the files are loaded uncompressed.

You can use the `r.js` command to build the project with the provided
build configuration [app.build.js](/example/app.build.js). See that this file
is configured to include the Handlebars runtime instead of the full library.

You can modify the [index file](/example/index.html) to use your freshely built
module, juste follow the commentary. Refresh the page, and you will see that
only one file is loaded containing everything your app need to be run.

```
$ cd example
$ ./serve
$ r.js -o app.build.js
$ firefox http://localhost:8000
```


[Handlebars]: http://handlebarsjs.com/
[RequireJS]: http://requirejs.org/
[SlexAxton/require-handlebars-plugin]: https://github.com/SlexAxton/require-handlebars-plugin
[text]: https://github.com/requirejs/text
[map]: http://requirejs.org/docs/api.html#config-map
