function renderFooter(){

return `

<footer class="footer">

<p>
Mạnh Hà Mê Chơi Đồ là website tổng hợp deal mô hình,
Bandai, phụ kiện và mã giảm giá.
</p>

<p>
Website không bán hàng trực tiếp.
</p>

<p>

<a href="gioithieu.html">
Giới thiệu
</a>

|

<a href="chinhsach.html">
Chính sách
</a>

</p>

<br><br>

Mạnh Hà Mê Chơi Đồ - Website tổng hợp deal mô hình,
Bandai, phụ kiện và mã giảm giá.

</footer>

`;

}
function renderFloatingButtons(){

document.body.insertAdjacentHTML(
"beforeend",
`
<div class="floating-buttons">
<a
class="floating-btn btn-guide"
href="huongdan.html">

💸<br>GIẢM<br>THÊM

</a>
<a
class="floating-btn btn-zalo"
href="https://zalo.me/g/XXXXXXXX"
target="_blank">

💬<br>VÀO<br>NHÓM

</a>

</div>
`
);

}
