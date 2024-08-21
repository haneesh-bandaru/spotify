import API from "@/services/API";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface Track {
  Track_ID: string;
  trackName: string;
  Duration: number;
  path: string;
}

interface Album {
  Album_ID: string;
  AlbumName: string;
  Release_Date: string;
  Language: string;
  Album_Image: string | null;
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
      {artistsData.map((artist) => (
        <div key={artist.Artist_ID}>
          <div className="flex items-center m-8">
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
              {album.Album_Image && (
                <img src={album.Album_Image} alt={album.AlbumName} />
              )}
              {album.Tracks.map((track, index) => (
                <p
                  key={track.Track_ID}
                  className="flex gap-10 bg-[#212121] mt-2 py-4 px-4 justify-between rounded-lg"
                >
                  <p>
                    {index + 1} . {track.trackName}
                  </p>
                  <p>Duration: {track.Duration} seconds</p>
                </p>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ArtistsScreen;
