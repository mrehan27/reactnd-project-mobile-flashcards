import { AsyncStorage } from 'react-native';
import { STORAGE_KEY_DECKS } from './constants';

export function getDecks() {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(STORAGE_KEY_DECKS)
            .then((data) => {
                const results = (data === null) ? {} : JSON.parse(data);
                setTimeout(() => {
                    res(results);
                }, 500);
            })
            .catch((ex) => {
                rej(ex);
            });
    });
}

export async function setDecks(data) {
    return new Promise((res, rej) => {
        AsyncStorage.setItem(STORAGE_KEY_DECKS, JSON.stringify(data))
            .then(() => {
                res();
            })
            .catch((ex) => {
                rej(ex);
            });
    });
}

export function getDeck(id) {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(STORAGE_KEY_DECKS)
            .then((data) => {
                const results = (data !== null) ? JSON.parse(data) : {};
                const deck = results[id] ? results[id] : null;
                res(deck);
            })
            .catch((ex) => {
                rej(ex);
            });
    });
}

export function saveDeck(title) {
    const deck = {
        title: title,
        questions: [],
        timestamp: Date.now(),
    };
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(deck);
        }, 500);
    });
}

export function deleteDeck(id) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res();
        }, 500);
    });
}

export function insertQuestionToDeck(id, question, answer) {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(STORAGE_KEY_DECKS)
            .then((data) => {
                const results = (data !== null) ? JSON.parse(data) : {};
                const deck = results[id];
                if (deck !== undefined) {
                    const item = { question, answer };
                    deck.questions.concat(item);
                    results[id] = deck;
                    setTimeout(() => {
                        res({ deck, question: item });
                    }, 500);
                } else {
                    rej("Invalid ID provided");
                }
            })
            .catch((ex) => {
                rej(ex);
            });
    });
}

export function deleteQuestionFromDeck(id, question) {
    return new Promise((res, rej) => {
        AsyncStorage.getItem(STORAGE_KEY_DECKS)
            .then((data) => {
                const results = (data !== null) ? JSON.parse(data) : {};
                const deck = results[id];
                if (deck !== undefined) {
                    deck.questions = deck.questions.filter((q) => q !== question);
                    results[id] = deck;
                    setTimeout(() => {
                        res();
                    }, 500);
                } else {
                    rej("Invalid ID provided");
                }
            })
            .catch((ex) => {
                rej(ex);
            });
    });
}
