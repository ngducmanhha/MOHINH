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
        .filter(item=>{

            const start = new Date(item.start_day || item.start_date);
            const stop  = new Date(item.stop_day || item.end_date);

            return today>=start && today<=stop;

        })
        .sort((a,b)=>Number(a.id)-Number(b.id));

    if(!banners.length) return "";

    return `

<section class="hero">

<div class="swiper heroSwiper">

<div class="swiper-wrapper">

${banners.map(item=>`

<div class="swiper-slide">

<a href="${item.link}">

<img
src="${item.img_url}"
alt="${item.title}">

</a>

</div>

`).join("")}

</div>

<div class="swiper-pagination"></div>

</div>

</section>

`;

}
document.addEventListener("DOMContentLoaded",()=>{

    const waitHero = setInterval(()=>{

        if(document.querySelector(".heroSwiper")){

            clearInterval(waitHero);

            new Swiper(".heroSwiper",{

                loop:true,

                speed:500,

                autoplay:{
                    delay:4000,
                    disableOnInteraction:false
                },

                pagination:{
                    el:".swiper-pagination",
                    clickable:true
                }

            });

        }

    },100);

});
