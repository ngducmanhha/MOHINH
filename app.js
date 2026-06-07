async function loadSite() {

    try {

        const response = await fetch("./data/data.json?t=" + Date.now());

        if (!response.ok) {
            throw new Error(
                "Không tải được data.json"
            );
        }

        const data = await response.json();

        const CONFIG = Array.isArray(data.CONFIG)
            ? data.CONFIG
            : [];

        const EVENT = Array.isArray(data.EVENT)
            ? data.EVENT
            : [];

        const PRODUCTS = Array.isArray(data.PRODUCTS)
            ? data.PRODUCTS
            : [];

        const config = {};
        CONFIG.forEach(item => {
            config[item.key] = item.value;
        });

        const event = {};
        EVENT.forEach(item => {
            event[item.key] = item.value;
        });

        document.title =
            config.page_title ||
            "Mạnh Hà Mê Chơi Đồ";

        const products = PRODUCTS.filter(
            p => p.active === true ||
                 p.active === "TRUE" ||
                 p.active === "true" ||
                 p.active === 1
        );

        const heroHTML = `
        <section class="hero">

            <div class="hero-card">

                <h1 class="hero-title">
                    ${config.page_title || ""}
                </h1>

                <p class="hero-sub">
                    ${event.hero_title || ""}
                </p>

                <p class="hero-sub">
                    ${event.hero_subtitle || ""}
                </p>

                <a
                    href="${event.form_link || "#"}"
                    target="_blank"
                    class="hero-btn">

                    ${event.button_text || "THAM GIA"}

                </a>

            </div>

        </section>
        `;

        let productHTML = "";

        products.forEach(product => {

            const originalPrice =
                Number(product.original_price || 0);

            const salePrice =
                Number(product.sale_price || 0);

            productHTML += `

            <div class="card">

                <div class="card-image">

                    ${product.hot ? `
                    <div class="badge">
                        HOT
                    </div>
                    ` : ""}

                    <img
                        loading="lazy"
                        src="${product.image_url || ""}"
                        alt="${product.product_name || ""}"
                        onerror="this.src='https://placehold.co/600x600?text=No+Image'"
                    >

                </div>

                <div class="card-content">

                    <div class="brand">
                        ${product.brand || ""}
                    </div>

                    <div class="product-name">
                        ${product.product_name || ""}
                    </div>

                    <div class="old-price">
                        ${originalPrice.toLocaleString()}đ
                    </div>

                    <div class="sale-price">
                        ${salePrice.toLocaleString()}đ
                    </div>

                    <div class="stock">
                        ${product.stock_text || ""}
                    </div>

                    <a
                        class="buy-btn"
                        href="${product.affiliate_link || "#"}"
                        target="_blank">

                        XEM GIÁ ĐÁY

                    </a>

                </div>

            </div>
            `;

        });

        const pageHTML = `
            ${heroHTML}

            <section class="section">

                <div class="section-title">
                    Deal hôm nay
                </div>

                <div class="products">
                    ${productHTML}
                </div>

            </section>
        `;

        const app =
            document.getElementById("app");

        if (!app) {
            throw new Error(
                "Không tìm thấy #app"
            );
        }

        app.innerHTML = pageHTML;

    }
    catch(error){

        console.error(error);

        document.body.innerHTML = `
            <div style="
                padding:20px;
                font-family:Arial;
                max-width:600px;
                margin:auto;
            ">

                <h2>Lỗi tải website</h2>

                <p>
                    ${error.message}
                </p>

            </div>
        `;

    }

}

document.addEventListener(
    "DOMContentLoaded",
    loadSite
);
