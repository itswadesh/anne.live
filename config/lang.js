// import en from '../lang/en-US.js'
// import fr from '../lang/fr-FR.js'
// import es from '../lang/es-ES.js'
import hi from '../lang/hi.json'
import he from '../lang/he.json'
import { numberFormats } from '../lang/numberFormats'
import { dateTimeFormats } from '../lang/dateTimeFormats'
export const I18N = {
  locales: [
    { code: 'he', name: 'עברית', dir: 'rtl', iso: 'ar-SA' },
    { code: 'hi', name: 'Hindi', dir: 'ltr', iso: 'hi' },
    { code: 'en', name: 'English', dir: 'ltr', iso: 'en-US' },
    // {
    //   code: 'fr',
    //   iso: 'fr-FR',
    //   name: 'Français',
    //   dir: 'ltr',
    // },
    // {
    //   code: 'es',
    //   iso: 'es-ES',
    //   name: 'Español',
    //   dir: 'ltr',
    // },
  ],
  defaultLocale: 'en',
  numberFormats,
  dateTimeFormats,
  routes: {
    about: {
      fr: '/a-propos',
      en: '/about-us',
    },
    posts: {
      fr: '/articles',
    },
    'post/_id': {
      fr: '/article/:id?',
      es: '/articulo/:id?',
    },
    'dynamicNested/_category': {
      fr: 'imbrication-dynamique/:category',
    },
  },
  vueI18n: {
    fallbackLocale: 'en',
    messages: { he, hi },
  },
}
