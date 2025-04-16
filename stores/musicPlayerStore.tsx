import { create } from 'zustand';

export interface Track {
  id: string;
  audio_url: string;
  title: string;
  image: string;
  category: string;
  duration: string;
}

interface MusicPlayerState {
  isPlaying: boolean;
  currentTrack: Track | null;
  playlist: Track[];
  currentIndex: number;
}

interface MusicPlayerActions {
  playPause: () => void;
  setTrack: (track: Track, index: number) => void;
  setPlaylist: (tracks: Track[]) => void;
  skipNext: () => void;
  skipPrevious: () => void;
}

export const useMusicPlayerStore = create<MusicPlayerState & MusicPlayerActions>((set, get) => ({
  isPlaying: false,
  currentTrack: null,
  playlist: [],
  currentIndex: 0,

  playPause: () => {
    const { isPlaying } = get();
    set({ isPlaying: !isPlaying });
  },

  setTrack: (track, index) => {
    set({ currentTrack: track, currentIndex: index, isPlaying: true });
  },

  setPlaylist: (tracks) => {
    set({
      playlist: tracks,
      currentTrack: tracks[0] || null,
      currentIndex: 0,
      isPlaying: tracks.length > 0,
    });
  },

  skipNext: () => {
    const { currentIndex, playlist } = get();
    const nextIndex = currentIndex + 1;

    if (nextIndex < playlist.length) {
      set({
        currentIndex: nextIndex,
        currentTrack: playlist[nextIndex],
        isPlaying: true,
      });
    }
  },

  skipPrevious: () => {
    const { currentIndex, playlist } = get();
    const prevIndex = currentIndex - 1;

    if (prevIndex >= 0) {
      set({
        currentIndex: prevIndex,
        currentTrack: playlist[prevIndex],
        isPlaying: true,
      });
    }
  },
}));
