import { combineReducers } from 'redux';
import AuthReducer from './auth.reducer';
import QuizReducer from './quiz.reducer';
import CategoryReducer from './category.reducer';

import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    auth:AuthReducer,
    quiz:QuizReducer,
    categories:CategoryReducer,
    form:formReducer
})