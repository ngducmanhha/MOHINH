let VIEW_MODE = "BEST";
function renderSearch(){

  return `
<div class="sticky-search">
    <div class="search-wrap">

      <form
        id="searchForm"
        class="search-form"
      >

        <input
          type="search"
          id="searchBox"
          class="search-box"
          placeholder="🔍 Tìm tên sản phẩm..."
          enterkeyhint="search"
          autocomplete="off"
        >

      </form>

    </div>
<div class="view-mode">

    <label class="view-option">
        <input
            type="radio"
            name="viewMode"
            value="BEST"
            checked>
        <span>🏆 Chỉ hiện rẻ nhất</span>
    </label>

    <label class="view-option">
        <input
            type="radio"
            name="viewMode"
            value="ALL">
        <span>🏪 Tất cả các shop</span>
    </label>

</div>
</div>
  `;

}


function getBrands(){

  return [

    ...new Set(

      ALL_PRODUCTS.map(product =>

        textUpper(product.brand)

      )

    )

  ].filter(Boolean);

}


function renderFilters(){

  const brands = getBrands();

  return `

    <div class="tabs">

      <button
        class="tab active"
        data-filter="ALL"
      >
        ⭐ TẤT CẢ
      </button>


      <button
        class="tab"
        data-filter="HOT"
      >
        🟢 SĂN NGAY
      </button>


      <button
        class="tab"
        data-filter="FEATURED"
      >
        🟠 MÃ GIẢM
      </button>


      <button
        class="tab"
        data-filter="LOWSTOCK"
      >
        🔴 SẮP HẾT
      </button>


      <button
        class="tab"
        data-filter="PREORDER"
      >
        🔵 PRE-ORDER
      </button>


      <button
        class="tab"
        data-filter="NEW"
      >
        🟡 NEW
      </button>


      ${brands.map(brand => `

        <button
          class="tab"
          data-filter="${brand}"
        >

          ${brand}

        </button>

      `).join("")}

    </div>

  `;

}


function getFilteredProducts(){

  let products = [...ALL_PRODUCTS];


  if(CURRENT_FILTER === "HOT"){

    products = products.filter(product =>

      product.hot === true

    );

  }


  else if(CURRENT_FILTER === "FEATURED"){

    products = products.filter(product =>

      product.featured === true

    );

  }


  else if(CURRENT_FILTER === "LOWSTOCK"){

    products = products.filter(product =>

      product.hot === true
      ||
      product.featured === true
      ||
      textUpper(product.stock_text)
        .includes("PRE-ORDER")

    );

  }


  else if(CURRENT_FILTER === "PREORDER"){

    products = products.filter(product =>

      textUpper(product.stock_text)
        .includes("PRE-ORDER")

    );

  }


  else if(CURRENT_FILTER === "NEW"){

    products = products.filter(product =>

      textUpper(product.stock_text)
        .includes("NEW")

    );

  }


  else if(CURRENT_FILTER !== "ALL"){

    products = products.filter(product =>

      textUpper(product.brand)
        .includes(CURRENT_FILTER)

    );

  }


  if(SEARCH_KEYWORD){

    const keyword =
    SEARCH_KEYWORD.toLowerCase();


    products = products.filter(product =>

      String(product.full_name || "")
        .toLowerCase()
        .includes(keyword)

    );

  }

if(VIEW_MODE === "BEST"){

    products = products.filter(product =>
        Number(product.is_best) === 1
    );

}
  return products;

}


function bindFilters(){

  const searchBox =
  document.getElementById("searchBox");

  const searchForm =
  document.getElementById("searchForm");


  if(searchBox){

    searchBox.addEventListener(
      "input",
      function(){

        SEARCH_KEYWORD =
        this.value.trim();

        renderProducts();

      }
    );

  }


  if(searchForm && searchBox){

    searchForm.addEventListener(
      "submit",
      function(event){

        event.preventDefault();

        SEARCH_KEYWORD =
        searchBox.value.trim();

        renderProducts();

        searchBox.blur();

      }
    );

  }


  document
    .querySelectorAll(".tab")
    .forEach(tab => {

      tab.addEventListener(
        "click",
        function(){

          document
            .querySelectorAll(".tab")
            .forEach(item => {

              item.classList.remove("active");

            });


          this.classList.add("active");

          CURRENT_FILTER =
          this.dataset.filter;

          renderProducts();

        }
      );

    });

}
