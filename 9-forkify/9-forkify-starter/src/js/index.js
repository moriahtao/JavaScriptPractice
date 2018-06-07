// 8154b2b96ce7d0558ec1adeae6e5104d
// http://food2fork.com/api/search
// http://food2fork.com/api/get
//import str from './models/Search';

//import * as searchView from './views/searchView';

//console.log(`Using imported functions ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(searchView.ID, 3)}. ${str}`);
// default export
import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

// named export
import {elements, renderLoader, clearLoader} from "./views/base";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";



/**
 * The global state of the app
 * - search object
 * - current recipe object
 * - shopping list object
 * - liked object
 */
const state = {};

/** SEARCH CONTROLLER **/
const controlSearch = async () => {
    // 1) get the query from view
    const query = searchView.getInput();
    if (query) {
        // 2) new search obj and add to state
        state.search = new Search(query);
        // 3) Prepare UI for the result
        // 3.1) clear input field
        searchView.clearInput();
        // 3.2) clear results
        searchView.clearResults();
        renderLoader(elements.searchRes);
        // 4) search for the results
        // every async function automatically returns a promise
        try {
            await state.search.getResults();
            //console.log(state.search.result);
            clearLoader();
            // 5) Render the result on UI
            searchView.renderResult(state.search.result);
        } catch (e) {
            alert('error processing results!');
            clearLoader();
        }
    }
};


// search
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();

});

// pagination
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        //console.log(gotoPage);
        searchView.clearResults();
        searchView.renderResult(state.search.result, gotoPage);
    }

});

/** RECIPE CONTROLLER **/
const controlRecipe = async () => {
    // get ID from url
    const id = (window.location.hash).replace('#', '');
    if (id) {
        // 1. prepare UI for changes
        // 1.1 clear the recipe view
        recipeView.clearRecipe();
        // 1.2 render the loader
        renderLoader(elements.recipe);
        // 1.3 hightlight selected recipe
        // TODO: why adding this statement
        if (state.search) {
            searchView.highlighted(id);
        }


        // 2. create new recipe object
        state.recipe = new Recipe(id);

        try {
            // 3. get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            // 4. calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // 5. render recipe
            clearLoader();
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );
        } catch (e) {
            alert('error processing recipe!');
        }
    }
};
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

const controlList = () => {
    // 1. Create a new list if there is none
    if (!state.list) {
        state.list = new List();
    }

    // 2. Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addNewItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });

};

elements.recipe.addEventListener('click', (e) => {
    // if match and child element
    if((e.target.matches('.btn-decrease, .btn-decrease *'))) {
        // decrease btn is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

    } else if ((e.target.matches('.btn-increase, .btn-increase *'))) {
        // increase btn is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Likes controller
        controlLike();
    }
});

// handle delete and update shopping list
elements.shopping.addEventListener('click', (e) => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // delete
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);

        // delete from UI
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        // handle count update
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);

    }
});
/*
    LIKE CONTROLLER
 */
const controlLike = () => {
    if (!state.likes) {
        state.likes = new Likes();
    }
    const currentID = state.recipe.id;

    // user has NOT yet liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // 1. Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.img,
            state.recipe.author
        );


        // 2. Toggle the like button
        likesView.toggleLikedBtn(true);
        // 3. Add like to the UI list
        likesView.renderLike(newLike);

    // user has liked current recipe
    } else {
        // 1. Remove like from the state
        state.likes.deleteLike(currentID);
        // 2. Toggle the like button
        likesView.toggleLikedBtn(false);
        // 3. Remove like from the UI list
        likesView.deleteLike(currentID);

    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());

};

// restore like recipe on page loads
window.addEventListener('load', () => {
    state.likes = new Likes();
    // restore likes
    state.likes.readStorage();

    // toggle like menu
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // render the existing likes
    state.likes.likes.forEach(like => likesView.renderLike(like));

});