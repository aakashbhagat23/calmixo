// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import  ProfileHeader  from '@/components/ui/profileHeader';

export default function TabsLayout() {
    const theme =  useColorScheme() || 'light';
  const backgroundColor = Colors[theme].background;
  const textColor = Colors[theme].primary;

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: backgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" size={24} color={focused ? textColor : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="sleep"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="moon" size={24} color={focused ? textColor : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="meditate"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="leaf" size={24} color={focused ? textColor : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="music"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="eye" size={24} color={focused ? textColor : color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <>
              {/* <MaterialCommunityIcons name="account" size={24} color={focused ? textColor : color} /> */}
              <ProfileHeader width={24} height={24} />
            </>
          ),
        }}
      />
    </Tabs>
  );
}
