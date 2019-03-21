import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';
import decks from './decks';
import { RECEIVE_DECKS } from '../actions/decks';

export default combineReducers({
    decks,
    loadingState,
    loadingBar: loadingBarReducer,
});

// Reducer to check if data is loaded at least once
function loadingState(state = { decks: false }, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                decks: true,
            };
    }
    return state;
}
