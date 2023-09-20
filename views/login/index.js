const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const errorText = document.querySelector('#error-text');
const preloader = document.querySelector('.preloader');

// Spinner-Loader
window.addEventListener('load', () => {
    preloader.classList.add('loader-hidden');

    preloader.addEventListener('transitiondend', () => {
        document.body.removeChild('preloader');
    });
});

// Funcion a la hora de loguear
form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const { data } = await axios.post('/api/login', { email: emailInput.value, password: passwordInput.value });
        console.log(data);
        if (data.role === 'USER') {
            window.location.pathname = '/agenda/'
        } else {
            window.location.pathname = '/admin/'
        }
    } catch (error) {
        console.log(error);
        errorText.innerHTML = error.response.data.error;
    }
});