// js/main.js
import { show as notify } from './modules/notification.js';
import { Auth } from './modules/auth.js';
import { Cart } from './modules/cart.js';
import { open as openModal, close as closeModal } from './modules/modal.js';

// Expor globalmente pra onclick no HTML
window.Auth = Auth;
window.Cart = Cart;
window.Modal = { open: openModal, close: closeModal };

// Mensagem de boas-vindas
notify('Bem-vindo à CloudHost Pro! 🚀', 'success');

// Atualiza UI de login em todas as páginas
if (localStorage.getItem('cloudhost-user')) {
  document.getElementById('userName') && Auth.openLogin(); // só pra atualizar nome se existir
}