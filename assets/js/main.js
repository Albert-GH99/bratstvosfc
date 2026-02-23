const translations = {
  en: {
    nav_home: "Home",
    nav_templates: "Templates",
    nav_pricing: "Pricing",
    hero_title: "Digital Systems Built For Growing Businesses",
    hero_desc: "We design structured booking and ordering systems that help growing businesses operate smarter, faster and with more control.",
    btn_templates: "Explore Templates",
    btn_pricing: "View Pricing",
    built_title: "BUILT FOR"
  },
  my: {
    nav_home: "Utama",
    nav_templates: "Template",
    nav_pricing: "Harga",
    hero_title: "Sistem Digital Untuk Bisnes Yang Sedang Berkembang",
    hero_desc: "Kami bina sistem tempahan dan jualan berstruktur untuk bantu bisnes berkembang dengan lebih tersusun dan efisien.",
    btn_templates: "Lihat Template",
    btn_pricing: "Lihat Harga",
    built_title: "DIBINA UNTUK"
  }
};

const enBtn = document.getElementById("en");
const myBtn = document.getElementById("my");

function setLanguage(lang){
  document.querySelectorAll("[data-key]").forEach(el=>{
    el.textContent = translations[lang][el.getAttribute("data-key")];
  });

  enBtn.classList.remove("active");
  myBtn.classList.remove("active");

  if(lang==="en") enBtn.classList.add("active");
  else myBtn.classList.add("active");
}

enBtn.addEventListener("click", ()=>setLanguage("en"));
myBtn.addEventListener("click", ()=>setLanguage("my"));