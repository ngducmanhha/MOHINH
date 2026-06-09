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

const vouchers =
(data.VOUCHER || [])
.filter(v=>v.active===true);

document.getElementById("app")
.innerHTML = `

<header class="header">

<div class="logo">

<div class="logo-mark">

<img
src="https://i.ibb.co/CpnCzH0x/gn-001-gundam-exia-mobile-suit-gundam-unicorn-desktop-wallpaper-wallpaper-iphone-thumbnail-removebg.png">

</div>

<div class="logo-text">

<h1>${config.page_title || ""}</h1>

<p>TRẠM DEAL GIÁ ĐÁY</p>

</div>

</div>

<div class="header-actions">

<a
class="icon-btn"
href="https://${config.zalo_link}"
target="_blank">

<img
src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/120px-Icon_of_Zalo.svg.png">

</a>

</div>

</header>

<section class="hero">

<div class="hero-box">

<div class="hero-title">
MÃ GIẢM GIÁ
</div>

<div class="hero-sub">
Tổng hợp voucher mới nhất
</div>

</div>

</section>

<nav class="site-nav">

<a href="index.html">
KIT TRUNG
</a>

<a href="bandai.html">
BANDAI
</a>

<a href="phukien.html">
PHỤ KIỆN
</a>

<a
class="active-page"
href="voucher.html">
MÃ GIẢM GIÁ
</a>

<a href="guide.html">
HƯỚNG DẪN
</a>

</nav>

<section class="voucher-list">

${vouchers.map(v=>`

<div class="voucher-card">

<div class="voucher-title">
${v.title || ""}
</div>

<div class="voucher-code">
${v.voucher_code || ""}
</div>

<div class="voucher-discount">
${v.discount || ""}
</div>

<div class="voucher-desc">
${v.description || ""}
</div>

<div class="voucher-actions">

<button
class="copy-btn"
onclick="copyCode('${v.voucher_code || ""}')">

COPY MÃ

</button>

<a
class="go-btn"
href="${v.link || "#"}"
target="_blank">

LẤY NGAY

</a>

</div>

</div>

`).join("")}

</section>

`;

}
catch(error){

document.body.innerHTML =
`<div style="padding:20px">
${error.message}
</div>`;

}

}

function copyCode(code){

navigator.clipboard.writeText(code);

alert("Đã copy: " + code);

}

document.addEventListener(
"DOMContentLoaded",
loadSite
);
