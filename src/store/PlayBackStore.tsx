import { create } from "zustand";

type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number;
  image: string | null;
  audioUrl: string;
};

type PlaybackState = {
  trackId: string;
  isPlaying: boolean;
  currentTrack: Track | null;
  volume: number;
  isShuffle: boolean;
  isRepeat: boolean;
  setTrackId: (status: string) => void;
  setPlaying: (status: boolean) => void;
  setTrack: (track: Track) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
};

const usePlaybackStore = create<PlaybackState>((set) => ({
  trackId: "",
  isPlaying: false,
  currentTrack: null,
  volume: 66,
  isShuffle: false,
  isRepeat: false,
  setTrackId: (status) => set({ trackId: status }),
  setPlaying: (status) => set({ isPlaying: status }),
  setTrack: (track) => set({ currentTrack: track }),
  setVolume: (volume) => set({ volume }),
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
}));

export default usePlaybackStore;
