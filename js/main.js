function setLanguage(lang) {

  const enText = {
    heroTitle: "Stop Managing Orders Manually.",
    heroDesc: "We build modern digital systems that help small businesses automate orders.",
    btn1: "View Templates",
    btn2: "See Pricing"
  };

  const myText = {
    heroTitle: "Berhenti Urus Order Secara Manual.",
    heroDesc: "Kami bina sistem digital moden untuk bantu bisnes kecil automasikan tempahan.",
    btn1: "Lihat Template",
    btn2: "Lihat Harga"
  };

  const content = lang === "my" ? myText : enText;

  const title = document.querySelector(".hero h1");
  const desc = document.querySelector(".hero p");
  const btn1 = document.querySelector(".btn-primary");
  const btn2 = document.querySelector(".btn-secondary");

  title.classList.remove("show");
  desc.classList.remove("show");

  setTimeout(() => {
    title.textContent = content.heroTitle;
    desc.textContent = content.heroDesc;
    btn1.textContent = content.btn1;
    btn2.textContent = content.btn2;

    title.classList.add("show");
    desc.classList.add("show");
  }, 200);

  document.querySelectorAll(".lang-switch span").forEach(el => el.classList.remove("active"));
  document.querySelector(`[onclick="setLanguage('${lang}')"]`).classList.add("active");
}