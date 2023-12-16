import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import i18NextHttpBackend from 'i18next-http-backend'
import languageDetector from 'i18next-browser-languagedetector';

i18n
  .use(i18NextHttpBackend)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    //debug: true,
    fallbackLng: 'en', //default locale if no locale found for i18n.changeLanguage(appLocale)
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n;