async function loadData(){

    const response =
        await fetch("./data/data.json");

    const data =
        await response.json();

    const products =
        data.PRODUCTS || [];

    document.getElementById("products")
        .innerHTML = products.map(product => `

        <div class="card">

            <img src="${product.image_url}">

            <div class="card-content">

                <h3>${product.product_name}</h3>

                <p>${product.brand}</p>

                <div class="price">
                    ${Number(product.sale_price)
                      .toLocaleString()}đ
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

}

loadData();
