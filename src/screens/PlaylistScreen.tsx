import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "@/services/API";
import { ArrowLeft, ChevronLeft, Dot, Play } from "lucide-react";

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
  const navigate = useNavigate();
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
          <div
            className="relative pt-4 pl-5 w-fit min-h-10 max-h-10 group cursor-pointer"
            onClick={() => {
              navigate("/home");
            }}
          >
            <ChevronLeft className="bg-[#121212] rounded-full p-1 group-hover:hidden" />
            <ArrowLeft className="bg-[#121212] rounded-full p-1 group-hover:block hidden" />
          </div>

          <div className="relative pt-14">
            {playlists.map((playlist) => (
              <div key={playlist.Playlist_ID} className="mb-10">
                <div className="flex items-center pl-20 gap-10">
                  <div>
                    <p className="text-5xl">{playlist.Playlist_Name}</p>
                    <div className="flex mt-3">
                      <p>Status: {playlist.Status}</p>
                      <Dot />
                      <p>{playlist.Tracks.length} tracks</p>
                    </div>
                  </div>
                </div>

                <div className="ml-20 mt-5">
                  {playlist.Tracks.map((track) => (
                    <div
                      key={track.Track_ID}
                      className="flex items-center justify-between mb-4 p-2 bg-[#1e1e1e] rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Play className="text-[#1DB954]" />
                        <p className="text-lg">{track.TrackName}</p>
                      </div>
                      <p>
                        {Math.floor(track.Duration / 60)}:
                        {(track.Duration % 60).toString().padStart(2, "0")}
                      </p>
                    </div>
                  ))}
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
