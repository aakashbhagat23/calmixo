import { useRouter } from 'expo-router';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function NotFound() {
  const router = useRouter();
  const theme = useColorScheme() || 'light'; 

  const backgroundColor = Colors[theme].background;
  const textColor = Colors[theme].text;
  const buttonColor = Colors[theme].primary;

  return (
    <LinearGradient
      colors={[backgroundColor, backgroundColor]}
      style={styles.container}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
    >
      <Image
        source={require('../assets/images/not-found.png')}
        style={[styles.image, { shadowColor: textColor }]}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: textColor }]}>Oops... Page not found</Text>
      <Text style={[styles.subtitle, { color: textColor }]}>
        The page you are looking for doesn't exist or was moved.
      </Text>

      <Pressable
        onPress={() => router.replace('/')}
        style={[styles.button, { backgroundColor: buttonColor }]}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    opacity: 0.7,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
