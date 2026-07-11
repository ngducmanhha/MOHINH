function renderTopBadge(product){

  const stockText =
  textUpper(product.stock_text);


  if(product.featured === true){

    return `
      <div class="badge badge-code">
        MÃ GIẢM
      </div>
    `;

  }


  if(product.hot === true){

    return `
      <div class="badge badge-hunt">
        SĂN NGAY
      </div>
    `;

  }


  if(stockText.includes("NEW")){

    return `
      <div class="badge badge-new">
        NEW
      </div>
    `;

  }


  if(stockText.includes("PRE-ORDER")){

    return `
      <div class="badge badge-preorder">
        PRE-ORDER
      </div>
    `;

  }


  return "";

}


function renderLowStockBadge(product){

  const stockText =
  textUpper(product.stock_text);


  const showLowStock =

    product.hot === true
    ||
    product.featured === true
    ||
    stockText.includes("PRE-ORDER");


  if(!showLowStock){

    return "";

  }


  return `
    <div class="badge badge-low-stock">
      SẮP HẾT
    </div>
  `;

}


function renderProducts(){

  const container =
  document.getElementById("products");

  if(!container) return;


  const products =
  getFilteredProducts();


  container.innerHTML =

  products.map(product => `

    <a
      class="card-link"
      href="${product.affiliate_link || "#"}"
      target="_blank"
      rel="noopener noreferrer"
    >

      <div class="card">

        <div class="image-wrap">

          ${renderTopBadge(product)}

          ${renderLowStockBadge(product)}

          <img
            src="${product.image_url || ""}"
            alt="${product.product_name || ""}"
            loading="lazy"
          >

        </div>


        <div class="card-content">

          <div class="brand">
            ${product.brand || ""}
          </div>


          <div class="name">
            ${product.product_name || ""}
          </div>


          ${product.description ? `

            <div class="description">
              ${product.description}
            </div>

          ` : ""}


          <div class="old-price">

            ${money(product.original_price)}đ

          </div>


          <div class="sale-price">

            ${!isPreOrder(product)
              ? '<span class="price-label">Khoảng</span>'
              : ''
            }

            ${product.sale_price || ""}

          </div>


          <div class="buy-btn">

            ${isPreOrder(product)
              ? "GIỮ SUẤT NGAY"
              : "🛒 XEM GIÁ ĐÁY"
            }

          </div>

        </div>

      </div>

    </a>

  `).join("");

}
