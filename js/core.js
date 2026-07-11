let ALL_PRODUCTS=[];
let CURRENT_FILTER="ALL";
let SEARCH_KEYWORD="";
let SITE_DATA={};
let SITE_CONFIG={};
let SITE_EVENT={};

function money(value){
  return Number(value||0).toLocaleString("vi-VN");
}

function textUpper(value){
  return String(value||"").toUpperCase();
}

function isPreOrder(product){
  const text=textUpper(product.stock_text);
  return text.includes("PRE")||text.includes("ORDER")||text.includes("ĐẶT");
}

function isLowStock(product){
  const text=textUpper(product.stock_text);
  return text.includes("CHÁY")||text.includes("SAP CHAY")||text.includes("SẮP CHÁY");
}

function rowsToObject(rows){
  const result={};
  (rows||[]).forEach(item=>{
    result[item.key]=item.value;
  });
  return result;
}

async function loadData(){
  const response=await fetch("./data/data.json?t="+Date.now());

  if(!response.ok){
    throw new Error("Không thể tải data.json");
  }

  SITE_DATA=await response.json();
  SITE_CONFIG=rowsToObject(SITE_DATA.CONFIG);
  SITE_EVENT=rowsToObject(SITE_DATA.EVENT);

  ALL_PRODUCTS=(SITE_DATA[PAGE_CONFIG.sheet]||[])
    .filter(product=>product.active===true);
}

function showLoadError(error){
  document.body.innerHTML=`
    <div style="
      padding:20px;
      color:white;
      background:#05070d;
      min-height:100vh;
      font-family:Arial;
    ">
      <h2>Lỗi tải dữ liệu</h2>
      <p>${error.message}</p>
    </div>
  `;
}
