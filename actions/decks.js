import { showLoading, hideLoading } from 'react-redux-loading';
import { saveDeck, deleteDeck, insertQuestionToDeck, deleteQuestionFromDeck } from '../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const REMOVE_DECK = 'REMOVE_DECK';
export const ADD_QUESTION_TO_DECK = 'ADD_QUESTION_TO_DECK';
export const REMOVE_QUESTION_FROM_DECK = 'REMOVE_QUESTION_FROM_DECK';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    };
}

function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck,
    };
}

export function handleAddDeck(title) {
    return (dispatch) => {
        dispatch(showLoading());
        return saveDeck(title)
            .then((deck) => dispatch(addDeck(deck)))
            .catch((ex) => {
                console.warn('Error in handleAddDeck: ', ex);
                alert('There was an error saving your deck. Please try again!');
            })
            .finally(() => dispatch(hideLoading()));
    };
}

function removeDeck(title) {
    return {
        type: REMOVE_DECK,
        title,
    };
}

export function handleRemoveDeck(title) {
    return (dispatch) => {
        dispatch(showLoading());
        return deleteDeck(title)
            .then(() => dispatch(removeDeck(title)))
            .catch((ex) => {
                console.warn('Error in handleRemoveDeck: ', ex);
                alert('There was an error removing your deck. Please try again!');
            })
            .finally(() => dispatch(hideLoading()));
    };
}

function addQuestionToDeck(title, question) {
    return {
        type: ADD_QUESTION_TO_DECK,
        title,
        question,
    };
}

export function handleAddQuestionToDeck(title, question, answer) {
    return (dispatch) => {
        dispatch(showLoading());
        return insertQuestionToDeck(title, question, answer)
            .then((result) => dispatch(addQuestionToDeck(result.deck.title, result.question)))
            .catch((ex) => {
                console.warn('Error in handleAddQuestionToDeck: ', ex);
                alert('There was an error saving your question to deck. Please try again!');
            })
            .finally(() => dispatch(hideLoading()));
    };
}

function removeQuestionFromDeck(title, question) {
    return {
        type: REMOVE_QUESTION_FROM_DECK,
        title,
        question,
    };
}

export function handleRemoveQuestionFromDeck(title, question) {
    return (dispatch) => {
        dispatch(showLoading());
        return deleteQuestionFromDeck(title, question)
            .then(() => dispatch(removeQuestionFromDeck(title, question)))
            .catch((ex) => {
                console.warn('Error in handleRemoveQuestionFromDeck: ', ex);
                alert('There was an error removing your question from deck. Please try again!');
            })
            .finally(() => dispatch(hideLoading()));
    };
}
