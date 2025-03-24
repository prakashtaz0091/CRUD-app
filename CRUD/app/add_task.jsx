import { View, Text, TextInput, StyleSheet, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

const add_task = () => {
    const navigate = useNavigation();

    const [title, setTitle] = React.useState('');
    const [text, setText] = React.useState('');

    const addTask = async () => {
        try {

            if (title.length == 0 || text.length == 0) {
                return
            }

            // Get existing tasks from AsyncStorage
            const jsonValue = await AsyncStorage.getItem('tasks');
            const oldTasks = jsonValue != null ? JSON.parse(jsonValue) : [];


            // Create the new task
            const newTask = {
                id: oldTasks.length + 1,
                title: title,
                description: text,
                completed: false,
            };

            // Add new task to the list and save it back
            const updatedTasks = [...oldTasks, newTask];
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));

            console.log('New task added:', newTask);

            // Navigate back to the main page
            navigate.replace('index');
        } catch (e) {
            console.error('Error saving task:', e);
        }
    };


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