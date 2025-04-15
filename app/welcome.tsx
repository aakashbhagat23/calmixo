import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import {useAuthRedirectIfLoggedIn} from '@/hooks/useAuthRedirectIfLoggedIn';

export default function WelcomeScreen() {
  useAuthRedirectIfLoggedIn(); 
  const router = useRouter();
  const theme = useColorScheme() || 'light';
  const backgroundColor = Colors[theme].background;
  const textColor = Colors[theme].text;

  const handleGetStarted = () => {
    router.replace('/login');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>  {/* Updated to use backgroundColor */}
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Image
        source={require('../assets/images/meditation.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: textColor }]}>Breathe In Peace,{'\n'} Breathe Out Stress.</Text>  {/* Updated to use textColor */}



      <TouchableOpacity style={[styles.button, { backgroundColor: Colors[theme].primary }]} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  logo: {
    width: 200,
    height: 180
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: -50,
  },
  bold: {
    fontWeight: '700',
  },
  image: {
    width: 200,
    height: 120,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
