function getBrands(){
  return [...new Set(
    ALL_PRODUCTS.map(product=>textUpper(product.brand)).filter(Boolean)
  )];
}

function getProductScore(product){
  if(product.featured===true) return 300;
  if(product.hot===true) return 200;

  const brand=textUpper(product.brand);
  if(brand==="KHÁC"||brand==="KHAC") return 0;

  return 100;
}

function sortAllProducts(products){
  return products.sort((a,b)=>{
    const scoreA=getProductScore(a);
    const scoreB=getProductScore(b);

    if(scoreA!==scoreB) return scoreB-scoreA;

    const brandA=textUpper(a.brand);
    const brandB=textUpper(b.brand);

    if(brandA==="KHÁC"||brandA==="KHAC") return 1;
    if(brandB==="KHÁC"||brandB==="KHAC") return -1;

    return brandA.localeCompare(brandB,"vi");
  });
}

function getFilteredProducts(){
  let products=[...ALL_PRODUCTS];

  if(CURRENT_FILTER==="ALL"){
    products=sortAllProducts(products);
  }else if(CURRENT_FILTER==="FEATURED"){
    products=products.filter(product=>product.featured===true);
  }else if(CURRENT_FILTER==="LOWSTOCK"){
    products=products.filter(isLowStock);
  }else if(CURRENT_FILTER==="HOT"){
    products=products.filter(product=>product.hot===true);
  }else if(CURRENT_FILTER==="PREORDER"){
    products=products.filter(isPreOrder);
  }else{
    products=products.filter(product=>
      textUpper(product.brand).includes(CURRENT_FILTER)
    );
  }

  if(SEARCH_KEYWORD){
    const keyword=SEARCH_KEYWORD.toLowerCase();
    products=products.filter(product=>
      String(product.product_name||"").toLowerCase().includes(keyword)
    );
  }

  return products;
}

function renderSearch(){
  return `
    <div class="search-wrap">
      <form id="searchForm">
        <input
          type="search"
          id="searchBox"
          class="search-box"
          placeholder="🔍 Tìm tên sản phẩm..."
          enterkeyhint="search"
          autocomplete="off">
      </form>
    </div>
  `;
}

function renderFilterTabs(){
  const brands=getBrands();

  return `
    <div class="tabs">
      <button class="tab active" data-filter="ALL">⭐ TẤT CẢ</button>
      <button class="tab" data-filter="FEATURED">💥 GIẢM SỐC</button>
      <button class="tab" data-filter="LOWSTOCK">🚨 SẮP CHÁY HÀNG</button>
      <button class="tab" data-filter="HOT">🔥 ĐANG HOT</button>
      <button class="tab" data-filter="PREORDER">📦 PRE-ORDER</button>

      ${brands.map(brand=>`
        <button class="tab" data-filter="${brand}">${brand}</button>
      `).join("")}
    </div>
  `;
}

function bindFilters(){
  const searchBox=document.getElementById("searchBox");
  const searchForm=document.getElementById("searchForm");

  searchBox.addEventListener("input",function(){
    SEARCH_KEYWORD=this.value.trim();
    renderProducts();
  });

  searchForm.addEventListener("submit",function(event){
    event.preventDefault();
    SEARCH_KEYWORD=searchBox.value.trim();
    renderProducts();
    searchBox.blur();
  });

  document.querySelectorAll(".tab").forEach(tab=>{
    tab.addEventListener("click",function(){
      document.querySelectorAll(".tab").forEach(item=>item.classList.remove("active"));
      this.classList.add("active");
      CURRENT_FILTER=this.dataset.filter;
      renderProducts();
    });
  });
}
