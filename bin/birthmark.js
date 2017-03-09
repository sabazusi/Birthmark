#!/usr/bin/env node
'use strict';

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _finalhandler = require('finalhandler');

var _finalhandler2 = _interopRequireDefault(_finalhandler);

var _serveStatic = require('serve-static');

var _serveStatic2 = _interopRequireDefault(_serveStatic);

var _fonts = require('./fonts');

var _fonts2 = _interopRequireDefault(_fonts);

var _localtunnel = require('localtunnel');

var _localtunnel2 = _interopRequireDefault(_localtunnel);

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

var upload = function upload(filePath) {
  if (isUploadToSlack) {
    _inquirer2.default.prompt(questions.slackTeamQuestions).then(function (slackAnswer) {
      var teamDomain = slackAnswer.teamDomain,
          userMail = slackAnswer.userMail,
          userPassword = slackAnswer.userPassword,
          emojiName = slackAnswer.emojiName;
      // invoke static local file server

      var serve = (0, _serveStatic2.default)(_path2.default.dirname(filePath));
      var server = _http2.default.createServer(function (req, res) {
        serve(req, res, (0, _finalhandler2.default)(req, res));
      });
      server.listen(5000);
      (0, _localtunnel2.default)(5000, function (error, tunnel) {
        if (error) {
          console.log('Error!');
          return;
        }
        _emojipacks2.default.upload(teamDomain, userMail, userPassword, [{
          src: tunnel.url + '/' + _path2.default.basename(filePath),
          name: emojiName
        }]).then(function () {
          return process.exit(0);
        });
      });
    });
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