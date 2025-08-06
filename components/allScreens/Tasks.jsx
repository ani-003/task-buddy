import { Entypo } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {

  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Checkbox, useTheme } from 'react-native-paper';
import useTaskStore from '../../src/store/taskStore';




export default function Tasks({
  id,
  title = 'Task Name',
  description = 'Task Description',
  priority = 'medium',
  due = 'Due Date',
  completed = false,
  onEdit,
}) {
  const theme = useTheme();
  const { toggleTaskComplete, deleteTask, loading } = useTaskStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  const iconRef = useRef(null);

  const handleToggleComplete = async () => {
    if (id) {

      if (!canCompleteTask()) {

        console.log('Cannot complete future tasks');
        return;
      }
      await toggleTaskComplete(id);
    }
  };


  const canCompleteTask = () => {
    const today = new Date();
    const taskDate = new Date(due);
    

    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);
    

    return taskDate <= today;
  };

  const handleDelete = async () => {
    if (id) {
      await deleteTask(id);
      setModalVisible(false);
    }
  };

  const getPriorityColor = (level) => {
    switch (level) {
      case 'low':
        return '#00fc76ff';
      case 'medium':
        return '#fece31ff';
      case 'high':
        return '#f64444ff';
      default:
        return '#E0E0E0';
    }
  };

  const openModal = () => {
    if (iconRef.current) {
      iconRef.current.measure((x, y, width, height, pageX, pageY) => {
        setMenuPos({ top: pageY + height - 120, left: pageX - 80 });
        setModalVisible(true);
      });
    }
  };

  return (
    <View style={[
      styles.card, 
      { 
        backgroundColor: theme.colors.surface,
        opacity: (!completed && !canCompleteTask()) ? 0.7 : 1,
        shadowColor: theme.dark ? '#000' : '#000',
        shadowOpacity: theme.dark ? 0.3 : 0.06,
        elevation: theme.dark ? 4 : 2,
        borderColor: theme.dark ? theme.colors.outline : 'transparent',
        borderWidth: theme.dark ? 0.5 : 0,
      }
    ]}>
     
      <View style={styles.barWrapper}>
        <View style={[styles.bar, { backgroundColor: getPriorityColor(priority) }]} />
      </View>


      <View style={styles.checkboxContainer}>
        <Checkbox
          status={completed ? 'checked' : 'unchecked'}
          onPress={handleToggleComplete}
          color={theme.colors.primary}
          uncheckedColor={theme.dark ? theme.colors.outline : undefined}
          disabled={loading || (!completed && !canCompleteTask())}
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={[
          styles.title,
          {
            color: theme.colors.onSurface,
            textDecorationLine: completed ? 'line-through' : 'none',
            opacity: completed ? 0.6 : 1
          }
        ]}>
          {title}
        </Text>
        <Text style={[
          styles.desc,
          {
            color: theme.colors.onSurface,
            opacity: completed ? 0.5 : 0.8
          }
        ]}>
          {description}
        </Text>
      </View>


      <View style={styles.rightSection}>
        <View style={styles.dueDateContainer}>
          <Text style={[
            styles.due,
            {
              color: theme.colors.onSurface,
              opacity: completed ? 0.5 : 0.7
            }
          ]}>
            {due}
          </Text>
        </View>
        
        <TouchableOpacity
          ref={iconRef}
          style={[styles.menuButton, ]}
          onPress={openModal}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Entypo 
            name="dots-three-vertical" 
            size={18} 
            color={theme.colors.onSurface} 
          />
        </TouchableOpacity>
      </View>

      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={[styles.modalBackdrop, { 
            backgroundColor: theme.dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)' 
          }]} 
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContent, { 
            top: menuPos.top, 
            left: menuPos.left,
            backgroundColor: theme.colors.surface,
            shadowColor: theme.dark ? '#000' : theme.colors.shadow,
            borderColor: theme.colors.outline,
            borderWidth: theme.dark ? 1 : 0,
          }]}>
            <TouchableOpacity
              style={[styles.modalOption, styles.editOption, { 
                backgroundColor: theme.colors.primary, 
                borderTopLeftRadius: 8, 
                borderTopRightRadius: 8 
              }]}
              onPress={() => {
                setModalVisible(false);
                if (onEdit) {
                  onEdit();
                }
              }}
            >
              <Text style={[styles.modalOptionText, { color: theme.colors.onPrimary }]}>
                Edit
              </Text>
            </TouchableOpacity>
            
            <View style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
            
            <TouchableOpacity
              style={[styles.modalOption, styles.deleteOption, { 
                backgroundColor: theme.colors.errorContainer,
                borderBottomLeftRadius: 8, 
                borderBottomRightRadius: 8 
              }]}
              onPress={handleDelete}
            >
              <Text style={[styles.modalOptionText, { color: theme.colors.error }]}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 90,
    marginVertical: 6,
  
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  barWrapper: {
    height: '70%',
    justifyContent: 'center',
  },
  bar: {
    width: 4,
    height: '100%',
    borderRadius: 2,
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 8,
  },
  rightSection: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '100%',
    paddingVertical: 4,
  },
  dueDateContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
    lineHeight: 20,
  },
  desc: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 18,
  },
  due: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    textAlign: 'right',
  },
  menuButton: {
    padding: 4,
    borderRadius: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    position: 'absolute',
    borderRadius: 8,
    width: 120,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOptionText: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
  },
  editOption: {

  },
  deleteOption: {

  },
  divider: {
    height: 0.5,
    opacity: 0.3,
  },
});
