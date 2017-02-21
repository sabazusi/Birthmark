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
    imageSize,
    embedText,
    textColor,
    backgroundColor
  } = params;
  return {
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
  }
];

const fontSelectionModeQuestion = [
  {
    type: 'list',
    name: 'fontSelectionType',
    message: 'Select font name selection method',
    choices: [
      'Use default font by imagemagick',
      'Input font name directly',
      'Select font from available fonts list'
    ]
  }
];

const fontSelectionQuestions = {
  'Use default font by imagemagick': [
  ],
  'Input font name directly': [
    {
      type: 'input',
      name: 'fontName',
      message: 'Input font name',
      validate: validators.font
    }
  ],
  'Select font from available fonts list': [
  ]
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

inquirer.prompt(createImageQuestions)
  .then((answer) => {
    inquirer.prompt(fontSelectionModeQuestion)
      .then((fontSelection) => {
        const question = fontSelectionQuestions[fontSelection.fontSelectionType];
        if (question.length > 0) {
          inquirer.prompt(question)
            .then((fontNameAnswer) => {
              createImage(
                Object.assign({}, {font: fontNameAnswer.fontName}, createImageMagickParams(answer))
              );
            });
        } else {
          createImage(createImageMagickParams(answer));
        }
      })
  });
