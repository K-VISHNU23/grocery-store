if (localStorage.getItem("role") !== "admin") {
  alert("Access denied! Admin only.");
  window.location.href = "login.html";
}

let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = -1;

/* LOAD ALL USERS */
async function loadUsers() {
  try {
    const res = await fetch("http://localhost:5000/api/auth");
    const users = await res.json();

    const list = document.getElementById("users");
    list.innerHTML = "";

    if (users.length === 0) {
      list.innerHTML = "<li style='text-align:center;'>No users yet</li>";
      return;
    }

    users.forEach(u => {
      list.innerHTML += `
        <li>
          <div style="flex:1;">
            <strong>${u.username}</strong><br>
            📧 ${u.email}<br>
            📞 ${u.phone}
          </div>
        </li>
      `;
    });
  } catch (err) {
    console.log("Users feature in development");
    document.getElementById("users").innerHTML = "<li style='text-align:center;'>Users feature coming soon</li>";
  }
}

/* LOAD ALL ORDERS */
async function loadOrders() {
  try {
    const res = await fetch("http://localhost:5000/api/orders");
    const orders = await res.json();

    const list = document.getElementById("orders");
    list.innerHTML = "";

    if (orders.length === 0) {
      list.innerHTML = "<li style='text-align:center;'>No orders yet</li>";
      return;
    }

    orders.forEach(o => {
      list.innerHTML += `
        <li>
          <div style="flex:1;">
            <strong>${o.user_email}</strong><br>
            Product: ${o.product_name} (x${o.quantity})<br>
            Total: ₹${o.total}
          </div>
        </li>
      `;
    });
  } catch (err) {
    console.log("Orders feature in development");
    document.getElementById("orders").innerHTML = "<li style='text-align:center;'>Orders feature coming soon</li>";
  }
}

function render() {
  const list = document.getElementById("admin-list");
  list.innerHTML = "";

  products.forEach((p, i) => {
    list.innerHTML += `
      <li>
        <img src="${p.img}" alt="${p.name}">
        <div style="flex:1;">
          <strong>${p.name}</strong> - ₹${p.price}
        </div>
        <button onclick="editProduct(${i})">✏️ Edit</button>
        <button onclick="deleteProduct(${i})">❌ Delete</button>
      </li>
    `;
  });
}

function saveProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const file = document.getElementById("imgFile").files[0];
  const imgUrl = document.getElementById("imgUrl").value;

  if (!name || !price) {
    alert("Fill all fields");
    return;
  }

  // PRIORITY: File > URL > Existing
  if (file) {
    const reader = new FileReader();
    reader.onload = () => saveData(name, price, reader.result);
    reader.readAsDataURL(file);

  } else if (imgUrl) {
    saveData(name, price, imgUrl);

  } else {
    const img = editIndex !== -1 ? products[editIndex].img : "";
    saveData(name, price, img);
  }
}

function saveData(name, price, img) {
  if (editIndex === -1) {
    products.push({ name, price: parseInt(price), img });
  } else {
    products[editIndex] = { name, price: parseInt(price), img };
    editIndex = -1;
  }

  localStorage.setItem("products", JSON.stringify(products));
  
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("imgFile").value = "";
  
  render();
}

function editProduct(i) {
  const p = products[i];
  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  editIndex = i;
}

function deleteProduct(i) {
  if (confirm("Are you sure you want to delete this product?")) {
    products.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(products));
    render();
  }
}

function logout() {
  localStorage.removeItem("role");
  window.location.href = "login.html";
}

render();
loadUsers();
loadOrders();

