import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Alert, Linking, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, IconButton, Text, useTheme } from 'react-native-paper';

import TopMenu from '../../components/allScreens/TopMenu';

export default function ContactScreen() {
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

  const copyEmail = () => {
    Alert.alert(
      'Email Copied!',
      'anirban.d.2003@gmail.com has been copied to your clipboard.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const openPortfolio = () => {
    Alert.alert(
      'Portfolio Coming Soon!',
      'My portfolio is still under development. Check out my GitHub instead!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'View GitHub', onPress: openGitHub }
      ]
    );
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
            <View style={styles.headerSection}>
              <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                  <Text style={[styles.avatarText, { color: theme.colors.onPrimary }]}>AD</Text>
                </View>
              </View>
              <Text style={[styles.name, { color: theme.colors.onSurface }]}>
                Anirban Das
              </Text>
              <Text style={[styles.title, { color: theme.colors.onSurface }]}>
                Full Stack Developer
              </Text>
              <Text style={[styles.location, { color: theme.colors.onSurface }]}>
                 India
              </Text>
            </View>
          </Card.Content>
        </Card>

     
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
               Get In Touch
            </Text>
            
            <View style={styles.contactItem}>
              <MaterialIcons name="email" size={24} color={theme.colors.primary} />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactLabel, { color: theme.colors.onSurface }]}>
                  Email
                </Text>
                <Text style={[styles.contactValue, { color: theme.colors.onSurface }]}>
                  anirban.d.2003@gmail.com
                </Text>
              </View>
              <IconButton
                icon="content-copy"
                size={20}
                iconColor={theme.colors.onSurface}
                onPress={copyEmail}
              />
            </View>

            <View style={styles.contactItem}>
              <Ionicons name="logo-github" size={24} color={theme.colors.onSurface} />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactLabel, { color: theme.colors.onSurface }]}>
                  GitHub
                </Text>
                <Text style={[styles.contactValue, { color: theme.colors.onSurface }]}>
                  github.com/ani-003
                </Text>
              </View>
              <IconButton
                icon="open-in-new"
                size={20}
                iconColor={theme.colors.onSurface}
                onPress={openGitHub}
              />
            </View>

            <View style={styles.contactItem}>
              <Ionicons name="logo-linkedin" size={24} color="#0077B5" />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactLabel, { color: theme.colors.onSurface }]}>
                  LinkedIn
                </Text>
                <Text style={[styles.contactValue, { color: theme.colors.onSurface }]}>
                  linkedin.com/in/anirban-03-das/
                </Text>
              </View>
              <IconButton
                icon="open-in-new"
                size={20}
                iconColor={theme.colors.onSurface}
                onPress={openLinkedIn}
              />
            </View>
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
               Quick Actions
            </Text>
            
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                onPress={sendEmail}
                style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                icon={() => <MaterialIcons name="email" size={20} color={theme.colors.onPrimary} />}
                textColor={theme.colors.onPrimary}
              >
                Send Email
              </Button>
              
              <Button
                mode="outlined"
                onPress={openLinkedIn}
                style={[styles.actionButton, { borderColor: theme.colors.outline }]}
                icon={() => <Ionicons name="logo-linkedin" size={20} color={theme.colors.primary} />}
                textColor={theme.colors.onSurface}
              >
                LinkedIn
              </Button>
            </View>

            <View style={styles.actionButtons}>
              <Button
                mode="outlined"
                onPress={openGitHub}
                style={[styles.actionButton, { borderColor: theme.colors.outline }]}
                icon={() => <Ionicons name="logo-github" size={20} color={theme.colors.onSurface} />}
                textColor={theme.colors.onSurface}
              >
                View GitHub
              </Button>
              
              <Button
                mode="outlined"
                onPress={openPortfolio}
                style={[styles.actionButton, { borderColor: theme.colors.outline }]}
                icon={() => <Feather name="globe" size={20} color={theme.colors.primary} />}
                textColor={theme.colors.onSurface}
              >
                Portfolio
              </Button>
            </View>
          </Card.Content>
        </Card>

   
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
               Let's Collaborate
            </Text>
            <Text style={[styles.description, { color: theme.colors.onSurface }]}>
              I'm always interested in discussing new opportunities, innovative projects, and potential collaborations. Whether you have a project in mind, need technical consultation, or just want to connect, feel free to reach out!
            </Text>
            
            <Text style={[styles.subDescription, { color: theme.colors.onSurface }]}>
               Areas of Interest:
            </Text>
            <Text style={[styles.interests, { color: theme.colors.onSurface }]}>
              • Mobile App Development (React Native)
              • Web Development (React, Node.js)
              • Firebase & Cloud Technologies
              • UI/UX Design & Implementation
              • Open Source Contributions
            </Text>
          </Card.Content>
        </Card>


        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
               Response Time
            </Text>
            <View style={styles.responseInfo}>
              <Text style={[styles.responseText, { color: theme.colors.onSurface }]}>
                I typically respond to emails within <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>24-48 hours</Text>.
              </Text>
              <Text style={[styles.responseSubtext, { color: theme.colors.onSurface }]}>
                For urgent matters, please mention "URGENT" in your subject line.
              </Text>
            </View>
          </Card.Content>
        </Card>

     
        <Text style={[styles.footer, { color: theme.colors.onSurface }]}>
          Looking forward to hearing from you! 
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
  headerSection: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontFamily: 'Poppins_700Bold',
  },
  name: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 16,
  },
  subDescription: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    marginBottom: 8,
  },
  interests: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 20,
  },
  responseInfo: {
    alignItems: 'center',
  },
  responseText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginBottom: 8,
  },
  responseSubtext: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});
