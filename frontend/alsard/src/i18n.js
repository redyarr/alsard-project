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
        searchPlaceholder: "Search by employee name or department...",
        noUsers: "No Users Found",
        noItems: "No Items Found",
        noReservedItem:"No Reserved Items Found",
        name: "Name",
        email: "Email",
        phone: "Phone",
        employeeId: "Employee ID",
        department: "Department",
        position: "Position",
        description: "Description",
        category: "Category",
        model: "Model",
        tagId: "Tag ID",
        company: "Company",
        subLocation: "Sub Location",
        reserved: "Reserved",
        cancel:"Cancel",
        save: "Save",
        noReservedItem:"No Reserved Items Found",
        personalInformation: "Personal Information",
        itemsInformation: "Items Information",
        reservedBy: "Reserved By",
        print: "Print",
        reserveAnItem: "Reserve an Item",
        ReserveButton: "Reserve",
        selectEmployee: "Select an Employee...",
        selectItem: "Select an Item...",
        login:"Log in",
        notFound:"Page Not Found",
        notFoundMessage:"Sorry, we couldn’t find the page you’re looking for.",
        backToHome:"Go back Home",
        loading:"Loading...",
        signInToYourAccount: "Sign in to your account",
        userName: "User Name",
        password: "Password",
        note:"This Username and Password is belong to the Manager",
        thisItemsIsNotReserved:"This Item is not Reserved"
      }
    }
  },
  ku: {
    translation: {
      navbar: {
        home: "سەرەتا",
        employees: "کارمەندەکان",
        addEmployees: "زیادکردنی کارمەند",
        items: "کاڵاکان",
        addItems: "زیادکردنی کاڵا",
        reservedItems: "کاڵا حیجز کراوەکان",
        addReservedItems: "حیجز کردنی کاڵا",
        admin: "بەڕێوبەر",
        login: "چوونە ژوورەوە",
        logout: "دەرچوون",
      },
      home: {
        searchPlaceholder: "گەڕان بە ناوی کارمەند یان بەش...",
        noUsers: "هیچ کارمەندێک نەدۆزرایەوە",
        noItems: "هیچ کاڵایەک نەدۆزرایەوە",
        noReservedItem:"هیچ کاڵایەکی حیجزکراو نەدۆزرایەوە",
        name: "ناو",
        email: "ئیمەیڵ",
        phone: "ژمارەی تەلەفۆن",
        employeeId: "ناسنامەی کارمەند",
        department: "بەش",
        position: "پۆست",
        description: "وەسف",
        category: "پۆل",
        model: "مۆدێل",
        tagId: "کاڵا ID",
        company: "کۆمپانیا",
        subLocation: "ناوچەی لاوەکی",
        reserved: "حیجزکراو",
        cancel:"پاشگەزبوونەوە",
        save: "بڕانەوە",
        personalInformation: "زانیاری کەسی",
        itemsInformation: "زانیاری کاڵا",
        reservedBy: "حیجزکراو لەلایەن",
        print: "پرینت",
        reserveAnItem: "کاڵایەک حیجز بکە",
        ReserveButton: "حیجز بکە",
        selectEmployee: "...کارمەدنێک دیاری بکە",
        selectItem: "...کاڵایەک دیاری بکە",
        login:"جونە ژورەوە",
        notFound:"نەدۆزرایەوە",
        notFoundMessage:'ببورە، نەمانتوانی ئەو پەیجە بدۆزینەوە کە بۆی دەگەڕییت',
        backToHome:"بگەڕێرەوە بۆ سەرەتا",
        loading:"چاوەڕوانبە...",
        signInToYourAccount:"چوونە ژوورەوە بۆ ئەکاونتەکەت",
        userName:"ناوی بەکارهێنەر",
        password:"وشەی نهێنی",
        note:"ئەم ناوی بەکارهێنەر و وشەی نهێنییە سەر بە بەڕێوەبەرە",
        thisItemsIsNotReserved:"ئەم کاڵایەک حیجز نەکراوە"
      }
    }
  }
};
const storedLanguage = localStorage.getItem('language') || 'en';

if (storedLanguage === 'ku') {
  document.body.classList.add('rtl');
} else {
  document.body.classList.remove('rtl');
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLanguage,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
