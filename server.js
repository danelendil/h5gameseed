'use strict';
var path = require('path');
var express = require('express');
var resolve = require('resolve');
var browserify = require('browserify');
var stringify = require('stringify');
var watchify = require('watchify');
var colors = require('colors');
var fs = require('fs');

var html = fs.readFileSync('index.html');

var modules = [ 'gamejs', 'gameui' ];
var app = express();

var bundle = browserify({
  debug: true,
});

bundle = watchify(bundle);

bundle.transform(stringify(['.html']), {
  global: true,
});

bundle.add('bundle.js');

var bundleError = function(err) {
  console.error(colors.red(err.stack || String(err)));
};

// bundle() even before http request, gets cached
bundle.on('update', function() {
  console.log('required files changed');
  bundle.bundle().on('error', bundleError);
});

console.log('initializing bundle');
bundle.bundle().on('error', bundleError);

modules.forEach(function(name) {
  var dir = path.join(
    resolve.sync(name, {
      basedir: __dirname
    }),
    'res');

  app.use('res/*', express.static(dir));
});

app.use('/bundle.js', function(req, res) {
  res.set('Content-Type', 'text/javascript');
  var stream = bundle.bundle();
  stream.on('error', bundleError);
  stream.pipe(res);
});

// simple index.html only injects bundle.js
app.use('/', function(req, res) {
  res.write(html);
  res.end();
});

app.listen(8001);
console.log('ready');
