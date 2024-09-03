import BackButton from "@/components/BackButton";
import DisplaySong from "@/components/DisplaySong";
import API from "@/services/API";
import { Dot, Heart, Menu, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Track = {
  id: string;
  name: string;
  duration: number;
  url: string;
};

type Artist = {
  id: string;
  name: string;
  image: { quality: string; url: string }[];
  url: string;
};

type AlbumData = {
  id: string;
  name: string;
  description: string;
  year: number;
  language: string;
  songCount: number;
  artists: {
    primary: Artist[];
  };
  image: { quality: string; url: string }[];
  songs: Track[];
};

const AlbumsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [songs, setSongs] = useState<Track[]>([]);
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await API.get.getAlbumsFromSaavan(
          location.state as number
        );
        const album: AlbumData = response.data.data;
        setAlbumData(album);
        setSongs(album.songs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [location.state]);

  return (
    <div className="bg-[#121212] w-full my-2 mr-2">
      {!isLoading ? (
        <div className="relative bg-[#212121] h-full text-white rounded-xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: albumData
                ? `url(${albumData?.image[2].url})`
                : "none",
              filter: "brightness(50%) blur(10px)",
            }}
          ></div>
          <BackButton />
          <div className="relative ">
            {albumData && (
              <div className="flex items-center pl-20 gap-10">
                <div className="flex text-8xl">
                  <img
                    src={albumData?.image[2].url}
                    height={150}
                    width={150}
                    alt={albumData?.name}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-7xl">{albumData.name}</p>
                  <div className="flex mt-3">
                    <p>{albumData?.artists.primary[0].name}</p>
                    <Dot />
                    <p>{albumData?.description.split("·")[2].trim()}</p>{" "}
                    {/* Genre */}
                    <Dot />
                    <p>Language: {albumData.language}</p>
                    <Dot />
                    <p>{albumData.songCount} songs</p>
                  </div>
                </div>
              </div>
            )}
            <div className="relative flex justify-between ml-6">
              <div className="flex gap-10 pt-6">
                <div className="bg-primary text-black rounded-full w-[24px] h-[24px] p-1">
                  <Play size={24} />
                </div>
                <div className="text-gray-400 rounded-full w-[24px] h-[24px] p-1">
                  <Heart size={24} />
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                Compact <Menu />
              </div>
            </div>
            <div className="relative max-h-56 bg-[#121212] m-4 p-4 rounded-2xl flex flex-col gap-4 overflow-scroll">
              {songs.map((song, index) => (
                <DisplaySong key={song.id} track={song} index={index} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default AlbumsScreen;
