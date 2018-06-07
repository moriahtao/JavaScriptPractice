import axios from 'axios';
import { key, proxy } from '../config';
import Recipe from './Recipe';

export default class Search {
    constructor(query) {
        this.query = query;

    }

    // asynchronous method
    // so no function keyword
    // getResult method in the prototype
    async getResults() {
        try{
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;

        } catch (e) {
            alert(e);
        }

    }
}



// getResults('dim sum');