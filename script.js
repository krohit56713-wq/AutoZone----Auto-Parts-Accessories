// Product Dataset with Internet Images (Amazon CDN), Ratings, and Reviews
const products = [
  {
    id: 1,
    name: "Premium Engine Oil Filter (OEM Fit)",
    brand: "Bosch",
    category: "engine",
    price: 12.89,
    rating: 4.8,
    ratingCount: 1420,
    compatibility: "Sedan",
    description: "High-efficiency synthetic oil filter engineered for maximum engine protection, capturing 99% of harmful particles.",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { user: "Rahul M.", rating: 5, comment: "Perfect fit for my sedan. Excellent filtration quality.", date: "2026-02-10" },
      { user: "David S.", rating: 4, comment: "Good quality oil filter, easy installation.", date: "2026-01-22" }
    ]
  },
  {
    id: 2,
    name: "Ceramic Brake Pads & Rotors Kit",
    brand: "Akebono",
    category: "brakes",
    price: 89.99,
    rating: 4.9,
    ratingCount: 3105,
    compatibility: "Sedan",
    description: "Ultra-quiet ceramic brake pads delivering superior stopping power with minimal dust generation and long pad life.",
    image: "https://images.unsplash.com/photo-1600706432523-9978434be30d?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { user: "Amit K.", rating: 5, comment: "No squeaking at all! Stops instantly.", date: "2026-02-15" }
    ]
  },
  {
    id: 3,
    name: "Heavy-Duty 12V AGM Car Battery",
    brand: "Optima",
    category: "lighting",
    price: 189.50,
    rating: 4.7,
    ratingCount: 890,
    compatibility: "SUV",
    description: "High-performance AGM battery built for extreme weather conditions and heavy electrical accessories.",
    image: "https://images.unsplash.com/photo-1620980776848-84ac10194945?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { user: "Priya N.", rating: 5, comment: "Powerful cranking amps, started right away in winter.", date: "2026-01-30" }
    ]
  },
  {
    id: 4,
    name: "All-Weather Custom Rubber Floor Liners",
    brand: "WeatherTech",
    category: "accessories",
    price: 64.99,
    rating: 4.6,
    ratingCount: 2150,
    compatibility: "Truck",
    description: "Laser-measured floor mats designed to capture mud, snow, and spills with high retaining walls.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
    reviews: [
      { user: "Vikram R.", rating: 4, comment: "Fits my truck floor perfectly.", date: "2026-02-01" }
    ]
  },
  {
    id: 5,
    name: "Iridium Spark Plugs (4-Pack)",
    brand: "NGK",
    category: "engine",
    price: 34.50,
    rating: 4.9,
    ratingCount: 1800,
    compatibility: "Sedan",
    description: "Fine iridium tip ensures high durability and stable spark ignition for improved fuel efficiency.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
    reviews: []
  },
  {
    id: 6,
    name: "Ultra-Bright 6000K LED Headlight Kit",
    brand: "Philips",
    category: "lighting",
    price: 79.95,
    rating: 4.8,
    ratingCount: 940,
    compatibility: "SUV",
    description: "Crisp white LED headlamp conversion kit providing 300% brighter night visibility.",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
    reviews: []
  }
];

let cart = JSON.parse(localStorage.getItem('autozone_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('autozone_wishlist')) || [];
let orders = JSON.parse(localStorage.getItem('autozone_orders')) || [
  { id: "ORD-98421", date: "2026-02-10", total: 102.88, status: "Delivered" }
];
let activeCategory = 'all';
let currentProduct = null;
let garageVehicle = JSON.parse(localStorage.getItem('autozone_vehicle')) || { model: 'Sedan', make: 'Toyota' };

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  updateWishlistBadge();
  updateHeaderLocation();
});

