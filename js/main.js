const translations = {
  en: {
    heroTitle: "Stop Managing Orders Manually.",
    heroDesc: "We build modern digital systems that help small businesses automate orders.",
    navHome: "Home",
    navTemplates: "Templates",
    navPricing: "Pricing"
  },
  bm: {
    heroTitle: "Berhenti Urus Order Secara Manual.",
    heroDesc: "Kami bina sistem digital moden untuk bantu bisnes kecil automasikan tempahan.",
    navHome: "Utama",
    navTemplates: "Template",
    navPricing: "Harga"
  }
};

function setLanguage(lang) {
  localStorage.setItem("language", lang);

  document.querySelectorAll("[data-key]").forEach(element => {
    const key = element.getAttribute("data-key");
    if (translations[lang][key]) {
      element.innerText = translations[lang][key];
    }
  });
}

function initLanguage() {
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
}

document.addEventListener("DOMContentLoaded", initLanguage);