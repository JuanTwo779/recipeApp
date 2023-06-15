//querySelecctor lets you find the Element that matches CSS selector
const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-results');
const container = document.querySelector('.container');
let searchQuery = '';

const APP_ID = 'c028b1a0';
const APP_key = '93c19ffd82fdb0e3c963891c84dbd39a';

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    // console.log(searchQuery)
    fetchAPI();
});

//connects to API
//turns data into JSON
async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

//creates a html item when looking through array
//added to generatedHTML
//appends to html file
function generateHTML(results) {
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
        `
        <div class="item">
            <img src="${result.recipe.image}" alt="">
            <div class="flex-container">
                <h1 class="title">${result.recipe.label}</h1>
                <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
            </div>
            <p class="item-data">Meal Type: ${result.recipe.mealType}</p>
            <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
            <p class="item-data">Diet Labels: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
            <p class="item-data">Health Labels: ${result.recipe.healthLabels}</p>
        </div>
        `        
    })
    searchResultDiv.innerHTML = generatedHTML;
}