// View Routing Manager
function showView(viewId) {
  const views = ['homeView', 'categoryView', 'productDetailView', 'cartView', 'checkoutView', 'wishlistView', 'accountView'];
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const target = document.getElementById(viewId + 'View');
  if (target) target.classList.remove('hidden');

  if (viewId === 'cart') renderCart();
  if (viewId === 'wishlist') renderWishlist();
  if (viewId === 'checkout') renderCheckoutSummary();
  if (viewId === 'account') renderOrderHistory();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Category Filter & Redirect
function filterCategory(cat) {
  activeCategory = cat;
  showView('category');

  const titleEl = document.getElementById('categoryTitle');
  titleEl.innerText = cat === 'all' ? 'All Auto Parts' : `${cat.toUpperCase()} Department`;

  const filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
  renderProducts(filtered);
}

// Render Products Grid (Amazon Style Cards)
function renderProducts(items) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = items.map(p => `
    <div class="product-card bg-white p-4 rounded-xl border shadow-sm flex flex-col justify-between cursor-pointer" onclick="openProductDetail(${p.id})">
      <div>
        <img src="${p.image}" alt="${p.name}" class="h-44 w-full object-cover rounded-md mb-3">
        <span class="text-[10px] bg-gray-200 uppercase font-bold px-2 py-0.5 rounded text-gray-700">${p.brand}</span>
        <h3 class="font-bold text-sm text-gray-900 mt-2 line-clamp-2 hover:text-orange-600">${p.name}</h3>
        <div class="flex items-center gap-1 mt-1 text-xs text-amazonOrange">
          <span>★★★★☆</span>
          <span class="text-gray-500">(${p.ratingCount})</span>
        </div>
      </div>
      <div class="mt-4 pt-3 border-t">
        <p class="text-xl font-black text-red-700">$${p.price.toFixed(2)}</p>
        <p class="text-[10px] text-green-700 font-bold mt-1">FREE delivery Tomorrow</p>
      </div>
    </div>
  `).join('');

  document.getElementById('productCountText').innerText = `Showing ${items.length} results`;
}

// Open Dedicated Product Detail Page (PDP)
function openProductDetail(id) {
  currentProduct = products.find(p => p.id === id);
  if (!currentProduct) return;

  showView('productDetail');

  document.getElementById('pdpImage').src = currentProduct.image;
  document.getElementById('pdpBrand').innerText = currentProduct.brand;
  document.getElementById('pdpTitle').innerText = currentProduct.name;
  document.getElementById('pdpPrice').innerText = `$${currentProduct.price.toFixed(2)}`;
  document.getElementById('pdpBoxPrice').innerText = `$${currentProduct.price.toFixed(2)}`;
  document.getElementById('pdpDescription').innerText = currentProduct.description;
  document.getElementById('pdpRatingCount').innerText = `${currentProduct.rating} out of 5 stars (${currentProduct.ratingCount} ratings)`;

  // Fitment Check
  const fitmentEl = document.getElementById('fitmentText');
  if (currentProduct.compatibility === garageVehicle.model || currentProduct.compatibility === 'All') {
    fitmentEl.innerText = `Confirmed fit: Works with your ${garageVehicle.make} ${garageVehicle.model}.`;
  } else {
    fitmentEl.innerText = `Note: Designed for ${currentProduct.compatibility} models.`;
  }

  renderReviews();
}

// Render Customer Reviews on PDP
function renderReviews() {
  const container = document.getElementById('reviewsContainer');
  if (!currentProduct.reviews || currentProduct.reviews.length === 0) {
    container.innerHTML = '<p class="text-xs text-gray-500">No customer reviews yet. Be the first to review!</p>';
    return;
  }

  container.innerHTML = currentProduct.reviews.map(r => `
    <div class="border-b pb-3 space-y-1">
      <div class="flex items-center justify-between">
        <span class="font-bold text-xs text-gray-800"><i class="fa-solid fa-circle-user mr-1"></i> ${r.user}</span>
        <span class="text-[10px] text-gray-400">${r.date}</span>
      </div>
      <div class="text-amazonOrange text-xs">${'★'.repeat(r.rating)}{{'☆'.repeat(5-r.rating)}}</div>
      <p class="text-xs text-gray-600">${r.comment}</p>
    </div>
  `).join('');
}

// Submit Customer Review
function submitReview(e) {
  e.preventDefault();
  const rating = parseInt(document.getElementById('reviewRating').value);
  const comment = document.getElementById('reviewComment').value;

  currentProduct.reviews.unshift({
    user: "Verified Buyer",
    rating: rating,
    comment: comment,
    date: new Date().toISOString().split('T')[0]
  });

  document.getElementById('reviewComment').value = '';
  renderReviews();
  showToast("Review submitted successfully!");
}

