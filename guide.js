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

const guides =
(data.GUIDE || [])
.filter(g=>g.active===true);

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

</header>

<section class="hero">

<div class="hero-box">

<div class="hero-title">
HƯỚNG DẪN
</div>

<div class="hero-sub">
Mẹo săn deal & sử dụng voucher
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

<a href="voucher.html">
MÃ GIẢM GIÁ
</a>

<a
class="active-page"
href="guide.html">
HƯỚNG DẪN
</a>

</nav>

<section class="guide-list">

${guides.map(g=>`

<a
class="guide-card"
href="${g.video_url || "#"}"
target="_blank">

<img
src="${g.thumbnail || ""}">

<div class="guide-info">

<div class="guide-title">
${g.title || ""}
</div>

<div class="guide-desc">
${g.description || ""}
</div>

</div>

</a>

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

document.addEventListener(
"DOMContentLoaded",
loadSite
);
