import { useEffect, useState } from "react";
import AlbumsCard from "../components/AlbumsCard";
import API from "@/services/API";
import ArtistsCard from "../components/ArtistsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import PlaylistsCard from "@/components/PlaylistsCard";

type Album = {
  AlbumId: string;
  AlbumName: string;
  Release_Date: string;
  "Number of Songs": number;
  Duration: string;
  AlbumImage: string;
};

type Artists = {
  Artist_ID: string;
  Name: string;
  Genre: string;
};

type Tracks = {
  Track_ID: string;
  TrackName: string;
  Duration: number;
  Path: string;
};

type Playlists = {
  Playlist_ID: string;
  Playlist_Name: string;
  Status: string;
  Tracks: Tracks[];
};

const ArtistCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center p-5 mt-5">
      <Skeleton className="h-[125px] w-[125px] rounded-full" />
      <div className="space-y-2 flex flex-col mt-4 items-center">
        <Skeleton className="h-4 w-[170px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
};

const AlbumsCardSkeleton = () => {
  return (
    <Skeleton className="flex flex-col items-center p-5 mt-5">
      <Skeleton className="h-[125px] w-[125px] rounded-full" />
      <div className="space-y-2 flex flex-col mt-4 items-center">
        <Skeleton className="h-4 w-[170px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </Skeleton>
  );
};

const PlaylistsCardSkeleton = () => {
  return (
    <div className="p-4 rounded-lg bg-gray-800">
      <Skeleton className="w-full h-32 object-cover rounded-lg" />
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
};

const HomeScreen = () => {
  const navigate = useNavigate();

  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artists[]>([]);
  const [playlist, setPlaylist] = useState<Playlists[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    API.get.getAlbums().then((response) => {
      setAlbums(response.data.Albums);
    });
    API.get.getArtists().then((response) => {
      setArtists(response.data.Artists);
    });
    API.get.getPlaylists(userId).then((response) => {
      console.log(response.data);
      setPlaylist(response.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden flex transition-all bg-[#121212]">
      <div className="bg-[#212121] w-full mt-2 mr-2 p-4 rounded-lg overflow-x-hidden">
        <div className="flex justify-between mt-6">
          <p className="text-white">Popular Artists</p>
          <p
            className="text-gray-400 cursor-pointer"
            onClick={() => {
              navigate("/artists");
            }}
          >
            Show all
          </p>
        </div>

        <div className="flex gap-4 overflow-scroll ">
          {!isLoading ? (
            artists.map((item: Artists, index: number) => (
              <div key={index}>
                <ArtistsCard item={item} />
              </div>
            ))
          ) : (
            <>
              {artists.map(() => (
                <ArtistCardSkeleton />
              ))}
            </>
          )}
        </div>
        <div className="flex gap-6 overflow-x-auto"></div>

        <div className="flex justify-between mt-6">
          <p className="text-white">Popular Albums</p>
          <p className="text-gray-400 cursor-pointer">Show all</p>
        </div>

        <div className="flex gap-2 overflow-x-scroll mt-4">
          {!isLoading ? (
            albums.map((item: Album, index: number) => (
              <div key={index}>
                <AlbumsCard item={item} />
              </div>
            ))
          ) : (
            <>
              {albums.map((item: Album, index: number) => (
                <div key={index}>
                  <AlbumsCardSkeleton />
                </div>
              ))}
            </>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <p className="text-white">Spotify Playlists</p>
          <p className="text-gray-400 cursor-pointer">Show all</p>
        </div>

        <div className="flex gap-2 overflow-x-scroll mt-4">
          {!isLoading ? (
            playlist.map((item: Playlists, index: number) => (
              <div key={index}>
                <PlaylistsCard item={item} />
              </div>
            ))
          ) : (
            <>
              {playlist.map((_, index: number) => (
                <div key={index}>
                  <PlaylistsCardSkeleton />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
