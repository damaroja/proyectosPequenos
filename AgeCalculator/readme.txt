

Lo llamativo de este proyecto es que usamos la diferencia de
fechas por lo que el código de rsta de las mismas es el sigui-
ente:


  function calcularEdad() {
    const fechaActual = new Date();
    const fechaSeleccionada = new Date(fechaInput.value)
    //Diferencia entre dos fechas en años
    const diferencia = fechaActual.getFullYear() - fechaSeleccionada.getFullYear()
    resultado.innerHTML = `Tu edad es: ${diferencia} años`;
}

Observe que la fecha seleccionada es formateada con new Date()
para poder restarla de la otra.


En el archivo css tenemos que para centrar todo el contenido del
container usamos un width de 400px y lo centramos en el body con 
margin: 0 auto.
Usamos en el form la opcion flex-direction: column para convertir 
los elemento del form en elementos de bloque.
