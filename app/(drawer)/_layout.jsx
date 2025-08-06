import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from 'react-native-paper';

export default function DrawerLayout() {
  const theme = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: theme.colors.primary,
        drawerInactiveTintColor: theme.colors.onSurface,
        drawerActiveBackgroundColor: theme.dark ? 'rgba(127, 90, 240, 0.12)' : 'rgba(127, 90, 240, 0.08)',
        drawerStyle: {
          backgroundColor: theme.colors.surface,
          width: 280,
        },
        drawerContentStyle: {
          backgroundColor: theme.colors.surface,
        },
        drawerLabelStyle: {
          fontFamily: 'Poppins_500Medium',
          fontSize: 16,
          marginLeft: -16,
        },
        drawerItemStyle: {
          marginVertical: 4,
          borderRadius: 12,
          paddingVertical: 4,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size, focused }) => (
            <AntDesign 
              name="home" 
              size={22} 
              color={focused ? theme.colors.primary : theme.colors.onSurface} 
              style={{ marginRight: 10 }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="About"
        options={{
          drawerLabel: 'About TaskBuddy',
          drawerIcon: ({ color, size, focused }) => (
            <Feather 
              name="info" 
              size={22} 
              color={focused ? theme.colors.primary : theme.colors.onSurface} 
               style={{ marginRight: 10 }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Contact"
        options={{
          drawerLabel: 'Contact Developer',
          drawerIcon: ({ color, size, focused }) => (
            <FontAwesome6 
              name="contact-card" 
              size={20} 
              color={focused ? theme.colors.primary : theme.colors.onSurface} 
               style={{ marginRight: 10 }}
            />
          ),
        }}
      />
    </Drawer>
  );
}
