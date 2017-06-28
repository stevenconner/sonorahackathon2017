import {
    LOGGED_IN,
    LOG_OUT
} from '../../actions/types';

const initialState = {
    error: '',
    loading: false,
    user: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGGED_IN:
            return { ...state, user: action.payload }    
        case LOG_OUT:
            return { ...state, ...initialState }
        default:
            return state;
    }
}