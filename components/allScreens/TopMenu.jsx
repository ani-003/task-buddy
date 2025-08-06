import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import useProfileModalStore from '../../src/store/profileModalStore';

export default function TopMenu({ onProfilePress = () => { } }) {
    const navigation = useNavigation();
    const theme = useTheme();
    const { openModal } = useProfileModalStore();
    
    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Ionicons name="menu" size={28} color={theme.colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity onPress={openModal}>
                <Ionicons name="person-circle-outline" size={28} color={theme.colors.primary} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight + 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 60,
        zIndex: 1000,
    },
});
