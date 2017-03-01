'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _imagemagick = require('imagemagick');

var _imagemagick2 = _interopRequireDefault(_imagemagick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var construcParams = function construcParams(params) {
  var font = params.font,
      outputFileName = params.outputFileName,
      outputFileType = params.outputFileType,
      imageSize = params.imageSize,
      embedText = params.embedText,
      textColor = params.textColor,
      backgroundColor = params.backgroundColor;

  var fontPath = font ? { font: font.path } : {};
  return Object.assign({}, fontPath, {
    background: backgroundColor,
    fill: textColor,
    size: imageSize,
    gravity: 'center',
    label: embedText,
    output: outputFileName + '.' + outputFileType
  });
};

var createImage = function createImage(input) {
  var answer = construcParams(input);
  var params = [];
  var output = '';
  Object.keys(answer).forEach(function (key) {
    if (key === 'label') {
      params.push('label:' + answer[key]);
    } else if (key === 'output') {
      output = answer[key];
    } else {
      params.push('-' + key);
      params.push(answer[key]);
    }
  });
  if (!output) {
    console.log('Error: no output file name...');
  } else {
    params.push(output);
    return new Promise(function (resolve, reject) {
      _imagemagick2.default.convert(params, function (err, stdout) {
        if (err) {
          console.log('Error: ' + err.toString());
          reject();
        } else {
          console.log('Created! -> ' + answer['output']);
          resolve(answer['output']);
        }
      });
    });
  }
};

exports.default = createImage;