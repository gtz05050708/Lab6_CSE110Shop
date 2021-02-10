// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'}); 
    const wrapper = document.createElement('li');
    wrapper.setAttribute('class','product');

    const img = wrapper.appendChild(document.createElement('img'));
    img.src = this.hasAttribute('img') ? this.getAttribute('img') : 'default';
    img.alt = this.hasAttribute('alt') ? this.getAttribute('alt') : 'default';
    img.width = this.hasAttribute('width') ? this.getAttribute('width') : 200;

    const title = wrapper.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    title.innerHTML = 'default';

    const price =  wrapper.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    price.innerHTML = 'default';

    const button = wrapper.appendChild(document.createElement('button'));
    button.setAttribute('id', -1);
    button.innerHTML = 'Add to Cart';
    button.onclick = function() {
      var cart = document.getElementById('cart-count');
      var cartList = JSON.parse(localStorage.getItem('cart-list'));
      if (button.innerHTML == 'Add to Cart') {
        button.innerHTML = 'Remove from Cart';
        cart.innerHTML = +cart.innerHTML + 1;
        cartList.push(button.id);
        localStorage.setItem('cart-list', JSON.stringify(cartList));
        alert('Added to Cart!')
      }
      else {
        button.innerHTML = 'Add to Cart';
        cart.innerHTML = +cart.innerHTML - 1;
        let index = cartList.indexOf(button.id);
        cartList.splice(index, 1);
        localStorage.setItem('cart-list', JSON.stringify(cartList));
      }
    }

    const style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;
    this.shadowRoot.append(style,wrapper);
  }
}

customElements.define('product-item', ProductItem);