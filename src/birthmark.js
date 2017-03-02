#!/usr/bin/env node

import inquirer from 'inquirer';
import program from 'commander';
import fonts from './fonts';
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

const upload = (fileName) => {
  if (isUploadToSlack || true) {
  //  emojipacks.upload();
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
