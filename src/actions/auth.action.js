import axios from 'axios';
import {
    AUTH_USER,
    AUTH_ERROR
} from './types';

const server = 'http://localhost:3000';

export const signupAction = (formProps, callback) => /*return*/ async dispatch => { // we use redux thunk (control over the dispatch process)

    try {
    const response = await axios.post(`${server}/auth/signup`, formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use'});
    }
};

export const signinAction = (formProps, callback) => async dispatch => {

    alert(JSON.stringify(formProps));

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

    alert('signout lancé !', localStorage._id);

    localStorage.removeItem('token');
    localStorage.removeItem('_id');

    return {
        type: AUTH_USER,
        payload: ''
    }
};