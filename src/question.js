import * as validators from './validators';

export default class {
  constructor(fonts) {
    this.fonts = fonts;
  }

  getDefaultQuestions() {
    return [
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
  }

  getFontSelectionQuestions() {
    return {
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
          choices: this.fonts.availables.map(f => f.name).sort()
        }
      ],
      'Select font from available fonts list with initial character': [
        {
          type: 'list',
          name: 'fontNameInitial',
          message: 'Select font initial character',
          choices: Object.keys(this.fonts.allocated)
        }
      ]
    };
  }

  getSelectFontByInitialQuestion(initial) {
    return {
      type: 'list',
      name: 'fontName',
      message: 'Select font',
      choices: fonts.allocated[initial].map(f => f.name).sort()
    }
  }

  getFontSelectionModeQuestion() {
    return {
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
  }
}
