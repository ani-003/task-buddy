import { create } from 'zustand';
import { auth } from '../utils/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { Try } from 'expo-router/build/views/Try';
import AsyncStorage from '@react-native-async-storage/async-storage';


const useAuthStore = create((set) => ({
    user: null,
    error: '',
    loading: false,

    signup: async (email, password, name) => {
        set({ loading: true, error: '' });

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            await updateProfile(res.user, {
                displayName: name,
            });

            await AsyncStorage.setItem('user', JSON.stringify({ uid: res.user.uid, email, displayName: name }));

            set({ user: { ...res.user, displayName: name } });

        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

    login: async (email, password) => {
        set({ loading: true, error: '' });
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            await AsyncStorage.setItem('user', JSON.stringify({
                uid: res.user.uid,
                email: res.user.email,
                displayName: res.user.displayName || '',
            }));

            set({ user: { uid: res.user.uid, email: res.user.email, displayName: res.user.displayName || '' } });

        } catch (err) {
            set({ error: err.message });
        } finally {
            set({ loading: false });
        }
    },

logout: async () => {
  set({ loading: true, error: '' });
  try {
    await signOut(auth);
    await AsyncStorage.removeItem('user');
    set({ user: null });
  } catch (err) {
    set({ error: err.message });
  } finally {
    set({ loading: false });
  }
},

    loadUserFromStorage: async () => {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
            set({ user: JSON.parse(storedUser) });
        }
    },

    setUser: (user) => set({ user }),

}));

export default useAuthStore;
