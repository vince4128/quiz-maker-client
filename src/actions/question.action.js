import axios from 'axios';
import {
    FETCH_QUESTIONS,
    FETCH_QUESTION,
    CREATE_QUESTION,
    DELETE_QUESTION,
    EDIT_QUESTION  
} from './types';

const server = 'http://localhost:3000';

export function fetchQuestions(){
    const response = axios.get(`${server}/questions`);

    return {
        type:FETCH_QUESTIONS,
        payload:response
    }
}

export function fetchQuestion(id){
    const response = axios.get(`${server}/questions/${id}`);

    return {
        type:FETCH_QUESTION,
        payload:response
    }
}

export function createQuestion(values, token, callback){
    const request = axios.post(`${server}/question`, values, {
        headers: {authorization: token}
    })
        .then(() => callback());

    return {
        type: CREATE_QUESTION,
        payload: request
    }
}

export function editQuestion(id, values, token, callback){
    const request = axios.put(`${server}/question/${id}`,values, {
        headers: {authorization:token}
    })
        .then(() => callback());

    return {
        type: EDIT_QUESTION,
        payload: request
    }
}

export function deleteQuestion(id, token){
    
    axios.delete(`${server}/question/${id}`, {
        headers: {authorization: token}
    });

    return {
        type: DELETE_QUESTION,
        payload: id
    }
}