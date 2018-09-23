import {
    FETCH_CATEGORIES,
    FETCH_CATEGORY
} from '../actions/types';

export default (state = {}, action) => {
    switch(action.type){
        case  FETCH_CATEGORIES:
            const data = action.payload.data.reduce((obj, category) => (obj[category._id] = category, obj), {});
            return data;
        
        case FETCH_CATEGORY:
            return {...state, [action.payload.data._id]:action.payload.data};

        default:
            return state;
    }
}