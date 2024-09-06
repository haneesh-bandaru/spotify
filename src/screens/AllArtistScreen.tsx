import ArtistsCard from "@/components/ArtistsCard";
import BackButton from "@/components/BackButton";
import API from "@/services/API";
import { useEffect, useState } from "react";

type Artists = {
  Artist_ID: string;
  Name: string;
  Genre: string;
  ProfileImage: string;
};

const AllArtistScreen = () => {
  const [artists, setArtists] = useState<Artists[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    API.get.getArtists().then((response) => {
      setArtists(response.data.Artists);
      setIsLoading(false);
      console.log(artists);
    });
  }, []);

  return (
    <div className="w-screen h-[87vh] bg-muted mt-2 mb-3 rounded-xl p-2 overflow-hidden">
      <BackButton />
      <h1 className="text-white translate-x-[40%]">Popular Artists</h1>
      <div className="flex flex-wrap justify-center">
        {!isLoading
          ? artists.map((item, index) => (
              <div className="flex ">
                <ArtistsCard item={item} key={index} />
              </div>
            ))
          : "loading"}
      </div>
    </div>
  );
};

export default AllArtistScreen;
