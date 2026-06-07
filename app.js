async function loadSite(){

```
try{

    const response =
    await fetch(
        "./data/data.json?t="+Date.now()
    );

    const data =
    await response.json();

    const config = {};

    data.CONFIG.forEach(item=>{

        config[item.key] =
        item.value;

    });

    const event = {};

    data.EVENT.forEach(item=>{

        event[item.key] =
        item.value;

    });

    let products =
    data.PRODUCTS || [];

    products =
    products.filter(
        p => p.active === true
    );

    const html = `

    <header class="header">

        <div>

            <div class="logo-title">

                ${config.page_title}

            </div>

            <div class="logo-sub">

                TRẠM DEAL GIÁ ĐÁY

            </div>

        </div>

        <div class="header-links">

            <a
            class="header-link"
            href="https://${config.zalo_link}"
            target="_blank">

            💬

            </a>

            <a
            class="header-link"
            href="#">

            🛒

            </a>

        </div>

    </header>

    <section class="hero">

        <div class="hero-box">

            <div class="hero-title">

                ${event.hero_title}

            </div>

            <div class="hero-sub">

                ${event.hero_subtitle}

            </div>

            <a
            class="hero-btn"
            href="${event.form_link}"
            target="_blank">

                ${event.button_text}

            </a>

        </div>

    </section>

    <div class="tabs">

        <button class="tab active">
            DEAL SỐC
        </button>

        <button class="tab">
            SP HOT
        </button>

        <button class="tab">
            PRE-ORDER
        </button>

        <button class="tab">
            IN ERA
        </button>

        <button class="tab">
            MOTOR NUCLEAR
        </button>

        <button class="tab">
            SNAA
        </button>

    </div>

    <section class="products">

    ${products.map(product=>`

        <div class="card">

            <div class="image-wrap">

                ${
                product.hot
                ?
                `<div class="badge">
                HOT
                </div>`
                :
                ""
                }

                <img
                src="${product.image_url}"
                loading="lazy">

            </div>

            <div class="card-content">

                <div class="brand">

                    ${product.brand}

                </div>

                <div class="name">

                    ${product.product_name}

                </div>

                <div class="old-price">

                    ${Number(
                    product.original_price || 0
                    ).toLocaleString()}đ

                </div>

                <div class="sale-price">

                    ${Number(
                    product.sale_price || 0
                    ).toLocaleString()}đ

                </div>

                <div class="stock">

                    ${product.stock_text || ""}

                </div>

                <a
                class="buy-btn"
                href="${product.affiliate_link}"
                target="_blank">

                XEM GIÁ ĐÁY

                </a>

            </div>

        </div>

    `).join("")}

    </section>

    `;

    document
    .getElementById("app")
    .innerHTML = html;

}
catch(error){

    document.body.innerHTML =
    `<div style="padding:20px">
        ${error.message}
    </div>`;

}
```

}

document.addEventListener(
"DOMContentLoaded",
loadSite
);
