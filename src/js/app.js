import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/app.scss';

import productLists from './data';

const ITEM_LIST_ELEMENT = document.getElementById('js--item-list');
const CART_COUNT_ELEMENT = document.getElementById('js--cart-count');
const ADD_TO_CART_BTN_ELEMENT = document.getElementsByClassName('js--add-to-cart');
const CART_LIST_ELEMENT = document.getElementById('js--cart-list');

let _htmlList = '';
let _productIds = [];

productLists.map(item => {
    _htmlList += `<div class="item text-center">
                    <img src="${item.image}" class="img-fluid img-product" alt="product_image" />
                    <p class="name">${item.nameEnglish}</p>
                    <p class="brand">${item.authorNameEnglish}</p>
                    <p class="price">Tk. ${item.sellPrice}</p>
                    <button type="button" data-id="${item.id}" class="btn btn-action js--add-to-cart">Add To Cart</button>
                </div>`;
    if (ITEM_LIST_ELEMENT) {
        ITEM_LIST_ELEMENT.innerHTML = _htmlList;
    }
});

function storeProductListToCookie(name, value) {
    const expiryDate = new Date(new Date().getTime() + 60 * 60 * 1000 * 24).toGMTString(); // 1 day
    let cookie = name + '=' + JSON.stringify(value) + '; expires=' + expiryDate + ';';
    document.cookie = cookie;
}

function readProductListFromCookie(name) {
    let result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

function addToCart() {
    const productId = this.getAttribute('data-id');
    _productIds.push(productId);
    const addedToCartIds = [...new Set(_productIds)];
    storeProductListToCookie('addedToCartIds', addedToCartIds);
    CART_COUNT_ELEMENT.textContent = addedToCartIds.length;
}

CART_COUNT_ELEMENT.textContent = readProductListFromCookie('addedToCartIds')?.length || 0;

[...ADD_TO_CART_BTN_ELEMENT].forEach(btnElement => {
    btnElement.addEventListener('click', addToCart);
});



const ids = parseInt(readProductListFromCookie('addedToCartIds'));
let obj = productLists.find(item => item.id === ids);
console.log(obj);
