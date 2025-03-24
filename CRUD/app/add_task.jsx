import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'

const add_task = () => {

    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');

    const addTask = () => {
        return
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Task title..."
            />
            <TextInput
                style={styles.textArea}
                value={text}
                onChangeText={setText}
                placeholder="Task Description here..."
                multiline={true} // Allows multiple lines
                numberOfLines={10} // Controls the initial height (optional)
            />
            <Button
                title="Create Task"
                color="blue"
                onPress={addTask}
            />
        </View>
    )
}

export default add_task


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 10
    },
    input: {
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#fff',
        elevation: 4,
        fontWeight: 'bold',
        fontSize: 18
    },
    textArea: {
        backgroundColor: '#fff',
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        height: 200,
        elevation: 4,
        textAlignVertical: 'top', // Ensures text starts at the top
    },
});