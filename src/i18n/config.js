// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import es from './es.json';
import ar from './ar.json';
import he from './he.json';

i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next)  // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      ar: { translation: ar },
      he: { translation: he },
      // Add more languages here
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already does escaping
    },
  });

export default i18n;