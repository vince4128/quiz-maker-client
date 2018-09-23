import axios from 'axios';
import {
    FETCH_CATEGORIES,
    FETCH_CATEGORY
} from './types';

const server = 'http://localhost:3000';

export function fetchCategories(){
    const response = axios.get(`${server}/category`);

    return {
        type:FETCH_CATEGORIES,
        payload:response
    }
}

export function fetchCategory(id){
    const response = axios.get(`${server}/category/${id}`);

    return {
        type:FETCH_CATEGORY,
        payload:response
    }
}