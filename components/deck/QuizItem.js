import React, { Component } from 'react';
import { StyleSheet, View, Text, Animated, Easing } from 'react-native';
import { Card } from 'react-native-paper';
import { textColor, textColorSecondary, correctButtonColor, incorrectButtonColor, backgroundColor, colorPrimary } from '../../utils/colors';
import TextButton from '../core/TextButton';

class QuizItem extends Component {

    state = {
        displayQuestionOnCard: true,
        displayCardFlipValue: new Animated.Value(0),
    }

    flipQuestionCard = () => {
        const { displayQuestionOnCard, displayCardFlipValue } = this.state;
        Animated.sequence([
            Animated.timing(
                displayCardFlipValue,
                {
                    toValue: displayQuestionOnCard ? 1 : 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }
            ),
        ]).start(() => {
            this.setState({ displayQuestionOnCard: !displayQuestionOnCard });
        });
    }

    onSubmit = (correct) => {
        const { index, onAnswerSubmit } = this.props;
        const { displayQuestionOnCard } = this.state;
        onAnswerSubmit(index, correct);
        if (!displayQuestionOnCard) {
            this.flipQuestionCard();
        }
    }

    render() {
        const { displayQuestionOnCard, displayCardFlipValue } = this.state;
        const { question } = this.props;
        const cardFrontAnimationStyle = {
            opacity: displayCardFlipValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
            }),
            transform: [{
                rotateY: displayCardFlipValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                })
            }],
        };
        const cardBackAnimationStyle = {
            opacity: displayCardFlipValue,
            transform: [{
                rotateY: displayCardFlipValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['180deg', '360deg'],
                })
            }],
        };
        let questionCardStyle;
        let answerCardStyle;
        if (displayQuestionOnCard) {
            questionCardStyle = styles.cardFront;
            answerCardStyle = styles.cardBack;
        } else {
            questionCardStyle = styles.cardBack;
            answerCardStyle = styles.cardFront;
        }
        return (
            <View style={[styles.container]} >
                <Animated.View style={[styles.cardContainer, cardFrontAnimationStyle, questionCardStyle]}>
                    <Card style={[styles.card]}>
                        <Text style={[styles.cardTitle]}>
                            Question
                        </Text>
                        <Text style={[styles.cardSummary]}>
                            {question.question}
                        </Text>
                    </Card>
                </Animated.View>
                <Animated.View style={[styles.cardContainer, cardBackAnimationStyle, answerCardStyle]}>
                    <Card style={[styles.card]}>
                        <Text style={[styles.cardTitle]}>
                            Answer
                        </Text>
                        <Text style={[styles.cardSummary]}>
                            {question.answer}
                        </Text>
                    </Card>
                </Animated.View>
                <TextButton
                    mode='outlined'
                    text={displayQuestionOnCard ? 'Show Answer' : 'Show Question'}
                    color={colorPrimary}
                    style={[styles.actionButton]}
                    onPress={this.flipQuestionCard}
                />
                <TextButton
                    text='Correct'
                    color={correctButtonColor}
                    style={[styles.actionButton]}
                    onPress={() => this.onSubmit(true)}
                />
                <TextButton
                    text='Incorrect'
                    color={incorrectButtonColor}
                    style={[styles.actionButton]}
                    onPress={() => this.onSubmit(false)}
                />
                <View style={{ flex: 1 }} />
            </View >
        );
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 8,
        flex: 1,
        backgroundColor: backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    cardContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        padding: 16,
        textAlign: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardFront: {
    },
    cardBack: {
        position: 'absolute',
        top: 8,
        left: 0,
        right: 0,
    },
    cardTitle: {
        color: textColorSecondary,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 16,
    },
    cardSummary: {
        marginTop: 8,
        textAlign: 'center',
        color: textColor,
        fontWeight: '400',
        fontSize: 24,
    },
    actionButton: {
        marginTop: 16,
        alignSelf: 'stretch',
    },
});

export default QuizItem;
