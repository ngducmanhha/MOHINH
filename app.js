async function loadSite(){

    const response =
        await fetch("./data/data.json");

    const data =
        await response.json();

    const config = {};

    data.CONFIG.forEach(item=>{
        config[item.key]=item.value;
    });

    const event = {};

    data.EVENT.forEach(item=>{
        event[item.key]=item.value;
    });

    document.title =
        config.page_title;

    const products =
        data.PRODUCTS.filter(
            p=>p.active
        );

    const html = `

    <section class="hero">

        <div class="hero-card">

            <h1 class="hero-title">
                ${config.page_title}
            </h1>

            <p class="hero-sub">
                ${event.hero_title}
            </p>

            <p class="hero-sub">
                ${event.hero_subtitle}
            </p>

            <a
                href="${event.form_link}"
                target="_blank"
                class="hero-btn">

                ${event.button_text}

            </a>

        </div>

    </section>

    <section class="section">

        <div class="section-title">
            Deal hôm nay
        </div>

        <div class="filter-row">

            <button
                class="filter-btn active">

                Trending

            </button>

            <button
                class="filter-btn">

                Giá đáy

            </button>

            <button
                class="filter-btn">

                IN ERA

            </button>

        </div>

        <div class="products">

            ${products.map(product=>`

                <div class="card">

                    <div class="card-image">

                        ${
                            product.hot
                            ? `<div class="badge">
                                HOT
                               </div>`
                            : ""
                        }

                        <img
                          src="${product.image_url}"
                        >

                    </div>

                    <div class="card-content">

                        <div class="brand">
                            ${product.brand}
                        </div>

                        <div class="product-name">
                            ${product.product_name}
                        </div>

                        <div class="old-price">
                            ${Number(
                              product.original_price
                            ).toLocaleString()}đ
                        </div>

                        <div class="sale-price">
                            ${Number(
                              product.sale_price
                            ).toLocaleString()}đ
                        </div>

                        <div class="stock">
                            ${product.stock_text}
                        </div>

                        <a
                           href="${product.affiliate_link}"
                           target="_blank"
                           class="buy-btn">

                           XEM GIÁ ĐÁY

                        </a>

                    </div>

                </div>

            `).join("")}

        </div>

    </section>

    `;

    document.getElementById("app")
        .innerHTML = html;

}

loadSite();
