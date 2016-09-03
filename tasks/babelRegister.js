var FS = require('fs');
var Path = require('path');

var babelConfig = JSON.parse(FS.readFileSync(Path.resolve(__dirname, '../package.json'), 'utf8')).babel;
babelConfig.plugins.push('transform-runtime');

require("babel-register")(babelConfig);	