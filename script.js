// Product Array Data Storage[cite: 3, 4]
const products = [
  {
    id: 1,
    name: "Premium Engine Oil Filter",
    brand: "Bosch",
    category: "engine",
    price: 12.89,
    compatibility: "Sedan",
    description: "High-efficiency oil filter engineered for maximum engine protection and synthetic oil longevity.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Ceramic Brake Pads (Front Set)",
    brand: "Akebono",
    category: "brakes",
    price: 89.99,
    compatibility: "Sedan",
    description: "Ultra-quiet ceramic brake pads delivering superior stopping power with minimal dust generation.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1600706432523-9978434be30d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Heavy-Duty 12V Car Battery",
    brand: "Optima",
    category: "lighting",
    price: 189.50,
    compatibility: "SUV",
    description: "High-performance AGM battery built for high electrical loads and extreme temperature performance.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1620980776848-84ac10194945?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "All-Weather Rubber Floor Mats",
    brand: "WeatherTech",
    category: "accessories",
    price: 64.99,
    compatibility: "Truck",
    description: "Custom-molded floor liners designed to capture mud, water, and debris with high ridge edges.",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Iridium IX Spark Plugs (4-Pack)",
    brand: "NGK",
    category: "engine",
    price: 34.50,
    compatibility: "Sedan",
    description: "Fine wire iridium tip ensures high durability and consistently stable spark ignition.",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Vented Performance Brake Rotors",
    brand: "Brembo",
    category: "brakes",
    price: 124.00,
    compatibility: "SUV",
    description: "Cross-drilled and slotted brake rotors for optimized heat dissipation and peak braking efficiency.",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Ultra-Bright LED Headlight Kit",
    brand: "Philips",
    category: "lighting",
    price: 79.95,
    compatibility: "All",
    description: "6000K crisp white LED headlamp conversion kit for improved night visibility.",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Waterproof All-Season Car Cover",
    brand: "MotorTrend",
    category: "accessories",
    price: 52.00,
    compatibility: "Sedan",
    description: "Heavy-duty multi-layer vehicle cover providing full UV ray, snow, rain, and scratch protection.",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80"
  }
];

// In-Memory & LocalStorage State Management[cite: 3, 4]
let cart = JSON.parse(localStorage.getItem('autozone_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('autozone_wishlist')) || [];
let orders = JSON.parse(localStorage.getItem('autozone_orders')) || [
  { id: "ORD-98231", date: "2026-02-15", total: 102.88, status: "Delivered" }
];
let activeCategory = 'all';
let selectedVehicle = null;

// Initialize Web Application
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartBadge();
  updateWishlistBadge();
  renderOrderHistory();
});

// View Navigation Handler[cite: 3]
function showSection(sectionId) {
  const views = ['homeView', 'cartView', 'checkoutView', 'wishlistView', 'accountView', 'aboutView', 'contactView'];
  views.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const target = document.getElementById(sectionId + 'View');
  if (target) target.classList.remove('hidden');

  if (sectionId === 'cart') renderCart();
  if (sectionId === 'wishlist') renderWishlist();
  if (sectionId === 'checkout') renderCheckoutSummary();
  if (sectionId === 'account') renderOrderHistory();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Product Catalog Cards[cite: 1, 2]
function renderProducts(items = products) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white rounded-xl border">
        <i class="fa-solid fa-magnifying-glass text-4xl text-gray-300 mb-2"></i>
        <p class="font-bold text-gray-600">No matching auto parts found.</p>
        <button onclick="resetFilters()" class="mt-3 text-xs bg-brandNavy text-white px-4 py-2 rounded">Clear Search Filters</button>
      </div>`;
    return;
  }

  grid.innerHTML = items.map(p => {
    const isWish = wishlist.some(item => item.id === p.id);
    return `
      <div class="product-card bg-white rounded-xl overflow-hidden border shadow-sm hover:shadow-lg flex flex-col justify-between">
        <div class="relative">
          <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover">
          <button onclick="toggleWishlist(${p.id})" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur hover:bg-white flex items-center justify-center text-gray-600 hover:text-brandRed shadow transition">
            <i class="fa-${isWish ? 'solid' : 'regular'} fa-heart ${isWish ? 'text-brandRed' : ''}"></i>
          </button>
          <span class="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur">
            ${p.brand}
          </span>
        </div>

        <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span class="uppercase font-semibold text-brandNavy">${p.category}</span>
              <span class="text-amber-500 font-bold"><i class="fa-solid fa-star mr-1"></i>${p.rating}</span>
            </div>
            <h3 class="font-bold text-gray-800 text-sm leading-snug hover:text-brandRed cursor-pointer" onclick="openProductModal(${p.id})">
              ${p.name}
            </h3>
            <p class="text-xs text-gray-500 mt-1 line-clamp-2">${p.description}</p>
          </div>

          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-lg font-black text-brandNavy">$${p.price.toFixed(2)}</span>
              <span class="text-[10px] bg-green-100 text-green-800 font-semibold px-2 py-0.5 rounded">
                Fits: ${p.compatibility}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button onclick="openProductModal(${p.id})" class="text-xs font-bold border border-brandNavy text-brandNavy hover:bg-brandNavy hover:text-white py-2 rounded-lg transition">
                Details
              </button>
              <button onclick="addToCart(${p.id})" class="text-xs font-bold bg-brandRed hover:bg-red-700 text-white py-2 rounded-lg transition flex items-center justify-center gap-1">
                <i class="fa-solid fa-cart-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('productCountText').innerText = `Showing ${items.length} product(s)`;
}

