import React from 'react';
import { Button } from 'react-native-paper';
import { colorPrimary } from '../../utils/colors';

export default function TextButton({
    text,
    onPress,
    color = colorPrimary,
    dark = true,
    mode = 'contained',
    icon,
    ...props
}) {
    return (
        <Button
            onPress={onPress}
            mode={mode}
            color={color}
            dark={dark}
            icon={icon}
            {...props}
        >
            {text}
        </Button>
    );
}
