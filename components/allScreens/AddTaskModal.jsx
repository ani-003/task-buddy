import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import {
    Button,
    RadioButton,
    Text,
    TextInput,
    useTheme,
} from 'react-native-paper';
import useAuthStore from '../../src/store/authStore';
import useTaskStore from '../../src/store/taskStore';

const AddTaskModal = ({ visible, onClose, onSubmit, editTask = null, presetDate = null }) => {
    const theme = useTheme();
    const { addTask, updateTask, loading } = useTaskStore();
    const { user } = useAuthStore();

    const editMode = !!editTask;

    const [title, setTitle] = useState(editTask?.title || '');
    const [description, setDescription] = useState(editTask?.description || '');
    const [priority, setPriority] = useState(editTask?.priority || 'medium');
    const [dueDate, setDueDate] = useState(
        editTask?.dueDate ? new Date(editTask.dueDate) : (presetDate || new Date())
    );
    const [showDatePicker, setShowDatePicker] = useState(false);

    React.useEffect(() => {
        if (editTask) {
            setTitle(editTask.title || '');
            setDescription(editTask.description || '');
            setPriority(editTask.priority || 'medium');
            setDueDate(editTask.dueDate ? new Date(editTask.dueDate) : new Date());
        } else if (presetDate) {
            setDueDate(presetDate);
        }
    }, [editTask, presetDate]);

    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'dismissed') return;
        setShowDatePicker(false);
        setDueDate(selectedDate || dueDate);
    };

    const handleSubmit = async () => {
        if (!title.trim()) return;

        try {

            const year = dueDate.getFullYear();
            const month = String(dueDate.getMonth() + 1).padStart(2, '0');
            const day = String(dueDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            const taskData = {
                title: title.trim(),
                description: description.trim(),
                priority,
                dueDate: formattedDate,
            };

            if (editMode) {
                await updateTask(editTask.id, taskData);
            } else {
                await addTask(taskData, user.uid);
            }
            
            if (!editMode) {
                setTitle('');
                setDescription('');
                setPriority('medium');
                setDueDate(new Date());
            }
            
            onClose();
            

            if (onSubmit) onSubmit(taskData);
        } catch (error) {
            console.error(`Error ${editMode ? 'updating' : 'adding'} task:`, error);
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <Pressable style={styles.backdrop} onPress={onClose} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={styles.modalWrapper}
            >
                <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
                    <ScrollView contentContainerStyle={styles.scroll}>
                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: 16,
                            }}
                        >
                            <Text style={[styles.heading, { flex: 1, color: theme.colors.onSurface }]}>
                                {editMode ? 'Edit Task' : 'Add Task'}
                            </Text>

                            <Button
                                mode="contained"
                                loading={loading}
                                onPress={handleSubmit}
                                disabled={!title.trim() || loading}
                                style={[styles.submit, { backgroundColor: theme.colors.primary }]}
                                labelStyle={{ color: theme.colors.onPrimary, fontFamily: 'Poppins_600SemiBold', fontSize: 16 }}
                            >
                                {editMode ? 'Update Task' : 'Add Task'}
                            </Button>
                        </View>


                        <TextInput
                            label="Title"
                            value={title}
                            onChangeText={setTitle}
                            mode="outlined"
                            style={styles.input}
                            textColor={theme.colors.onSurface}
                            placeholderTextColor={theme.colors.onSurface}
                            theme={{
                                colors: {
                                    onSurface: theme.colors.onSurface,
                                    onSurfaceVariant: theme.colors.onSurface,
                                    outline: theme.colors.outline,
                                    primary: theme.colors.primary,
                                    background: theme.colors.surface,
                                    placeholder: theme.colors.onSurface,
                                }
                            }}
                        />
                        <TextInput
                            label="Description"
                            value={description}
                            onChangeText={setDescription}
                            mode="outlined"
                            multiline
                            numberOfLines={3}
                            style={styles.input}
                            textColor={theme.colors.onSurface}
                            placeholderTextColor={theme.colors.onSurface}
                            theme={{
                                colors: {
                                    onSurface: theme.colors.onSurface,
                                    onSurfaceVariant: theme.colors.onSurface,
                                    outline: theme.colors.outline,
                                    primary: theme.colors.primary,
                                    background: theme.colors.surface,
                                    placeholder: theme.colors.onSurface,
                                }
                            }}
                        />

                        <Text style={[styles.label, { color: theme.colors.onSurface }]}>Priority</Text>
                        <RadioButton.Group onValueChange={setPriority} value={priority}>
                            <View style={styles.radioRow}>
                                <RadioButton.Item 
                                    label="Low" 
                                    value="low" 
                                    labelStyle={{ color: theme.colors.onSurface, fontFamily: 'Poppins_400Regular' }}
                                    color={theme.colors.primary}
                                    uncheckedColor={theme.colors.outline}
                                />
                                <RadioButton.Item 
                                    label="Medium" 
                                    value="medium" 
                                    labelStyle={{ color: theme.colors.onSurface, fontFamily: 'Poppins_400Regular' }}
                                    color={theme.colors.primary}
                                    uncheckedColor={theme.colors.outline}
                                />
                                <RadioButton.Item 
                                    label="High" 
                                    value="high" 
                                    labelStyle={{ color: theme.colors.onSurface, fontFamily: 'Poppins_400Regular' }}
                                    color={theme.colors.primary}
                                    uncheckedColor={theme.colors.outline}
                                />
                            </View>
                        </RadioButton.Group>

                        <Button
                            mode="outlined"
                            onPress={() => setShowDatePicker(true)}
                            style={[styles.input, { borderColor: theme.colors.outline }]}
                            textColor={theme.colors.onSurface}
                            buttonColor={theme.colors.surface}
                            theme={{
                                colors: {
                                    outline: theme.colors.outline,
                                    primary: theme.colors.primary,
                                }
                            }}
                        >
                            Due: {dueDate.toDateString()}
                        </Button>

                        {showDatePicker && (
                            <DateTimePicker
                                value={dueDate}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}

                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    
    },
    modalContent: {
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
        height: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        elevation: 8,
    },
    scroll: {
        paddingBottom: 40,
  
    },
    heading: {
        fontSize: 20,
        marginBottom: 12,
        fontFamily: 'Poppins_500Medium',
    },
    input: {
        marginBottom: 12,
    },
    label: {
        marginTop: 12,
        marginBottom: 6,
        fontWeight: '500',
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
    },
    radioRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    submit: {
        marginTop: 20,

    },
});

export default AddTaskModal;
