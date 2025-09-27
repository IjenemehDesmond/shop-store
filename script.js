let cart = [];
let total = 0;

async function loadProducts() {
  const res = await fetch("products.json");
  const products = await res.json();
  const productsDiv = document.getElementById("products");

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" width="100" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
    `;
    productsDiv.appendChild(div);
  });
}

function addToCart(id, name, price) {
  cart.push({ id, name, price });
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart");
  const totalSpan = document.getElementById("total");

  cartList.innerHTML = "";
  total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
    total += item.price;
  });

  totalSpan.textContent = total.toFixed(2);
}

loadProducts();