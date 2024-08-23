import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "@/services/API";
import { Dot } from "lucide-react";
import DisplaySong from "@/components/DisplaySong";
import BackButton from "@/components/BackButton";

type Track = {
  Track_ID: string;
  TrackName: string;
  Duration: number;
  Path: string;
};

type PlaylistData = {
  Playlist_ID: string;
  Playlist_Name: string;
  Status: string;
  Tracks: Track[];
};

const PlaylistsScreen = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [playlists, setPlaylists] = useState<PlaylistData[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        // Make the API call to fetch playlist details
        const response = await API.get.getPlaylistDetails(
          location.state as string
        );

        // Assuming the response data is in the expected format
        setPlaylists(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [location.state]);

  return (
    <div className="bg-[#121212] w-full my-2 mr-2 overflow-scroll ">
      {!isLoading ? (
        <div className="relative bg-[#212121] h-full text-white rounded-xl">
          <BackButton route={"/home"} />
          <div className="relative pt-14">
            {playlists.map((playlist) => (
              <div key={playlist.Playlist_ID} className="mb-10">
                <div className="flex items-center pl-10 gap-10">
                  <div>
                    <p className="text-5xl">{playlist.Playlist_Name}</p>
                    <div className="flex mt-3">
                      <p>Status: {playlist.Status}</p>
                      <Dot />
                      <p>{playlist.Tracks.length} tracks</p>
                    </div>
                  </div>
                </div>

                <div className="ml-5 mt-5">
                  <div className="relative bg-[#121212] m-4 p-4 rounded-2xl flex flex-col gap-4 ">
                    {playlist.Tracks.map((track, index) => (
                      <DisplaySong track={track} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlaylistsScreen;
