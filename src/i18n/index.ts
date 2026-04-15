import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "./locales/ar.json";

i18next.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "ar",
  resources: {
    ar: { translation: ar },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
