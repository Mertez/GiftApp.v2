import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const MultilineTextInput = ({ placeholder, onTextChange, value, returnKeyType, onSubmitEditing, onKeyPress }) => {
    const [text, setText] = useState(value);

    const handleTextChange = (newText) => {
        setText(newText);
        if (onTextChange) {

            onTextChange(newText); // Call the callback function with the new text
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                onKeyPress={onKeyPress}
                multiline
                numberOfLines={4}
                value={text}
                onChangeText={handleTextChange} // Use the handleTextChange function
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    input: {
        height: 100,
        width: '90%',
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top',
    },
});

export default MultilineTextInput;