// Garage Modal Controls
function toggleGarageModal() {
  document.getElementById('garageModal').classList.toggle('hidden');
}

function saveGarageVehicle() {
  const model = document.getElementById('garageModel').value;
  const make = document.getElementById('garageMake').value;
  garageVehicle = { model, make };
  localStorage.setItem('autozone_vehicle', JSON.stringify(garageVehicle));
  updateHeaderLocation();
  toggleGarageModal();
  showToast(`Vehicle updated: ${make} ${model}`);
}

function updateHeaderLocation() {
  document.getElementById('headerLocationText').innerText = `${garageVehicle.make} ${garageVehicle.model}`;
}

// Cart Management
function addCurrentProductToCart() {
  const qty = parseInt(document.getElementById('pdpQuantity').value);
  addToCart(currentProduct.id, qty);
}

function buyNowCurrentProduct() {
  addCurrentProductToCart();
  showView('cart');
}

function addToCart(productId, qty = 1) {
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    const item = products.find(p => p.id === productId);
    cart.push({ ...item, quantity: qty });
  }
  saveCart();
  updateCartBadge();
  showToast("Added to Cart!");
}

function updateCartBadge() {
  const count = cart.reduce((sum, i) => sum + i.quantity, 0);
  document.getElementById('cartCount').innerText = count;
}

function updateWishlistBadge() {
  document.getElementById('wishlistCount').innerText = wishlist.length;
}

function saveCart() {
  localStorage.setItem('autozone_cart', JSON.stringify(cart));
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const emptyState = document.getElementById('cartEmptyState');
  const content = document.getElementById('cartContent');

  if (cart.length === 0) {
    emptyState.classList.remove('hidden');
    content.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  content.classList.remove('hidden');

  container.innerHTML = cart.map(item => `
    <div class="bg-white p-4 rounded-xl border flex items-center gap-4">
      <img src="${item.image}" class="w-20 h-20 object-cover rounded">
      <div class="flex-1">
        <h4 class="font-bold text-sm">${item.name}</h4>
        <p class="text-xs text-green-700 font-bold">In Stock</p>
        <p class="text-sm font-black text-red-700 mt-1">$${item.price.toFixed(2)} x ${item.quantity}</p>
      </div>
      <button onclick="removeFromCart(${item.id})" class="text-xs text-red-600 hover:underline"><i class="fa-solid fa-trash"></i></button>
    </div>
  `).join('');

  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  document.getElementById('cartItemCountTotal').innerText = cart.reduce((s, i) => s + i.quantity, 0);
  document.getElementById('cartTotalPrice').innerText = `$${subtotal.toFixed(2)}`;
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
  updateCartBadge();
}

function renderCheckoutSummary() {
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  document.getElementById('checkoutTotalAmount').innerText = `$${subtotal.toFixed(2)}`;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  const orderId = "ORD-" + Math.floor(10000 + Math.random() * 90000);
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  orders.unshift({ id: orderId, date: new Date().toISOString().split('T')[0], total: subtotal, status: "Processing" });
  localStorage.setItem('autozone_orders', JSON.stringify(orders));

  cart = [];
  saveCart();
  updateCartBadge();

  showToast(`Order Placed Successfully! (${orderId})`);
  showView('account');
}

function renderOrderHistory() {
  const container = document.getElementById('orderHistoryContainer');
  if (orders.length === 0) {
    container.innerHTML = '<p class="text-xs text-gray-500">No past orders found.</p>';
    return;
  }
  container.innerHTML = orders.map(o => `
    <div class="border p-3 rounded flex justify-between items-center bg-gray-50">
      <div>
        <p class="font-bold">${o.id}</p>
        <p class="text-xs text-gray-500">Date: ${o.date}</p>
      </div>
      <div class="text-right">
        <p class="font-black text-red-700">$${o.total.toFixed(2)}</p>
        <span class="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">${o.status}</span>
      </div>
    </div>
  `).join('');
}

// Search Filter
function handleSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  showView('category');
  const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
  renderProducts(filtered);
}

// Toast Notification
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.innerText = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}