// Profile.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import{auth} from '@/lib/firebase';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
    const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    }
  });
  