async function loadSite(){

  try{

    await loadData();

    // Lấy thông tin banner của trang TOP
    const topInfo =
      (SITE_DATA.TOP || []).find(
        item => String(item.type).trim() === String(TOP_TYPE).trim()
      );

    document.getElementById("app").innerHTML = `

      ${renderHeader()}

      ${
        topInfo ? `
          <div class="top-banner">

            <img
              src="${topInfo.image_url || ""}"
              alt="${topInfo.title || ""}"
              class="top-banner-image">

          </div>
        ` : ""
      }

      ${renderViewModeOnly()}

      <section
        class="products"
        id="products">
      </section>
<a href="index.html" class="home-bar">
    🔥 XEM THÊM DEAL KHÁC
</a>
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
