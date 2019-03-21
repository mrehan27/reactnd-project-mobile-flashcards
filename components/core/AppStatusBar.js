import React from 'react';
import { View, StatusBar } from 'react-native';
import { colorPrimaryDark } from '../../utils/colors';
import { Constants as ExpoConstants } from 'expo';

export default function AppStatusBar({ backgroundColor = colorPrimaryDark, ...props }) {
    return (
        <View style={[{ backgroundColor, height: ExpoConstants.statusBarHeight }]}>
            <StatusBar
                translucent
                backgroundColor={backgroundColor}
                barStyle='light-content'
                {...props}
            />
        </View>
    );
}
