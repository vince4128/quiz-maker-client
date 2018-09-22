import axios from 'axios';

import {
    FETCH_QUIZZES,
    FETCH_QUIZ
} from './types';

const server = 'http://localhost:3000';

export function fetchQuizzes(){
    alert('fetch quizzes');
    const response = axios.get(`${server}`);

    return {
        type:FETCH_QUIZZES,
        payload:response
    }
}

export function fetchQuiz(id){
    alert('fetch quiz');
    const response = axios.get(`${server}/${id}`);

    return {
        type:FETCH_QUIZ,
        payload:response
    }
}