


const clientesBtn = document.querySelector('#clientesBtn');
const form = document.querySelector('#form');
const nombre = document.querySelector('#nombre');
const telefono = document.querySelector('#telefono');
const email = document.querySelector('#email');
const empresa = document.querySelector('#empresa');
const alerta = document.querySelector('#alerta');


document.addEventListener('DOMContentLoaded', function() {
    clientesBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const cliente = {
            nombre: nombre.value,
            telefono: telefono.value,
            email: email.value,
            empresa: empresa.value
        }
        if (validarObjeto(cliente)) {
            saveItemJsonServer(cliente);
            validarObjeto(cliente);
            window.location.href = 'index.html';
        } else {
            mostrarAlerta('Todos los campos son obligatorios', 'error', alerta);
        }
    });
});

function validarObjeto(objeto) {
    const validacionOk = Object.values(objeto).some( value => value.trim() === '');
    if (!validacionOk) {
        return true;
    } else {
        return false;
    }
}

function limpiarObjeto(objeto) {
    for (const key in objeto) {
        objeto[key] = '';
    }
}

function saveItemJsonServer(objeto) {
    const url = 'http://localhost:3000/clientes';
    const options = {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options)
        .then( response => response.json())
        .then( data => console.log(data))
        .catch( error => console.log(error));
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


