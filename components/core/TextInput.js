import React from 'react';
import { TextInput as MaterialTextInput } from 'react-native-paper';

export default function TextInput({
    label,
    value,
    onChangeText,
    mode = 'outlined',
    ...props
}) {
    return (
        <MaterialTextInput
            label={label}
            value={value}
            mode={mode}
            onChangeText={onChangeText}
            {...props}
        />
    );
}
