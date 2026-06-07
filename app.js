async function loadProducts(){

    const response = await fetch("./data/data.json");

    const data = await response.json();

    const productsContainer =
        document.getElementById("products");

    productsContainer.innerHTML =
        data.PRODUCTS.map(product => `

        <div class="card">

            <img src="${product.image_url}">

            <div class="card-content">

                <h3>${product.product_name}</h3>

                <p>${product.brand}</p>

                <div class="price">
                    ${Number(product.sale_price).toLocaleString()}đ
                </div>

                <a
                    class="buy-btn"
                    href="${product.affiliate_link}"
                    target="_blank">

                    XEM GIÁ

                </a>

            </div>

        </div>

    `).join("");

}

loadProducts();
