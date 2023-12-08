


const nuevoBtn = document.querySelector('#nuevoBtn');

const clientesList = document.querySelector('#clientesList');

document.addEventListener('DOMContentLoaded', function() {
    nuevoBtn.addEventListener('click', function() {
        window.location.href = 'nuevo.html';
    });
    listarClientes();
})

async function listarClientes() {
    const url = 'http://localhost:3000/clientes';
    await fetch(url)
        .then( response => response.json())
        .then( data => {
            clientesList.innerHTML = '';
            data.forEach( cliente => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${cliente.nombre}</td>
                    <td>${cliente.telefono}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.empresa}</td>
                    <td>
                        <button class="btn btn-danger" onclick="eliminarCliente(${cliente.id})">Eliminar</button>
                        <button class="btn btn-warning" onclick="editarCliente(${cliente.id})">Editar</button>
                    </td>
                `;
                clientesList.appendChild(tr);
            });
        })
}

async function eliminarCliente(id) {
    const url = `http://localhost:3000/clientes/${id}`;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch(url, options)
        .then( response => response.json())
        .then( data => {
            listarClientes();
        })
}

function editarCliente(id) {
    window.location.href = `editar.html?id=${id}`;
}   

