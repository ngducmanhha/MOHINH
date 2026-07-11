async function loadGuidePage(){
  try{
    const response=await fetch("./data/data.json?t="+Date.now());
    if(!response.ok) throw new Error("Không thể tải data.json");

    SITE_DATA=await response.json();
    SITE_CONFIG=rowsToObject(SITE_DATA.CONFIG);
    SITE_EVENT=rowsToObject(SITE_DATA.EVENT);

    const guides=(SITE_DATA.GUIDE||[]).filter(item=>item.active===true);

    document.getElementById("app").innerHTML=`
      ${renderHeader()}
      ${renderNavigation()}

      <main class="guide-page">
        <h2>HƯỚNG DẪN</h2>

        <div class="guide-list">
          ${guides.map(item=>`
            <article class="guide-card">
              <h3>${item.title||""}</h3>
              ${item.description?`<p>${item.description}</p>`:""}
              ${item.video_url?`
                <a class="buy-btn" href="${item.video_url}" target="_blank" rel="noopener noreferrer">
                  ▶ XEM HƯỚNG DẪN
                </a>
              `:""}
            </article>
          `).join("")}
        </div>
      </main>
    `;
  }catch(error){
    showLoadError(error);
  }
}

document.addEventListener("DOMContentLoaded",loadGuidePage);
