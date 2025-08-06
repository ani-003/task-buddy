import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import AddTaskModal from '../../../components/allScreens/AddTaskModal';
import TopMenu from '../../../components/allScreens/TopMenu';
import useAuthStore from '../../../src/store/authStore';
import useTaskStore from '../../../src/store/taskStore';

export default function Calendar() {
  const theme = useTheme();
  const { tasks, fetchTasks } = useTaskStore();
  const { user } = useAuthStore();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      fetchTasks(user.uid);
    }
  }, [user]);


  const getTasksForDate = (date) => {

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    return tasks.filter(task => task.dueDate === dateString);
  };


  const hasTasksOnDate = (date) => {
    return getTasksForDate(date).length > 0;
  };


  const getMonthName = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long' });
  };

  const getYear = (date) => {
    return date.getFullYear();
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSameDate = (date1, date2) => {
    return date1.toDateString() === date2.toDateString();
  };


  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };


  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];


    for (let i = 0; i < firstDay; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.dayCell} />
      );
    }


    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const hasTask = hasTasksOnDate(date);
      const isSelectedDate = isSameDate(date, selectedDate);
      const isTodayDate = isToday(date);

      days.push(
        <TouchableOpacity
          key={day}
          style={[
            styles.dayCell,
            styles.dayButton,
            isTodayDate && [styles.todayCell, { borderColor: theme.colors.primary }],
            isSelectedDate && [styles.selectedCell, { backgroundColor: theme.colors.primary }],
          ]}
          onPress={() => setSelectedDate(date)}
        >
          <Text style={[
            styles.dayText,
            { color: theme.colors.onSurface },
            isSelectedDate && { color: theme.colors.onPrimary },
            isTodayDate && !isSelectedDate && { color: theme.colors.primary, fontFamily: 'Poppins_600SemiBold' }
          ]}>
            {day}
          </Text>
          {hasTask && (
            <View style={[
              styles.taskIndicator,
              { backgroundColor: isSelectedDate ? theme.colors.onPrimary : theme.colors.primary }
            ]} />
          )}
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>

      <View style={styles.topMenuContainer}>
        <TopMenu onProfilePress={() => console.log('Profile pressed')} />
      </View>


      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
            <Ionicons name="chevron-back" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>

          <Text style={[styles.monthYear, { color: theme.colors.onSurface }]}>
            {getMonthName(currentDate)} {getYear(currentDate)}
          </Text>

          <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
            <Ionicons name="chevron-forward" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
        </View>


        <View style={styles.weekHeader}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <View key={day} style={styles.weekDayCell}>
              <Text style={[styles.weekDayText, { color: theme.colors.onSurface }]}>
                {day}
              </Text>
            </View>
          ))}
        </View>


        <View style={styles.calendarGrid}>
          {renderCalendarDays()}
        </View>


        <View style={styles.tasksSection}>
          <View style={styles.tasksSectionHeader}>
            <Text style={[styles.tasksSectionTitle, { color: theme.colors.onSurface }]}>
              Tasks for {selectedDate.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
              onPress={() => setIsAddModalVisible(true)}
            >
              <Ionicons name="add" size={20} color={theme.colors.onPrimary} />
            </TouchableOpacity>
          </View>

          {getTasksForDate(selectedDate).length > 0 ? (
            getTasksForDate(selectedDate).map((task) => (
              <View key={task.id} style={[styles.taskItem, { backgroundColor: theme.colors.surface }]}>
                <View style={[styles.taskPriority, {
                  backgroundColor: task.priority === 'high' ? '#f64444ff' :
                    task.priority === 'medium' ? '#fece31ff' : '#00fc76ff'
                }]} />
                <View style={styles.taskContent}>
                  <Text style={[styles.taskTitle, { color: theme.colors.onSurface }]}>
                    {task.title}
                  </Text>
                  {task.description ? (
                    <Text style={[styles.taskDescription, { color: theme.colors.onSurface }]}>
                      {task.description}
                    </Text>
                  ) : null}
                </View>
              </View>
            ))
          ) : (
            <Text style={[styles.noTasksText, { color: theme.colors.onSurface }]}>
              No tasks scheduled for this date
            </Text>
          )}
        </View>
      </ScrollView>

      <AddTaskModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        presetDate={selectedDate}
      />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenuContainer: {
    height: 70,
    width: '100%',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  navButton: {
    padding: 10,
    borderRadius: 8,
  },
  monthYear: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
  },
  weekHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  weekDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  weekDayText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    flex: 1,
    minWidth: '14.28571%',
    maxWidth: '14.28571%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginVertical: 4,
  },
  lastInRow: {

  },
  dayButton: {
    borderRadius: 6,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCell: {
    borderWidth: 2,
  },
  selectedCell: {
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  taskIndicator: {
    position: 'absolute',
    bottom: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  tasksSection: {
    marginTop: 30,
    paddingBottom: 20,
  },
  tasksSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  tasksSectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    flex: 1,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  taskItem: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  taskPriority: {
    width: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 2,
  },
  taskDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 16,
  },
  noTasksText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
});
