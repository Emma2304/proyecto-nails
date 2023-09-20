const navBtn = document.querySelector('.nav_btn');
const navItems = document.querySelector('.mobile_nav_items');
const preloader = document.querySelector('.preloader');
const cerrarSesion = document.querySelector('.logout_btn');
const spanUsers = document.querySelector('#span-users');
const spanCitas = document.querySelector('#span-citas');
const userName = document.querySelector('#title-info');
const clients = document.querySelector('#clients');
const recentCustomers = document.querySelector('.recentCustomers');
const recentOrders = document.querySelector('.recentOrders');


(async () => {
    try {
        const { data } = await axios.get('/api/admin');
        userName.innerText = `${data.usuarios[0].name}`
    } catch (error) {
        console.log(error);
    }
})();

(async () => {
    try {
        const { data: citas } = await axios.get('/api/citas/all');
        spanCitas.innerText = `${citas.length}`

        const { data: users } = await axios.get('/api/users/all');
        spanUsers.innerText = `${users.length}`

        citas.forEach(cita => {
            const table = document.createElement('table');
            table.innerHTML = `
            <table>
                <tbody>
                    <tr>
                        <td>${cita.cliente}</td>
                        <td>${cita.fecha}</td>
                        <td>${cita.horario}</td>
                        <td>${cita.servicio}</td>
                    </tr>
                </tbody>
            </table>
            `;

            recentOrders.append(table);
        });

        users.forEach(user => {
            const table = document.createElement('table');
            table.innerHTML = `
            <table>
                <tbody>
                    <tr>
                        <td>
                        <h4 id="clients">${user.name} <span>(${user.citas.length})</span></h4>
                        </td>
                    </tr>
                </tbody>
            </table>
            `;

            recentCustomers.append(table);
        });

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
