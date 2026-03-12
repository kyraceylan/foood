
const searchInput = document.getElementById('searchInput');

const searchButton = document.getElementById('searchButton');

const statusMessage = document.getElementById('statusMessage');

const resultContainer = document.getElementById('result');

searchButton.addEventListener('click', () => {

const query = searchInput.value.trim();

if (query) {

statusMessage.textContent = 'Searching...';

fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)

.then(response => response.json())

.then(data => {

resultContainer.innerHTML = '';

statusMessage.textContent = '';

if (data.meals) {

data.meals.forEach(meal => {

showRecipe(meal);

});

} else {

statusMessage.textContent = 'No recipes found.';

}

})

.catch(error => {

console.error('Error fetching recipes:', error);

statusMessage.textContent = 'An error occurred while fetching recipes.';

});

} else {

statusMessage.textContent = 'Please enter a search term.';

}

});

function showRecipe(meal) {

const card = document.createElement('div');

card.className = 'col-md-4';

card.innerHTML = `

<div class="card h-100">

<img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">

<div class="card-body">

<h5 class="card-title">${meal.strMeal}</h5>

<p class="card-text">${meal.strArea} | ${meal.strCategory}</p>

<a href="${meal.strSource || meal.strYoutube}" target="_blank" class="btn btn-primary">

View Recipe

</a>

</div>

</div>

`;

resultContainer.appendChild(card);

}

searchInput.addEventListener('keypress', (event) => {

if (event.key === 'Enter') {

searchButton.click();

}

});
