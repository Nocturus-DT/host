// js/modules/cart.js
let cart = JSON.parse(localStorage.getItem('cloudhost-cart') || '[]');

function updateBadge() {
  const badge = document.getElementById('cartBadge');
  badge.textContent = cart.length;
  badge.style.display = cart.length > 0 ? 'flex' : 'none';
}

function renderCart() {
  const itemsContainer = document.getElementById('cartItems');
  const totalEl = document.getElementById('totalAmount');
  const totalContainer = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  if (cart.length === 0) {
    itemsContainer.innerHTML = '<p style="text-align:center;opacity:0.7;">Seu carrinho está vazio</p>';
    totalContainer.style.display = 'none';
    checkoutBtn.disabled = true;
    return;
  }

  let html = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    html += `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <p>R$ ${item.price.toFixed(2)}/mês</p>
        </div>
        <button onclick="Cart.remove(${index})" style="background:none;border:none;color:var(--danger);font-size:1.5rem;cursor:pointer;">×</button>
      </div>
    `;
  });

  itemsContainer.innerHTML = html;
  totalEl.textContent = total.toFixed(2);
  totalContainer.style.display = 'block';
  checkoutBtn.disabled = false;
}

export const Cart = {
  add(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cloudhost-cart', JSON.stringify(cart));
    updateBadge();
    renderCart();
    import('./notification.js').then(notif => notif.show(`${name} adicionado ao carrinho! 🛒`, 'success'));
  },

  remove(index) {
    cart.splice(index, 1);
    localStorage.setItem('cloudhost-cart', JSON.stringify(cart));
    updateBadge();
    renderCart();
  },

  open() {
    renderCart();
    import('./modal.js').then(m => m.open('cartModal'));
  },

  checkout() {
    if (!localStorage.getItem('cloudhost-user')) {
      import('./notification.js').then(n => n.show('Faça login para finalizar a compra', 'warning'));
      import('./modal.js').then(m => m.close('cartModal'));
      import('./auth.js').then(a => a.openLogin());
      return;
    }
    alert(`Compra simulada realizada! Total: R$ ${cart.reduce((s,i)=>s+i.price,0).toFixed(2)}`);
    cart = [];
    localStorage.removeItem('cloudhost-cart');
    updateBadge();
    renderCart();
    import('./notification.js').then(n => n.show('Compra realizada com sucesso! ✓', 'success'));
  }
};

// Inicializa badge
updateBadge();