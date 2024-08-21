import { useEffect, useState } from "react";
import AlbumsCard from "../components/AlbumsCard";
import API from "@/services/API";
import ArtistsCard from "../components/ArtistsCard";
import { Skeleton } from "@/components/ui/skeleton";

// Define the types for the Album data structure
interface Album {
  AlbumId: string;
  AlbumName: string;
  Release_Date: string;
  "Number of Songs": number;
  Duration: string;
}

interface Artists {
  Artist_ID: string;
  Name: string;
  Genre: string;
}

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

const HomeScreen = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [artists, setArtists] = useState<Artists[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const song = "https://music.youtube.com/watch?v=JCf7lKL1UQ4&feature=shared";

  useEffect(() => {
    API.get.getAlbums().then((response) => {
      setAlbums(response.data.Albums);
      API.get.getArtists().then((response) => {
        setArtists(response.data.Artists);
        setIsLoading(false);
      });
    });
  }, []);

  return (
    <div className="h-screen w-full overflow-hidden flex transition-all bg-[#121212]">
      <div className="bg-[#212121] w-full mt-2 mr-2 p-4 rounded-lg overflow-x-hidden">
        <div className="flex justify-between mt-6">
          <p className="text-white">Popular Artists</p>
          <p className="text-gray-400 cursor-pointer">Show all</p>
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
      </div>
    </div>
  );
};

export default HomeScreen;
