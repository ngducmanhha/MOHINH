async function loadSite(){

  try{

    await loadData();

    document.getElementById("app").innerHTML=`

      ${renderHeader()}

      ${renderViewModeOnly()}

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

document.addEventListener(
    "DOMContentLoaded",
    loadSite
);

renderFloatingButtons();
