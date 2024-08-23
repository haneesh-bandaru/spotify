import API from "@/services/API";
import useAuthStore from "@/store/store";
import { Heart, Play } from "lucide-react";
import { useEffect, useState } from "react";

const DisplaySong = ({ track, index }) => {
  const { userId } = useAuthStore();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await API.post.likeTrack({ userId });
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };

    fetchArtistData();
  });

  return (
    <div
      key={track.Track_ID}
      className="flex items-center justify-between mb-2 p-2 bg-[#1e1e1e] rounded-lg group"
    >
      <div className="flex items-center gap-4">
        <Play className="text-[#1DB954]" />
        {index + 1}
        <p className="text-lg">{track.TrackName || track.trackName}</p>
      </div>
      <div className="flex items-center gap-6">
        <p>
          {Math.floor(track.Duration / 60 || track.duration / 60)}:
          {(track.Duration % 60).toString().padStart(2, "0") ||
            (track.duration % 60).toString().padStart(2, "0")}
        </p>
        <p
          onClick={() => {
            setIsLiked(!isLiked);
          }}
        >
          {isLiked ? "liked" : <Heart />}
        </p>
      </div>
    </div>
  );
};

export default DisplaySong;

// <div
//   key={index}
//   className="flex justify-between p-4  hover:bg-[#212121] mx-3 mt-3 rounded-xl group h-4"
// >
//   <div className="flex gap-4 ">
//     <p>{index + 1}</p>
//     <p className="font-bold">{track?.TrackName}</p>
//   </div>
//   <div className=" flex items-center group gap-6">
//     <div className="hidden group-hover:block">
//       <div className="bg-primary text-black rounded-full w-[20px] h-[20px] p-1">
//         <Play size={20} />
//       </div>
//     </div>
//     <p>
//       {Math.floor(track.Duration / 60)}:
//       {(track.Duration % 60).toString().padStart(2, "0")}
//     </p>
//   </div>
//  </div>
