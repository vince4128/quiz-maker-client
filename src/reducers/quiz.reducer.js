import {
    FETCH_QUIZZES, FETCH_QUIZ, EDIT_QUIZ, DELETE_QUIZ, CREATE_QUESTION, DELETE_QUESTION
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
            return;

        case CREATE_QUESTION:            
            const newQ = action.payload.values;
            state[action.payload.id].question.push(newQ);

        case DELETE_QUIZ:
            const newState = Object.keys(state)
                .filter((key) => [`${action.payload}`, '._id'].indexOf(key)<0)
                .reduce((newObj, key) => Object.assign(newObj, {[key]: state[key]}), {})

            return newState;
        
        case DELETE_QUESTION:
        
            alert('delete action reducer');
            const tmpState = Object.assign(state);        
            const quizToModify = tmpState[`${action.payload.id}`];
            const newQuestionArray = quizToModify.question.filter((q) => {
                return q._id != action.payload.qid;
            });
            quizToModify.question = newQuestionArray;
            tmpState[`${action.payload.id}`] = quizToModify;
            return tmpState;

        default:
            return state;

    }

}