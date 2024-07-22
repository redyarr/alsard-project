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
        name: "Name",
        department: "Department",
        phone: "Phone",
        employeeId: "Employee ID",
        position: "Position",
        description: "Description",
        category: "Category",
        model: "Model",
        tagId: "Tag ID",
        company: "Company",
        subLocation: "Sub-Location",
        reserved: "Reserved",
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
        name: "ناو",
        department: "بەش",
        phone: "تەلەفۆن",
        employeeId: "ژمارەی کارمەند",
        position: "پێگە",
        description: "وەسف",
        category: "پۆل",
        model: "مودێل",
        tagId: "ژمارەی کاڵا",
        company: "کۆمپانیا",
        subLocation: "ناوچەی لاوەکی",
        reserved: "پاشەکەوتکراو",
      }
    }
  },
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
