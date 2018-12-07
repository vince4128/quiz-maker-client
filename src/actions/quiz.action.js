import axios from 'axios';
import SERVER from './server';

import {
    FETCH_QUIZZES,
    FETCH_QUIZ,
    CREATE_QUIZ,
    DELETE_QUIZ,
    EDIT_QUIZ
} from './types';

const server = SERVER;

export function fetchQuizzes(){
    const response = axios.get(`${server}`);

    return {
        type:FETCH_QUIZZES,
        payload:response
    }
}

export function fetchQuiz(id){
    const response = axios.get(`${server}/${id}`);

    return {
        type:FETCH_QUIZ,
        payload:response
    }
}

export const createQuiz = (values, token, callback) => async dispatch => {

    try {
        const response = await axios.post(`${server}`, values, {
            headers: {authorization: token}
        })
        const newlyCreatedObjId = response.data._id;
        callback(newlyCreatedObjId);
    } catch(e){
        alert("something went wrong ! " + e);
    }

}

export const editQuiz = (id, values, token, callback) => {

    const request = axios.put(`${server}/${id}`, values, {
        headers: {authorization:token}
    })
    .then(() => callback());

    return {
        type:EDIT_QUIZ,
        payload: request
    }

}

export const deleteQuiz = (id, token) => {

    axios.delete(`${server}/${id}`, {
        headers: {authorization:token}
    })

    return {
        type: DELETE_QUIZ,
        payload: id
    }

}