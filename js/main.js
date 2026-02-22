const enBtn = document.getElementById("en");
const myBtn = document.getElementById("my");

const heroTitle = document.getElementById("hero-title");
const heroDesc = document.getElementById("hero-desc");

enBtn.addEventListener("click", () => {
  enBtn.classList.add("active");
  myBtn.classList.remove("active");

  heroTitle.textContent = "Stop Managing Orders Manually.";
  heroDesc.textContent =
    "We build modern digital systems that help small businesses automate orders.";
});

myBtn.addEventListener("click", () => {
  myBtn.classList.add("active");
  enBtn.classList.remove("active");

  heroTitle.textContent = "Berhenti Urus Tempahan Secara Manual.";
  heroDesc.textContent =
    "Kami bina sistem digital moden untuk bantu bisnes kecil automasikan tempahan.";
});