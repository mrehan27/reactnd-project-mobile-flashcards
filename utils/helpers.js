import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';
import {
    LOADING_BAR_VISIBILITY,
    LOADING_BAR_SHOWING,
    STATUS_GRANTED,
    STORAGE_KEY_DECKS_NOTIFICATION,
    STORAGE_KEY_DECKS_LAST_QUIZ,
} from './constants';

export function isStoreInLoadingState(loading) {
    return loading[LOADING_BAR_VISIBILITY] === LOADING_BAR_SHOWING;
}

function getNextNotificationDateTime(addToDate = 0, time = Date.now()) {
    const tomorrow = new Date(time);
    tomorrow.setDate(tomorrow.getDate() + addToDate);
    tomorrow.setHours(12);
    tomorrow.setMinutes(0);
    tomorrow.setSeconds(0);
    tomorrow.setMilliseconds(0);
    if ((Date.now() - tomorrow.getTime()) >= 0) {
        tomorrow.setDate(tomorrow.getDate() + 1);
    }
    return tomorrow;
}

function createNotification() {
    return {
        title: 'Refresh your mind!',
        body: "👋 Don't forget to take your quiz for today!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        },
    };
}

export function updateLastQuizTakenTime() {
    return new Promise((res, rej) => {
        const data = { timestamp: Date.now() };
        AsyncStorage.setItem(STORAGE_KEY_DECKS_LAST_QUIZ, JSON.stringify(data))
            .then(() => {
                setNotificationForNextQuiz(getNextNotificationDateTime(1, data.timestamp).getTime());
                res();
            })
            .catch((ex) => {
                rej(ex);
            });
    });
}

export function scheduleLocalNotifications() {
    setNotificationForNextQuiz(null);
}

function setNotificationForNextQuiz(timestamp) {
    new Promise((res, rej) => {
        AsyncStorage.getItem(STORAGE_KEY_DECKS_NOTIFICATION)
            .then(JSON.parse)
            .then((data) => {
                if (timestamp == null) {
                    if (data != null && data.timestamp) {
                        res(true);
                        return;
                    } else {
                        timestamp = getNextNotificationDateTime().getTime();
                    }
                }
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === STATUS_GRANTED) {
                            Notifications.cancelAllScheduledNotificationsAsync();
                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: timestamp,
                                    repeat: 'day',
                                }
                            );
                            AsyncStorage.setItem(STORAGE_KEY_DECKS_NOTIFICATION, JSON.stringify({ timestamp: timestamp }));
                            res(true);
                        } else {
                            rej('ERROR: Permission not granted');
                        }
                    })
                    .catch((ex) => {
                        rej(ex);
                    });
            });
    });
}
