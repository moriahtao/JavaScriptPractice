import axios from 'axios';
import { key, proxy } from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try{
            const res = await axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (e) {
            alert(e);
        }
    }


    calcTime() {
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const unitsLong = ['tablespoon', 'tablespoons', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        this.ingredients = this.ingredients.map(el => {
           // 1. uniform ingredients
            let ingredient = el.toLowerCase();
            unitsLong.forEach((cur, idx) => {
                ingredient = ingredient.replace(cur, unitsShort[idx]);
            });



           // 2. remove parenthesis
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

           // 3. parse ingredients into count, unit, and ingredient
            const arrIngredient = ingredient.split(' ');
            const unitIndex = arrIngredient.findIndex((cur) => units.includes(cur));

            let objIng;
            if (unitIndex > -1) {
                // if there is a unit
                const arrCount = arrIngredient.slice(0, unitIndex);

                let count;
                if (arrCount.length === 1) {
                    count = arrCount[0].includes('-') ?
                        Math.round(eval(arrCount[0].replace('-', '+')) * 100) / 100
                        :
                        eval(arrCount[0]);
                } else {
                    // more than one number ahead
                    count = Math.round(eval(arrIngredient.slice(0, unitIndex).join('+')) * 100) / 100;
                }
                objIng = {
                    count,
                    unit: arrIngredient[unitIndex],
                    ingredient: arrIngredient.slice(unitIndex + 1).join(' ')
                }

            } else if (parseInt(arrIngredient[0], 10)) {
                objIng = {
                    count: parseInt(arrIngredient[0], 10),
                    unit: '',
                    ingredient: arrIngredient.slice(1).join(' ')
                }
            }else if (unitIndex === -1) {
                // there is NO unit
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }
            return objIng;
        });
    }

    updateServings (type) {
        // Serving
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Ingredients
        this.ingredients.forEach(ing => {
            ing.count = ing.count * (newServings / this.servings);
        });

        this.servings = newServings;

    };
}
