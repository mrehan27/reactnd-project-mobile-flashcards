import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { updateLastQuizTakenTime } from '../../utils/helpers';
import { backgroundColor, textColor, avatarEmojiColor, textColorSecondary } from '../../utils/colors';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TextButton from '../core/TextButton';
import QuizItem from './QuizItem';

class Quiz extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        return {
            title: deck.title,
        }
    };

    state = {
        currentQuestion: 0,
        correctAnswers: 0,
    }

    onRetakeQuiz = () => {
        this.setState({
            currentQuestion: 0,
            correctAnswers: 0,
        });
    }

    onAnswerSubmit = (index, correct) => {
        const { questions } = this.props.deck;
        this.setState((state) => ({
            currentQuestion: index + 1,
            correctAnswers: state.correctAnswers + (correct ? 1 : 0),
        }));
        if ((index + 1) >= questions.length) {
            updateLastQuizTakenTime();
        }
    }

    render() {
        const { questions } = this.props.deck;
        const { goBack } = this.props.navigation;
        const { currentQuestion, correctAnswers } = this.state;
        if (questions.length > 0) {
            if (currentQuestion >= questions.length) {
                const score = (correctAnswers / questions.length * 100).toFixed(0);
                let title;
                let emoticon;
                if (score > 75) {
                    emoticon = 'emoticon-cool'
                    title = 'Congratulaions'
                } else if (score > 50) {
                    emoticon = 'emoticon-excited'
                    title = 'Great Work'
                } else if (score > 0) {
                    emoticon = 'emoticon-happy'
                    title = 'Nicely done'
                } else {
                    emoticon = 'emoticon-neutral'
                    title = 'Oops'
                }
                return (
                    <View style={styles.container}>
                        <View style={[styles.displayMessageContainer]}>
                            <MaterialCommunityIcons
                                name={emoticon}
                                size={64}
                                color={avatarEmojiColor}
                            />
                            <Text style={[styles.displayMessage, styles.displayMessageTitle]}>
                                {title}
                            </Text>
                            <Text style={[styles.displayMessage]}>
                                You answered {score}% questions correctly
                            </Text>
                            <TextButton
                                style={[styles.displayMessageActionButton]}
                                text='Go Back to Deck'
                                onPress={() => goBack()}
                            />
                            <TextButton
                                style={[styles.displayMessageActionButton]}
                                mode='outlined'
                                text='Retake Quiz'
                                onPress={this.onRetakeQuiz}
                            />
                        </View>
                    </View>
                );
            } else {
                return (
                    <View style={styles.container}>
                        <Text style={[styles.attemptedQuestionsText]}>
                            Question: {currentQuestion + 1} / {questions.length}
                        </Text>
                        <QuizItem
                            index={currentQuestion}
                            question={questions[currentQuestion]}
                            onAnswerSubmit={this.onAnswerSubmit}
                        />
                    </View>
                );
            }
        } else {
            return (
                <View style={styles.container}>
                    <View style={[styles.displayMessageContainer]}>
                        <Entypo
                            name='emoji-neutral'
                            size={64}
                            color={avatarEmojiColor}
                        />
                        <Text style={[styles.displayMessage, styles.displayMessageTitle]}>
                            Oops!
                        </Text>
                        <Text style={[styles.displayMessage]}>
                            You haven't added any question to this deck yet
                        </Text>
                        <Text style={[styles.displayMessage]}>
                            Add some questions before taking the quiz?
                        </Text>
                        <TextButton style={[styles.displayMessageActionButton]}
                            text='Go Back to Deck'
                            onPress={() => goBack()}
                        />
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: backgroundColor,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        padding: 8,
    },
    attemptedQuestionsText: {
        textAlign: 'right',
        fontSize: 16,
        fontWeight: '500',
        color: textColorSecondary,
        marginTop: 16,
        marginBottom: 8,
        marginRight: 16,
    },
    displayMessageContainer: {
        padding: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    displayMessageTitle: {
        marginTop: 20,
        color: textColor,
    },
    displayMessage: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        color: textColorSecondary,
        marginTop: 4,
    },
    displayMessageActionButton: {
        marginTop: 16,
    },
});

function mapStateToProps({ decks }, { navigation }) {
    const { deck } = navigation.state.params;
    return {
        deck: decks[deck.title],
    };
}

export default connect(mapStateToProps)(Quiz);
