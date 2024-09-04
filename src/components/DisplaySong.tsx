import { Heart, Play } from "lucide-react";
import { useState } from "react";
import usePlaybackStore from "@/store/PlayBackStore";

const DisplaySong = ({ track, index }) => {
  const { playTrack, currentTrack } = usePlaybackStore();
  const [isLiked, setIsLiked] = useState(false);

  const playSong = async () => {
    await playTrack(track.id);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div
      key={track?.id}
      className="flex items-center justify-between mb-2 p-2 bg-[#1e1e1e] rounded-lg group"
    >
      <div className="flex items-center gap-4">
        <Play className="text-[#1DB954] cursor-pointer" onClick={playSong} />
        {index + 1}
        <p className="text-lg">{track?.title || track?.name}</p>
      </div>
      <div className="flex items-center gap-6">
        <p>
          {Math.floor(track?.duration / 60)}:
          {String(track?.duration % 60).padStart(2, "0")}
        </p>
        <p onClick={toggleLike}>
          {isLiked ? <Heart color="red" fill="red" /> : <Heart />}
        </p>
      </div>
    </div>
  );
};

export default DisplaySong;
  