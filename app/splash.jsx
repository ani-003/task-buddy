import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import useAuthStore from '../src/store/authStore';

const img = require('../assets/images/react-logo.png');
const { width } = Dimensions.get('window');

export default function Splash() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { user } = useAuthStore();

useEffect(() => {

  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  const checkLoginStatus = async () => {
    await useAuthStore.getState().loadUserFromStorage();
    const user = useAuthStore.getState().user;

    setTimeout(() => {
      if (user) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/(auth)/signup');
      }
    }, 2000);
  };

  checkLoginStatus();
}, []);


  return (
    <View style={styles.container}>
      <Animated.Image
        source={img}
        style={[styles.logo, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        TaskBuddy
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
        Manage your gigs like a pro
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
