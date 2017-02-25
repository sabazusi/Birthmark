import fontManager from 'font-manager';

const availableFonts = fontManager.getAvailableFontsSync()
  .map((font) => {
    return {
      name: font.postscriptName,
      path: font.path
    }
  });

const rangedStartsWith = (target, range) => {
  return range.some(p => target.name.toUpperCase().startsWith(p.toUpperCase()));
};

const allocate = (fonts) => {
  const allocated = {
    'a-c': [],
    'd-f': [],
    'g-i': [],
    'j-l': [],
    'm-o': [],
    'p-r': [],
    's-u': [],
    'v-z': [],
    'others': []
  };
  fonts.forEach(f => {
    if (rangedStartsWith(f, ['a', 'b', 'c'])) {
      allocated['a-c'].push(f);
    } else if (rangedStartsWith(f, ['d', 'e', 'f'])) {
      allocated['d-f'].push(f);
    } else if (rangedStartsWith(f, ['g', 'h', 'i'])) {
      allocated['g-i'].push(f);
    } else if (rangedStartsWith(f, ['j', 'k', 'l'])) {
      allocated['j-l'].push(f);
    } else if (rangedStartsWith(f, ['m', 'n', 'o'])) {
      allocated['m-o'].push(f);
    } else if (rangedStartsWith(f, ['p', 'q', 'r'])) {
      allocated['p-r'].push(f);
    } else if (rangedStartsWith(f, ['s', 't', 'u'])) {
      allocated['s-u'].push(f);
    } else if (rangedStartsWith(f, ['v', 'w', 'x', 'y', 'z'])) {
      allocated['v-z'].push(f);
    } else {
      allocated['others'].push(f);
    }
  });
  return allocated;
};

const font = {
  availables: availableFonts,
  allocated: allocate(availableFonts)
};

export default font;