// Category Filter[cite: 2]
function filterCategory(cat) {
  activeCategory = cat;
  document.getElementById('currentCategoryTitle').innerText = 
    cat === 'all' ? 'All Auto Parts' : `${cat.toUpperCase()} Parts & Equipment`;

  let filtered = cat === 'all' ? products : products.filter(p => p.category === cat);
  
  if (selectedVehicle) {
    filtered = filtered.filter(p => p.compatibility === selectedVehicle.model || p.compatibility === 'All');
  }

  renderProducts(filtered);
}

// Product Search Filter[cite: 2]
function handleSearch() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  filterByQuery(query);
}

function handleSearchMobile() {
  const query = document.getElementById('searchInputMobile').value.toLowerCase();
  filterByQuery(query);
}

function filterByQuery(query) {
  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.brand.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query)
  );
  renderProducts(filtered);
}

// Sort Products[cite: 2]
function sortProducts() {
  const val = document.getElementById('sortSelect').value;
  let sorted = [...products];

  if (activeCategory !== 'all') {
    sorted = sorted.filter(p => p.category === activeCategory);
  }

  if (val === 'low-high') sorted.sort((a, b) => a.price - b.price);
  if (val === 'high-low') sorted.sort((a, b) => b.price - a.price);
  if (val === 'rating') sorted.sort((a, b) => b.rating - a.rating);

  renderProducts(sorted);
}

// Vehicle Selection Garage Filter[cite: 2]
function toggleGarageModal() {
  document.getElementById('garageModal').classList.toggle('hidden');
}

function applyVehicleFilter() {
  const year = document.getElementById('vehicleYear').value;
  const make = document.getElementById('vehicleMake').value;
  const model = document.getElementById('vehicleModel').value;

  if (!model) {
    showToast('Please select a vehicle model', 'error');
    return;
  }

  selectedVehicle = { year, make, model };
  document.getElementById('vehicleBtnText').innerText = `${make || ''} ${model}`;
  toggleGarageModal();
  showToast(`Vehicle set to: ${make || ''} ${model}`);
  filterCategory(activeCategory);
}

function clearVehicleFilter() {
  selectedVehicle = null;
  document.getElementById('vehicleBtnText').innerText = 'Select Vehicle';
  toggleGarageModal();
  filterCategory('all');
  showToast('Vehicle filter reset');
}

// Cart Functionalities[cite: 2]
function addToCart(productId, qty = 1) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += qty;
  } else {
    const item = products.find(p => p.id === productId);
    cart.push({ ...item, quantity: qty });
  }

  saveCart();
  updateCartBadge();
  showToast('Added to shopping cart!');
}

function updateCartBadge() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').innerText = count;
}

function updateQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }

  saveCart();
  renderCart();
  updateCartBadge();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  renderCart();
  updateCartBadge();
  showToast('Item removed from cart');
}

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const emptyState = document.getElementById('cartEmptyState');
  const cartContent = document.getElementById('cartContent');

  if (cart.length === 0) {
    emptyState.classList.remove('hidden');
    cartContent.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  cartContent.classList.remove('hidden');

  container.innerHTML = cart.map(item => `
    <div class="bg-white p-4 rounded-xl border flex flex-col sm:flex-row items-center gap-4">
      <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
      <div class="flex-1 text-center sm:text-left">
        <h4 class="font-bold text-gray-800 text-sm">${item.name}</h4>
        <p class="text-xs text-gray-500">Brand: ${item.brand} | Fit: ${item.compatibility}</p>
        <span class="text-brandNavy font-extrabold text-sm mt-1 block">$${item.price.toFixed(2)}</span>
      </div>

      <div class="flex items-center gap-2">
        <button onclick="updateQuantity(${item.id}, -1)" class="w-7 h-7 bg-gray-200 rounded font-bold text-gray-700 hover:bg-gray-300">-</button>
        <span class="w-8 text-center font-bold text-sm">${item.quantity}</span>
        <button onclick="updateQuantity(${item.id}, 1)" class="w-7 h-7 bg-gray-200 rounded font-bold text-gray-700 hover:bg-gray-300">+</button>
      </div>

      <div class="text-right">
        <span class="font-black text-brandRed text-base block">$${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})" class="text-xs text-gray-400 hover:text-red-500 mt-1">
          <i class="fa-solid fa-trash"></i> Remove
        </button>
      </div>
    </div>
  `).join('');

  updateSummary();
}

