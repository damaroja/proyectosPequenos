const mesaInput = document.querySelector("#mesa");
const horaInput = document.querySelector("#hora");
const alerta = document.querySelector("#alerta");
const noModal = document.querySelector("#no-modal");
const platillos = document.querySelector("#platillos");
const table = document.querySelector("#table");
const resumen = document.querySelector("#resumen");
const resumenPedido = document.querySelector("#resumenPedido");
const pedidoText = document.querySelector("#pedido");

const modalBoostrap = new bootstrap.Modal(noModal);

let listadoPlatos = [];
let subtotal = 0;
let resumenSubtotal = 0;

document.addEventListener("DOMContentLoaded", async function () {
  const noBtn = document.querySelector("#noBtn");
  noBtn.addEventListener("click", function () {
    verificarOrden();
  });
  const data = await fetch("http://localhost:3000/platillos");
  listadoPlatos = await data.json();
});

let pedido = {
  mesa: "",
  hora: "",
  listaPlatos: [],
};

const categorias = {
  1: "Principal",
  2: "Bebida",
  3: "Postre",
};

function verificarOrden() {
  const hora = horaInput.value;
  const mesa = mesaInput.value;
  if (hora === "" || mesa === "") {
    mostrarAlerta("Todos los campos son obligatorios", "error", alerta);
    return;
  }
  pedido.mesa = mesa;
  pedido.hora = hora;
  modalBoostrap.hide();
  mostrarFront();
}

async function mostrarFront() {
  listadoPlatos.forEach((platillo) => {
    const { nombre, precio, categoria, id } = platillo;
    const tr = document.createElement("tr");
    const tdNombre = document.createElement("td");
    tdNombre.textContent = nombre;
    const tdPrecio = document.createElement("td");
    tdPrecio.textContent = precio;
    const tdCategoria = document.createElement("td");
    tdCategoria.textContent = categorias[categoria];
    tdCantidad = document.createElement("td");
    const inputCantidad = document.createElement("input");
    inputCantidad.setAttribute("type", "number");
    inputCantidad.setAttribute("min", "0");
    inputCantidad.setAttribute("max", "100");
    inputCantidad.setAttribute("value", "0");
    inputCantidad.setAttribute("data-id", id);
    inputCantidad.onchange = () => gestionarPedido(id);
    tdCantidad.appendChild(inputCantidad);
    tr.appendChild(tdNombre);
    tr.appendChild(tdPrecio);
    tr.appendChild(tdCategoria);
    tr.appendChild(tdCantidad);
    platillos.appendChild(tr);
    table.removeAttribute("hidden");
  });
}

function gestionarPedido(id) {
  const value = document.querySelector(`[data-id="${id}"]`).value;
  if (value === "0") {
    const newListaPlatos = pedido.listaPlatos.filter(
      (platillo) => platillo.id !== id
    );
    pedido.listaPlatos = [...newListaPlatos];
    mostrarPedido();
    mostrarResumen();
    return;
  }
  const platos = {
    id,
    cantidad: 0,
  };
  let { listaPlatos } = pedido;
  const existe = listaPlatos.some((platillo) => platillo.id === id);
  if (existe) {
    const newlistaPlatos = listaPlatos.map((platillo) => {
      if (platillo.id === id) {
        platillo.cantidad = value;
        return platillo;
      } else {
        return platillo;
      }
    });
    listaPlatos = [...newlistaPlatos];
  } else {
    platos.cantidad = value;
    listaPlatos.push(platos);
  }
  mostrarPedido();
  mostrarResumen();
}

function mostrarPedido() {
  resumen.removeAttribute("hidden");
  limpiarNodo(pedidoText);
  pedido.listaPlatos.forEach((platillo) => {
    listadoPlatos.forEach((p) => {
      if (p.id === platillo.id) {
        const { nombre, precio } = p;
        const pText = document.createElement("p");
        pText.textContent = `${nombre} - ${precio} x ${platillo.cantidad} = ${
          precio * platillo.cantidad
        } $`;
        subtotal += precio * platillo.cantidad;
        resumenSubtotal = subtotal;
        pedidoText.appendChild(pText);
        pedidoText.classList.add(
          "text-center",
          "h5",
          "alert",
          "alert-success",
          "mt-4"
        );
      }
    });
  });
  const p = document.createElement("p");
  p.classList.add("h4");
  p.textContent = `Subtotal: ${subtotal} $`;
  pedidoText.appendChild(p);
  subtotal = 0;
}

function mostrarResumen() {
  limpiarNodo(resumenPedido);
  const { mesa, hora } = pedido;
  const p = document.createElement("p");
  p.textContent = `Mesa: ${mesa} Hora: ${hora}`;
  resumenPedido.appendChild(p);
  resumenPedido.classList.add(
    "text-center",
    "h5",
    "alert",
    "alert-warning",
    "mt-4"
  );
  const h3 = document.createElement("h3");
  h3.textContent = "Pedido";
  resumenPedido.appendChild(h3);
  const select = document.createElement("select");
  const option = document.createElement("option");
  option.textContent = "0%";
  option.setAttribute("value", "0");
  select.appendChild(option);
  const option2 = document.createElement("option");
  option2.textContent = "10%";
  option2.setAttribute("value", "10");
  select.appendChild(option2);
  const option3 = document.createElement("option");
  option3.textContent = "25%";
  option3.setAttribute("value", "25");
  select.appendChild(option3);
  const option4 = document.createElement("option");
  option4.textContent = "50%";
  option4.setAttribute("value", "50");
  select.appendChild(option4);
  select.classList.add("form-select");
  select.onchange = () => calcularTotal(select.value);
  resumenPedido.appendChild(select);
}

function calcularTotal(value) {
  mostrarResumen();
  const total = resumenSubtotal + (resumenSubtotal * value) / 100;
  const p = document.createElement("p");
  p.textContent = `Total: ${resumenSubtotal} + ${value}% = ${total} $ `;
  p.classList.add("h3", "mt-4");
  resumenPedido.appendChild(p);
  const button = document.createElement("button");
  button.textContent = "Enviar";
  button.classList.add("btn", "btn-success", "mt-4");
  button.onclick = () => enviarPedido();
  resumenPedido.appendChild(button);
}

async function enviarPedido() {
  listadoPlatos = [];
  subtotal = 0;
  resumenSubtotal = 0;
  pedido = {
    mesa: "",
    hora: "",
    listaPlatos: [],
  };
  resumen.setAttribute("hidden", true);
  table.setAttribute("hidden", true);
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
