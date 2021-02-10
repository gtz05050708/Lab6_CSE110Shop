// Script.js

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('products') == null) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => localStorage.setItem('products', JSON.stringify(data)))
      .then(function(){processObj()});
  }

});

if (localStorage.getItem('products') != null) {
  processObj();
}

function processObj(){
  var productList = document.getElementById('product-list');
  var products = JSON.parse(localStorage.getItem('products'));
  var cartList = JSON.parse(localStorage.getItem('cart-list'));
  if (cartList == null) {
    cartList = [];
    cartList.length = 0;
    localStorage.setItem('cart-list', JSON.stringify(cartList));
  }
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var curr = document.createElement('product-item');
    var childs = curr.shadowRoot.childNodes[1].childNodes;
    childs[0].src = product.image;
    childs[0].alt = product.title;
    childs[1].innerHTML = product.title;
    childs[2].innerHTML = '$' + product.price;
    childs[3].id = product.id;
    if (cartList.indexOf(product.id.toString()) != -1) {
      var cart = document.getElementById('cart-count');
      childs[3].innerHTML = 'Remove from Cart';
      cart.innerHTML = +cart.innerHTML + 1;
    }
    productList.appendChild(curr);
  }
}