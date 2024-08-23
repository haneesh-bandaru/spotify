import BackButton from "@/components/BackButton";
import DisplaySong from "@/components/DisplaySong";
import API from "@/services/API";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Track {
  Track_ID: string;
  TrackName: string;
  Duration: number;
  path: string;
}

interface Album {
  Album_ID: string;
  AlbumName: string;
  Release_Date: string;
  Language: string;
  AlbumImage: string | null;
  Tracks: Track[];
}

interface Artist {
  Artist_ID: string;
  ArtistName: string;
  Genre: string;
  Albums: Album[];
}

interface ApiResponse {
  Data: {
    Artists: Artist[];
  };
}

const ArtistsScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [artistsData, setArtistsData] = useState<Artist[] | null>(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await API.get.getArtistSongs(location.state as string);
        const data: ApiResponse = response.data;
        setArtistsData(data.Data.Artists);
        console.log(artistsData);

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

  if (!artistsData || artistsData.length === 0) {
    return <div>No artist data available.</div>;
  }

  return (
    <div className="text-white overflow-scroll w-full">
      <BackButton route="/home" />
      {artistsData.map((artist) => (
        <div key={artist.Artist_ID}>
          <div className=" flex items-center m-8 w-screen">
            <img
              src={`https://avatar.iran.liara.run/public?username=${artist.ArtistName}`}
              height={160}
              width={160}
              alt="No way!"
              className="rounded-full object-cover"
            />
            <p className="text-8xl ">{artist.ArtistName}</p>
          </div>
          <p>Genre: {artist.Genre}</p>
          {artist.Albums.map((album) => (
            <div key={album.Album_ID} className="flex flex-col">
              <div className="flex items-center justify-center px-4">
                <h2>{album.AlbumName}</h2>
                {/* <p>{new Date(album.Release_Date).toLocaleDateString()}</p> */}
              </div>
              {/* {album.Album_Image && (
                <img src={album.Album_Image} alt={album.AlbumName} />
              )} */}
              <div className="relative bg-[#121212] m-4 p-4 rounded-2xl flex flex-col gap-4 ">
                {album.Tracks.map((track, index) => (
                  <DisplaySong track={track} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ArtistsScreen;
