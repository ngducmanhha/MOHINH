fetch("./data/data.json")
.then(response => response.json())
.then(data => {

    const html = data.PRODUCTS.map(product => `
        <div class="card">

            <img src="${product.image_url}" alt="">

            <div class="card-body">

                <h3>${product.product_name}</h3>

                <p>${product.brand}</p>

                <div class="price">
                    ${Number(product.sale_price).toLocaleString()}đ
                </div>

                <a
                    href="${product.affiliate_link}"
                    target="_blank"
                    class="buy-btn">
                    XEM GIÁ
                </a>

            </div>

        </div>
    `).join("");

    document.getElementById("products").innerHTML = html;
});
