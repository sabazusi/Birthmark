#!/usr/bin/env node

import im from 'imagemagick';
import inquirer from 'inquirer';
import program from 'commander';
import fonts from './fonts';
import * as validators from './validators';
import Questions from './question';

// setup help
program
  .version('0.1.0')
  .option('-s --slack', 'Create image and upload to slack')
  .parse(process.argv);

const isUploadToSlack = program.slack === true;
const questions = new Questions(fonts);

const createImageMagickParams = (params) => {
  const {
    fontName,
    outputFileName,
    outputFileType,
    imageSize,
    embedText,
    textColor,
    backgroundColor
  } = params;
  const fontPath = fontName ? {font: fonts.availables.find(f => f.name === fontName).path} : {};
  return Object.assign({}, fontPath, {
    background: backgroundColor,
    fill: textColor,
    size: imageSize,
    gravity: 'center',
    label: embedText,
    output: `${outputFileName}.${outputFileType}`
  });
};


const createImage = (answer) => {
  let params = [];
  let output = '';
  Object.keys(answer).forEach((key) => {
    if (key === 'label') {
      params.push(`label:${answer[key]}`);
    } else if(key === 'output') {
      output = answer[key];
    } else {
      params.push(`-${key}`);
      params.push(answer[key]);
    }
  });
  if (!output) {
    console.log('Error: no output file name...');
  } else {
    params.push(output);
    im.convert(params, (err, stdout) => {
      if (err) {
        console.log(`Error: ${err.toString()}`);
      } else {
        console.log(`Created! -> ${answer['output']}`);
      }
    });
  }
};

inquirer.prompt(questions.getDefaultQuestions())
  .then((answer) => {
    inquirer.prompt([questions.getFontSelectionModeQuestion()])
      .then((fontSelection) => {
        const question = questions.getFontSelectionQuestions()[fontSelection.fontSelectionType];
        if (question.length > 0) {
          inquirer.prompt(question)
            .then((fontNameAnswer) => {
              if (fontNameAnswer.fontNameInitial) {
                inquirer.prompt(questions.getSelectFontByInitialQuestion(fontNameAnswer.fontNameInitial))
                  .then((fontNameAnswerByInitial) => {
                    createImage(createImageMagickParams(
                      Object.assign({}, {fontName: fontNameAnswerByInitial.fontName}, answer)
                    ));
                  });
              } else {
                createImage(createImageMagickParams(
                  Object.assign({}, {fontName: fontNameAnswer.fontName}, answer)
                ));
              }
            });
        } else {
          createImage(createImageMagickParams(answer));
        }
      })
  });
