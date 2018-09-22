import {
    FETCH_QUIZZES, FETCH_QUIZ
} from '../actions/types';

export default (state={}, action) => {

    switch(action.type){

        case FETCH_QUIZZES:
        alert('fetch reducer ! ');
            const data = action.payload.data.reduce((obj, item) => (obj[item._id] = item, obj), {});
            return data;

        case FETCH_QUIZ:
            return {...state, [action.payload.data._id]:action.payload.data};

        default:
            return state;

    }

}