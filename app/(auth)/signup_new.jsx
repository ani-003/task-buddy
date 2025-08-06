import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {
    Button,
    Modal, Portal,
    Text,
    TextInput,
    useTheme
} from 'react-native-paper';
import useAuthStore from '../../src/store/authStore';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { signup, login, error, loading, user, logout } = useAuthStore();
  const router = useRouter();
  const theme = useTheme();

  const checkEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const checkPassword = (password) => {
    return password.length >= 8;
  };

  useEffect(() => {
    if (user) router.replace('/home');
  }, [user]);

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (!email || !checkEmail(email)) {
      setEmailError('Enter a valid email');
      return;
    }

    if (!password || !checkPassword(password)) {
      setPasswordError('Password needs 8+ characters');
      return;
    }

    await login(email, password);

    if (!user) {
      setShowModal(true);
    }
  };

  const handleSignup = async () => {
    if (!name || name.trim().length < 2) {
      alert('Name should be at least 2 characters');
      return;
    }

    if (!email || !checkEmail(email)) {
      alert('Please enter valid email');
      return;
    }

    if (!password || !checkPassword(password)) {
      alert('Password needs to be 8+ characters');
      return;
    }

    try {
      await signup(email, password, name);
      setShowModal(false);
      setShowNameInput(false);
    } catch (err) {
      console.error('Signup failed:', err.message);
      alert('Signup failed: ' + err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: theme.colors.background }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView 
          contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]} 
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={[styles.title, { color: theme.colors.onBackground }]}>Sign In To TaskBuddy</Text>

            <TextInput
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setEmailError('');
              }}
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, { borderColor: theme.colors.outline }]}
              textColor={theme.colors.onSurface}
              error={!!emailError}
              theme={{
                colors: {
                  onSurface: theme.colors.onSurface,
                  outline: theme.colors.outline,
                }
              }}
            />
            {emailError ? (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {emailError}
              </Text>
            ) : null}

            <TextInput
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setPasswordError('');
              }}
              secureTextEntry={!showPassword}
              mode="outlined"
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  iconColor={theme.colors.onSurface}
                />
              }
              style={styles.input}
              textColor={theme.colors.onSurface}
              error={!!passwordError}
              theme={{
                colors: {
                  onSurface: theme.colors.onSurface,
                  outline: theme.colors.outline,
                }
              }}
            />
            {passwordError ? (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {passwordError}
              </Text>
            ) : null}

            <Button
              mode="contained"
              loading={loading}
              onPress={handleLogin}
              style={[styles.button, { backgroundColor: theme.colors.primary }]}
              labelStyle={{ 
                fontFamily: 'Poppins_500Medium', 
                fontSize: 16,
                color: theme.colors.onPrimary 
              }}
              contentStyle={{ paddingVertical: 6 }}
            >
              Sign In
            </Button>

            <Button
              mode="outlined"
              onPress={() => logout()}
              style={[styles.button, { borderColor: theme.colors.outline }]}
              labelStyle={{ 
                fontFamily: 'Poppins_500Medium', 
                fontSize: 16,
                color: theme.colors.onSurface
              }}
              textColor={theme.colors.onSurface}
            >
              logout
            </Button>

            <View
              style={{
                position: 'absolute',
                bottom: 40,
                left: 0,
                right: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ 
                textAlign: 'center', 
                fontFamily: 'Poppins_400Regular',
                color: theme.colors.onSurface,
                opacity: 0.7
              }}>
                Assignment  By  Anirban  Das
              </Text>
            </View>

            <Portal>
              <Modal
                visible={showModal}
                onDismiss={() => {
                  setShowModal(false);
                  setShowNameInput(false);
                }}
                contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.surface }]}
              >
                {!showNameInput ? (
                  <>
                    <Text style={[styles.modalText, { color: theme.colors.onSurface }]}>Account not found.</Text>
                    <Button
                      mode="outlined"
                      onPress={() => setShowModal(false)}
                      style={[styles.modalBtn, { borderColor: theme.colors.outline }]}
                      textColor={theme.colors.onSurface}
                    >
                      Try Again
                    </Button>
                    <Button
                      mode="contained"
                      onPress={() => setShowNameInput(true)}
                      style={[styles.modalBtn, { backgroundColor: theme.colors.primary }]}
                      textColor={theme.colors.onPrimary}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <>
                    <TextInput
                      label="Your Name"
                      value={name}
                      onChangeText={setName}
                      mode="outlined"
                      style={{ marginBottom: 15 }}
                      textColor={theme.colors.onSurface}
                      theme={{
                        colors: {
                          onSurface: theme.colors.onSurface,
                          outline: theme.colors.outline,
                        }
                      }}
                    />
                    <Button 
                      mode="contained" 
                      onPress={handleSignup}
                      style={{ backgroundColor: theme.colors.primary }}
                      textColor={theme.colors.onPrimary}
                    >
                      Next
                    </Button>
                  </>
                )}
              </Modal>
            </Portal>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: {
    fontSize: 24, textAlign: 'center', marginBottom: 20,
    fontFamily: 'Poppins_700Bold',
    textAlign: 'left',
    marginBottom: 40,
  },
  input: { marginBottom: 15 },
  button: {
    marginTop: 10
  },
  error: { color: 'red', marginTop: 10, textAlign: 'center' },
  modal: {
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalBtn: {
    marginVertical: 5,
  },
  errorText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 12,
  },
});

export const options = {
  headerShown: false,
};
