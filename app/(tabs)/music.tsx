import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase'; // Adjusted the import path to match the project structure

export default function CalmPlayer() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMillis, setPositionMillis] = useState(0);
  const [durationMillis, setDurationMillis] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);
  const soundRef = useRef(null);

  useEffect(() => {
    fetchTracksFromFirestore();
    loadFavorites();
    return () => sound && sound.unloadAsync();
  }, []);

  useEffect(() => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPositionMillis(status.positionMillis);
          setDurationMillis(status.durationMillis || 1);
          setIsPlaying(status.isPlaying);
        }
      });
    }
  }, [sound]);

  const fetchTracksFromFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'music'));
      let loadedTracks: any[] = [];

      querySnapshot.forEach(doc => {
        const data = doc.data();
        // const track = data.tracks;
        console.log('Track:', data); // Debugging line to check the track data
        if (data && data.audio_url) {
          loadedTracks.push({ id: doc.id, ...data });
        }
      });

      setTracks(loadedTracks);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const loadFavorites = async () => {
    const favs = await AsyncStorage.getItem('favorites');
    setFavorites(favs ? JSON.parse(favs) : []);
  };

  const toggleFavorite = async (trackId) => {
    const updatedFavs = favorites.includes(trackId)
      ? favorites.filter(id => id !== trackId)
      : [...favorites, trackId];
    setFavorites(updatedFavs);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavs));
  };

  const playTrack = async (track) => {
    if (sound) await sound.unloadAsync();
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: track.audio_url },
      { shouldPlay: true }
    );
    setSound(newSound);
    setCurrentTrack(track);
    soundRef.current = newSound;
  };

  const skipTrack = (direction) => {
    if (!currentTrack) return;
    const index = tracks.findIndex(t => t.id === currentTrack.id);
    const newIndex = direction === 'next' ? index + 1 : index - 1;
    if (newIndex >= 0 && newIndex < tracks.length) {
      playTrack(tracks[newIndex]);
    }
  };

  const onSliderValueChange = async (value) => {
    if (sound) await sound.setPositionAsync(value);
  };

  const renderTrack = ({ item }) => (
    <TouchableOpacity style={styles.trackItem} onPress={() => playTrack(item)}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title || 'Untitled'}</Text>
        <Text style={styles.meta}>{item.category || 'No Category'} • {item.duration || 'Unknown'}</Text>
      </View>
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Ionicons name={favorites.includes(item.id) ? 'heart' : 'heart-outline'} size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {currentTrack && (
        <View style={styles.playerSection}>
          <Image
            source={{ uri: currentTrack.image || 'https://placehold.co/600x300' }}
            style={styles.image}
          />
          <Text style={styles.nowPlaying}>{currentTrack.title}</Text>

          <Slider
            minimumValue={0}
            maximumValue={durationMillis}
            value={positionMillis}
            onSlidingComplete={onSliderValueChange}
            minimumTrackTintColor="#0a84ff"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#0a84ff"
            style={{ width: '100%', height: 40 }}
          />

          <View style={styles.controls}>
            <TouchableOpacity onPress={() => skipTrack('prev')}>
              <Ionicons name="play-skip-back" size={32} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
              isPlaying ? sound.pauseAsync() : sound.playAsync()
            }>
              <Ionicons name={isPlaying ? 'pause-circle' : 'play-circle'} size={48} color="#0a84ff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => skipTrack('next')}>
              <Ionicons name="play-skip-forward" size={32} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {tracks.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Loading tracks...</Text>
      )}

      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={renderTrack}
        contentContainerStyle={{ paddingBottom: 120 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    fontSize: 12,
    color: '#666',
  },
  playerSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    height: 180,
    width: '100%',
    borderRadius: 12,
    marginBottom: 16,
  },
  nowPlaying: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 16,
  },
});
