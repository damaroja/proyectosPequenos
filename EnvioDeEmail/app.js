


const $ = s => document.querySelector(s)

const email = $('#emailid')
const asunto = $('#asuntoid')
const msg = $('#msgid')
const enviar = $('#enviarBtn')
const reset = $('#resetBtn')
const spinner = $('#spinner')

let objEmail = {
  email:'',
  asunto:'',
  msg:''
}

document.addEventListener('DOMContentLoaded', () => {
  email.addEventListener('blur', leerData)
  asunto.addEventListener('blur', leerData)
  msg.addEventListener('blur', leerData)
  reset.addEventListener('click', resetForm)
  enviar.addEventListener('click', sendForm)

})

function leerData(e){
  objEmail[e.target.name] = e.target.value
  const {email, asunto, msg} = objEmail
  const camposNulo = [email, asunto, msg].some(item => item ==='')
  if(camposNulo){
    mostrarAlerta('Hay campos vacios', 'error', alerta)
    deshabilitarEnviarBtn()
    return
  }
  if(!validarEmail(email)){
    mostrarAlerta('Campo Email no valido', 'error', alerta)
    deshabilitarEnviarBtn()
    return
  }
  habilitarEnviarBtn()
}

function resetForm(){
  objEmail = {
    email:'',
    asunto:'',
    msg:''
  }
  email.value = ''
  asunto.value = ''
  msg.value = ''
}

function sendForm(){
  spinner.classList.remove('d-none')
  resetForm()
  setTimeout(() => {
    mostrarAlerta('El Email se ha enviado satisfactoriamente', 'success', alerta)
    spinner.classList.add('d-none')
    deshabilitarEnviarBtn()
  }, 2000);
}


function habilitarEnviarBtn(){
  enviar.disabled = false
  enviar.enabled = true
}

function deshabilitarEnviarBtn(){
  enviar.disabled = true
  enviar.enabled = false
}

function mostrarAlerta(msg, type, nodo){
  while(nodo.hasChildNodes()){
      nodo.removeChild(nodo.firstChild)
  }
  const p = document.createElement('p')
  if(type === 'error'){
      p.classList.add('alert', 'alert-danger')
  } else {
      p.classList.add('alert', 'alert-success')
  }
  p.textContent = msg
  nodo.appendChild(p)
  setTimeout(() => {
      p.remove()
  }, 3000);
}


function limpiarNodo(nodo){
  while(nodo.hasChildNodes()){
      nodo.removeChild(nodo.firstChild)
  }
}

function validarEmail(email) {
  var expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return expresionRegular.test(email);
}

function validarCamposNoVacios(objeto) {
  for (var propiedad in objeto) {
    if (!objeto.hasOwnProperty(propiedad)) continue; // Saltar las propiedades heredadas

    if (objeto[propiedad] === null || objeto[propiedad] === undefined || objeto[propiedad] === '') {
      return false; // Si al menos un campo está vacío, la validación falla
    }
  }
  return true; // Si todos los campos tienen valores, la validación es exitosa
}

