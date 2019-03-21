import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, KeyboardAvoidingView } from 'react-native';
import { isStoreInLoadingState } from '../../utils/helpers';
import { NAVIGATION_PATH_DECK_SUMMARY, NAVIGATION_PATH_DECK_HOME } from '../../utils/constants';
import { backgroundColor, textColor, textColorError } from '../../utils/colors';
import { handleAddDeck } from '../../actions/decks';
import TextInput from '../core/TextInput';
import TextButton from '../core/TextButton';

class AddDeck extends Component {

    state = {
        title: '',
        errorMessage: '',
    };

    submitDeck = () => {
        const { title } = this.state;
        const { decks } = this.props;
        if (!decks[title]) {
            const { dispatch, navigation } = this.props;
            dispatch(handleAddDeck(title))
                .then((deck) => {
                    navigation.navigate(NAVIGATION_PATH_DECK_SUMMARY, {
                        title: title,
                    });
                    this.setState({
                        title: '',
                        errorMessage: '',
                    });
                })
                .catch((ex) => {
                    console.log(ex);
                    this.setState({
                        errorMessage: 'Unable to add your deck. Please try again.',
                    });
                });
        } else {
            this.setState({
                errorMessage: 'Deck title already present. Try another one?',
            });
        }
    }

    render() {
        const { title, errorMessage } = this.state;
        const { loading } = this.props;
        return (
            <KeyboardAvoidingView style={[styles.container]}>
                <Text style={[styles.headerText]}>
                    What should be the title of your new deck?
                </Text>
                <TextInput
                    style={[styles.inputField]}
                    autoFocus={true}
                    label='Title'
                    value={title}
                    onChangeText={(text) => this.setState({ title: text, errorMessage: '' })}
                />
                {errorMessage.length > 0 &&
                    <Text style={[styles.errorText]}>
                        {errorMessage}
                    </Text>
                }
                <View style={{ flex: 1 }} />
                <TextButton
                    style={[styles.actionButton]}
                    text='Add Deck'
                    disabled={loading || title.length === 0}
                    onPress={this.submitDeck}
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

function mapStateToProps({ loadingBar, decks }) {
    return {
        loading: isStoreInLoadingState(loadingBar),
        decks,
    };
}

export default connect(mapStateToProps)(AddDeck);
