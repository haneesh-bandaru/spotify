import BackButton from "@/components/BackButton";
import DisplaySong from "@/components/DisplaySong";
import API from "@/services/API";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Track {
  id: string;
  name: string;
  duration: number;
  path: string;
}

interface Album {
  id: string;
  name: string;
  releaseDate: string;
  language: string;
  image: string | null;
  tracks: Track[] | null;
}

interface Artist {
  id: string;
  name: string;
  genre: string | null;
  albums: Album[];
  image: string | null;
}

interface ApiResponse {
  data: {
    data: {
      id: string;
      name: string;
      topAlbums: Array<{
        id: string;
        name: string;
        year: number;
        language: string;
        image: Array<{
          quality: string;
          url: string;
        }>;
        songs: Track[] | null;
      }>;
      image: Array<{
        quality: string;
        url: string;
      }>;
    };
  };
}

const ArtistsScreen = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response: ApiResponse = await API.get.getArtistSongsFromSaavan(
          location.state as number
        );

        const data = response.data.data;

        const mappedArtist: Artist = {
          id: data.id,
          name: data.name,
          genre: data.dominantType || null,
          image:
            data.image?.find((img) => img.quality === "500x500")?.url || null,
          albums: data.topAlbums.map((album) => ({
            id: album.id,
            name: album.name,
            releaseDate: album.year.toString(),
            language: album.language,
            image:
              album.image?.find((img) => img.quality === "500x500")?.url ||
              null,
            tracks: album.songs || null,
          })),
        };

        setArtistData(mappedArtist);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching artist data:", error);
        setIsLoading(false);
      }
    };

    fetchArtistData();
  }, [location.state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!artistData) {
    return <div>No artist data available.</div>;
  }

  return (
    <div className="text-white bg-[#212121] mt-2 mr-1 mb-3 rounded p-4 overflow-hidden  w-full">
      <BackButton />
      <div key={artistData.id}>
        <div className="flex  items-center m-8 w-screen">
          <img
            src={
              artistData.image ||
              "https://avatar.iran.liara.run/public?username=unknown"
            }
            height={160}
            width={160}
            alt={artistData.name}
            className="rounded-full object-cover"
          />
          <p className="text-7xl">{artistData.name}</p>
        </div>
        <p>Genre: {artistData.genre || "Unknown"}</p>
        <div className="grid grid-cols-7 max-h-64 overflow-y-scroll overflow-x-hidden gap-y-6 ">
          {artistData.albums?.map((album) => (
            <div
              key={album.id}
              className="flex flex-col hover:bg-[#121212] cursor-pointer w-fit px-2 py-2 rounded-lg"
              onClick={() => {
                console.log(album.id);
                navigate(`/albums/${album.name}`, { state: album.id });
              }}
            >
              {album.image && (
                <img
                  src={album.image}
                  alt={album.name}
                  height={120}
                  width={120}
                />
              )}
              <div className="flex w-fit">
                <p className="w-28 pt-3 ">
                  {album.name.slice(0, 1).toUpperCase()}
                  {album.name.slice(1)}
                </p>
              </div>
              <div className="relative bg-[#121212] rounded-2xl flex flex-col gap-2">
                {album.tracks?.map((track, index) => (
                  <DisplaySong key={track.id} track={track} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistsScreen;
