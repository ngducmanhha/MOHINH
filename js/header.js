function getZaloLink(){
  const link=String(SITE_CONFIG.zalo_link||"").trim();
  if(!link) return "#";
  if(link.startsWith("http://")||link.startsWith("https://")) return link;
  return "https://"+link;
}

function renderHeader(){
  return `
    <header class="header">
      <div class="logo">
        <div class="logo-mark">
          <img src="https://cdn-icons-png.flaticon.com/512/6143/6143353.png" alt="logo">
        </div>

        <div class="logo-text">
          <h1>TRẠM DEAL GIÁ ĐÁY</h1>
          <p>${SITE_CONFIG.page_title||"MẠNH HÀ MÊ CHƠI ĐỒ"}</p>
        </div>
      </div>

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
  return `
    <section class="hero">
      <div class="hero-box">
        <div class="hero-title">${SITE_EVENT.hero_title||""}</div>
        <div class="hero-sub">${SITE_EVENT.hero_subtitle||""}</div>
        <div class="hero-btn">href="${SITE_EVENT.form_link || "#"}"🎁 ${SITE_EVENT.button_text||""}</div>
      </div>
    </section>
  `;
}
