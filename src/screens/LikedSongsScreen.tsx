import { useEffect, useState } from "react";
import API from "@/services/API";
import useAuthStore from "../store/store";
import BackButton from "@/components/BackButton";
import DisplaySong from "@/components/DisplaySong";

type Song = {
  trackId: string;
  albumId: string;
  albumName: string;
  duration: number;
  path: string;
  trackName: string;
};

const LikedSongs = () => {
  const { userId } = useAuthStore();
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      const fetchLikedSongs = async () => {
        try {
          const response = await API.get.getLikedSongs(userId);
          console.log(response.data.result);
          setLikedSongs(response.data.result);    
          setIsLoading(false);
        } catch (err) {
          setError("Failed to fetch liked songs.");
          setIsLoading(false);
        }
      };

      fetchLikedSongs();
    } else {
      setError("User not authenticated.");
      setIsLoading(false);
    }
  }, [userId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-[#212121] mt-2 mb-3 mr-2 p-4 rounded-lg w-full overflow-scroll">
      <BackButton route="/home" />
      <h1 className="text-white text-7xl mt-8 ">Liked Songs</h1>
      <div className="text-white">
        {likedSongs.length > 0 ? (
          likedSongs.map((song, index) => (
            <div className="">
              <DisplaySong track={song} index={index} />
            </div>
          ))
        ) : (
          <p>No liked songs found.</p>
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
