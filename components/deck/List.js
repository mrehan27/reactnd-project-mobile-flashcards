import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { NAVIGATION_PATH_DECK_SUMMARY, NAVIGATION_PATH_DECK_ADD, DEFAULT_EMOJI_AVATAR_SIZE } from '../../utils/constants';
import { backgroundColor, avatarEmojiColor, textColor, textColorSecondary } from '../../utils/colors';
import Entypo from '@expo/vector-icons/Entypo';
import TextButton from '../core/TextButton';
import DeckListItem from './DeckListItem';

class List extends Component {

    showDeckDetails = (deck) => {
        const { navigate } = this.props.navigation;
        navigate(NAVIGATION_PATH_DECK_SUMMARY, {
            title: deck.title,
        });
    }

    render() {
        const { decks } = this.props;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                {decks.length > 0
                    ? (
                        <FlatList
                            data={decks.map((deck) => ({ ...deck, key: deck.title }))}
                            renderItem={({ item }) =>
                                <DeckListItem
                                    deck={item}
                                    onPress={this.showDeckDetails}
                                />
                            }
                        />
                    ) : (
                        <View style={[styles.displayMessageContainer]}>
                            <Entypo
                                name='emoji-sad'
                                size={DEFAULT_EMOJI_AVATAR_SIZE}
                                color={avatarEmojiColor}
                            />
                            <Text style={[styles.displayMessage, styles.displayMessageTitle]}>
                                Oops!
                            </Text>
                            <Text style={[styles.displayMessage]}>
                                You haven't added any deck yet
                            </Text>
                            <Text style={[styles.displayMessage]}>
                                Let's get started by adding one
                            </Text>
                            <TextButton style={[styles.displayMessageActionButton]}
                                text='Add Deck'
                                onPress={() => navigate(NAVIGATION_PATH_DECK_ADD)}
                            />
                        </View>
                    )
                }
            </View>
        );
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

function mapStateToProps({ decks }) {
    return {
        decks: Object.values(decks).sort((a, b) => b.timestamp - a.timestamp),
    };
}

export default connect(mapStateToProps)(List);
