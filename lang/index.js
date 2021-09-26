import hi from 'hi.json'
import he from 'he.json'
import { numberFormats } from './numberFormats'
import { dateTimeFormats } from './dateTimeFormats'
export default {
  locale: 'en',
  fallbackLocale: 'en',
  numberFormats,
  dateTimeFormats,
  messages: { hi, he },
}
