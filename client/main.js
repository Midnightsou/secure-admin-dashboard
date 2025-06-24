document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = document.getElementById('email').value;

      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('token', data.token);
          window.location.href = 'dashboard.html';
        } else {
          alert(data.msg || 'Login failed');
        }
      } catch (err) {
        alert('Server error');
      }
    });
  }

  const logout = document.getElementById('logout');
  if (logout) {
    logout.addEventListener('click', () => {
      localStorage.removeItem('token');
      window.location.href = 'index.html';
    });
  }
});
