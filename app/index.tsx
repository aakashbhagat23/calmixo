import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase'; // update this path if needed

export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // 👈 Redirect to login if user is not signed in
        router.replace('/welcome');
      } else {
        // ✅ User is signed in
        router.replace('/(tabs)'); // Redirect to home screen
        setLoading(false);
      }
    });

    return unsubscribe; // clean up the listener
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
      <Button title="logout" onPress={() => { 
        auth.signOut().then(() => {
          router.replace('/login'); // Redirect to login after sign out
        });
       }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});
