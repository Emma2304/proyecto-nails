const navBtn = document.querySelector('.nav_btn');
const navItems = document.querySelector('.mobile_nav_items');
const preloader = document.querySelector('.preloader');
const cerrarSesion = document.querySelector('.logout_btn');
const userName = document.querySelector('#title-info');
const user_table = document.querySelector('.user_table');
const citas_table = document.querySelector('.citas_table');

// Eliminar citas 
citas_table.addEventListener('click', async e => {
    e.preventDefault();
    // Select delete-btn
    if (e.target.closest('.eliminar')) {
        const cita = e.target.closest('.eliminar').parentElement.parentElement.parentElement.parentElement;
        console.log(cita);
        await axios.delete(`/api/pendientes/${cita.id}`);
        cita.remove();
    }
});

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


(async () => {
    try {
        const { data } = await axios.get('/api/admin');
        userName.innerText = `${data.usuarios[0].name}`

        const { data: citas } = await axios.get('/api/citas/all');
        console.log(citas);

        const { data: users } = await axios.get('/api/users/all');

        users.forEach(user => {
            const table = document.createElement('table');
            table.innerHTML = `
            <table>
                    <tbody>
                        <tr>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.phone}</td>
                        </tr>
                    </tbody>
            </table>
            `;

            user_table.append(table);
        });

        citas.forEach(cita => {
            const table = document.createElement('table');
            table.id = cita.id;
            table.innerHTML = `
            <table>
                <tbody>
                    <tr>
                        <td>${cita.cliente}</td>
                        <td>${cita.fecha}</td>
                        <td>${cita.horario}</td>
                        <td><button class="eliminar">Delete</button></td>
                    </tr>
                </tbody>
            </table>
            `;

            citas_table.append(table);
        });
    } catch (error) {
        console.log(error);
    }
})();
