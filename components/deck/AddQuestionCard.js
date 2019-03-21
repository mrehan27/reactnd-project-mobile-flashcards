import React, { Component } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { handleAddQuestionToDeck } from '../../actions/decks';
import { isStoreInLoadingState } from '../../utils/helpers';
import { backgroundColor, textColor, textColorError } from '../../utils/colors';
import TextInput from '../core/TextInput';
import TextButton from '../core/TextButton';

class AddQuestionCard extends Component {

    static navigationOptions = ({ navigation }) => {
        const { deck } = navigation.state.params;
        return {
            title: deck.title,
        }
    };

    state = {
        question: '',
        answer: '',
        errorMessage: '',
    };

    submitQuestion = () => {
        const { question, answer } = this.state;
        const { deck } = this.props;
        const { dispatch, navigation } = this.props;
        dispatch(handleAddQuestionToDeck(deck.title, question, answer))
            .then(() => {
                navigation.goBack();
            })
            .catch((ex) => {
                console.log(ex);
                this.setState({
                    errorMessage: 'Unable to save your question. Please try again.',
                });
            });
    }

    render() {
        const { question, answer, errorMessage } = this.state;
        const { loading } = this.props;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={[styles.headerText]}>
                    Add Card
                </Text>
                <TextInput
                    style={[styles.inputField]}
                    autoFocus={true}
                    label='Question'
                    value={question}
                    onChangeText={(text) => this.setState({ question: text, errorMessage: '' })}
                />
                {errorMessage.length > 0 &&
                    <Text style={[styles.errorText]}>
                        {errorMessage}
                    </Text>
                }
                <TextInput
                    style={[styles.inputField]}
                    label='Answer'
                    value={answer}
                    onChangeText={(text) => this.setState({ answer: text })}
                />
                <View style={{ flex: 1 }} />
                <TextButton
                    style={[styles.actionButton]}
                    text='Submit'
                    disabled={loading || question.length === 0 || answer.length === 0}
                    onPress={this.submitQuestion}
                />
            </KeyboardAvoidingView>
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
        marginBottom: 16,
        fontSize: 24,
        textAlign: 'center',
        color: textColor,
    },
    inputField: {
        marginTop: 16,
        alignSelf: 'stretch',
        color: textColor,
    },
    errorText: {
        marginTop: 8,
        alignSelf: 'stretch',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'left',
        color: textColorError,
    },
    actionButton: {
        alignSelf: 'stretch',
    },
});


function mapStateToProps({ loadingBar }, { navigation }) {
    const deck = navigation.state.params.deck;
    return {
        loading: isStoreInLoadingState(loadingBar),
        deck: deck,
    };
}

export default connect(mapStateToProps)(AddQuestionCard);
