async function loadSite(){
  try{
    await loadData();

    document.getElementById("app").innerHTML=`

  ${renderHeader()}
  ${window.IS_TOP_PAGE ? "" : renderHero()}
  ${window.IS_TOP_PAGE
      ? renderViewModeOnly()
      : renderSearch()
  }
  ${renderNavigation()}
  ${window.IS_TOP_PAGE
      ? ""
      : renderFilters()
  }
  ${window.IS_TOP_PAGE ? "" : `

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
