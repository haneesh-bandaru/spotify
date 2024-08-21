import API from "@/services/API";
import { Dot, Heart, Menu, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type Song = {
  "Song Name": string;
  Duration: number;
  Path: string;
};

type AlbumData = {
  "Album Name": string;
  "Artist Name": string;
  Genre: string;
  Language: string;
  Songs: Song[];
};

const AlbumsScreen = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [songs, setSongs] = useState<Song[]>([]);
  const [albumData, setAlbumData] = useState<AlbumData | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await API.get.getSongs(location.state as string);
        const album: AlbumData = response.data[0];
        setAlbumData(album);
        setSongs(album.Songs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching songs:", error);
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, [location.state]);

  return (
    <div className="bg-[#121212] w-full mt-2 mr-2 rounded-2xl">
      {!isLoading ? (
        <div className="bg-[#212121] text-white">
          {albumData && (
            <div className="flex items-center ">
              <div className="flex text-8xl">
                <img
                  src={`https://avatar.iran.liara.run/username?username=${albumData["Album Name"]}`}
                  height={150}
                  width={150}
                  alt="No way!"
                  className=" rounded-full object-cover"
                />
              </div>
              <div className="">
                <p className="text-8xl ">{albumData["Album Name"]}</p>
                <div className="flex mt-4">
                  <p>{albumData?.["Artist Name"]}</p>
                  <Dot />
                  <p>{albumData.Genre}</p>
                  <Dot />

                  <p>Language: {albumData.Language}</p>
                  <Dot />
                  <p>{songs.length} songs</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-between ml-6">
            <div className="flex gap-10">
              <div className="bg-primary text-black rounded-full w-[24px] h-[24px] p-1">
                <Play size={24} />
              </div>
              <div className=" text-gray-400 rounded-full w-[24px] h-[24px] p-1">
                <Heart size={24} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              Compact <Menu />
            </div>
          </div>
          {songs.map((song, index) => (
            <div key={index} className="flex justify-between p-4">
              <div className="flex gap-4 ">
                <p>{index + 1}</p>
                <p className="font-bold">{song["Song Name"]}</p>
              </div>
              <p>
                {Math.floor(song.Duration / 60)}:{" "}
                {song.Duration / 60 - song.Duration / 60}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default AlbumsScreen;
