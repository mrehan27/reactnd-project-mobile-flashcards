import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export default function ActivityIndicatorOverlay({ loading = true, size = 'large' }) {
    if (!loading) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size={size} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
