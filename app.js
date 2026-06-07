fetch("./data/data.json")
.then(res => res.json())
.then(data => {

    const html = data.PRODUCTS.map(p => `
        <div class="card">

            <img src="${p.image_url}">

            <h3>${p.product_name}</h3>

            <p>${p.brand}</p>

            <div class="price">
                ${Number(p.sale_price).toLocaleString()}đ
            </div>

            <a href="${p.affiliate_link}">
                XEM GIÁ
            </a>

        </div>
    `).join("");

    document.getElementById("products").innerHTML = html;

});
