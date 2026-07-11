function getProductBadge(product){
  const text=textUpper(product.stock_text);

  if(text.includes("NEW")){
    return `<div class="badge badge-new">🆕 NEW</div>`;
  }

  if(isLowStock(product)){
    return `<div class="badge badge-low">🚨 SẮP CHÁY</div>`;
  }

  if(product.hot===true){
    return `<div class="badge badge-hot">🔥 HOT</div>`;
  }

  return "";
}

function getSalePrice(product){
  return `
    ${!isPreOrder(product)?'<span class="price-label">Khoảng</span>':""}
    ${product.sale_price||""}
  `;
}

function getBuyButtonText(product){
  return isPreOrder(product)?"GIỮ SUẤT NGAY":"🛒 XEM GIÁ ĐÁY";
}

function renderProductCard(product){
  return `
    <a class="card-link" href="${product.affiliate_link||"#"}" target="_blank" rel="noopener noreferrer">
      <div class="card">
        <div class="image-wrap">
          ${getProductBadge(product)}
          <img src="${product.image_url||""}" alt="${product.product_name||""}" loading="lazy">
        </div>

        <div class="card-content">
          <div class="brand">${product.brand||""}</div>
          <div class="name">${product.product_name||""}</div>

          ${product.description?`
            <div class="description">${product.description}</div>
          `:""}

          <div class="old-price">${money(product.original_price)}đ</div>
          <div class="sale-price">${getSalePrice(product)}</div>
          <div class="buy-btn">${getBuyButtonText(product)}</div>
        </div>
      </div>
    </a>
  `;
}

function renderProducts(){
  const container=document.getElementById("products");
  if(!container) return;

  container.innerHTML=getFilteredProducts()
    .map(renderProductCard)
    .join("");
}
