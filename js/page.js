function renderPage(){
  document.getElementById("app").innerHTML=`
    ${renderHeader()}
    ${renderHero()}
    ${renderSearch()}
    ${renderNavigation()}
    ${renderFilterTabs()}

    <div class="price-note">
      GIÁ THỰC TẾ ĐÔI KHI CÒN THẤP HƠN, ĐẶC BIỆT KHI CÓ XU HOẶC VIP
    </div>

    <section class="products" id="products"></section>
  `;

  renderProducts();
  bindFilters();
}

async function loadSite(){
  try{
    await loadData();
    renderPage();
  }catch(error){
    showLoadError(error);
  }
}

document.addEventListener("DOMContentLoaded",loadSite);
