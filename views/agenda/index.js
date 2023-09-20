const navBtn = document.querySelector('.nav_btn');
const navItems = document.querySelector('.mobile_nav_items');
const preloader = document.querySelector('.preloader');
const cerrarSesion = document.querySelector('.logout_btn');
const userName = document.querySelector('#title-info');
const helloUser = document.querySelector('.hello-user');

(async () => {
    try {
        const { data } = await axios.get('/api/agenda');
        userName.innerText = `${data[0].name}`
        helloUser.innerText = `!Hola, ${data[0].name}👋!`
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

// Barra de Navegacion
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
