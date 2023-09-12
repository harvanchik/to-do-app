import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  Pressable,
} from 'react-native';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [duration, setDuration] = useState(0);
  const [isShowCompleted, setShowCompleted] = useState(false);

  const addTask = () => {
    if (task.trim().length > 0) {
      setTasks([
        ...tasks,
        {
          id: Date.now().toString(),
          value: task,
          duration,
          dateAdded:
            new Date().getMonth() +
            1 +
            '/' +
            new Date().getDay() +
            1 +
            '/' +
            new Date().getFullYear(),
          dateCompleted: 'N/A',
          isCompleted: false,
        },
      ]);
      setTask('');
      // clear duration
      setDuration(0);
    }
  };

  const completeTask = (taskId) => {
    // set tasks to same tasks with this tasks toggled isCompleted; do not filter out
    // update dateCompleted to now
    // do not mutate state directly
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              isCompleted: !task.isCompleted,
              dateCompleted:
                new Date().getMonth() +
                1 +
                '/' +
                new Date().getDay() +
                1 +
                '/' +
                new Date().getFullYear(),
            }
          : task
      )
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={
            tasks.length == 0 ? 'Add your first task' : 'Add another task'
          }
          style={styles.input}
          onChangeText={setTask}
          value={task}
        />
        <TextInput
          placeholder="duration"
          onChangeText={setDuration}
          selectTextOnFocus={true}
          value={duration}
        />
        <Button title="ADD" onPress={addTask} disabled={task.length == 0} />
        {/* show completed toggle */}
        <Pressable
          onPress={() => setShowCompleted(!isShowCompleted)}
          style={styles.completedBtn}
        >
          <Text style={styles.completedBtnTxt}>
            {isShowCompleted ? 'Hide Completed' : 'Show Completed'}
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={
          isShowCompleted ? tasks : tasks.filter((task) => !task.isCompleted)
        }
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.value}</Text>
            <Text style={styles.duration}>{item.duration}</Text>
            <Text style={styles.dateAdded}>Added: {item.dateAdded}</Text>
            {item.isCompleted && (
              <Text style={styles.dateAdded}>
                Completed: {item.dateCompleted}
              </Text>
            )}
            {!item.isCompleted && (
              <Pressable
                onPress={() => completeTask(item.id)}
                style={styles.btn}
              >
                <Text style={styles.btnTxt}>x</Text>
              </Pressable>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

function TaskScreen({ route, navigation }) {
  const { task } = route.params;

  const completeTask = () => {
    // Call your function to complete the task here

    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View>
      <Text>{task}</Text>
      <Button title="Done!" onPress={completeTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: { width: '10%' },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    cursor: 'pointer',
  },
  btn: {
    backgroundColor: 'red',
    width: '2rem',
    height2: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontSize: '1.5rem',
  },
  completedBtn: {
    backgroundColor: 'green',
    width: '10rem',
    height: '2rem',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '4rem',
  },
  completedBtnTxt: {
    color: 'white',
    fontSize: '1rem',
    // select none
    userSelect: 'none',
  },
});

export default App;
