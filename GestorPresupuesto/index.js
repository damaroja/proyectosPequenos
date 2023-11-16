







const $ = (s) => document.querySelector(s);


const nombreInput = $('#nombre')
const cantidadInput = $('#cantidad')
const agregarBtn = $('#agregarBtn')
const listadoGastos = $('#listadoGastos')
const presupuestoText = $('#presupuesto')
const restanteText = $('#restante')



document.addEventListener("DOMContentLoaded", () => {
  const presupuesto = introducirPresupuesto()
  sesionPresupuesto.presupuesto = +presupuesto
  sesionPresupuesto.restante = +presupuesto
  presupuestoText.classList.add('alert', 'alert-primary', 'text-white', 'h4', 'mt-5')
  presupuestoText.textContent = `Presupuesto: ${sesionPresupuesto.presupuesto} $`
  actualizarRestante()
});

agregarBtn.addEventListener('click', agregarGasto)


const sesionPresupuesto = {
  presupuesto: 0,
  listadoGastos: new Array(),
  restante: 0
}


function mostrarAlerta(msg, type, nodo) {
  limpiarNodo(nodo);
  const p = document.createElement("p");
  if (type === "error") {
    p.classList.add("alert", "alert-danger", 'mt-5');
  } else {
    p.classList.add("alert", "alert-success", 'mt-5');
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

function introducirPresupuesto(){
  let respuesta = prompt("Introduce un presupuesto valido");
  while (
    respuesta.trim() === "" ||
    respuesta === null ||
    respuesta <= 0 ||
    respuesta === undefined ||
    isNaN(respuesta)
  ) {
    respuesta = prompt("Introduce un presupuesto valido");
  }
  return respuesta
}

function agregarGasto(){
  const nombre = nombreInput.value
  const cantidad = cantidadInput.value
  if((nombre.trim() === '') || cantidad <= 0) {
    mostrarAlerta('Los campos son obligatorios', 'error', alerta)
    return
  }
  if(cantidad > +sesionPresupuesto.restante){
    mostrarAlerta('La cantidad supera el restante', 'error', alerta)
    return
  }
  sesionPresupuesto.restante -= +cantidad
  actualizarRestante()
  sesionPresupuesto.listadoGastos.push({
    nombre,
    cantidad,
    id: Math.floor(Math.random() * 1000000000000) + Date.now()
  })
  nombreInput.value = ''
  cantidadInput.value = ''
  mostrarGastos()
}

function mostrarGastos(){
  limpiarNodo(listadoGastos)
  sesionPresupuesto.listadoGastos.forEach(gasto => {
    const div = document.createElement('div')
    div.classList.add('d-flex' ,'justify-content-between', 'align-items-center')
    spanNombre = document.createElement('span')
    spanCantidad = document.createElement('span')
    spanCantidad.textContent = `Nombre: ${gasto.nombre}`
    spanNombre.textContent = `Cantidad: ${gasto.cantidad}`
    btn = document.createElement('button')
    btn.classList.add('btn', 'btn-danger', 'mt-2')
    btn.textContent = 'X'
    btn.onclick = () => eliminarGasto(gasto.id)
    div.appendChild(spanNombre)
    div.appendChild(spanCantidad)
    div.appendChild(btn)
    listadoGastos.appendChild(div)
  })
}

function eliminarGasto(id){
  const newArr = sesionPresupuesto.listadoGastos.filter(gasto => gasto.id !== +id)
  const itemEliminado = sesionPresupuesto.listadoGastos.find(gasto => gasto.id === +id)
  sesionPresupuesto.listadoGastos = [...newArr]
  sesionPresupuesto.restante += +itemEliminado.cantidad
  mostrarGastos()
  actualizarRestante()
}

function actualizarRestante(){
  limpiarNodo(restanteText)
  restanteText.textContent = `Restante: ${sesionPresupuesto.restante} $`
  restanteText.classList.add('alert', 'alert-danger', 'text-white', 'h4')
}




