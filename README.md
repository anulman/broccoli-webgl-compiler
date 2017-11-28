# broccoli-webgl-transpiler

A Broccoli plugin which transpiles WebGL files.

## How to install?

```sh
$ yarn add broccoli-typescript-compiler -D // OR
$ npm install broccoli-typescript-compiler --save-dev
```

## How to use?

```js
var WebGLTranspiler = require('broccoli-webgl-transpiler').default;
var webGLTree = new WebGLTranspiler(inputTree, {
  annotation: "compile program"
});
```

### Config Options:

`annotation:`

An optional string, which when provide should be a descriptive annotation. Useful for debugging, to tell multiple instances of the same plugin apart.

### Limitations:

Right now, this plugin only supports compiling GLSL into exported JS strings, plus renaming files from `*.glsl` to `*.js`. *You will need to attach and compile shaders manually.*

Ember projects seeking further support may consider `ember-cli-webgl`
