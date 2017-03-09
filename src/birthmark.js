#!/usr/bin/env node

import inquirer from 'inquirer';
import path from 'path';
import http from 'http';
import program from 'commander';
import finalhandler from 'finalhandler';
import serveStatic from 'serve-static';
import fonts from './fonts';
import localtunnel from 'localtunnel';
import createImage from './imagemagick';
import * as validators from './validators';
import * as questions from './question';
import emojipacks from 'emojipacks';

// setup help
program
  .version('0.1.0')
  .option('-s --slack', 'Create image and upload to slack')
  .parse(process.argv);

const isUploadToSlack = program.slack === true;

const upload = (filePath) => {
  if (isUploadToSlack) {
    inquirer.prompt(questions.slackTeamQuestions)
      .then((slackAnswer) => {
        const {
          teamDomain,
          userMail,
          userPassword,
          emojiName
        } = slackAnswer;
        // invoke static local file server
        const serve = serveStatic(path.dirname(filePath));
        const server = http.createServer((req, res) => {
          serve(req, res, finalhandler(req, res));
        });
        server.listen(5000);
        localtunnel(5000, (error, tunnel) => {
          if (error) {
            console.log('Error!');
            return;
          }
          emojipacks.upload(teamDomain, userMail, userPassword, [{
            src: `${tunnel.url}/${path.basename(filePath)}`,
            name: emojiName
          }])
            .then(() => process.exit(0));
        });
      });
  }
};

inquirer.prompt(questions.defaultQuestions)
  .then((answer) => {
    inquirer.prompt([questions.fontSelectionModeQuestion])
      .then((fontSelection) => {
        const question = questions.fontSelectionQuestions[fontSelection.fontSelectionType];
        if (question.length > 0) {
          inquirer.prompt(question)
            .then((fontNameAnswer) => {
              if (fontNameAnswer.fontNameInitial) {
                inquirer.prompt(questions.selectFontByInitialQuestion(fontNameAnswer.fontNameInitial))
                  .then((fontNameAnswerByInitial) => {
                    createImage(
                      Object.assign({}, {font: fonts.availables.find(f => f.name === fontNameAnswerByInitial.fontName)}, answer)
                    ).then(upload);
                  });
              } else {
                createImage(
                  Object.assign({}, {font: fonts.availables.find(f => f.name === fontNameAnswer.fontName)}, answer)
                ).then(upload);
              }
            });
        } else {
          createImage(answer).then(upload);
        }
      })
  });
