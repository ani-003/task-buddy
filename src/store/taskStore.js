import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    updateDoc,
    where
} from 'firebase/firestore';
import { create } from 'zustand';
import { db } from '../utils/firebaseConfig';

const useTaskStore = create((set, get) => ({
  tasks: [],
  loading: false,
  error: '',
  filter: 'My Tasks',

  addTask: async (taskData, userId) => {
    set({ loading: true, error: '' });
    try {
      const task = {
        ...taskData,
        userId,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const docRef = await addDoc(collection(db, 'tasks'), task);
      

      const newTask = { id: docRef.id, ...task };
      set(state => {
        const updatedTasks = [...state.tasks, newTask];

        updatedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        return { 
          tasks: updatedTasks,
          loading: false 
        };
      });

      return docRef.id;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },


  fetchTasks: async (userId) => {
    set({ loading: true, error: '' });
    try {
      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', userId)
      );
      
      const querySnapshot = await getDocs(q);
      const tasks = [];
      
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });


      tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

      set({ tasks, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },


  updateTask: async (taskId, updates) => {
    set({ loading: true, error: '' });
    try {
      const taskRef = doc(db, 'tasks', taskId);
      const updateData = {
        ...updates,
        updatedAt: new Date()
      };
      
      await updateDoc(taskRef, updateData);


      set(state => {
        const updatedTasks = state.tasks.map(task => 
          task.id === taskId ? { ...task, ...updateData } : task
        );

        updatedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        return {
          tasks: updatedTasks,
          loading: false
        };
      });
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },


  deleteTask: async (taskId) => {
    set({ loading: true, error: '' });
    try {
      await deleteDoc(doc(db, 'tasks', taskId));


      set(state => ({
        tasks: state.tasks.filter(task => task.id !== taskId),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },


  toggleTaskComplete: async (taskId) => {
    const task = get().tasks.find(t => t.id === taskId);
    if (task) {
      await get().updateTask(taskId, { completed: !task.completed });
    }
  },


  setFilter: (filter) => set({ filter }),


  getFilteredTasks: () => {
    const { tasks, filter } = get();
    
    let filteredTasks;
    switch (filter) {
      case 'Completed':
        filteredTasks = tasks.filter(task => task.completed);
        break;
      case 'In-progress':
        filteredTasks = tasks.filter(task => !task.completed);
        break;
      case 'My Tasks':
      default:
        filteredTasks = tasks;
        break;
    }
    

    return filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  },


  getTasksByPriority: (priority) => {
    const { tasks } = get();
    return tasks.filter(task => task.priority === priority);
  }
}));

export default useTaskStore;
