let products = JSON.parse(localStorage.getItem("products")) || [
  { name: "Apple", price: 120, img: "assets/images/apple.png" },
  { name: "Banana", price: 60, img: "assets/images/banana.png" },
  { name: "Milk", price: 50, img: "assets/images/milk.png" },
  { name: "Rice", price: 80, img: "assets/images/rice.png" }
];

let cart = [];

/* ===== PROFILE FUNCTIONS ===== */

/* TOGGLE PROFILE DROPDOWN */
function toggleProfile() {
  document.getElementById("profileBox").classList.toggle("hidden");
}

/* LOAD USER DETAILS */
async function loadProfile() {
  const email = localStorage.getItem("email");
  
  if (!email) {
    console.log("No email found in localStorage");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/auth/user/${email}`);
    const user = await res.json();

    document.getElementById("userName").innerText = "Hello " + user.username;
    document.getElementById("userPhone").innerText = "📞 " + user.phone;
  } catch (err) {
    console.log("Using localStorage data");
    const storedUser = JSON.parse(localStorage.getItem("currentUser")) || {};
    document.getElementById("userName").innerText = "Hello " + (storedUser.username || "User");
    document.getElementById("userPhone").innerText = storedUser.phone ? "📞 " + storedUser.phone : "";
  }
}

/* VIEW MY ORDERS */
async function viewOrders() {
  const email = localStorage.getItem("email");

  try {
    const res = await fetch(`http://localhost:5000/api/orders/${email}`);
    const orders = await res.json();

    if (orders.length === 0) {
      alert("No orders yet");
      return;
    }

    let orderList = "Your Orders:\n\n";
    orders.forEach(o => {
      orderList += `${o.product_name} (x${o.quantity}) - ₹${o.total}\n`;
    });

    alert(orderList);
  } catch (err) {
    alert("Orders feature coming soon!");
  }
}

/* DELETE ACCOUNT */
async function deleteAccount() {
  if (!confirm("Are you sure? This cannot be undone.")) {
    return;
  }

  const email = localStorage.getItem("email");

  try {
    await fetch(`http://localhost:5000/api/auth/${email}`, {
      method: "DELETE"
    });

    alert("Account deleted");
    logout();
  } catch (err) {
    alert("Error deleting account");
  }
}

/* LOGOUT */
function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

/* ===== PRODUCT FUNCTIONS ===== */

function loadProducts(list = products) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach((p, i) => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${i})">Add</button>
      </div>
    `;
  });
}

function addToCart(i) {
  const item = products[i];
  const exist = cart.find(x => x.name === item.name);

  if (exist) exist.qty++;
  else cart.push({...item, qty: 1});

  updateCart();
}

function updateCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const count = document.getElementById("cart-count");

  list.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;

    list.innerHTML += `
      <li>
        ${item.name} x${item.qty}
        <button onclick="removeItem(${i})">❌</button>
      </li>
    `;
  });

  totalEl.innerText = total;
  count.innerText = cart.length;
}

function removeItem(i) {
  cart.splice(i, 1);
  updateCart();
}

function toggleCart() {
  document.getElementById("cart").classList.toggle("hidden");
}

function checkout() {
  alert("Order placed! Thank you for shopping with FreshCart.");
  cart = [];
  updateCart();
}

document.getElementById("search").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(val));
  loadProducts(filtered);
});

loadProducts();
loadProfile();


