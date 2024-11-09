import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as Localiz from 'expo-localization';
import { useState } from 'react';


import es from '../assets/language/es.json'
import en from '../assets/language/en.json'
import uk from '../assets/language/uk.json'
import zh from '../assets/language/zh.json'

const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
  uk: {
    translation: uk,
  },
  zh: {
    translation: zh,
  },
};

function devLocl(){
    //let [locale, setLocale] = useState(Localiz.locale);
    return Localiz.locale
}

i18n.use(initReactI18next).init({
  resources,
  lng: devLocl(),
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false
  }
});