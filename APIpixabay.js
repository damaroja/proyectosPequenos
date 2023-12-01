const apiKey = "20189565-0213dc24a03292bc6b44b358d";

const buscarBtn = document.querySelector("#buscarBtn");
const busqueda = document.querySelector("#busqueda");
const spinner = document.querySelector("#spinner");
const imagenesList = document.querySelector("#ImagenesList");
const paginadorObj = document.querySelector("#paginador");

document.addEventListener("DOMContentLoaded", () => {
  spinner.style.display = "none";
  buscarBtn.addEventListener("click", buscarImagenes);
});

async function buscarImagenes() {
  spinner.style.display = "block";
  const termino = busqueda.value;
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${termino}&per_page=100`;
  const respuesta = await fetch(url);
  const resultado = await respuesta.json();
  spinner.style.display = "none";
  paginador(resultado.hits);
}
function paginador(entrada) {
  while (paginadorObj.hasChildNodes()) {
    paginadorObj.removeChild(paginadorObj.firstChild);
  }
  while (imagenesList.hasChildNodes()) {
    imagenesList.removeChild(imagenesList.firstChild);
  }
  const resPerPage = 3;
  const totalItems = entrada.length;
  const pages = Math.ceil(totalItems / resPerPage);
  mostrarImagenes(entrada.slice(0, resPerPage));
  for (let i = 1; i <= pages; i++) {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-warning", "m-1");
    button.textContent = i;
    button.onclick = () => {
      while (imagenesList.hasChildNodes()) {
        imagenesList.removeChild(imagenesList.firstChild);
      }
      const start = (i - 1) * resPerPage;
      const end = i * resPerPage;
      const itemsPerPage = entrada.slice(start, end);
      mostrarImagenes(itemsPerPage);
    };
    //Añadimos los botones con sus onclicks
    paginadorObj.appendChild(button);
  }
}

function mostrarImagenes(items) {
  items.forEach((hit) => {
    const { previewURL, largeImageURL, type } = hit;
    const divColMd4 = document.createElement("div");
    divColMd4.classList.add("col-md-4");
    const divCard = document.createElement("div");
    divCard.classList.add("card", "mt-2");
    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = previewURL;
    const divCardBlock = document.createElement("div");
    divCardBlock.classList.add("card-block");
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.textContent = type;
    h5.classList.add('text-center', 'text-uppercase', 'my-2');
    const a = document.createElement("a");
    a.classList.add("btn", "btn-success", 'm0-auto', 'd-block', 'm-1');

    a.href = largeImageURL;
    a.rel = "nofollow noopener noreferrer";
    a.target = "_blank";
    a.textContent = "Imagen alta resolucion";
    divCardBlock.appendChild(h5);
    divCardBlock.appendChild(a);
    divCard.appendChild(img);
    divCard.appendChild(divCardBlock);
    divColMd4.appendChild(divCard);
    imagenesList.appendChild(divColMd4);
  });
}

{
/* 
                    <div class="col-md-4">
                        <div class="card">
                            <img class="card-img-top" alt="Bootstrap Thumbnail First" src="https://www.layoutit.com/img/people-q-c-600-200-1.jpg" />
                            <div class="card-block">
                                <h5 class="card-title">
                                    Card title
                                </h5>
                                <p class="card-text">
                                    Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.
                                </p>
                                <p>
                                    <a class="btn btn-primary" href="#">Action</a> <a class="btn" href="#">Action</a>
                                </p>
                            </div>
                        </div>
                    </div> */

}
