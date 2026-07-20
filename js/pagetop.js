async function loadSite(){

  try{

    await loadData();

    document.getElementById("app").innerHTML=`

   ${renderHeader()}

${topInfo ? `
<div class="top-banner">

    <img
        src="${topInfo.image_url}"
        alt="${topInfo.title}"
        class="top-banner-image">

</div>
` : ""}

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
