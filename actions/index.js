import { showLoading, hideLoading } from 'react-redux-loading';
import { getDecks } from '../utils/api';
import { receiveDecks } from './decks';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return Promise.all([
            getDecks(),
        ]).then(([decks]) => {
            dispatch(receiveDecks(decks));
        }).finally(() => dispatch(hideLoading()));
    };
}
