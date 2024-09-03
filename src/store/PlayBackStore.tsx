import { create } from "zustand";
import axios from "axios"; // Using axios for API calls

type Track = {
  id: string;
  title: string;
  artist: string;
  duration: number;
  image: string | null;
  audioUrl: string;
};

type PlaybackState = {
  isPlaying: boolean;
  currentTrack: Track | null;
  volume: number;
  isShuffle: boolean;
  isRepeat: boolean;
  setPlaying: (status: boolean) => void;
  setTrack: (track: Track) => void;
  setVolume: (volume: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  playTrack: (trackId: string) => Promise<void>;
};

const usePlaybackStore = create<PlaybackState>((set) => ({
  isPlaying: false,
  currentTrack: null,
  volume: 66,
  isShuffle: false,
  isRepeat: false,
  setPlaying: (status) => set({ isPlaying: status }),
  setTrack: (track) => set({ currentTrack: track }),
  setVolume: (volume) => set({ volume }),
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
  toggleRepeat: () => set((state) => ({ isRepeat: !state.isRepeat })),
  playTrack: async (trackId: string) => {
    try {
      const response = await axios.get(
        `https://jiosaavn-api-lac.vercel.app/api/songs/${trackId}`
      );
      const trackData = response.data.data[0];

      set({
        currentTrack: {
          id: trackData.id,
          title: trackData.name,
          artist: trackData.artists.primary[0].name,
          duration: trackData.duration,
          image: trackData.image?.[2]?.url || null,
          audioUrl: trackData?.url
        },
        isPlaying: true,
      });

    } catch (error) {
      console.error("Failed to fetch track data:", error);
    }
  },
}));

export default usePlaybackStore;
