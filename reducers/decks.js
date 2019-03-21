import {
    RECEIVE_DECKS,
    ADD_DECK,
    REMOVE_DECK,
    ADD_QUESTION_TO_DECK,
    REMOVE_QUESTION_FROM_DECK
} from '../actions/decks';

export default function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return action.decks;

        case ADD_DECK:
            return {
                ...state,
                [action.deck.title]: action.deck,
            };

        case REMOVE_DECK:
            const newState = {};
            Object.keys(state).forEach((key) => {
                if (key !== action.title) {
                    newState[key] = state[key];
                }
            });
            return newState;

        case ADD_QUESTION_TO_DECK:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    'questions': [
                        ...state[action.title].questions,
                        action.question,
                    ],
                },
            };

        case REMOVE_QUESTION_FROM_DECK:
            return {
                ...state,
                [action.title]: {
                    ...state[action.title],
                    'questions': state[action.title].questions.filter((question) => question.question !== action.question),
                },
            };

        default:
            return state;
    }
}
