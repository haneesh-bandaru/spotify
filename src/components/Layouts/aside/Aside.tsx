import {
  DiscAlbum,
  Headphones,
  Heart,
  Home,
  LogOut,
  LucideProps,
  Podcast,
  Radio,
  Search,
} from "lucide-react";
import spotifyLogo from "../../../assets/spotify.png";
import { Input } from "@/components/ui/input";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import API from "@/services/API";
import { debounce } from "lodash";

type SideItemsType = {
  text: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  route: string;
};

const sideItems: SideItemsType[] = [
  {
    text: "Home",
    icon: Home,
    route: "/home",
  },
  {
    text: "Radio",
    icon: Radio,
    route: "/radio",
  },
  {
    text: "Artists",
    icon: Headphones,
    route: "/artists",
  },
  {
    text: "Podcasts",
    icon: Podcast,
    route: "/podcasts",
  },
];

const Library: SideItemsType[] = [
  {
    text: "Liked Albums",
    icon: DiscAlbum,
    route: "/liked-albums",
  },
  {
    text: "Liked Songs",
    icon: Heart,
    route: "/liked-songs",
  },
];

const Aside = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState("");

  const searchOnClick =async()=>{
    const response = await API.get.globalSearch(searchText);
    navigate("/search", { state: response.data.data });
  }
  const searchSongs = useCallback(
    debounce(async (text) => {
      if (text.trim()) {
        try {
          const response = await API.get.globalSearch(text);
          navigate("/search", { state: response.data.data });
        } catch (error) {
          console.error(error);
        }
      }
    }, 500),
    [navigate]
  );

  useEffect(() => {
    searchSongs(searchText);
    return () => {
      searchSongs.cancel();
    };
  }, [searchText]);

  return (
    <div className="p-2 overflow-hidden max-w-48 min-w-48">
      {/* Logo & Search Part */}
      <div className="bg-[#212121] p-4 rounded-lg w-fit">
        <div className="flex items-center m-2 max-h-10 gap-2">
          <img src={spotifyLogo} width={26} alt="Spotify Logo" />
          <p className="font-bold text-lg text-green-500 h-fit">Spotify</p>
        </div>

        <div className="flex bg-[#121212] items-center rounded-full px-3 h-fit">
          <Search size={18} className="text-white" onClick={()=>{searchOnClick()}} />
          <Input
            className="outline-none border-0 focus-visible:ring-0 text-white"
            placeholder="What to play?"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col mt-2 bg-[#212121] p-2 rounded-lg">
        <p className="text-white mr-1">Menu</p>
        {sideItems.map((item, index) => {
          const isActive = location.pathname === item.route;
          return (
            <div
              key={index}
              className={`flex items-center text-gray-400 h-10 cursor-pointer hover:bg-black hover:rounded-full hover:w-fit hover:pr-6 ${
                isActive ? "bg-black text-white rounded-full w-fit pr-6" : ""
              }`}
              onClick={() => navigate(item.route)}
            >
              <item.icon className="mx-3" size={18} />
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col mt-2 bg-[#212121] p-2 rounded-lg h-[33vh]">
        <p className="text-white text-xl mx-2 mt-4 ">Library</p>
        <div className="flex flex-col justify-between h-full">
          <div className="">
            {Library.map((item, index) => {
              const isActive = location.pathname === item.route;
              return (
                <div
                  key={index}
                  className={`flex items-center text-gray-400 h-10 cursor-pointer hover:bg-black hover:rounded-full hover:w-fit hover:pr-6 ${
                    isActive
                      ? "bg-black text-white rounded-full w-fit pr-6"
                      : ""
                  }`}
                  onClick={() => navigate(item.route)}
                >
                  <item.icon className="mx-2" size={18} />
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
          <div
            className="text-gray-400 text-xl mx-2 mt-4 flex items-center gap-1 cursor-pointer"
            onClick={onLogout}
          >
            <LogOut size={20} />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
