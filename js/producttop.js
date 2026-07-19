function renderProducts(){

  const container =
  document.getElementById("products");

  if(!container) return;

  // Danh sách TOP trong PRODUCT2
  const topList =
    DATA.PRODUCT2
      .filter(p => Number(p[TOP_TYPE]) > 0)
      .sort((a,b) => Number(a[TOP_TYPE]) - Number(b[TOP_TYPE]));

  // Bảng xếp hạng theo product_id
  const rankMap = {};

  topList.forEach(item=>{
    rankMap[item.product_id]=Number(item[TOP_TYPE]);
  });

  // Lấy tất cả shop của các sản phẩm thuộc TOP
  let products =
    DATA.PRODUCT.filter(product=>
      rankMap[product.product_id]
    );

  // Nếu đang bật "Chỉ hiện rẻ nhất"
  if(window.SHOW_ONLY_BEST){

    products =
      products.filter(product=>
        Number(product.is_best)===1
      );

  }

  // Sắp xếp theo thứ hạng TOP
  products.sort((a,b)=>
    rankMap[a.product_id]-rankMap[b.product_id]
  );

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
          ${renderBestPriceBadge(product)}
          ${renderLowStockBadge(product)}

          <img
            src="${product.image_url || ""}"
            alt="${product.product_name || ""}"
            loading="lazy"
          >

        </div>

        <div class="card-content">

          <div class="brand">
            ${product.shop || ""}
          </div>

          <div class="name">
            ${product.product_name || ""}
          </div>

          ${product.description ? `
            <div class="description">
              ${product.description}
            </div>
          ` : ""}

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
