
const button = document.querySelector("#button");
const region = document.querySelector("#region");
const resultado = document.querySelector("#resultado");



const city = document.querySelector("#city");
const temperature = document.querySelector("#temp");
const max = document.querySelector("#max");
const min = document.querySelector("#min");
const humedad = document.querySelector("#humedad");
const description = document.querySelector("#description");
 

document.addEventListener("DOMContentLoaded", function () {
  button.addEventListener("click", getWheater);
});

const gestionarInput = () => {
  const ciudad = region.value;
  if (
    ciudad.trim() === "" ||
    ciudad.trim() === undefined ||
    ciudad.trim() === null ||
    !isNaN(ciudad)
  ) {
    alert("Por favor ingrese una ciudad");
  }
  //Comprueba que el valor ingresado no sea un número
  return ciudad;
};

const getWheater = async() => {
  //Borrar información previa
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
  const city = gestionarInput();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b961f140c6ac9b8026ae690cb87141c`;
  try {
    const data = await fetch(url)
      .then((response) => response.json());
    formatData(data)
  } catch (error) {
    return error
  }
}



const formatData = (data) => {
  resultado.removeAttribute("hidden");
  const { name, main, weather } = data;
  const { temp, temp_max, temp_min, humidity } = main;
  const { description } = weather[0];
  const city = name;
  const temperature = temp;
  const max = temp_max;
  const min = temp_min;
  const humedad = humidity;
  const descripcion = description;
  const dataWheater = {
    city,
    temperature,
    max,
    min,
    humedad,
    descripcion,
  };
  showData(dataWheater);
}


const showData = (dataWheater) => {
  const { city, temperature, max, min, humedad, descripcion } = dataWheater;
  console.log(dataWheater);
  city.textContent = city;
  const pcity = document.createElement("p");
  pcity.textContent = city;
  pcity.classList.add("city");
  resultado.appendChild(pcity);
  const ptemperature = document.createElement("p");
  ptemperature.textContent = `Temp: ${kelvinToCelsius(temperature)}°C`
  ptemperature.classList.add("temp");
  resultado.appendChild(ptemperature);
  const div = document.createElement("div");
  div.classList.add("main");
  const pmax = document.createElement("p");
  pmax.textContent = `Max Temp: ${kelvinToCelsius(max)}°C`
  pmax.classList.add("max");
  const pmin = document.createElement("p");
  pmin.textContent = `Min Temp: ${kelvinToCelsius(min)}°C`
  pmin.classList.add("min");
  const phumedad = document.createElement("p");
  phumedad.textContent = `Humedad: ${humedad}%`;
  phumedad.classList.add("humedad");
  const pdescripcion = document.createElement("p");
  pdescripcion.classList.add("description");
  pdescripcion.textContent = 'Descripcion: ' + descripcion;
  div.appendChild(pmax);
  div.appendChild(pmin);
  div.appendChild(phumedad);
  div.appendChild(pdescripcion)
  resultado.appendChild(div);

}

//Pasar grado Kelvin a Celsius
const kelvinToCelsius = (kelvin) => {
  return Math.round(kelvin - 273.15);
};
