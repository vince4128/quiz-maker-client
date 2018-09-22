import { combineReducers } from 'redux';
import QuizReducer from './quiz.reducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    quiz:QuizReducer
})