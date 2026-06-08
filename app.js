let ALL_PRODUCTS = [];
let CURRENT_FILTER = "ALL";
let SEARCH_KEYWORD = "";

function money(value){
return Number(value || 0).toLocaleString("vi-VN");
}

function renderProducts(){

const container =
document.getElementById("products");

if(!container) return;

let products = [...ALL_PRODUCTS];
if(CURRENT_FILTER === "ALL"){

products.sort((a,b)=>{

const score = (product)=>{

if(product.featured) return 300;

if(product.hot) return 200;

const brand =
(product.brand || "")
.toUpperCase();

if(
brand === "KHÁC" ||
brand === "KHAC"
){
return 0;
}

return 100;

};

const scoreA = score(a);
const scoreB = score(b);

if(scoreA !== scoreB){

return scoreB - scoreA;

}

const brandA =
(a.brand || "")
.toUpperCase();

const brandB =
(b.brand || "")
.toUpperCase();

if(
brandA === "KHÁC" ||
brandA === "KHAC"
){

return 1;

}

if(
brandB === "KHÁC" ||
brandB === "KHAC"
){

return -1;

}

return brandA.localeCompare(
brandB,
"vi"
);

});

}
  
if(CURRENT_FILTER === "FEATURED"){

products =
products.filter(
p => p.featured === true
);

}
else if(CURRENT_FILTER === "LOWSTOCK"){

products =
products.filter(product => {

const text =
(product.stock_text || "")
.toUpperCase();

return (
text.includes("CHÁY") ||
text.includes("SAP CHAY") ||
text.includes("SẮP CHÁY")
);

});

}
else if(CURRENT_FILTER === "HOT"){

products =
products.filter(
p => p.hot === true
);

}

else if(CURRENT_FILTER === "PREORDER"){
products =
products.filter(product => {

const text =
(product.stock_text || "")
.toUpperCase();

return (
text.includes("PRE") ||
text.includes("ĐẶT") ||
text.includes("ORDER")
);

});

}

else if(CURRENT_FILTER !== "ALL"){

products =
products.filter(product =>

(product.brand || "")
.toUpperCase()
.includes(CURRENT_FILTER)

);

}

if(SEARCH_KEYWORD){

products =
products.filter(product =>

(product.product_name || "")
.toLowerCase()
.includes(
SEARCH_KEYWORD.toLowerCase()
)

);

}

container.innerHTML =
products.map(product => `

<a
class="card-link"
href="${product.affiliate_link || "#"}"
target="_blank">

<div class="card">

<div class="image-wrap">

${(() => {

const text =
(product.stock_text || "")
.toUpperCase();

if(
text.includes("NEW")
){
return `<div class="badge badge-new">🆕 NEW</div>`;
}

if(
text.includes("CHÁY") ||
text.includes("SẮP CHÁY")
){
return `<div class="badge badge-low">🚨 SẮP CHÁY</div>`;
}

if(product.hot){
return `<div class="badge badge-hot">🔥 HOT</div>`;
}

return "";

})()}

<img
src="${product.image_url || ""}"
alt="${product.product_name || ""}"
loading="lazy">

</div>

<div class="card-content">

<div class="brand">
${product.brand || ""}
</div>

<div class="name">
${product.product_name || ""}
</div>

${product.description
? `
<div class="description">
${product.description}
</div>
`
: ""
}

<div class="old-price">
${money(product.original_price)}đ
</div>

<div class="sale-price">

${(() => {

const text =
(product.stock_text || "")
.toUpperCase();

const isPreOrder =

text.includes("PRE")
||
text.includes("ORDER")
||
text.includes("ĐẶT");

return `
${!isPreOrder ? '<span class="price-label">Khoảng</span>' : ''}
${product.sale_price}
`;

})()}

</div>


<div class="buy-btn">

${(() => {

const text =
(product.stock_text || "")
.toUpperCase();

const isPreOrder =

text.includes("PRE")
||
text.includes("ORDER")
||
text.includes("ĐẶT");

return isPreOrder
? "GIỮ SUẤT NGAY"
: "🛒 XEM GIÁ ĐÁY";

})()}

</div>

</div>

</div>

</a>

`).join("");

}

async function loadSite(){

try{

const response =
await fetch(
"./data/data.json?t="+Date.now()
);

const data =
await response.json();

const config = {};
(data.CONFIG || []).forEach(item=>{
config[item.key]=item.value;
});

const event = {};
(data.EVENT || []).forEach(item=>{
event[item.key]=item.value;
});

ALL_PRODUCTS =
(data.PRODUCTS || [])
.filter(p=>p.active===true);

const brands =

[
...new Set(
ALL_PRODUCTS.map(
p=>(p.brand||"").toUpperCase()
)
)
]

.filter(Boolean);

document.getElementById("app")
.innerHTML = `

<header class="header">

<div class="logo">

<div class="logo-mark">

<img
src="https://cdn-icons-png.flaticon.com/512/6143/6143353.png"
alt="logo">

</div>

<div class="logo-text">

<h1>
${config.page_title || ""}
</h1>

<p>
TRẠM DEAL GIÁ ĐÁY
</p>

</div>

</div>

<div class="header-actions">

<a
class="icon-btn"
href="https://${config.zalo_link}"
target="_blank">

<img
src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/120px-Icon_of_Zalo.svg.png"
alt="zalo">

</a>

</div>

</header>

<section class="hero">

<div class="hero-box">

<div class="hero-title">
${event.hero_title || ""}
</div>

<div class="hero-sub">
${event.hero_subtitle || ""}
</div>

<a
class="hero-btn"
href="${event.form_link || "#"}"
target="_blank">

🎁 ${event.button_text || ""}

</a>

</div>

</section>

<div class="search-wrap">

<input
type="text"
id="searchBox"
class="search-box"
placeholder="🔍 Tìm tên sản phẩm...">

</div>

<div class="tabs">

<button
class="tab active"
data-filter="ALL">

⭐ TẤT CẢ

</button>

<button
class="tab"
data-filter="FEATURED">

💥 GIẢM SỐC

</button>

<button
class="tab"
data-filter="LOWSTOCK">

🚨 SẮP CHÁY HÀNG

</button>

<button
class="tab"
data-filter="HOT">

🔥 ĐANG HOT

</button>

<button
class="tab"
data-filter="PREORDER">

📦 PRE-ORDER

</button>

${brands.map(brand=>`

<button
class="tab"
data-filter="${brand}">

${brand}

</button>

`).join("")}

</div>

<div class="price-note">
GIÁ THỰC TẾ ĐÔI KHI CÒN THẤP HƠN, ĐẶC BIỆT KHI CÓ XU HOẶC VIP
</div>

<section
class="products"
id="products">

</section>

`;

renderProducts();

document
.getElementById("searchBox")
.addEventListener(
"input",
function(){

SEARCH_KEYWORD =
this.value.trim();

renderProducts();

}
);

document
.querySelectorAll(".tab")
.forEach(tab=>{

tab.onclick=()=>{

document
.querySelectorAll(".tab")
.forEach(
t=>t.classList.remove("active")
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

}

}

document.addEventListener(
"DOMContentLoaded",
loadSite
);
