const productsDiv = document.getElementById('products');
const cartDiv = document.getElementById('cart');
const authDiv = document.getElementById('auth');
const appDiv = document.getElementById('app');

let products = [];
let cart = [];
let token = localStorage.token;

// Check if logged in
if (token) {
  authDiv.style.display = 'none';
  appDiv.style.display = 'block';
  getProducts();
  getCart();
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => { return res.json() })
  .then(data => {
    localStorage.token = data.token;
    token = data.token;
    authDiv.style.display = 'none';
    appDiv.style.display = 'block';
    getProducts();
    getCart();
  });
}

function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.token = data.token;
    token = data.token;
    authDiv.style.display = 'none';
    appDiv.style.display = 'block';
    getProducts();
    getCart();
  });
}

function getProducts() {
  productsDiv.innerHTML = '';
  fetch('/api/products')
    .then(res => res.json())
    .then(data => {
      products = data;
      products.forEach(p => {
        productsDiv.innerHTML += `
          <div class="product">
            <h3>${p.name}</h3>
            <p>$${p.price}</p>
            <button onclick="addToCart('${p._id}')">Add to Cart</button>
          </div>
        `;
      });
    });
}

function addToCart(id) {
  fetch('/api/products/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({ productId: id })
  })
  .then(() => {
    alert('Added to cart');
    getCart();
  });
}

function getCart() {
  cartDiv.innerHTML = '';
  fetch('/api/products/cart', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(data => {
    cart = data;
    data.forEach(item => {
      cartDiv.innerHTML += `
        <p>${item.product.name} x ${item.quantity}</p>
      `;
    });
  });
}