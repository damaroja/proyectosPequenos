const $ = (s) => document.querySelector(s);
const c$ = (s) => document.createElement(s);

const max = new Date().getFullYear();
const min = max - 20;

const annoInput = $("#year");
const marcaInput = $("#marca");
const cotizarBtn = $("#cotizarBtn");
const tipoInput = $('input[name="flexRadioDefault"]:checked');
const alerta = $("#alerta");
const informacion = $('#informacion')
const spinner = $('#spinner')

document.addEventListener("DOMContentLoaded", () => {
  llenarSelect();
  spinner.style.display = "none";
});

cotizarBtn.addEventListener("click", cotizarSeguro);

function llenarSelect() {
  for (let i = max; i > min; i--) {
    const option = document.createElement("option");
    option.text = i;
    option.value = i;
    annoInput.add(option);
  }
}

function cotizarSeguro() {
  limpiarNodo(informacion)
  const marca = marcaInput.value;
  const year = annoInput.value;
  const tipo = tipoInput.value;
  let seguroObj = {
    marca,
    year,
    tipo,
  };
  const camposVacios = Object.values(seguroObj).some((value) => value === "");
  if (camposVacios) {
    mostrarAlerta("No debe haber ningun campo vacio", "error", alerta);
    return;
  }
  const precio = calcularSeguro(seguroObj);
  spinner.style.display = "block";
  setTimeout(() => {
    mostrarInfoSeguro(seguroObj, precio)
    spinner.style.display = "none";
  }, 2000);
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

function calcularSeguro(seguro) {
  const { marca, year, tipo } = seguro;
  const modMarca = +Math.floor(Math.random() * 2)
  const modYear = +Math.floor(Math.random() * 3)
  const modTipo = +Math.floor(Math.random() * 2)
  const base = 400;
  const precioSeguro = base*modMarca + base*modYear + base*modTipo
  return precioSeguro
}

function mostrarInfoSeguro(seguro, cantidad){
  limpiarNodo(informacion)
  const { marca, year, tipo } = seguro;
  const p = c$('p')
  p.innerHTML = `<div class="d-flex flex-column align-items-center mt-5 color-info text-white pt-4 rounded h4">
                  <p>Marca: ${marca}</p>
                 <p>Año: ${year}</p>
                 <p>Tipo: ${tipo}</p>
                 <p>Precio: ${cantidad}</p></div>              
  `
  informacion.appendChild(p)
}
