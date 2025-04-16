import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ProfileHeader from '@/components/ui/profileHeader';
// You can use Zustand, Context, or any global store to manage this
import { useMusicPlayerStore } from '@/stores/musicPlayerStore'; // adjust this path

export default function TabsLayout() {
  const theme = useColorScheme() || 'light';
  const backgroundColor = Colors[theme].background;
  const textColor = Colors[theme].primary;

  const { isPlaying, currentTrack, playPause, skipNext, skipPrevious } = useMusicPlayerStore();

  return (
    <View style={{ flex: 1 }}>
      {/* Tabs Navigator */}
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: isPlaying ? 130 : 70, // increased height if music is playing
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
            tabBarIcon: ({ color, focused }) => <ProfileHeader width={24} height={24} />,
          }}
        />
      </Tabs>

      {/* Mini Music Player */}
      {isPlaying && currentTrack && (
        <View style={[styles.miniPlayer, { backgroundColor: backgroundColor, borderTopColor: '#ccc' }]}>
          <Image
            source={{ uri: currentTrack.image }}
            style={styles.thumbnail}
          />
          <View style={styles.trackInfo}>
            <Text numberOfLines={1} style={[styles.trackTitle, { color: textColor }]}>
              {currentTrack.title}
            </Text>
            <Text style={{ fontSize: 12, color: '#999' }}>{currentTrack.category || 'Unknown Artist'}</Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity onPress={skipPrevious}>
              <Ionicons name="play-skip-back" size={24} color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={playPause}>
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={24} color={textColor} />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipNext}>
              <Ionicons name="play-skip-forward" size={24} color={textColor} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  miniPlayer: {
    position: 'absolute',
    bottom: 70, // height of the tab bar
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingHorizontal: 12,
    zIndex: 10,
  },
  thumbnail: {
    width: 44,
    height: 44,
    borderRadius: 8,
    marginRight: 10,
  },
  trackInfo: {
    flex: 1,
  },
  trackTitle: {
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
});
