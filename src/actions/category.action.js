import axios from 'axios';
import {
    FETCH_CATEGORIES,
    FETCH_CATEGORY,
    CREATE_CATEGORY,
    EDIT_CATEGORY,
    DELETE_CATEGORY
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

export function createCategory(values, token, callback){
    const request = axios.post(`${server}/category`,values, {
        headers: {authorization: token}
    })
        .then(() => callback());

    return {
        type: CREATE_CATEGORY,
        payload: request
    }
}

export function editCategory(id, values, token, callback){
    const request = axios.put(`${server}/category/${id}`,values, {
        headers: {authorization:token}
    })
        .then(() => callback());

    return {
        type: EDIT_CATEGORY,
        payload: request
    }
}

export function deleteCategory(id, token){
    
    axios.delete(`${server}/category/${id}`, {
        headers: {authorization:token}
    });

    return {
        type: DELETE_CATEGORY,
        payload: id
    }
}