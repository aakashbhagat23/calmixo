// app/register.tsx
import { useRouter } from 'expo-router';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuthRedirectIfLoggedIn } from '@/hooks/useAuthRedirectIfLoggedIn';

export default function Register() {
  useAuthRedirectIfLoggedIn();
  const router = useRouter();
  const theme = useColorScheme() || 'light';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backgroundColor = Colors[theme].background;
  const textColor = Colors[theme].text;
  const buttonColor = Colors[theme].primary;

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleRegister = async () => {
    try {
        setIsSubmitting(true);
        if (!isValidEmail(email)) {
            setError('Please enter a valid email');
            setIsSubmitting(false);
            return;
          }

        if (!password || password.length < 6) {
        setError('Password must be at least 6 characters');
        setIsSubmitting(false);
        return;
        }
      await createUserWithEmailAndPassword(auth, email, password);
      setError('');
      router.replace('/');
    } catch (error: any) {
        const cleanMessage = error.message.replace(/^Firebase:\s*/i, '');
        setError(cleanMessage);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <LinearGradient
      colors={[backgroundColor, backgroundColor]}
      style={styles.container}
    >
        <Image
                  source={require('../assets/images/yoga-1.png')}
                    style={{ width: 200, height: 180, alignSelf: 'center'  }}
                    resizeMode="contain"
                />
      <Text style={[styles.title, { color: textColor }]}>Register</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        style={[styles.input, { borderColor: textColor, color: textColor }]}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        style={[styles.input, { borderColor: textColor, color: textColor }]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {!!error && <Text style={styles.error}>{error}</Text>}

      <Pressable style={[styles.button, { backgroundColor: buttonColor }]} onPress={handleRegister}>
        <Text style={styles.buttonText}>{isSubmitting ? 'Submitting...' : 'Register'}</Text>
      </Pressable>

      <Text
        onPress={() => router.replace('/login')}
        style={[styles.link, { color: Colors[theme].secondary }]}
      >
        Already have an account? Login
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
      },
      title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 24,
        textAlign: 'center',
      },
      input: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        marginBottom: 16,
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
        marginTop: 16,
        textAlign: 'center',
        fontSize: 14,
      },
      error: {
        color: 'red',
        marginBottom: 8,
        textAlign: 'center',
        fontSize: 14,
      },
});
