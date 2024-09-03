import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "@/services/API";
import BackButton from "@/components/BackButton";

interface Album {
  id: string;
  name: string;
  url: string;
}

interface Artist {
  id: string;
  name: string;
  role: string;
  image: { quality: string; url: string }[];
  type: string;
  url: string;
}

interface Song {
  id: string;
  name: string;
  type: string;
  year: string;
  releaseDate: string;
  duration: number;
  label: string;
  explicitContent: boolean;
  playCount: number;
  language: string;
  hasLyrics: boolean;
  lyricsId: string | null;
  url: string;
  copyright: string;
  album: Album;
  artists: {
    primary: Artist[];
    featured: Artist[];
    all: Artist[];
  };
  image: { quality: string; url: string }[];
  downloadUrl: { quality: string; url: string }[];
}

const SongsScreen = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        console.log(location.state);
        
        const response = await API.get.getSongsFromSaavan(location.state as number);
        setSongs(response.data.data);
        console.log(songs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [location.state]);

  return (
    <div className="bg-[#121212] w-full my-2 mr-2 overflow-scroll">
      {!isLoading ? (
        <div className="relative bg-[#212121] h-full text-white rounded-xl">
          <BackButton route={"/home"} />
          <div className="relative pt-10 pl-8">
            <h2 className="text-xl font-bold mb-4">Songs</h2>
            {songs.map((song) => (
              <div key={song.id} className="mb-4 p-4 border-b border-gray-700">
                <div className="flex items-center">
                  <img
                    src={song.image[0].url}
                    alt={song.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{song.name}</h3>
                    <p>
                      {song?.album?.name} ({song.year})
                    </p>
                    <p>{song.duration} seconds</p>
                    <a
                      href={song.url}
                      className="text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Listen
                    </a>
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

export default SongsScreen;
