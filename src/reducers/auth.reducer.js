import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
    authenticated: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    _id:localStorage.getItem('_id') ? localStorage.getItem('_id') : '',
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case AUTH_USER:
            return { ...state, authenticated: action.payload.token,  _id:action.payload._id};
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
    return state;
}