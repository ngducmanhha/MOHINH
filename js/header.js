function getZaloLink(){
  const link=String(SITE_CONFIG.zalo_link||"").trim();
  if(!link) return "#";
  if(link.startsWith("http://")||link.startsWith("https://")) return link;
  return "https://"+link;
}

function renderHeader(){
  return `
    <header class="header">
    
     <a href="index.html" class="logo">
  <div class="logo-mark">
    <img src="https://cdn-icons-png.flaticon.com/512/6143/6143353.png" alt="logo">
  </div>

  <div class="logo-text">
    <h1>TRẠM DEAL GIÁ ĐÁY</h1>
    <p>${SITE_CONFIG.page_title||"MẠNH HÀ MÊ CHƠI ĐỒ"}</p>
  </div>
</a>

      <div class="header-actions">
        <span class="support-text">HỖ TRỢ 24/24</span>

        <a class="icon-btn" href="${getZaloLink()}" target="_blank" rel="noopener noreferrer">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/120px-Icon_of_Zalo.svg.png" alt="zalo">
        </a>
      </div>
    </header>
  `;
}

function renderHero(){

  const today = new Date();

  const banners = (SITE_DATA.CAROUSEL || [])
    .filter(item => {

      const start = new Date(item.start_date);
      const end = new Date(item.end_date);

      return today >= start && today <= end;

    })
    .sort((a,b)=>Number(a.id)-Number(b.id));

  if(!banners.length) return "";

  return `

    <section class="hero">

      <div class="hero-slider">

        ${banners.map((item,index)=>`

          <a
            class="hero-slide ${index===0?"active":""}"
            href="${item.link}"
            target="_blank"
            rel="noopener noreferrer">

            <img
              src="${item.img_url}"
              alt="${item.title}">

          </a>

        `).join("")}

      </div>

      <div class="hero-dots">

        ${banners.map((item,index)=>`

          <span
            class="hero-dot ${index===0?"active":""}"
            data-index="${index}">
          </span>

        `).join("")}

      </div>

    </section>

  `;

}
document.addEventListener("DOMContentLoaded",()=>{

    let current=0;

    setInterval(()=>{

        const slides=document.querySelectorAll(".hero-slide");
        const dots=document.querySelectorAll(".hero-dot");

        if(slides.length<=1) return;

        slides[current].classList.remove("active");
        dots[current].classList.remove("active");

        current++;

        if(current>=slides.length){

            current=0;

        }

        slides[current].classList.add("active");
        dots[current].classList.add("active");

    },4000);

});
