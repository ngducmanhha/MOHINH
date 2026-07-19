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
        HÃY CHỌN VOUCHER TỐT NHẤT TRONG MỤC "SHOPEE VOUCHER"
      </div>

      <section class="products" id="products"></section>

      ${renderFooter()}
    `;

    renderProducts();
    bindFilters();
    document
.querySelectorAll('input[name="viewMode"]')
.forEach(item=>{

    item.onchange=function(){

        VIEW_MODE=this.value;

        renderProducts();

    };

});
  }
  catch(error){
    showLoadError(error);
  }
}

document.addEventListener("DOMContentLoaded",loadSite);
renderFloatingButtons();
