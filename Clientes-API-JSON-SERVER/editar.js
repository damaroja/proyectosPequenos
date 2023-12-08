


const clientesBtn = document.getElementById('clientesBtn');
const form = document.getElementById('form');

const nombreInput = document.querySelector('#nombre');
const emailInput = document.querySelector('#email');
const empresaInput = document.querySelector('#empresa');
const telefonoInput = document.querySelector('#telefono');



document.addEventListener('DOMContentLoaded', async function() {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    const url = `http://localhost:3000/clientes/${id}`; 
    const cliente = await fetch(url)
        .then( response => response.json())
        .then( data => data);
    const {nombre, email, empresa, telefono} = cliente;
    nombreInput.value = nombre;
    emailInput.value = email;
    empresaInput.value = empresa;
    telefonoInput.value = telefono;
    clientesBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const cliente = {
            nombre: nombreInput.value,
            email: emailInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value
    }
    const validacion = validarObjeto(cliente);
    if (validacion) {
        const url = `http://localhost:3000/clientes/${id}`;
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cliente)
        }
        const response = await fetch(url, options);
        if (response.status === 200) {
            mostrarAlerta('Cliente editado correctamente', 'success', form);
            nombreInput.value = '';
            emailInput.value = '';
            empresaInput.value = '';
            telefonoInput.value = '';
            window.location.href = 'index.html';
        } else {
            mostrarAlerta('Hubo un error', 'error', form);
        }
    } else {
        mostrarAlerta('Todos los campos son obligatorios', 'error', form);
    }});
});


function validarObjeto(objeto) {
    const validacionOk = Object.values(objeto).some( value => value.trim() === '');
    if (!validacionOk) {
        return true;
    } else {
        return false;
    }
}

function mostrarAlerta(msg, type, nodo) {
    limpiarNodo(nodo);
    const p = document.createElement("p");
    if (type === "error") {
      p.classList.add("alert", "alert-danger", 'mt-3');
    } else {
      p.classList.add("alert", "alert-success", 'mt-3');
    }
    p.textContent = msg;
    nodo.appendChild(p);
    setTimeout(() => {
      p.remove();
    }, 3000);
  }
  
  function limpiarNodo(nodo) {
    while (nodo.hasChildNodes()) {
      nodo.removeChild(nodo.firstChild);
    }
  }
