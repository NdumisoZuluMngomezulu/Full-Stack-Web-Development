// Get DOM elements
const productsDiv = document.getElementById('products');
const cartDiv = document.getElementById('cart');
const authDiv = document.getElementById('auth');
const appDiv = document.getElementById('app');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Set token from local storage
let token = localStorage.token;

// Check if user is logged in
if (token) {
  authDiv.style.display = 'none';
  appDiv.style.display = 'block';
  getProducts();
  getCart();
}

// Login function
async function login() {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      token = data.token;
      localStorage.token = token;
      authDiv.style.display = 'none';
      appDiv.style.display = 'block';
      getProducts();
      getCart();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
  }
}

// Signup function
async function signup() {
  const email = emailInput.value;
  const password = passwordInput.value;
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      token = data.token;
      localStorage.token = token;
      authDiv.style.display = 'none';
      appDiv.style.display = 'block';
      getProducts();
      getCart();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
  }
}

// Get products function
async function getProducts() {
  try {
    const response = await fetch('/api/products');
    const products = await response.json();
    productsDiv.innerHTML = '';
    products.forEach(product => {
      const productHTML = `
        <div class="product">
          <h3>${product.name}</h3>
          <p>$${product.price}</p>
          <button onclick="addToCart('${product._id}')">Add to Cart</button>
        </div>
      `;
      productsDiv.insertAdjacentHTML('beforeend', productHTML);
    });
  } catch (error) {
    console.error(error);
  }
}

// Add to cart function
async function addToCart(productId) {
  try {
    const response = await fetch('/api/products/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ productId })
    });
    const data = await response.json();
    if (response.ok) {
      alert('Added to cart');
      getCart();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error(error);
  }
}

// Get cart function
async function getCart() {
  try {
    const response = await fetch('/api/products/cart', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const cart = await response.json();
    cartDiv.innerHTML = '';
    cart.forEach(item => {
      const cartItemHTML = `
        <p>${item.product.name} x ${item.quantity}</p>
      `;
      cartDiv.insertAdjacentHTML('beforeend', cartItemHTML);
    });
  } catch (error) {
    console.error(error);
  }
}