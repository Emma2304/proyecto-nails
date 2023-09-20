import { createNotification } from '../components/notification.js';

const form = document.querySelector('#form');
const inputCliente = document.querySelector('#cliente');
const inputFecha = document.querySelector('#fecha');
const selectHora = document.querySelector('#hora');
const selectServicio = document.querySelector('#servicio');
const navBtn = document.querySelector('.nav_btn');
const navItems = document.querySelector('.mobile_nav_items');
const userName = document.querySelector('#title-info');
const notification = document.querySelector('#notification');
const preloader = document.querySelector('.preloader');
const cerrarSesion = document.querySelector('.logout_btn');

(async () => {
    try {
        const { data } = await axios.get('/api/citas');
        userName.innerText = `${data.usuario[0].name}`
    } catch (error) {
        console.log(error);
    }
})();

// Spinner-Loader
window.addEventListener('load', () => {
    preloader.classList.add('loader-hidden');

    preloader.addEventListener('transitiondend', () => {
        document.body.removeChild('preloader');
    });
});

// Ocultar horas que no esten disponibles
inputFecha.addEventListener('input', async e => {
    const response = await axios.get('/api/fecha', {
        params: {
            fecha: e.target.value
        }
    });
    if (response.data.length === 0) {
        [...selectHora.children].forEach(hora => hora.disabled = false)
    }
    response.data.forEach(cita => {
        const selectHorita = [...selectHora.children].find(hora => hora.innerHTML === cita.horario);
        if (selectHorita) {
            selectHorita.disabled = true;
        }
    })
})

// Barra mobile de Navegacion
navBtn.addEventListener('click', () => {
    navItems.classList.toggle('active');
});

// Cerrar Sesion Usuario
cerrarSesion.addEventListener('click', async e => {
    try {
        await axios.get('/api/logout');
        window.location.pathname = '/';
    } catch (error) {
        console.log(error);
    }
});

// Crear citas
form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        // crear cita en mongoDb
        const { data } = await axios.post('/api/citas', { cliente: inputCliente.value, fecha: inputFecha.value, horario: selectHora.value, servicio: selectServicio.value });
        createNotification(false, 'Tu cita ha sido agendada');
        setTimeout(() => {
            notification.innerHTML = ''
        }, 5000)

        inputCliente.value = '';
        inputFecha.value = '';
        selectHora.value = 'Selecciona el horario:';
        selectServicio.value = 'Selecciona el servicio:';
    } catch (error) {
        console.log(error);
    }
});
