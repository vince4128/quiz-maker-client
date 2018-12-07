import axios from 'axios';
import SERVER from './server';
import {
    AUTH_USER,
    AUTH_ERROR,
    FETCH_USER,
    FETCH_USERS,
    SIGN_OUT
} from './types';

const server = SERVER;

export const signupAction = (formProps, callback) => /*return*/ async dispatch => { // we use redux thunk (control over the dispatch process)

    try {
    const response = await axios.post(`${server}/auth/signup`, formProps);

    const parsedToken = parseJwt(response.data.token);

    dispatch({ type: AUTH_USER, payload: {token : response.data.token, _id : parsedToken.sub} });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('_id', parsedToken.sub);
    callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use'});
    }
}

export const signinAction = (formProps, callback) => async dispatch => {

    try {
    const response = await axios.post(`${server}/auth/signin`, formProps);

    const parsedToken = parseJwt(response.data.token);

    dispatch({ type: AUTH_USER, payload: {token : response.data.token, _id : parsedToken.sub} });

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('_id', parsedToken.sub);
    callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login' + e});
    }
};

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

export function signoutAction(){

    localStorage.removeItem('token');
    localStorage.removeItem('_id');

    return {
        type: SIGN_OUT,
        payload: ''
    }
};

export function fetchUsers(token){
    const response = axios.get(`${server}/users`, {
        headers: {authorization:token}
    });

    return {
        type:FETCH_USERS,
        payload:response
    }
}

export function fetchUser(id,token){

    const response = axios.get(`${server}/user/${id}`, {
        headers: {authorization:token}
    });

    return {
        type:FETCH_USER,
        payload:response
    }
}