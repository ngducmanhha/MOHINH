async function loadSite(){

try{

const response =
await fetch(
"./data/data.json?t="+Date.now()
);

if(!response.ok){

throw new Error(
"Không thể tải data.json"
);

}

const data =
await response.json();

const config = {};

(data.CONFIG || [])
.forEach(item=>{

config[item.key] =
item.value;

});

const event = {};

(data.EVENT || [])
.forEach(item=>{

event[item.key] =
item.value;

});

SITE_CONFIG = config;

SITE_EVENT = event;

ALL_PRODUCTS =

(data[PAGE_CONFIG.sheet] || [])

.filter(
product =>
product.active === true
);

document
.getElementById("app")
.innerHTML = `

${renderHeader()}

${renderHero()}

${renderSearch()}

${renderNavigation()}

${renderFilters()}

<div class="price-note">

GIÁ THỰC TẾ ĐÔI KHI CÒN THẤP HƠN,
ĐẶC BIỆT KHI CÓ XU HOẶC VIP

</div>

<section
class="products"
id="products">
</section>

${renderFooter()}

`;

renderProducts();

bindFilters();

}
catch(error){

document.body.innerHTML = `

<div style="
padding:20px;
color:white;
font-family:Arial;
">

<h2>
Lỗi tải dữ liệu
</h2>

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
