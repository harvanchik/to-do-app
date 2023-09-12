import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

const TaskDetails = ({ route, navigation, tasks }) => {
  const [task, setTask] = useState(null);

  useEffect(() => {
    const { id } = route.params;
    const task = tasks.find((task) => task.id === id);
    setTask(task);
  }, []);

  const completeTask = () => {
    const { id } = route.params;
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: true } : task
    );
    navigation.navigate('Home', { tasks: updatedTasks });
  };

  return (
    <View>
      <Text>{task?.value}</Text>
      <Text>{task?.duration}</Text>
      <Button title="Done!" onPress={completeTask} />
    </View>
  );
};

export default TaskDetails;
