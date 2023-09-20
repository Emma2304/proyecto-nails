import { createNotification } from '../components/notification.js';

const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const phoneInput = document.querySelector('#phone-input');
const passwordInput = document.querySelector('#password-input');
const formBtn = document.querySelector('#form-btn');
const notification = document.querySelector('#notification');
const preloader = document.querySelector('.preloader');

// Spinner-Loader
window.addEventListener('load', () => {
    preloader.classList.add('loader-hidden');

    preloader.addEventListener('transitiondend', () => {
        document.body.removeChild('preloader');
    });
});


// Regex validations
const NAME_VALIDATION = /^[A-Z\u99d1][a-zA-Z-ÿíáéóú\u00f1\u00d1]+(\s*[a-z\u99d1][a-zA-Z-ÿíáéóú\u00f1\u00d1\s]*)$/;
const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PHONE_VALIDATION = /^([0]{1})([2,4]{1})([1,2]{1})([2,4,6]{1})([0-9]{7})$/;
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;


// Validations
let nameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;

const validation = (input, regexValidation) => {
    formBtn.disabled = nameValidation && emailValidation && phoneValidation && passwordValidation ? false : true;

    if (input.value === '') {
        input.classList.remove('border-b-red-400');
        input.classList.remove('border-b-green-400');
        input.classList.add('focus:border-b-purple-500');
    } else if (regexValidation) {
        input.classList.remove('focus:border-b-purple-500');
        input.classList.add('border-b-green-400');
    } else if (!regexValidation) {
        input.classList.remove('focus:border-b-purple-500');
        input.classList.remove('border-b-green-400');
        input.classList.add('border-b-red-400');
    }
};

// Events
nameInput.addEventListener('input', e => {
    nameValidation = NAME_VALIDATION.test(e.target.value);
    validation(nameInput, nameValidation);
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_VALIDATION.test(e.target.value);
    validation(emailInput, emailValidation);
});

phoneInput.addEventListener('input', e => {
    phoneValidation = PHONE_VALIDATION.test(e.target.value);
    validation(phoneInput, phoneValidation);
});

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
    validation(passwordInput, passwordValidation);
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newUser = {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            password: passwordInput.value,
        }
        const { data } = await axios.post('/api/users', newUser);
        createNotification(false, data);
        setTimeout(() => {
            notification.innerHTML = ''
        }, 5000)

        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        passwordInput.value = '';
        validation(nameInput, false);
        validation(emailInput, false);
        validation(phoneInput, false);
        validation(passwordInput, false);
    } catch (error) {
        createNotification(true, error.response.data.error)
        setTimeout(() => {
            notification.innerHTML = ''
        }, 5000)
    }
});