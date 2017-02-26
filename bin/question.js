'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _validators = require('./validators');

var validators = _interopRequireWildcard(_validators);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(fonts) {
    _classCallCheck(this, _class);

    this.fonts = fonts;
  }

  _createClass(_class, [{
    key: 'getDefaultQuestions',
    value: function getDefaultQuestions() {
      return [{
        type: 'input',
        name: 'outputFileName',
        message: 'Input new image file name',
        validate: validators.empty
      }, {
        type: 'input',
        name: 'imageSize',
        message: 'Input image size',
        default: '128x128',
        validate: validators.imageSize
      }, {
        type: 'list',
        name: 'outputFileType',
        message: 'Select image file type',
        choices: ['jpg', 'png']
      }, {
        type: 'input',
        name: 'embedText',
        message: 'Input string that embed in image',
        validate: validators.empty
      }, {
        type: 'input',
        name: 'textColor',
        message: 'Input text color code for image',
        default: '#000000'
      }, {
        type: 'input',
        name: 'backgroundColor',
        message: 'Input background color code for image',
        default: '#ffffff'
      }];
    }
  }, {
    key: 'getFontSelectionQuestions',
    value: function getFontSelectionQuestions() {
      return {
        'Use default font by imagemagick': [],
        'Input font name directly': [{
          type: 'input',
          name: 'fontName',
          message: 'Input font name',
          validate: validators.font
        }],
        'Select font from available fonts list': [{
          type: 'list',
          name: 'fontName',
          message: 'Select font',
          choices: this.fonts.availables.map(function (f) {
            return f.name;
          }).sort()
        }],
        'Select font from available fonts list with initial character': [{
          type: 'list',
          name: 'fontNameInitial',
          message: 'Select font initial character',
          choices: Object.keys(this.fonts.allocated)
        }]
      };
    }
  }, {
    key: 'getSelectFontByInitialQuestion',
    value: function getSelectFontByInitialQuestion(initial) {
      return {
        type: 'list',
        name: 'fontName',
        message: 'Select font',
        choices: fonts.allocated[initial].map(function (f) {
          return f.name;
        }).sort()
      };
    }
  }, {
    key: 'getFontSelectionModeQuestion',
    value: function getFontSelectionModeQuestion() {
      return {
        type: 'list',
        name: 'fontSelectionType',
        message: 'Select font name selection method',
        choices: ['Use default font by imagemagick', 'Input font name directly', 'Select font from available fonts list', 'Select font from available fonts list with initial character']
      };
    }
  }]);

  return _class;
}();

exports.default = _class;