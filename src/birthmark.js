#!/usr/bin/env node

import im from 'imagemagick';
import inquirer from 'inquirer';
import program from 'commander';
import fonts from './fonts';
import * as validators from './validators';

// setup help
program
  .version('0.1.0')
  .option('-s --slack', 'Create image and upload to slack')
  .parse(process.argv);

const isUploadToSlack = program.slack === true;

const hasMultibyteCharacter = (str) => str.match(/^[\u30A0-\u30FF]+$/) === null;

const createImageMagickParams = (params) => {
  const {
    outputFileName,
    outputFileType,
    fontName,
    imageSize,
    embedText,
    textColor,
    backgroundColor
  } = params;
  return {
    font: fonts.availables.find(f => f.name === fontName).path,
    background: backgroundColor,
    fill: textColor,
    size: imageSize,
    gravity: 'center',
    label: embedText,
    output: `${outputFileName}.${outputFileType}`
  };
};

/**
 * type: create image with strings
 */
const createImageQuestions = [
  {
    type: 'input',
    name: 'outputFileName',
    message: 'Input new image file name',
    validate: validators.empty
  },
  {
    type: 'input',
    name: 'imageSize',
    message: 'Input image size',
    default: '128x128',
    validate: validators.imageSize
  },
  {
    type: 'list',
    name: 'outputFileType',
    message: 'Select image file type',
    choices: ['jpg', 'png']
  },
  {
    type: 'input',
    name: 'embedText',
    message: 'Input string that embed in image',
    validate: validators.empty
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Input text color code for image',
    default: '#000000'
  },
  {
    type: 'input',
    name: 'backgroundColor',
    message: 'Input background color code for image',
    default: '#ffffff'
  },
  {
    type: 'input',
    name: 'fontName',
    message: 'Input font name for text',
    default: 'Osaka',
    validate: validators.font
  }
];

inquirer.prompt(createImageQuestions)
  .then((answer) => createImageMagickParams(answer))
  .then((answerObj) => {
    let params = [];
    let output = '';
    Object.keys(answerObj).forEach((key) => {
      if (key === 'label') {
        params.push(`label:${answerObj[key]}`);
      } else if(key === 'output') {
        output = answerObj[key];
      } else {
        params.push(`-${key}`);
        params.push(answerObj[key]);
      }
    });
    if (!output) {
      console.log('Error: no output file name...');
    } else {
      params.push(output);
      im.convert(params, (err, stdout) => {
        if (err) {
          console.log(err);
        } else {
          console.log('ok_woman');
        }
      });
    }
  });
