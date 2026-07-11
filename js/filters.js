let CURRENT_FILTER = "ALL";
let SEARCH_KEYWORD = "";

function renderSearch(){

return `

<div class="search-wrap">

<form
id="searchForm"
class="search-form">

<input
type="search"
id="searchBox"
class="search-box"
placeholder="🔍 Tìm tên sản phẩm..."
enterkeyhint="search"
autocomplete="off">

</form>

</div>

`;

}

function getBrands(){

return [

...new Set(

ALL_PRODUCTS.map(product =>

(product.brand || "")
.toUpperCase()

)

)

].filter(Boolean);

}

function renderFilters(){

const brands =
getBrands();

return `

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

${brands.map(brand => `

<button
class="tab"
data-filter="${brand}">

${brand}

</button>

`).join("")}

</div>

`;

}

function bindFilters(){

const searchBox =
document.getElementById("searchBox");

const searchForm =
document.getElementById("searchForm");

if(searchBox){

searchBox.addEventListener(
"input",
function(){

SEARCH_KEYWORD =
this.value.trim();

renderProducts();

}
);

}

if(searchForm){

searchForm.addEventListener(
"submit",
function(event){

event.preventDefault();

SEARCH_KEYWORD =
searchBox.value.trim();

renderProducts();

searchBox.blur();

}
);

}

document
.querySelectorAll(".tab")
.forEach(tab => {

tab.addEventListener(
"click",
function(){

document
.querySelectorAll(".tab")
.forEach(item =>

item.classList.remove("active")

);

this.classList.add("active");

CURRENT_FILTER =
this.dataset.filter;

renderProducts();

}
);

});

}
