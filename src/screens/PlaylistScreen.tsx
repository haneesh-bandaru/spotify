import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "@/services/API";
import BackButton from "@/components/BackButton";

const PlaylistsScreen = () => {
  const location = useLocation();
  console.log(location.state);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await API.get.getAlbumsFromSaavan(location.state);
        setPlaylists(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching playlists:", error);
        setIsLoading(false);
      }
    };

    fetchPlaylists();
  }, [location.state]);

  return (
    <div className="bg-[#121212] w-full my-2 mr-2 overflow-scroll ">
      {!isLoading ? (
        <div className="relative bg-[#212121] h-full text-white rounded-xl">
          <BackButton route={"/home"} />
          <div className="relative pt-10 pl-8">Nenu cheppanu</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlaylistsScreen;
