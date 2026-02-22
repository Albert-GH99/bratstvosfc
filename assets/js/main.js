const btnEn = document.getElementById("btn-en");
const btnMy = document.getElementById("btn-my");

if(btnEn && btnMy){

btnEn.addEventListener("click",()=>{
  switchLang("en");
});

btnMy.addEventListener("click",()=>{
  switchLang("my");
});

function switchLang(lang){

  document.querySelectorAll("[data-en]").forEach(el=>{
    el.textContent = el.getAttribute("data-"+lang);
  });

  btnEn.classList.remove("active");
  btnMy.classList.remove("active");

  if(lang==="en"){
    btnEn.classList.add("active");
  } else {
    btnMy.classList.add("active");
  }
}

}