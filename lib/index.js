'use strict';

var _imagemagick = require('imagemagick');

var _imagemagick2 = _interopRequireDefault(_imagemagick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_imagemagick2.default.convert(['-size', '128x128', 'xc:#ff0000', '-pointsize', '15', '-draw', 'text center hoge', 'test.jpg'], function (err, stdout) {
  if (err) {
    console.log(err);
  } else {
    console.log(stdout);
  }
});