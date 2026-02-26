function toggleMenu(){
  document.getElementById("mobileMenu").classList.toggle("active");
}

const translations = {

  en:{

    /* NAV */
    nav_templates:"Architecture",
    nav_pricing:"Engagement",
    nav_cta:"Request Consultation",

    /* HERO */
    hero_title:"Digital Infrastructure<br>Engineered For Scale",
    hero_desc:"We architect structured booking and ordering systems that transform fragmented workflows into scalable operational infrastructure.",
    hero_btn1:"View System Architecture",
    hero_btn2:"Review Engagement Plans",

    /* CARDS */
    card1_title:"Conversion Architecture",
    card1_desc:"Strategically engineered interface structures designed to guide user behaviour and maximise measurable results.",

    card2_title:"Automation Infrastructure",
    card2_desc:"Integrated WhatsApp logic, structured data routing and automation workflows built for operational precision.",

    card3_title:"Performance Engineering",
    card3_desc:"Minimal architecture, high-speed rendering and device-optimised execution across modern platforms.",

    /* FOOTER */
    footer_text:"© 2026 Bratstvo Digital — Structured Digital Infrastructure Studio",

    /* TEMPLATES */
    booking_title:"Booking Infrastructure",
    booking_f1:"Smart date & slot selection",
    booking_f2:"Automated WhatsApp confirmation",
    booking_f3:"Structured booking summary",
    booking_f4:"Google Sheet integration",

    preorder_title:"Preorder System",
    preorder_f1:"Variant selection (Size / Color)",
    preorder_f2:"Auto order calculation",
    preorder_f3:"WhatsApp checkout integration",
    preorder_f4:"Tracking sheet automation",

    showcase_title:"Product Showcase",
    showcase_f1:"Premium catalog layout",
    showcase_f2:"Direct WhatsApp CTA buttons",
    showcase_f3:"Mobile-first structure",
    showcase_f4:"Conversion-optimised design",

    view_demo:"View Live Demo",
    implement_btn:"Initiate Implementation"
  },


  my:{

    /* NAV */
    nav_templates:"Struktur Sistem",
    nav_pricing:"Pelan Kerjasama",
    nav_cta:"Minta Konsultasi",

    /* HERO */
    hero_title:"Sistem Digital<br>Dibina Untuk Berkembang",
    hero_desc:"Kami membina sistem tempahan dan pesanan yang tersusun supaya bisnes anda lebih teratur, mudah diurus dan bersedia untuk berkembang.",
    hero_btn1:"Lihat Struktur Sistem",
    hero_btn2:"Lihat Pelan Kerjasama",

    /* CARDS */
    card1_title:"Reka Bentuk Berfokuskan Tindakan",
    card1_desc:"Susun atur laman direka untuk membantu pelanggan membuat keputusan dengan lebih cepat dan jelas.",

    card2_title:"Automasi Yang Teratur",
    card2_desc:"Integrasi WhatsApp serta sistem pengumpulan data untuk operasi yang lebih lancar dan tersusun.",

    card3_title:"Prestasi Stabil & Pantas",
    card3_desc:"Struktur ringan dan pantas supaya laman web berfungsi dengan baik di semua peranti.",

    /* FOOTER */
    footer_text:"© 2026 Bratstvo Digital — Studio Infrastruktur Digital",

    /* TEMPLATES */
    booking_title:"Sistem Tempahan",
    booking_f1:"Pilihan tarikh & masa pintar",
    booking_f2:"Pengesahan automatik melalui WhatsApp",
    booking_f3:"Ringkasan tempahan tersusun",
    booking_f4:"Integrasi Google Sheet",

    preorder_title:"Sistem Pra-Pesanan",
    preorder_f1:"Pilihan variasi (Saiz / Warna)",
    preorder_f2:"Pengiraan jumlah automatik",
    preorder_f3:"Integrasi checkout WhatsApp",
    preorder_f4:"Automasi lembaran penjejakan",

    showcase_title:"Laman Paparan Produk",
    showcase_f1:"Susun atur katalog premium",
    showcase_f2:"Butang WhatsApp terus",
    showcase_f3:"Reka bentuk fokus mobile",
    showcase_f4:"Struktur direka untuk meningkatkan jualan",

    view_demo:"Lihat Demo",
    implement_btn:"Mulakan Pelaksanaan"
  }
};


function setLang(lang){

  document.querySelectorAll("[data-key]").forEach(el=>{
    const key = el.getAttribute("data-key");

    if(translations[lang] && translations[lang][key]){
      el.innerHTML = translations[lang][key];
    }
  });

  document.getElementById("en-btn").classList.remove("active");
  document.getElementById("my-btn").classList.remove("active");
  document.getElementById(lang+"-btn").classList.add("active");
}