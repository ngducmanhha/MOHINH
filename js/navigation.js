const SITE_NAV_ITEMS=[
  {page:"KITTRUNG",label:"KIT TRUNG",href:"index.html"},
  {page:"BANDAI",label:"BANDAI",href:"bandai.html"},
  {page:"PHUKIEN",label:"PHỤ KIỆN",href:"phukien.html"},
  {page:"GUIDE",label:"HƯỚNG DẪN",href:"guide.html"},
  {page:"GIOITHIEU",label:"GIỚI THIỆU",href:"gioithieu.html"},
  {page:"CHINHSACH",label:"CHÍNH SÁCH",href:"chinhsach.html"}
];

function renderNavigation(){
  return `
    <nav class="site-nav">
      ${SITE_NAV_ITEMS.map(item=>`
        <a class="${item.page===PAGE_CONFIG.page?"active-page":""}" href="${item.href}">
          ${item.label}
        </a>
      `).join("")}
    </nav>
  `;
}
