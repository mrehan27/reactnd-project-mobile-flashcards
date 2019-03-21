import { setDecks } from '../utils/api';

export default (store) => (next) => (action) => {
    const value = next(action);
    const state = store.getState();
    if (state.loadingState.decks) {
        setDecks(state.decks);
    }
    return value;
};
