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

export function fetchQuestion(id,qid){
    const response = axios.get(`${server}/${id}/${qid}`);

    return {
        type:FETCH_QUESTION,
        payload:response
    }
}

export function createQuestion(id, values, token, callback){

    const request = axios.post(`${server}/${id}/question`, values, {
        headers: {authorization: token}
    })
        .then(() => callback());

    return {
        type: CREATE_QUESTION,
        payload: {id,values}
    }
}

export function editQuestion(idQuiz, idQuestion, values, token, callback){
    //console.log("edit question idQuestion !!!! ", idQuestion);
    const request = axios.put(`${server}/${idQuiz}/question/edit/${idQuestion}`,values, {
        headers: {authorization:token}
    })
        .then(() => callback());

    return {
        type: EDIT_QUESTION,
        payload: {idQuiz,idQuestion,values}
    }
}

export function deleteQuestion(id, qid, token, callback){

    console.log('deleteQuestion ! Action ', id, qid, token);
    
    axios.delete(`${server}/${id}/question/${qid}`, {
        headers: {authorization: token}
    })
    .then(() => callback());

    return {
        type: DELETE_QUESTION,
        payload: {id, qid}
    }
}