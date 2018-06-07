export const elementStrings = {
    loader: 'loader'
};

export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    // wrong to select loader here, by the time the code is rendered, the loader is not available yet.
    // loader: document.querySelector(`.${elementStrings.loader}`)
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

export const renderLoader = parent => {
    const loader  = `
        <div class=${elementStrings.loader}>
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>  
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);

};

export const clearLoader = () => {
    // select the element after it is available
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        // remove element is weird
        loader.parentElement.removeChild(loader);
    }

};