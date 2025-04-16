import { useEffect, useRef } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Audio } from 'expo-av';
import { Alert } from 'react-native';
import { useMusicPlayerStore, Track } from '@/stores/musicPlayerStore';

type Props = {
  collectionName: string;
};

export default function CommonMusicPlayer({ collectionName }: Props) {
  const soundRef = useRef<Audio.Sound | null>(null);

  const {
    setPlaylist,
    setTrack,
    isPlaying,
    currentTrack,
  } = useMusicPlayerStore();

  // 🧠 Load playlist and set initial track
  useEffect(() => {
    const fetchAndPrepare = async () => {
      try {
        const snapshot = await getDocs(collection(db, collectionName));
        const tracks: Track[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.audio_url) {
            tracks.push({ id: doc.id, ...data } as Track);
          }
        });

        if (tracks.length === 0) {
          Alert.alert('No Tracks', 'No audio tracks found.');
          return;
        }

        const first = tracks[0];

        // Set playlist and first track (this will update store)
        setPlaylist(tracks);
        setTrack(first, 0);

        const { sound } = await Audio.Sound.createAsync(
          { uri: first.audio_url },
          { shouldPlay: true } // ✅ Ensure it starts right away
        );

        soundRef.current = sound;
      } catch (err) {
        console.error('Music loading failed:', err);
        Alert.alert('Playback Error', 'Something went wrong.');
      }
    };

    fetchAndPrepare();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  // 🔁 React to isPlaying updates
  useEffect(() => {
    const updatePlayback = async () => {
      const sound = soundRef.current;
      if (!sound) return;

      const status = await sound.getStatusAsync();
      if (!status.isLoaded) return;

      if (isPlaying && !status.isPlaying) {
        await sound.playAsync();
      } else if (!isPlaying && status.isPlaying) {
        await sound.pauseAsync();
      }
    };

    updatePlayback();
  }, [isPlaying]);

  return null;
}
