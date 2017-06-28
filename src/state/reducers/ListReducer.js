import {
    PULL_LIST,
    WATCH_DB
} from '../../actions/types';

const initialState = {
    playlist: '',
    db: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case PULL_LIST:
            return { ...state, playlist: action.payload }  
        case WATCH_DB:
            return { ...state, db: action.payload }    
        default:
            return state;
    }
}