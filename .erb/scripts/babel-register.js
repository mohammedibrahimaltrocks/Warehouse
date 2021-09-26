const path = require('path');
const webpackPaths = require('../configs/webpack.paths.js');

require('@babel/register')({
  extensions: ['.es6', '.es', '.ts', '.tsx','.jsx', '.js', '.mjs'],
  cwd: webpackPaths.rootPath,
});
// require("@babel/core").transformSync("code", {
//   plugins: ["@babel/plugin-transform-typescript"],
// });
