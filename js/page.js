async function loadSite(){
  try{
    await loadData();

    document.getElementById("app").innerHTML=`
      ${renderHeader()}
      ${renderHero()}
      ${renderSearch()}
      ${renderNavigation()}
      ${renderFilters()}

      <div class="price-note">
        GIÁ THỰC TẾ ĐÔI KHI CÒN THẤP HƠN SAU KHI ÁP ĐẦY ĐỦ VOUCHER
      </div>

      <section class="products" id="products"></section>

      ${renderFooter()}
    `;

    renderProducts();
    bindFilters();
  }
  catch(error){
    showLoadError(error);
  }
}

document.addEventListener("DOMContentLoaded",loadSite);
