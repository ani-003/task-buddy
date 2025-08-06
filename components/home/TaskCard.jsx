import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.48;

export default function TaskCard({ title = 'Task Title' }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          height: CARD_WIDTH,
          width: CARD_WIDTH,
          shadowColor: theme.dark ? '#000' : '#aaa',
        },
      ]}
    >
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        {title}
      </Text>
      <Text style={{ color: theme.colors.onSurface }}>
        Description of the task goes here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
card: {
  borderRadius: 16,
  padding: 16,
  justifyContent: 'space-between',
  marginRight: 12,

  shadowColor: '#000',
  shadowOffset: { width: 4, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 20,
  elevation: 5,
},

  title: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
  },
});
