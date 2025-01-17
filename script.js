const btnCart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnClose = document.querySelector('#cart-close');

btnCart.addEventListener('click', () => {
  cart.classList.add('cart-active');
});

btnClose.addEventListener('click', () => {
  cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded', loadItem);

function loadItem() {
  loadContent();
}

function loadContent() {
  // Remove items from cart
  let btnRemove = document.querySelectorAll('#cart-remove');
  btnRemove.forEach((btn) => {
    btn.addEventListener('click', removeItem);
  });

  // Change quantity of selected item in cart
  let qtyElements = document.querySelectorAll('.cart-quantity');
  qtyElements.forEach((input) => {
    input.addEventListener('change', changeQty);
  });

  //Product Cart
  let cartBtns = document.querySelectorAll('.add-cart');
  cartBtns.forEach((btn) => {
    btn.addEventListener('click', addCart);
  });

  updateTotal();
}

//Remove Item
function removeItem() {
  if(confirm('Are you sure you want to remove this item')) {
    let title = this.parentElement.querySelector('.cart-item-title').innerHTML;
    itemList = itemList.filter(el => el.title != title);
    this.parentElement.remove();
    loadContent();
  }
}

//Change Quantity
function changeQty() {
  if(isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}

let itemList = [];

//Add Cart
function addCart() {
  let product = this.parentElement;
  let title = product.querySelector('.item-title').innerHTML;
  let price = product.querySelector('.item-price').innerHTML;
  let imgSrc = product.querySelector('.item-img').src;
 
  let newProduct = {title, price, imgSrc}

  //Check Product already Exist in Cart
  if(itemList.find((el) => el.title == newProduct.title)) {
     alert("Product is already added to cart.");
        return;
      } else {
        itemList.push(newProduct);
  }

  let newProductElement = createCartProduct(title, price, imgSrc);
  let element = document.createElement('div');
  element.innerHTML = newProductElement;
  let cartBasket = document.querySelector('.cart-items');
  cartBasket.append(element);

  loadContent();
}

function createCartProduct(title, price, imgSrc) {
  return `
  <div class="cart-box">
    <img src="${imgSrc}" class="cart-img">
    <div class="detail-box">
      <div class="cart-item-title">${title}</div>
      <div class="price-box">
        <div class="cart-price">${price}</div>
        <div class="cart-amount">${price}</div>
      </div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fas fa-trash-alt" id="cart-remove"></i>
  </div>
  `;
}

function updateTotal() {
  const cartItems = document.querySelectorAll('.cart-box');
  const totalValue = document.querySelector('.total-price');

  let total = 0;

  cartItems.forEach(product => {
    let priceElement = product.querySelector('.cart-price');
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let qty = product.querySelector('.cart-quantity').value;
    total += (price * qty);
    total = Math.round(total * 100) / 100
    product.querySelector('.cart-amount').innerText = "$" + (price * qty);
  });

  totalValue.innerHTML = "$" + total;


  // Add Product Count in Cart Icon
  const cartCount = document.querySelector('.cart-count');
  let count = itemList.length;
  cartCount.innerHTML = count;

  if(count == 0) {
    cartCount.style.display = 'none';
  } else {
    cartCount.style.display = 'block';
  }
}

// Place order
document.getElementsByClassName('purchase')[0].addEventListener('click', placeOrder);

function placeOrder() {
  alert('Thank you for your purchase!')
  let cartItems = document.querySelector('.cart-items');
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
      itemList = [];
  }
  updateTotal();
}


// Clear cart
let clearCart = document.querySelector('.empty-cart').addEventListener('click', emptyCart);

function emptyCart() {
  let cartItems = document.querySelector('.cart-items');
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
      itemList = [];
  }
  updateTotal();
}

