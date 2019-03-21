import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card } from 'react-native-paper';
import { avatarIconBackground, avatarIconColor } from '../../utils/colors';

function DeckListItem({ deck, onPress }) {
    const { title, questions } = deck;
    return (
        <Card
            style={[styles.container]}
            onPress={() => onPress(deck)}
        >
            <Card.Title
                title={title}
                subtitle={`${questions.length} cards`}
                left={(props) => <Avatar.Icon
                    {...props}
                    icon="style"
                    color={avatarIconColor}
                    style={[styles.avatarIcon]}
                />}
            />
        </Card>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 8,
    },
    avatarIcon: {
        backgroundColor: avatarIconBackground,
    },
});

export default DeckListItem;