function updateSummary() {
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  document.getElementById('summarySubtotal').innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById('summaryTax').innerText = `$${tax.toFixed(2)}`;
  document.getElementById('summaryTotal').innerText = `$${total.toFixed(2)}`;
}

function saveCart() {
  localStorage.setItem('autozone_cart', JSON.stringify(cart));
}

// Checkout Logic[cite: 2]
function renderCheckoutSummary() {
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const total = subtotal * 1.08;
  document.getElementById('checkoutTotal').innerText = `$${total.toFixed(2)}`;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  const orderId = "ORD-" + Math.floor(10000 + Math.random() * 90000);
  const subtotal = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const total = subtotal * 1.08;

  orders.unshift({
    id: orderId,
    date: new Date().toISOString().split('T')[0],
    total: total,
    status: "Processing"
  });

  localStorage.setItem('autozone_orders', JSON.stringify(orders));
  
  cart = [];
  saveCart();
  updateCartBadge();

  showToast(`Order Placed Successfully! (${orderId})`);
  showSection('account');
}

// Wishlist Logic[cite: 2]
function toggleWishlist(id) {
  const idx = wishlist.findIndex(item => item.id === id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('Removed from Wishlist');
  } else {
    const item = products.find(p => p.id === id);
    wishlist.push(item);
    showToast('Added to Wishlist!');
  }

  localStorage.setItem('autozone_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
  renderProducts();
}

function updateWishlistBadge() {
  document.getElementById('wishlistCount').innerText = wishlist.length;
}

function renderWishlist() {
  const container = document.getElementById('wishlistContainer');
  if (wishlist.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white rounded-xl border">
        <i class="fa-solid fa-heart text-4xl text-gray-300 mb-2"></i>
        <p class="font-bold text-gray-600">Your wishlist is empty.</p>
      </div>`;
    return;
  }

  container.innerHTML = wishlist.map(p => `
    <div class="bg-white rounded-xl border p-4 shadow-sm flex flex-col justify-between">
      <img src="${p.image}" class="h-32 object-cover rounded-md mb-2">
      <h4 class="font-bold text-sm text-gray-800">${p.name}</h4>
      <p class="text-xs text-gray-500 mb-2">$${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${p.id})" class="w-full bg-brandRed text-white text-xs font-bold py-2 rounded">Move to Cart</button>
    </div>
  `).join('');
}

// Product Details Modal[cite: 1]
function openProductModal(id) {
  const item = products.find(p => p.id === id);
  if (!item) return;

  const content = document.getElementById('modalContent');
  content.innerHTML = `
    <div>
      <img src="${item.image}" alt="${item.name}" class="w-full h-64 object-cover rounded-lg shadow">
    </div>
    <div class="space-y-4">
      <span class="text-xs font-bold bg-slate-200 text-slate-800 px-2 py-1 rounded uppercase">${item.category}</span>
      <h3 class="text-xl font-extrabold text-brandNavy">${item.name}</h3>
      <p class="text-sm text-gray-600">${item.description}</p>

      <div class="space-y-1 text-xs text-gray-500 border-t border-b py-2">
        <p><strong>Brand:</strong> ${item.brand}</p>
        <p><strong>Vehicle Fitment:</strong> ${item.compatibility}</p>
        <p><strong>Customer Rating:</strong> ⭐ ${item.rating} / 5.0</p>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-2xl font-black text-brandRed">$${item.price.toFixed(2)}</span>
        <button onclick="addToCart(${item.id}); closeProductModal();" class="bg-brandRed hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg shadow text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  document.getElementById('productDetailModal').classList.remove('hidden');
}

function closeProductModal() {
  document.getElementById('productDetailModal').classList.add('hidden');
}

// User Profile & Order History[cite: 1, 2]
function renderOrderHistory() {
  const container = document.getElementById('orderHistoryContainer');
  if (orders.length === 0) {
    container.innerHTML = '<p class="text-xs text-gray-500">No orders placed yet.</p>';
    return;
  }

  container.innerHTML = orders.map(o => `
    <div class="border rounded-lg p-3 flex justify-between items-center bg-gray-50">
      <div>
        <p class="font-bold text-gray-800">${o.id}</p>
        <p class="text-xs text-gray-500">Date: ${o.date}</p>
      </div>
      <div class="text-right">
        <span class="font-black text-brandNavy block">$${o.total.toFixed(2)}</span>
        <span class="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">${o.status}</span>
      </div>
    </div>
  `).join('');
}

// Reset Search Filters[cite: 2]
function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchInputMobile').value = '';
  filterCategory('all');
}

// Toast Notification System
function showToast(msg, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');

  toastMsg.innerText = msg;
  toastIcon.className = type === 'error' ? 'fa-solid fa-circle-xmark text-red-400' : 'fa-solid fa-circle-check text-green-400';

  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}