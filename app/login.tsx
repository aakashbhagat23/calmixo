import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Feather } from '@expo/vector-icons';
import { useAuthRedirectIfLoggedIn } from '@/hooks/useAuthRedirectIfLoggedIn';

export default function Login() {
  useAuthRedirectIfLoggedIn(); 
  const router = useRouter();
  const theme = useColorScheme() || 'light';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backgroundColor = Colors[theme].background;
  const textColor = Colors[theme].text;
  const buttonColor = Colors[theme].primary;

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsSubmitting(true);
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      router.replace('/');
    } catch (error: any) {
      const cleanMessage = error.message.replace(/^Firebase:\s*/i, '');
      setError(cleanMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!isValidEmail(email)) {
      Alert.alert('Please enter a valid email to reset password');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password Reset', 'Check your email for reset instructions.');
    } catch (error: any) {
      const cleanMessage = error.message.replace(/^Firebase:\s*/i, '');
      Alert.alert('Error', cleanMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <LinearGradient colors={[backgroundColor, backgroundColor]} style={styles.container}>
        <Image
          source={require('../assets/images/yoga-1.png')}
          style={{ width: 200, height: 180, alignSelf: 'center' }}
          resizeMode="contain"
        />
        <Text style={[styles.title, { color: textColor }]}>Welcome Back</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={[styles.input, { borderColor: textColor, color: textColor }]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Field with Toggle */}
        <View style={[styles.passwordContainer, { borderColor: textColor }]}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#aaa"
            style={[styles.passwordInput, { color: textColor }]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Feather
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color={textColor}
                />
          </Pressable>
        </View>

        {!!error && <Text style={styles.error}>{error}</Text>}

        <Pressable
          style={[styles.button, { backgroundColor: buttonColor }]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>{isSubmitting ? "Submitting...":"Login"}</Text>
        </Pressable>

        <Text
          onPress={handleForgotPassword}
          style={[styles.forgotLink, { color: Colors[theme].secondary }]}
        >
          Forgot Password?
        </Text>

        <Text style={{ textAlign: 'center', fontSize: 14, marginTop: 20, color: textColor }}>
          Don't have an account?
        </Text>

        <Text
          onPress={() => router.replace('/register')}
          style={[styles.link, { color: Colors[theme].secondary }]}
        >
          Register Here
        </Text>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  link: {
    marginTop: 4,
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  forgotLink: {
    marginTop: 16,
    textAlign: 'right',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
