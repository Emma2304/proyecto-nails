const navBtn = document.querySelector('.nav_btn');
const navItems = document.querySelector('.mobile_nav_items');
const preloader = document.querySelector('.preloader');
const titleInfo = document.querySelector('.profile_info');
const userName = document.querySelector('#title-info');
const div = document.querySelector('.div-content');
const divH1 = document.querySelector('.h1');
const cerrarSesion = document.querySelector('.logout_btn');

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

// Eliminar citas 
div.addEventListener('click', async e => {
    e.preventDefault();
    // Select delete-btn
    if (e.target.closest('.delete-btn')) {
        const cita = e.target.closest('.delete-btn').parentElement.parentElement.parentElement;
        await axios.delete(`/api/pendientes/${cita.id}`);
        cita.remove();
    }
});

// Si hay citas
const citaVisibility = () => {
    if (div.childElementCount > 0) {
        divH1.classList.add('hidden');
    } else {
        divH1.classList.remove('hidden');
    }
};

// Funcion que crea las citas
(async () => {
    try {
        const { data: citas } = await axios.get('/api/citas');
        userName.innerText = `${citas.usuario[0].name}`
        const { data } = await axios.get('/api/pendientes');
        data.forEach(cita => {
            const citaItem = document.createElement('div');
            citaItem.id = cita.id;
            citaItem.innerHTML = `
            <div class="div-form">
                <form action="" class="formulario" id="form">

                    <p class="formulario-parrafo">Hola ${cita.cliente}, tu cita es...</p>
                    <button class="delete-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <label class="formulario-label">-Fecha-</label>
                    <span class="formulario-span">${cita.fecha}</span>

                    <label class="formulario-label">-Horario-</label>
                    <span class="formulario-span">${cita.horario}</span>

                    <label class="formulario-label">-Servicio-</label>
                    <span class="formulario-span">${cita.servicio}</span>

                </form>
            </div>
            `;
            citaVisibility();
            div.append(citaItem);
        });
    } catch (error) {
        console.log(error);
    }
})();
