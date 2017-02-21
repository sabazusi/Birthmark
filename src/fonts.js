import fontManager from 'font-manager';

const availableFonts = fontManager.getAvailableFontsSync()
  .map((font) => {
    return {
      name: font.postscriptName,
      path: font.path
    }
  });

const font = {
  availables: availableFonts
};

export default font;
