import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { handleRemoveDeck } from '../../actions/decks';
import { NAVIGATION_PATH_QUESTION_ADD, NAVIGATION_PATH_DECK_QUIZ } from '../../utils/constants';
import { backgroundColor, textColor } from '../../utils/colors';
import TextButton from '../core/TextButton';

class DeckDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params;
        return {
            title: title,
        }
    };

    addCard = () => {
        const { deck } = this.props;
        const { navigate } = this.props.navigation;
        navigate(NAVIGATION_PATH_QUESTION_ADD, {
            deck: deck,
        });
    }

    startQuiz = () => {
        const { deck } = this.props;
        const { navigate } = this.props.navigation;
        navigate(NAVIGATION_PATH_DECK_QUIZ, {
            deck: deck,
        });
    }

    deleteDeck = () => {
        const { deck } = this.props;
        Alert.alert(
            'Delete Deck?',
            `Are you sure you want to delete ${deck.title}`,
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        const { dispatch, navigation } = this.props;
                        dispatch(handleRemoveDeck(deck.title))
                            .then(() => {
                                navigation.goBack();
                            })
                            .catch((ex) => {
                                console.log(ex);
                            });
                    },
                },
            ],
            { cancelable: true },
        );
    }

    render() {
        const { deck } = this.props;
        if (deck === null) {
            return null;
        }
        const { title, questions } = deck;
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }} />
                <Text style={[styles.headerText]}>
                    {title}
                </Text>
                <Text style={[styles.descriptionText]}>
                    {`${questions.length} cards`}
                </Text>
                <View style={{ flex: 1 }} />
                <TextButton
                    style={[styles.actionButton]}
                    mode='outlined'
                    text='Add Card'
                    onPress={this.addCard}
                />
                <TextButton
                    style={[styles.actionButton]}
                    mode='contained'
                    text='Start Quiz'
                    onPress={this.startQuiz}
                />
                <TextButton
                    style={[styles.actionButton]}
                    mode='text'
                    text='Delete Deck'
                    onPress={this.deleteDeck}
                />
                <View style={{ flex: 1 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: backgroundColor,
        padding: 32,
    },
    headerText: {
        marginTop: 16,
        fontSize: 24,
        fontWeight: '500',
        textAlign: 'center',
        color: textColor,
    },
    descriptionText: {
        marginTop: 16,
        fontSize: 18,
        textAlign: 'center',
        color: textColor,
    },
    actionButton: {
        marginTop: 24,
    },
});

function mapStateToProps({ decks }, { navigation }) {
    const { title } = navigation.state.params;
    return {
        deck: decks[title] ? decks[title] : null,
    };
}

export default connect(mapStateToProps)(DeckDetails);
