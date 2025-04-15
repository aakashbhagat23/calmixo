import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors'; // adjust path to your Colors file

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  const theme = useColorScheme() || 'light';

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <ActivityIndicator size="large" color={Colors[theme].primary} />
      <Image source={require('../../assets/images/yoga-2.png')} style={{ width: 200, height: 200, marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
  },
});
