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
    heroDesc: "Kami bina sistem digital moden untuk bantu bisnes kecil autokan tempahan.",
    navHome: "Utama",
    navTemplates: "Template",
    navPricing: "Harga"
  }
};

function setLanguage(lang) {
  const enText = {
    heroTitle: "Stop Managing Orders Manually.",
    heroDesc: "We build modern digital systems that help small businesses automate orders."
  };

  const bmText = {
    heroTitle: "Berhenti Urus Order Secara Manual.",
    heroDesc: "Kami bina sistem digital moden untuk bantu bisnes kecil automasikan tempahan."
  };

  const content = lang === "bm" ? bmText : enText;

  document.querySelector(".hero h1").textContent = content.heroTitle;
  document.querySelector(".hero p").textContent = content.heroDesc;
}

function initLanguage() {
  const savedLang = localStorage.getItem("language") || "en";
  setLanguage(savedLang);
}

document.addEventListener("DOMContentLoaded", initLanguage);