document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.wrapper');
    const loginLink = document.querySelector('.login-link');
    const registerLink = document.querySelector('.register-link');
    const btnPopup = document.querySelector('.btnLogin-popup');
    const iconClose = document.querySelector('.icon-close');
    const forgotPasswordLink = document.querySelector('#forgot-password-link');
    const closeRecoveryLink = document.querySelector('#close-recovery-link');
    const loginForm = document.querySelector('.form-box.login');
    const registerForm = document.querySelector('.form-box.register');
    const recoveryForm = document.querySelector('.form-box.recovery');

    // Função para ocultar os formulários
    function hideForms() {
        wrapper.classList.remove('active');
        recoveryForm.style.display = 'none';
        iconClose.style.display = 'none';
    }

    registerLink.addEventListener('click', () => {
        hideForms();
        wrapper.classList.add('active');
        registerForm.style.transform = 'translateX(0)';
        loginForm.style.transform = 'translateX(-400px)';
        recoveryForm.style.transform = 'translateX(800px)';
    });

    loginLink.addEventListener('click', () => {
        hideForms();
        wrapper.classList.add('active');
        showLoginForm();
    });

    btnPopup.addEventListener('click', () => {
        hideForms();
        wrapper.classList.add('active-popup');
        showLoginForm();
    });

    iconClose.addEventListener('click', () => {
        hideForms();
    });

    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideForms();
        showRecoveryForm();
    });

    closeRecoveryLink.addEventListener('click', (e) => {
        e.preventDefault();
        hideForms();
        showLoginForm();
    });

    // Função para exibir o formulário de recuperação de senha e centralizar
    function showRecoveryForm() {
        recoveryForm.style.display = 'block';
        recoveryForm.style.transform = 'translate(-50%, -50%)'; // Centralizar vertical e horizontalmente
        iconClose.style.display = 'block';
        loginForm.style.transform = 'translateX(-400px)';
        registerForm.style.transform = 'translateX(-400px)';
    }

    // Função para exibir o formulário de login e ocultar os outros
    function showLoginForm() {
        loginForm.style.transform = 'translateX(0)';
        registerForm.style.transform = 'translateX(400px)';
        recoveryForm.style.transform = 'translateX(800px)';
    }

    // Inicialmente, exiba o formulário de login
    showLoginForm();
});
