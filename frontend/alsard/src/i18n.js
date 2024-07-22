import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
      translation: {
        navbar: {
          home: "Home",
          employees: "Employees",
          addEmployees: "Add Employees",
          items: "Items",
          addItems: "Add Items",
          reservedItems: "Reserved Items",
          addReservedItems: "Add Reserved Items",
          admin: "Admin",
          login: "Log In",
          logout: "Log Out",
        },
        home: {
          searchPlaceholder: "Search by name...",
          noUsers: "No users found",
          users: "Users",
          noItems: "No items found",
          items: "Items",
        }
      }
    },
    ku: {
      translation: {
        navbar: {
          home: "سەرەتا",
          employees: "کارمەندەکان",
          addEmployees: "زیادکردنی کارمەند",
          items: "کەرەستەکان",
          addItems: "زیادکردنی کەرەستە",
          reservedItems: "کەرەستە پاشەکەوتکراوەکان",
          addReservedItems: "زیادکردنی کەرەستە پاشەکەوتکراوەکان",
          admin: "بەڕێوەبەر",
          login: "چوونەژورەوە",
          logout: "دەرچوون",
        },
        home: {
          searchPlaceholder: "بگەڕێ بە ناو...",
          noUsers: "هیچ کارمەندێک نەدۆزرایەوە",
          users: "کارمەندەکان",
          noItems: "هیچ کەرەستەیەک نەدۆزرایەوە",
          items: "کەرەستەکان",
        }
      }
    }
  };


  i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;