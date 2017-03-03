'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slackTeamQuestions = exports.fontSelectionModeQuestion = exports.selectFontByInitialQuestion = exports.fontSelectionQuestions = exports.defaultQuestions = undefined;

var _validators = require('./validators');

var validators = _interopRequireWildcard(_validators);

var _fonts = require('./fonts');

var _fonts2 = _interopRequireDefault(_fonts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var defaultQuestions = exports.defaultQuestions = [{
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

var fontSelectionQuestions = exports.fontSelectionQuestions = {
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
    choices: _fonts2.default.availables.map(function (f) {
      return f.name;
    }).sort()
  }],
  'Select font from available fonts list with initial character': [{
    type: 'list',
    name: 'fontNameInitial',
    message: 'Select font initial character',
    choices: Object.keys(_fonts2.default.allocated)
  }]
};

var selectFontByInitialQuestion = exports.selectFontByInitialQuestion = function selectFontByInitialQuestion(initial) {
  return {
    type: 'list',
    name: 'fontName',
    message: 'Select font',
    choices: _fonts2.default.allocated[initial].map(function (f) {
      return f.name;
    }).sort()
  };
};

var fontSelectionModeQuestion = exports.fontSelectionModeQuestion = {
  type: 'list',
  name: 'fontSelectionType',
  message: 'Select font name selection method',
  choices: ['Use default font by imagemagick', 'Input font name directly', 'Select font from available fonts list', 'Select font from available fonts list with initial character']
};

var slackTeamQuestions = exports.slackTeamQuestions = [{
  type: 'input',
  name: 'slackTeamDomain',
  message: 'Input your slack domain name(e.g. hoge.slack.com => input \'hoge\')',
  validate: validators.empty
}, {
  type: 'input',
  name: 'slackUserMail',
  message: 'Input email address for your slack account',
  validate: validators.empty
}, {
  type: 'input',
  name: 'slackUserPassword',
  message: 'Input password for your slack account',
  validate: validators.empty
}];