const $ = (s) => document.querySelector(s);
const c$ = (s) => document.createElement(s);

const agregarBtn = $("#agregarBtn");
const nombreInput = $("#nombre");
const propietarioInput = $("#propietario");
const telefonoInput = $("#telefono");
const emailInput = $("#email");
const fechaInput = $("#fecha");
const horaInput = $("#hora");
const sintomasInput = $("#sintomas");
const alerta = $("#alerta");
const citasListado = $("#citasListado");

document.addEventListener("DOMContentLoaded", () => {
  nombreInput.addEventListener("input", leerDataInputs);
  propietarioInput.addEventListener("input", leerDataInputs);
  telefonoInput.addEventListener("input", leerDataInputs);
  emailInput.addEventListener("input", leerDataInputs);
  fechaInput.addEventListener("input", leerDataInputs);
  horaInput.addEventListener("input", leerDataInputs);
  sintomasInput.addEventListener("input", leerDataInputs);
  agregarBtn.addEventListener("click", agregarCita);
});

let citasArr = [];
let citaObj = {};
let editionMode = {
  status: false,
  id: undefined,
};

function leerDataInputs() {
  llenarCitaObj();
  const algunoVacio = Object.values(citaObj).some((item) => item === "");
  if (algunoVacio) {
    mostrarAlerta("Todos los campos deben de estar llenos", "error", alerta);
    return;
  }
}

function agregarCita() {
  if (editionMode.status) {
    const newArray = citasArr.filter((cita) => cita.id !== editionMode.id);
    llenarCitaObj();
    if (validarCita()) {
      citaObj.id = editionMode.id;
      citasArr = [...newArray, citaObj];
      mostrarCitas();
      agregarButton();
      limpiarCitaObj();
      modeAgregar();
      limpiarForm();
    }
  } else {
    leerDataInputs();
    citaObj.id = Math.floor(Math.random() * 10000000000) + Date.now();
    if (validarCita()) {
      citasArr = [...citasArr, citaObj];
      limpiarCitaObj();
      limpiarForm();
      mostrarCitas();
    }
  }
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

function validarCita() {
  const { nombre, propietario, telefono, email, sintomas } = citaObj;
  let validado = true;
  if (nombre.length < 3) {
    validado = false;
  }
  if (nombre.length > 1000) {
    validado = false;
  }
  if (propietario.length < 3) {
    validado = false;
  }
  if (propietario.length > 1000) {
    validado = false;
  }
  if (sintomas.length < 3) {
    validado = false;
  }
  if (sintomas.length > 1000) {
    validado = false;
  }
  if (telefono.length < 4) {
    validado = false;
  }
  if (!validarEmail(email)) {
    validado = false;
  }
  return validado;
}

function validarEmail(email) {
  // Expresión regular para validar direcciones de correo electrónico
  var expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Usamos el método test() de la expresión regular para verificar si el email cumple con el patrón
  return expresionRegular.test(email);
}

function limpiarForm() {
  nombreInput.value = "";
  propietarioInput.value = "";
  telefonoInput.value = "";
  emailInput.value = "";
  fechaInput.value = "";
  horaInput.value = "";
  sintomasInput.value = "";
}

function llenarCitaObj() {
  citaObj.nombre = nombreInput.value;
  citaObj.propietario = propietarioInput.value;
  citaObj.telefono = telefonoInput.value;
  citaObj.email = emailInput.value;
  citaObj.fecha = fechaInput.value;
  citaObj.hora = horaInput.value;
  citaObj.sintomas = sintomasInput.value;
}

function limpiarCitaObj() {
  citaObj = {};
}

function agregarButton() {
  agregarBtn.textContent = "Agregar Cita";
  agregarBtn.classList.remove("btn-warning");
  agregarBtn.classList.add("btn-primary");
}

function editarButton() {
  agregarBtn.textContent = "Editar Cita";
  agregarBtn.classList.remove("btn-primary");
  agregarBtn.classList.add("btn-warning");
}

function mostrarCitas() {
  limpiarNodo(citasListado);
  citasArr.forEach((cita) => {
    const { nombre, propietario, telefono, email, hora, fecha, sintomas, id } =
      cita;
    const divFlex = c$("div");
    divFlex.classList.add(
      "d-flex",
      "justify-content-between",
      "mt-3",
      "bs-secondary",
      "fondo-cita",
      "p-3",
      "rounded",
      "text-white"
    );
    const divData = c$("div");
    divData.innerHTML = `<p>Nombre: ${nombre}</p>
                         <p>Propietario: ${propietario}</p>
                         <p>Telefono: ${telefono}</p>
                         <p>Email: ${email}</p>
                         <p>Hora: ${hora}</p>
                         <p>Fecha: ${fecha}</p>
                         <p>Sintomas: ${sintomas}</p>
    `;
    const divBtn = c$("div");
    const btnEliminar = c$("btn");
    btnEliminar.classList.add("btn", "btn-danger");
    btnEliminar.onclick = () => eliminarCita(id);
    btnEliminar.textContent = "X eliminar";
    const btnEditar = c$("btn");
    btnEditar.classList.add("btn", "btn-warning", "mx-3");
    btnEditar.onclick = () => editarCita(id);
    btnEditar.textContent = "E editar";
    divBtn.appendChild(btnEliminar);
    divBtn.appendChild(btnEditar);
    divFlex.appendChild(divData);
    divFlex.appendChild(divBtn);
    citasListado.appendChild(divFlex);
  });
}

function eliminarCita(id) {
  const newArray = citasArr.filter((cita) => cita.id !== id);
  citasArr = [...newArray];
  mostrarCitas();
}

function modeEdicion(id) {
  editionMode.status = true;
  editionMode.id = id;
}

function modeAgregar() {
  editionMode.status = false;
  editionMode.id = undefined;
}

function llenarForm(cita) {
  const { nombre, propietario, telefono, email, hora, fecha, sintomas } = cita;
  nombreInput.value = nombre;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  emailInput.value = email;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;
}

function editarCita(id) {
  const cita = citasArr.find((cita) => cita.id === id);
  limpiarForm();
  llenarForm(cita);
  editarButton();
  modeEdicion(id);
}
