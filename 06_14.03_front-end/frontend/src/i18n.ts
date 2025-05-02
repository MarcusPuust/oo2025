import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "nav": {
        "brand-name": "Webshop",
        "cart": " To Cart",
        "arrays": " Arrays view",
        "orders": " Your Orders",
        "map": " Our shops"
      },
      "home": {
        "all-categories": "All categories"
      }
    }
  },
  et: {
    translation: {
      "nav": {
        "brand-name": "Veebipood",
        "cart": " Ostukorv",
        "arrays": " Tsüklite vaade",
        "orders": " Sinu Tellimused",
        "map": " Meie poed"
      },
      "home": {
        "all-categories": "Kõik kategooriad"
      }
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "et", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;