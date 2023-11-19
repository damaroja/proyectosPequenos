const recipeList = document.querySelector(".recipe-list");

/**
 * Retrieves recipes from an API.
 * @returns {Promise<Object>} A promise that resolves to the recipe data.
 */



async function getRecipes() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?f=b"
  );
  const data = await response.json();
  return data;
}

async function init() {
  const recipes = await getRecipes();
  recipes.meals.forEach((recipe) => {
    const recipeItem = document.createElement("li");
    recipeItem.classList.add("recipe-item");

    const recipeImg = document.createElement("img");
    recipeImg.classList.add("img-recipe");
    recipeImg.src = recipe.strMealThumb;
    recipeImg.alt = recipe.strMeal;

    const recipeName = document.createElement("h2");
    recipeName.innerText = recipe.strMeal;

    const recipeIngredients = document.createElement("p");
    recipeIngredients.innerHTML = `<strong>Ingredients:</strong> ${recipe.strIngredient1}, ${recipe.strIngredient2}, ${recipe.strIngredient3}`;

    const recipeLink = document.createElement("a");
    recipeLink.href = recipe.strYoutube;
    recipeLink.innerText = "View recipe";

    recipeItem.append(recipeImg, recipeName, recipeIngredients, recipeLink);
    recipeList.append(recipeItem);
  });
}

init();
