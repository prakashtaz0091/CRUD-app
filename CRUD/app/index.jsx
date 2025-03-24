import { Stack } from "expo-router";
import { Text, View, Pressable, Link, SafeAreaView, Platform, ScrollView, StyleSheet, FlatList, Button } from "react-native";
import React from "react";

export default function Index() {

  const Container = Platform.OS === 'web' ? ScrollView : SafeAreaView

  const [tasks, setTasks] = React.useState([
    { id: 1, title: 'Task 1', description: 'Description 1', completed: true },
    { id: 2, title: 'Task 2', description: 'Description 2', completed: false },
    { id: 3, title: 'Task 3', description: 'Description 3', completed: true },
  ])

  const [completedTasks, setCompletedTasks] = React.useState(tasks.filter((item) => item.completed).length)
  const [pendingTasks, setPendingTasks] = React.useState(tasks.filter((item) => !item.completed).length)

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }


  const list_header = <View>
    <Text style={styles.tasksHeaderText} >Tasks</Text>
    <View style={styles.line}></View>
  </View>


  React.useEffect(() => {
    setCompletedTasks(tasks.filter((item) => item.completed).length)
    setPendingTasks(tasks.filter((item) => !item.completed).length)
  }, [tasks])

  return (
    <Container style={styles.container}>
      <View style={styles.topBox}>
        <View style={styles.statusBox} >
          <View style={styles.statusContent}>
            <Text style={styles.statusTitle} >Total Tasks</Text>
            <Text style={styles.statusCount} >{tasks.length}</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>Completed</Text>
            <Text style={[styles.statusCount, { color: 'blue' }]}>{completedTasks}</Text>

          </View>
          <View style={styles.verticalLine}></View>
          <View style={styles.statusContent}>
            <Text style={styles.statusTitle}>Pending</Text>
            <Text style={[styles.statusCount, { color: 'red' }]}>{pendingTasks}</Text>
          </View>

        </View>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={list_header}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<Text style={{ textAlign: 'center', fontWeight: 'bold' }} >No tasks</Text>}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <View>
              <Text style={styles.taskItemTitle} >{item.title}</Text>
              <View style={[styles.statusCircle, { backgroundColor: item.completed ? 'blue' : 'red' }]} ></View>
              <Text style={styles.taskItemDescription} >{item.description}</Text>
            </View>
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteTask(item.id)}
            />
          </View>
        )}
        style={styles.taskList}
      />
      <Button title="Create New Task" />

    </Container >

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10
  },
  topBox: {
    flexDirection: 'row',
    height: '20%',
    marginVertical: 10,
    justifyContent: 'space-between',
    gap: 5
  },
  statusBox: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  statusContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  statusTitle: {
    fontWeight: 'bold',
    fontSize: 18,

  },
  statusCount: {
    fontWeight: 'bold',
    fontSize: 38,
  },
  verticalLine: {
    width: 1,
    height: '60%',
    backgroundColor: 'black'
  },
  tasksHeaderText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  line: {
    marginTop: 10,
    height: 1,
    backgroundColor: 'black',
    marginBottom: 10
  },
  taskList: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 10,
  },
  taskItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    elevation: 4,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  taskItemTitle: {
    fontWeight: 'bold',
    fontSize: 14
  },
  statusCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 5,
    right: 10
  },
  taskItemDescription: {
    fontSize: 12,
    color: 'gray'
  },
  taskDeleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5
  }
})
