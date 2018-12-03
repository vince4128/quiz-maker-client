import { AUTH_USER, AUTH_ERROR, FETCH_USER, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    authenticated: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    _id:localStorage.getItem('_id') ? localStorage.getItem('_id') : '',
    pseudo:'',
    errorMessage: ''
};

export default function(state = INITIAL_STATE, action) {
    switch(action.type){
        case AUTH_USER:
            return { ...state, authenticated: action.payload.token,  _id:action.payload._id};
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload };
        case FETCH_USER:
            return { ...state, pseudo: action.payload.data.pseudo };      
        case SIGN_OUT:
            return { ...state, authenticated: action.payload.token,  _id:action.payload._id, pseudo:""};
        default:
            return state;
    }
    return state;
}