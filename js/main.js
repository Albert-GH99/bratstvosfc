const translations = {
  en: {
    heroTitle: "Stop Managing Orders Manually.",
    heroDesc: "We build modern digital systems that help small businesses automate orders."
  },
  bm: {
    heroTitle: "Berhenti Urus Order Secara Manual.",
    heroDesc: "Kami bina sistem digital moden untuk bantu bisnes kecil automasikan tempahan."
  }
};

function setLanguage(lang) {
  document.getElementById("hero-title").innerText = translations[lang].heroTitle;
  document.getElementById("hero-desc").innerText = translations[lang].heroDesc;
}