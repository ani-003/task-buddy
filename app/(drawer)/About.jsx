import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Linking, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Text, useTheme } from 'react-native-paper';
import TopMenu from '../../components/allScreens/TopMenu';

export default function AboutScreen() {
  const theme = useTheme();

  const openGitHub = () => {
    Linking.openURL('https://github.com/ani-003');
  };

  const openLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/in/anirban-03-das/');
  };

  const sendEmail = () => {
    Linking.openURL('mailto:anirban.d.2003@gmail.com');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.topMenuContainer}>
        <TopMenu onProfilePress={() => console.log('Profile pressed')} />
      </View>
      
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.appHeader}>
              <MaterialIcons name="task-alt" size={48} color={theme.colors.primary} />
              <View style={styles.appInfo}>
                <Text style={[styles.appTitle, { color: theme.colors.onSurface }]}>
                  TaskBuddy
                </Text>
                <Text style={[styles.appSubtitle, { color: theme.colors.onSurface }]}>
                  Your Personal Task Manager
                </Text>
              </View>
            </View>
            
            <Divider style={{ marginVertical: 16 }} />
            
            <Text style={[styles.description, { color: theme.colors.onSurface }]}>
              TaskBuddy is a task management app I built for gig workers and busy professionals. It's made with React Native and uses Firebase for data storage. The app syncs across devices and helps you stay organized.
            </Text>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
               Features
            </Text>
            <View style={styles.featuresList}>
              <Text style={[styles.featureItem, { color: theme.colors.onSurface }]}>
                • Create, edit, and delete tasks
              </Text>
              <Text style={[styles.featureItem, { color: theme.colors.onSurface }]}>
                • Color coding for priorities
              </Text>
              <Text style={[styles.featureItem, { color: theme.colors.onSurface }]}>
                • Calendar view for tasks
              </Text>
              <Text style={[styles.featureItem, { color: theme.colors.onSurface }]}>
                • Smart date handling
              </Text>
              <Text style={[styles.featureItem, { color: theme.colors.onSurface }]}>
                • Dark and light themes
              </Text>
              <Text style={[styles.featureItem, { color: theme.colors.onSurface }]}>
                • Real-time sync
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
               Tech Stack
            </Text>
            <View style={styles.techStack}>
              <Text style={[styles.techItem, { color: theme.colors.onSurface }]}>
                React Native & Expo
              </Text>
              <Text style={[styles.techItem, { color: theme.colors.onSurface }]}>
                Firebase Auth & Firestore
              </Text>
              <Text style={[styles.techItem, { color: theme.colors.onSurface }]}>
                Zustand for state management
              </Text>
              <Text style={[styles.techItem, { color: theme.colors.onSurface }]}>
                React Native Paper UI
              </Text>
              <Text style={[styles.techItem, { color: theme.colors.onSurface }]}>
                React Native Reanimated
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
               About Me
            </Text>
            <View style={styles.developerInfo}>
              <Text style={[styles.developerName, { color: theme.colors.onSurface }]}>
                Anirban Das
              </Text>
              <Text style={[styles.developerRole, { color: theme.colors.onSurface }]}>
                Learning React Native
              </Text>
              <Text style={[styles.developerQuote, { color: theme.colors.onSurface }]}>
                "Still figuring things out but having fun building apps! 🚀"
              </Text>
            </View>

            <View style={styles.socialButtons}>
              <Button
                mode="outlined"
                onPress={openGitHub}
                style={[styles.socialButton, { borderColor: theme.colors.outline }]}
                icon={() => <Ionicons name="logo-github" size={20} color={theme.colors.onSurface} />}
                textColor={theme.colors.onSurface}
              >
                GitHub
              </Button>
              <Button
                mode="outlined"
                onPress={openLinkedIn}
                style={[styles.socialButton, { borderColor: theme.colors.outline }]}
                icon={() => <Ionicons name="logo-linkedin" size={20} color={theme.colors.primary} />}
                textColor={theme.colors.onSurface}
              >
                LinkedIn
              </Button>
              <Button
                mode="outlined"
                onPress={sendEmail}
                style={[styles.socialButton, { borderColor: theme.colors.outline }]}
                icon={() => <MaterialIcons name="email" size={20} color={theme.colors.primary} />}
                textColor={theme.colors.onSurface}
              >
                Email
              </Button>
            </View>
          </Card.Content>
        </Card>

        <Text style={[styles.copyright, { color: theme.colors.onSurface }]}>
          Made by Anirban Das • 2025
        </Text>
      </ScrollView>
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
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  appInfo: {
    marginLeft: 16,
    flex: 1,
  },
  appTitle: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 22,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 12,
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 20,
  },
  techStack: {
    gap: 8,
  },
  techItem: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 20,
  },
  developerInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  developerName: {
    fontSize: 22,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 4,
  },
  developerRole: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 8,
  },
  developerQuote: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
  },
  socialButton: {
    flex: 1,
  },
  copyright: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 20,
    opacity: 0.7,
  },
});
