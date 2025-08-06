import React from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from 'react-native-paper';

const { height } = Dimensions.get('window');
const SECTION_HEIGHT = height * 0.24; 

export default function DailyTasksSection({ children }) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { height: SECTION_HEIGHT }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
    
        {React.Children.map(children, (child) =>
          React.cloneElement(child, { sectionHeight: SECTION_HEIGHT })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    paddingLeft: 20,
  backgroundColor: 'yellow',

  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
