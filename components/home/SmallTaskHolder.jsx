import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import useAuthStore from '../../src/store/authStore';
import useTaskStore from '../../src/store/taskStore';
import Tasks from '../allScreens/Tasks';

export default function SmallTaskHolder({ onEditTask }) {
  const theme = useTheme();
  const { user } = useAuthStore();
  const { getFilteredTasks, fetchTasks, loading, error, filter } = useTaskStore();
  
  const filteredTasks = getFilteredTasks();

  useEffect(() => {
    if (user?.uid) {
      fetchTasks(user.uid);
    }
  }, [user?.uid]);

  if (loading) {
    return (
      <View style={[styles.centerContainer, { paddingVertical: 40 }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.onSurface, marginTop: 16 }]}>
          Loading tasks...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          Error loading tasks: {error}
        </Text>
      </View>
    );
  }

  if (filteredTasks.length === 0) {
    let emptyMessage;
    switch (filter) {
      case 'Completed':
        emptyMessage = 'No tasks completed yet';
        break;
      case 'In-progress':
        emptyMessage = 'No tasks in progress. Tap + to create a task!';
        break;
      case 'My Tasks':
      default:
        emptyMessage = 'No tasks found. Tap + to create your first task!';
        break;
    }

    return (
      <View style={styles.centerContainer}>
        <Text style={[styles.emptyText, { color: theme.colors.onSurface }]}>
          {emptyMessage}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {filteredTasks.map((task) => (
        <Tasks 
          key={task.id}
          id={task.id}
          title={task.title} 
          description={task.description} 
          priority={task.priority}
          due={task.dueDate}
          completed={task.completed}
          onEdit={() => onEditTask && onEditTask(task)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
  },
  errorText: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    opacity: 0.7,
  },
});
