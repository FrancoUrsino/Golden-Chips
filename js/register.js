document.addEventListener('DOMContentLoaded', () => {
  const authModal = document.getElementById('authModal');
  const closeModal = document.getElementById('closeModal');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const authAction = document.getElementById('authAction');
  const viewProfile = document.getElementById('viewProfile');
  const viewChips = document.getElementById('viewChips');
  const profileLink = document.getElementById('viewProfile');
  const chipsLink = document.getElementById('viewChips');

  let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  let userData = JSON.parse(localStorage.getItem('userData')) || {};
  let userChips = JSON.parse(localStorage.getItem('userChips')) || 0;

  const updateUserChips = (newChips) => {
    let currentUserChips = JSON.parse(localStorage.getItem('userChips')) || 0;
    currentUserChips += newChips;
    localStorage.setItem('userChips', JSON.stringify(currentUserChips));
    viewChips.textContent = `Tus Fichas: ${currentUserChips}`;
  };

  const updateProfileView = () => {
    if (isLoggedIn) {
      viewProfile.style.display = 'block';
      userChips = JSON.parse(localStorage.getItem('userChips')) || 0;
      viewChips.textContent = `Tus Fichas: ${userChips}`;
      authAction.textContent = 'Cerrar sesión';
    } else {
      viewProfile.style.display = 'none';
      authAction.textContent = 'Iniciar sesión';
    }
  };

  updateProfileView();

  showRegister.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    authModal.style.display = 'block';
  });

  showLogin.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
    authModal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email === userData.email && password === userData.password) {
      isLoggedIn = true;
      localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
      authModal.style.display = 'none';
      updateProfileView();
    } else {
      swal('Error', 'Correo o contraseña inválidos', 'error');
    }
  });

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const dni = document.getElementById('dni').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    userData = { fullName, email, password, dni, phoneNumber };
    localStorage.setItem('userData', JSON.stringify(userData));
    swal('Registrado', 'Usuario registrado exitosamente', 'success');
    registerForm.reset();
  });

  profileLink.addEventListener('click', () => {
    if (isLoggedIn) {
      swal("Perfil", `Email: ${userData.email}\nNombre Completo: ${userData.fullName}\nDNI: ${userData.dni}\nNúmero de Teléfono: ${userData.phoneNumber}`);
    } else {
      swal('Error', 'Debe iniciar sesión primero', 'error');
    }
  });

  chipsLink.addEventListener('click', () => {
    if (isLoggedIn) {
      swal("Mis Fichas", `Cantidad de Fichas: ${userChips}`);
    } else {
      swal('Error', 'Debe iniciar sesión primero', 'error');
    }
  });

  authAction.addEventListener('click', () => {
    if (isLoggedIn) {
      isLoggedIn = false;
      localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
      updateProfileView();
      swal('Sesión cerrada', 'Ha cerrado sesión exitosamente', 'success');
    } else {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      authModal.style.display = 'block';
    }
  });
});