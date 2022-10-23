const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en', 'jp'],
    // localeDetection: false,
    // lowerCaseLng: true,
    localePath: path.resolve('./public/locales')
  },
};