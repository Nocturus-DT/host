// js/modules/modal.js
export function open(id) {
  document.getElementById(id).classList.add('active');
}

export function close(id) {
  document.getElementById(id).classList.remove('active');
}

// Fechar clicando fora ou com ESC
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
    e.target.classList.remove('active');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
  }
});