// js/modules/auth.js
function updateUI() {
  const isLogged = !!localStorage.getItem('cloudhost-user');
  document.getElementById('loginBtn').style.display = isLogged ? 'none' : 'block';
  document.getElementById('logoutBtn').style.display = isLogged ? 'block' : 'none';
  document.getElementById('dashboardLink').style.display = isLogged ? 'block' : 'none';
  if (isLogged) {
    const user = JSON.parse(localStorage.getItem('cloudhost-user'));
    const nameEl = document.getElementById('userName');
    if (nameEl) nameEl.textContent = user.name;
    const dashContent = document.getElementById('dashboardContent');
    const loginReq = document.getElementById('loginRequired');
    if (dashContent) dashContent.style.display = 'block';
    if (loginReq) loginReq.style.display = 'none';
  }
}

export const Auth = {
  openLogin() {
    import('./modal.js').then(m => m.open('loginModal'));
  },

  login(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const name = email.split('@')[0];
    const user = { name, email };
    localStorage.setItem('cloudhost-user', JSON.stringify(user));
    updateUI();
    import('./modal.js').then(m => m.close('loginModal'));
    import('./notification.js').then(n => n.show(`Bem-vindo, ${name}! ✓`, 'success'));
  },

  oauth(provider) {
    const names = { google: 'Google', github: 'GitHub', facebook: 'Facebook' };
    const user = { name: names[provider], email: `user@${provider}.com` };
    localStorage.setItem('cloudhost-user', JSON.stringify(user));
    updateUI();
    import('./modal.js').then(m => m.close('loginModal'));
    import('./notification.js').then(n => n.show(`Login com ${names[provider]} realizado! ✓`, 'success'));
  },

  logout() {
    localStorage.removeItem('cloudhost-user');
    updateUI();
    import('./notification.js').then(n => n.show('Logout realizado com sucesso', 'success'));
    if (window.location.pathname.includes('dashboard.html')) {
      window.location.href = 'index.html';
    }
  }
};

// Checa login na carga
updateUI();