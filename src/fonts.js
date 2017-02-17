import fontManager from 'font-manager';

const availableFonts = fontManager.getAvailableFontsSync()
  .map((font) => {
    return {
      name: font.postscriptName,
      path: font.path
    }
  });

const getSuggestion = () => {
};

const font = {
  suggested: getSuggestion(),
  availables: availableFonts
};

export default font;
