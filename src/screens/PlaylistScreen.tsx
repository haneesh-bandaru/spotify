import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "@/services/API";
import BackButton from "@/components/BackButton";
import DisplaySong from "@/components/DisplaySong";

const PlaylistsScreen = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [playlist, setPlaylist] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await API.get.getPlaylistsFromSaavan(location.state);
        setPlaylist(response.data.data);
        console.log(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [location.state]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!playlist) {
    return <p>No playlist found</p>;
  }

  return (
    <div className="bg-[#121212] w-full my-2 mr-2 max-h-[87vh] overflow-hidden">
      <div className="relative bg-[#212121] text-white rounded-xl p-4 h-full flex flex-col overflow-hidden">
        <BackButton />
        <div className="flex flex-col items-center mb-4 overflow-hidden">
          <div className="w-48 h-48 mb-4">
            {playlist.image && (
              <img
                src={
                  playlist.image[2]?.url ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThflQOCVWQcGoHWWrPjDFZV_uGfUD6-RTbtw&s"
                }
                alt={playlist.name}
                className="w-full h-full object-cover rounded-xl"
              />
            )}
          </div>
          <h1 className="text-2xl font-bold mb-2">{playlist.name}</h1>
          <p className="text-lg mb-4">
            {playlist.description || "No description available"}
          </p>
          {/* Uncomment this section if you want to display artists */}
          {/* 
          <h2 className="text-xl font-semibold mb-2">Artists</h2>
          <div className="flex flex-wrap gap-4 overflow-auto">
            {playlist.artists.map((artist) => (
              <div
                key={artist.id}
                className="flex flex-col items-center gap-2 h-20 cursor-pointer"
                onClick={() => {
                  console.log(artist.id);
                  navigate(`/artists/${artist.name}`, { state: artist.id });
                }}
              >
                <div className="w-16 h-16">
                  <img
                    src={
                      artist.image[2]?.url ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThflQOCVWQcGoHWWrPjDFZV_uGfUD6-RTbtw&s"
                    }
                    alt={artist.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="text-sm font-semibold">{artist.name}</span>
              </div>
            ))}
          </div>
          */}
        </div>
        <div className="flex flex-col gap-4 overflow-y-auto h-full">
          {playlist.songs.map((song, index) => (
            <DisplaySong track={song} index={index} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaylistsScreen;
