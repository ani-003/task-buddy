import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import useAuthStore from '../../../src/store/authStore';


import TopMenu from '../../../components/allScreens/TopMenu';

import AddTaskButton from '../../../components/allScreens/AddTaskButton';
import AddTaskModal from '../../../components/allScreens/AddTaskModal';
import Header from '../../../components/home/Header';
import SmallTaskHolder from '../../../components/home/SmallTaskHolder';
import TabsSection from '../../../components/home/TabSection';



export default function Home() {
  const { user, logout } = useAuthStore();
  const theme = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = (task) => {
    console.log('New task submitted:', task);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setEditingTask(null);
  };

  const displayName = user?.displayName || 'User';
  const firstName = displayName.split(' ')[0];

  const router = useRouter();


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
  
      <View style={styles.topMenuContainer}>
        <TopMenu onProfilePress={() => console.log('Profile pressed')} />
      </View>


      <View style={styles.headerContainer}>
        <Header userName={firstName} />
      </View>


      <View style={styles.contentContainer}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <TabsSection onTabChange={(tab) => console.log('Selected tab:', tab)} />
          <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>Daily Tasks</Text>
          <SmallTaskHolder title="Daily Tasks" onEditTask={handleEditTask} />
        </ScrollView>
      </View>


      <AddTaskButton onPress={() => setModalVisible(true)} />
      
   
      <AddTaskModal
        visible={modalVisible}
        onClose={handleCloseModal}
        onSubmit={handleAddTask}
        editTask={editingTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topMenuContainer: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  headerContainer: {
    width: '100%',

  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    marginLeft: 20,
    marginBottom: 10,
  },
});


