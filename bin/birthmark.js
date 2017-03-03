#!/usr/bin/env node
'use strict';

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _fonts = require('./fonts');

var _fonts2 = _interopRequireDefault(_fonts);

var _imagemagick = require('./imagemagick');

var _imagemagick2 = _interopRequireDefault(_imagemagick);

var _validators = require('./validators');

var validators = _interopRequireWildcard(_validators);

var _question = require('./question');

var questions = _interopRequireWildcard(_question);

var _emojipacks = require('emojipacks');

var _emojipacks2 = _interopRequireDefault(_emojipacks);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// setup help
_commander2.default.version('0.1.0').option('-s --slack', 'Create image and upload to slack').parse(process.argv);

var isUploadToSlack = _commander2.default.slack === true;

var upload = function upload(fileName) {
  if (isUploadToSlack || true) {
    //  emojipacks.upload();
  }
};

_inquirer2.default.prompt(questions.defaultQuestions).then(function (answer) {
  _inquirer2.default.prompt([questions.fontSelectionModeQuestion]).then(function (fontSelection) {
    var question = questions.fontSelectionQuestions[fontSelection.fontSelectionType];
    if (question.length > 0) {
      _inquirer2.default.prompt(question).then(function (fontNameAnswer) {
        if (fontNameAnswer.fontNameInitial) {
          _inquirer2.default.prompt(questions.selectFontByInitialQuestion(fontNameAnswer.fontNameInitial)).then(function (fontNameAnswerByInitial) {
            (0, _imagemagick2.default)(Object.assign({}, { font: _fonts2.default.availables.find(function (f) {
                return f.name === fontNameAnswerByInitial.fontName;
              }) }, answer)).then(upload);
          });
        } else {
          (0, _imagemagick2.default)(Object.assign({}, { font: _fonts2.default.availables.find(function (f) {
              return f.name === fontNameAnswer.fontName;
            }) }, answer)).then(upload);
        }
      });
    } else {
      (0, _imagemagick2.default)(answer).then(upload);
    }
  });
});