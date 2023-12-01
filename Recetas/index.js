


const categoria = document.querySelector('#categoria');
const resultados = document.querySelector('#resultados');
const exampleModal = document.querySelector('#exampleModal')
const exampleModalLabel = document.querySelector('#exampleModalLabel')
const modalBody = document.querySelector('#modal-body')
const modalImg = document.querySelector('#modal-body-img')
const saveFavorites = document.querySelector('#save-favorites')
const misFavoritos = document.querySelector('#mis-favoritos')


categoria.addEventListener('change', showcategory)
document.addEventListener('DOMContentLoaded', loadSelect())
misFavoritos.addEventListener('click', showFavorites)
   
let listIds = [];


async function loadSelect() {
    const url = `https://www.themealdb.com/api/json/v1/1/categories.php`
    const respuesta = await fetch(url);
    const categorias = await respuesta.json();
    const { categories } = categorias;
    categories.forEach(element => {
        const { strCategory } = element;
        const option = document.createElement('option');
        option.value = strCategory;
        option.textContent = strCategory;
        categoria.appendChild(option);
    });
}

function showcategory(e) {
    const category = e.target.value;
    if (category === '') {
        return;
    }
    showRecipes(category);
}


async function showRecipes(category) {
    limpiarHTML();
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const respuesta = await fetch(url);
    const recetas = await respuesta.json();
    const { meals } = recetas;
    meals.forEach(element => {
        const divCol = document.createElement('div');
        divCol.classList.add('col-md-4');
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = element.strMealThumb;
        const divCardBlock = document.createElement('div');
        divCardBlock.classList.add('card-block');
        const h5 = document.createElement('h5');
        h5.classList.add('card-title', 'text-center', 'mt-2');
        h5.textContent = element.strMeal;
        const divGrid = document.createElement('div');
        divGrid.classList.add('d-grid', 'gap-2');
        const button = document.createElement('button');
        button.classList.add('btn', 'recetaBtn');
        button.textContent = 'Ver Receta';
        button.onclick = () => showRecipe(element.idMeal)
        divGrid.appendChild(button);
        divCardBlock.appendChild(h5);
        divCardBlock.appendChild(divGrid);
        divCard.appendChild(img);
        divCard.appendChild(divCardBlock);
        divCol.appendChild(divCard); 
        divCol.classList.add('mt-4');   
        resultados.appendChild(divCol);

    })
}

function limpiarHTML() {
    while (resultados.firstChild) {
        resultados.removeChild(resultados.firstChild);
    }
}
const modalBoostrap = new bootstrap.Modal(exampleModal)
async function showRecipe(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    const respuesta = await fetch(url);
    const receta = await respuesta.json();
    const { meals } = receta;
    const { strMeal, strMealThumb, strInstructions } = meals[0];
    console.log(strMealThumb);
    modalImg.src = strMealThumb;
    exampleModalLabel.textContent = strMeal;
    modalBody.textContent = strInstructions;
    saveFavorites.onclick = () => saveFavoriteInLocalStorage(id)
    modalBoostrap.show()
}

function saveFavoriteInLocalStorage(id) {
    const receta = {
        id
    }
    listIds = getFavoritesFromLocalStorage();
    const existe = listIds.some(receta => receta.id === id);
    if (existe) {
        return;
    }
    listIds.push(receta);
    localStorage.setItem('favorites', JSON.stringify(listIds));
    modalBoostrap.hide()
}

function getFavoritesFromLocalStorage() {
    let favorites;
    if (localStorage.getItem('favorites') === null) {
        favorites = [];
    } else {
        favorites = JSON.parse(localStorage.getItem('favorites'));
    }
    return favorites;
}


async function showFavorites() {
    const listIds = getFavoritesFromLocalStorage();
    limpiarHTML();
    let favorites = [];
    for (const id of listIds) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id.id}`
        const respuesta = await fetch(url);
        const receta = await respuesta.json();
        const { meals } = receta;
        favorites.push(meals[0]);
    }
    favorites.forEach(element => {
        const divCol = document.createElement('div');
        divCol.classList.add('col-md-4');
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        const img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = element.strMealThumb;
        const divCardBlock = document.createElement('div');
        divCardBlock.classList.add('card-block');
        const h5 = document.createElement('h5');
        h5.classList.add('card-title', 'text-center', 'mt-2');
        h5.textContent = element.strMeal;
        const p = document.createElement('p');
        p.classList.add('card-text', 'mx-2');
        p.textContent = element.strInstructions.substring(0, 100) + '...'
        const buttonMore = document.createElement('button');
        buttonMore.classList.add('btn', 'btn-warning', 'eliminar-favoritoBtn');
        buttonMore.textContent = 'Eliminar Favorito';
        buttonMore.onclick = () => deleteFavorite(element.idMeal)
        const divGrid = document.createElement('div');
        divGrid.classList.add('d-grid', 'gap-2');
        const button = document.createElement('button');
        button.classList.add('btn', 'recetaBtn');
        button.textContent = 'Ver Receta';
        button.onclick = () => showRecipe(element.idMeal)
        divGrid.appendChild(buttonMore);
        divGrid.appendChild(button);
        divCardBlock.appendChild(h5);
        divCardBlock.appendChild(p);
        divCardBlock.appendChild(divGrid);
        divCard.appendChild(img);
        divCard.appendChild(divCardBlock);
        divCol.appendChild(divCard);    
        resultados.appendChild(divCol);
    })
}

function deleteFavorite(id) {
    const listIds = getFavoritesFromLocalStorage();
    const newListIds = listIds.filter(receta => receta.id !== id);
    localStorage.setItem('favorites', JSON.stringify(newListIds));
    showFavorites();
}


