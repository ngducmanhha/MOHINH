let ALL_PRODUCTS = [];
let CURRENT_FILTER = "ALL";

function money(v){
return Number(v || 0).toLocaleString("vi-VN");
}

function renderProducts(){

const container =
document.getElementById("products");

let products = [...ALL_PRODUCTS];

if(CURRENT_FILTER === "HOT"){
products =
products.filter(p => p.hot);
}

else if(CURRENT_FILTER !== "ALL"){

products =
products.filter(p =>
(p.brand || "")
.toUpperCase()
.includes(CURRENT_FILTER)
);

}

container.innerHTML =
products.map(product => `

<div class="card">

<div class="image-wrap">

${product.hot
? '<div class="badge">HOT</div>'
: ''}

<img
src="${product.image_url || ''}"
loading="lazy"
onerror="this.src='https://placehold.co/600x600?text=No+Image'"

>

</div>

<div class="card-content">

<div class="brand">
${product.brand || ''}
</div>

<div class="name">
${product.product_name || ''}
</div>

<div class="old-price">
${money(product.original_price)}đ
</div>

<div class="sale-price">
${money(product.sale_price)}đ
</div>

<div class="stock">
${product.stock_text || ''}
</div>

<a
class="buy-btn"
href="${product.affiliate_link || '#'}"
target="_blank">

XEM GIÁ ĐÁY

</a>

</div>

</div>

`).join("");

}

async function loadSite(){

try{

const response =
await fetch(
"./data/data.json?t=" +
Date.now()
);

const data =
await response.json();

const config = {};
(data.CONFIG || [])
.forEach(i => {
config[i.key] = i.value;
});

const event = {};
(data.EVENT || [])
.forEach(i => {
event[i.key] = i.value;
});

ALL_PRODUCTS =
(data.PRODUCTS || [])
.filter(p => p.active);

const brands =
[
...new Set(
ALL_PRODUCTS.map(
p => (p.brand || "").toUpperCase()
)
)
].filter(Boolean);

document.getElementById("app")
.innerHTML = `

<header class="header">

<div class="logo">

<h1>
${config.page_title || "Mạnh Hà Mê Chơi Đồ"}
</h1>

<p>
TRẠM DEAL GIÁ ĐÁY
</p>

</div>

<div>

<a
class="icon-btn"
href="https://${config.zalo_link || ''}"
target="_blank">

💬

</a>

</div>

</header>

<section class="hero">

<div class="hero-box">

<div class="hero-title">
${event.hero_title || ''}
</div>

<div class="hero-sub">
${event.hero_subtitle || ''}
</div>

<a
class="hero-btn"
href="${event.form_link || '#'}"
target="_blank">

${event.button_text || 'THAM GIA'}

</a>

</div>

</section>

<div class="tabs" id="tabs">

<button
class="tab active"
data-filter="ALL">

TẤT CẢ

</button>

<button
class="tab"
data-filter="HOT">

SP HOT

</button>

${brands.map(brand => `

<button
class="tab"
data-filter="${brand}">

${brand}

</button>

`).join("")}

</div>

<section
class="products"
id="products">

</section>

`;

renderProducts();

document
.querySelectorAll(".tab")
.forEach(tab => {

tab.onclick = () => {

document
.querySelectorAll(".tab")
.forEach(t =>
t.classList.remove("active")
);

tab.classList.add("active");

CURRENT_FILTER =
tab.dataset.filter;

renderProducts();

};

});

}
catch(error){

document.body.innerHTML = `

<div style="
padding:20px;
color:white;
font-family:Arial;
">

<h2>Lỗi tải dữ liệu</h2>

<p>${error.message}</p>

</div>

`;

console.error(error);

}

}

document.addEventListener(
"DOMContentLoaded",
loadSite
);
