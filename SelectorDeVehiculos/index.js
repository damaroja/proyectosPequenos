import autos from "./db.js";

const $ = (s) => document.querySelector(s);

const resultados = $("#resultados");
const anno = $("#year");
const marca = $("#marca");
const year = $("#year");
const minimo = $("#minimo");
const maximo = $("#maximo");
const puertas = $("#puertas");
const transmision = $("#transmision");
const color = $("#color");

document.addEventListener("DOMContentLoaded", () => {
  llenarSelect();
  mostrarAutos(autos);
});

marca.addEventListener("change", (e) => {
  dataObj.marca = e.target.value;
  filtrarAuto();
});
year.addEventListener("change", (e) => {
  dataObj.year = e.target.value;
  filtrarAuto();
});
minimo.addEventListener("change", (e) => {
  dataObj.minimo = e.target.value;
  filtrarAuto();
});
maximo.addEventListener("change", (e) => {
  dataObj.maximo = e.target.value;
  filtrarAuto();
});
puertas.addEventListener("change", (e) => {
  dataObj.puertas = e.target.value;
  filtrarAuto();
});
transmision.addEventListener("change", (e) => {
  dataObj.transmision = e.target.value;
  filtrarAuto();
});
color.addEventListener("change", (e) => {
  dataObj.color = e.target.value;
  console.log(dataObj);
  filtrarAuto();
});

function filtrarAuto() {
  const resultadosVehiculos = autos
        .filter(filtrarMarca)
        .filter(filtrarYear)
        .filter(filtarMin)
        .filter(filtarMax)
        .filter(filtarPuertas)
        .filter(filtarTransmision)
        .filter(filtarColor)
  mostrarAutos(resultadosVehiculos);
}

function filtrarMarca(auto) {
  if (dataObj.marca) {
    return auto.marca === dataObj.marca;
  }
  return auto;
}
function filtrarYear(auto) {
  if (dataObj.year) {
    return auto.year === +dataObj.year;
  }
  return auto;
}
function filtarMin(auto) {
  if (dataObj.minimo) {
    return auto.precio >= dataObj.minimo;
  }
  return auto;
}
function filtarMax(auto) {
  if (dataObj.maximo) {
    return auto.precio <= dataObj.maximo;
  }
  return auto;
}
function filtarPuertas(auto) {
  if (dataObj.puertas) {
    return auto.puertas === +dataObj.puertas;
  }
  return auto;
}
function filtarTransmision(auto) {
  if (dataObj.transmision) {
    return auto.transmision === dataObj.transmision;
  }
  return auto;
}
function filtarColor(auto) {
  if (dataObj.color) {
    return auto.color === dataObj.color;
  }
  return auto;
}

const max = new Date().getFullYear();
const min = max - 20;

const dataObj = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

function mostrarAutos(vehiculos) {
  limpiarNodo(resultados);
  if (vehiculos.length === 0) {
    const p = document.createElement("p");
    p.classList.add("alert", "alert-danger", "text-center", "h5");
    p.textContent = "No hay resultados";
    resultados.appendChild(p);
  }
  vehiculos.forEach((vehiculo) => {
    const { marca, year, precio, puertas, color, transmision } = vehiculo;
    const p = document.createElement("p");
    p.classList.add("alert", "alert-warning", "text-center", "h5");
    p.textContent = `Marca: ${marca}
                         Año: ${year}                    
                         Precio: ${precio}                    
                         Puertas: ${puertas}                    
                         Color: ${color}                    
                         Transmision: ${transmision}                                       
        `;
    resultados.appendChild(p);
  });
  console.log(dataObj);
}

function llenarSelect() {
  for (let i = max; i > min; i--) {
    const option = document.createElement("option");
    option.text = i;
    option.value = i;
    anno.appendChild(option);
  }
}

function limpiarNodo(nodo) {
  while (nodo.hasChildNodes()) {
    nodo.removeChild(nodo.firstChild);
  }
}
