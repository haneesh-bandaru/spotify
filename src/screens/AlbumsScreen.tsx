import DisplaySong from "@/components/DisplaySong";
import API from "@/services/API";
import { ArrowLeft, ChevronLeft, Dot, Heart, Menu, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Track = {
  TrackName: string;
  Duration: number;
  Path: string;
};

type AlbumData = {
  "Album Name": string;
  "Artist Name": string;
  Genre: string;
  Language: string;
  Tracks: Track[];
  AlbumImage: string;
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
        const response = await API.get.getSongs(location.state as string);
        const album: AlbumData = response.data[0];
        setAlbumData(album);
        setSongs(album.Tracks);
        console.log(album);

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
        <div className="relative bg-[#212121] h-full text-white rounded-xl ">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: albumData
                ? `url(${albumData.AlbumImage})`
                : "none",
              filter: "brightness(50%) blur(10px)",
            }}
          ></div>
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
            {albumData && (
              <div className="flex items-center pl-20 gap-10">
                <div className="flex text-8xl">
                  <img
                    src={albumData.AlbumImage}
                    height={150}
                    width={150}
                    alt=""
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-8xl">{albumData["Album Name"]}</p>
                  <div className="flex mt-3">
                    <p>{albumData["Artist Name"]}</p>
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
            <div className="relative bg-[#121212] m-4 p-4 rounded-2xl flex flex-col gap-4 ">
              {songs.map((song, index) => (
                <DisplaySong track={song} index={index} />
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
