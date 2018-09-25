import {
    FETCH_QUIZZES, FETCH_QUIZ, EDIT_QUIZ, DELETE_QUIZ, CREATE_QUESTION
} from '../actions/types';

export default (state={}, action) => {

    switch(action.type){

        case FETCH_QUIZZES:
            const data = action.payload.data.reduce((obj, item) => (obj[item._id] = item, obj), {});
            return data;

        case FETCH_QUIZ:
            return {...state, [action.payload.data._id]:action.payload.data};

        case EDIT_QUIZ:
            console.log('edit quiz !');

        case CREATE_QUESTION:
            const newQ = action.payload.values;
            state[action.payload.id].question.push(newQ);

        case DELETE_QUIZ:
            const newState = Object.keys(state)
                .filter((key) => [`${action.payload}`, '._id'].indexOf(key)<0)
                .reduce((newObj, key) => Object.assign(newObj, {[key]: state[key]}), {})

            return newState;

        default:
            return state;

    }

}