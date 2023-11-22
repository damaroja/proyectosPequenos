

const $ = e => document.querySelector(e);


const obtenerBtn = $('#obtenerBtn');
const ciudad = $('#ciudad');
const pais = $('#pais');
const alerta = $('#alerta');

const max = $('#max');
const min = $('#min');
const ciudadTxt = $('#ciudadTxt');
const tempTxt = $('#temp');

document.addEventListener('DOMContentLoaded', () => {
    obtenerBtn.addEventListener('click', obtenerClima)})


async function obtenerClima() {
    const ciudad = $('#ciudad').value;
    const pais = $('#pais').value;
    console.log(pais);
    if (ciudad.trim() === '' || pais.trim() === '') {
        mostrarAlerta('Ambos campos son obligatorios', 'error', alerta);
        return;
    }
    await consultarAPI(ciudad, pais);
}

async function consultarAPI(ciudad, pais) {
    const appId = '4b961f140c6ac9b8026ae690cb87141c';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    await fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarNodo(alerta);
            if (datos.cod === '404') {
                mostrarError('Ciudad no encontrada', 'error', alerta);
                return;
            }
            console.log(datos);
            const {temp, temp_max, temp_min} = datos.main;
            max.textContent = farenheitACelsius(temp_max);
            min.textContent = farenheitACelsius(temp_min);
            ciudadTxt.textContent = ciudad;
            tempTxt.textContent = farenheitACelsius(temp);
        })
        .catch(e => {
            mostrarError('Hubo un error', 'error', alerta);
        })

}

function farenheitACelsius(kelvin) {
    return parseInt(kelvin - 273.15);
}

function mostrarAlerta(msg, type, nodo) {
    limpiarNodo(nodo);
    const p = document.createElement("p");
    if (type === "error") {
      p.classList.add("alert", "alert-danger");
    } else {
      p.classList.add("alert", "alert-success");
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
