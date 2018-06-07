// export const add = (a, b) => {return a + b;};
// export const multiply = (a, b) => a * b;
// export const ID = 3;
import {elements} from "./base";

export const getInput = () => elements.searchInput.value;
// no return, so use {} and no return keyword
export const clearInput = () => {
    elements.searchInput.value = '';
};
export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};
export const highlighted = id => {
    const resultArr = Array.from(document.querySelectorAll('.results__link'));
    resultArr.forEach(el => {
        // very important to add {} but without return statement
        el.classList.remove('results__link--active');
    });
    // when adding css class, we can't add . before class
    document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');

};

export const limitRecipeTitle = (title, limit = 17) => {
    if (title.length > limit) {
        // or
        // return title.length > limit ? title.substring(0, title.substring(0, limit).lastIndexOf(' ')) + '...': title;
        title = title.split(' ').reduce((acc, cur) => {
            if ((acc.length + cur.length) <= limit) {
                acc += cur + ' ';
            }
            return acc;
        }, '');
        return `${title}...`;
    }
    return title;
};

const renderRecipe = recipe => {
    const markup = `
            <li>
               <a class="results__link" href="#${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>
        `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};


const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>         
`;

/**
 * decide to display both prev and next button
 * or just one of them
 * @param page
 * @param numOfResults
 * @param resPerPage
 */
const renderButtons = (page, numOfResults, resPerPage) => {
    // round to the next integer
    const pages = Math.ceil(numOfResults / resPerPage);
    let button;
    if (page === 1) {
        // only button to go to next page
        button = createButton(1, 'next');
    } else if (page < pages && page > 1) {
        // both buttons
        button = `${createButton(page, 'prev')}${createButton(page, 'next')}`
    } else if (page === pages && pages > 1) {
        // only button to go to previous page
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};


export const renderResult = (recipes, page = 1, resPerPage = 10) => {
    // render result of current page
    // and pagination buttons
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resPerPage);
};