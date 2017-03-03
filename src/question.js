import * as validators from './validators';
import fonts from './fonts';

export const defaultQuestions = [
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

export const fontSelectionQuestions = {
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
    {
      type: 'list',
      name: 'fontName',
      message: 'Select font',
      choices: fonts.availables.map(f => f.name).sort()
    }
  ],
  'Select font from available fonts list with initial character': [
    {
      type: 'list',
      name: 'fontNameInitial',
      message: 'Select font initial character',
      choices: Object.keys(fonts.allocated)
    }
  ]
};

export const selectFontByInitialQuestion = (initial) => {
  return {
    type: 'list',
    name: 'fontName',
    message: 'Select font',
    choices: fonts.allocated[initial].map(f => f.name).sort()
  }
};

export const fontSelectionModeQuestion = {
  type: 'list',
  name: 'fontSelectionType',
  message: 'Select font name selection method',
  choices: [
    'Use default font by imagemagick',
    'Input font name directly',
    'Select font from available fonts list',
    'Select font from available fonts list with initial character'
  ]
};

export const slackTeamQuestions = [
  {
    type: 'input',
    name: 'slackTeamDomain',
    message: 'Input your slack domain name(e.g. hoge.slack.com => input \'hoge\')',
    validate: validators.empty
  },
  {
    type: 'input',
    name: 'slackUserMail',
    message: 'Input email address for your slack account',
    validate: validators.empty
  },
  {
    type: 'input',
    name: 'slackUserPassword',
    message: 'Input password for your slack account',
    validate: validators.empty
  }
];
