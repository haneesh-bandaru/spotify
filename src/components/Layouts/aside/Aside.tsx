import {
  DiscAlbum,
  EllipsisVertical,
  Headphones,
  Heart,
  Home,
  LogOut,
  LucideLogOut,
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
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";

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
  const { setTheme, theme } = useTheme();

  const searchOnClick = async () => {
    const response = await API.get.globalSearch(searchText);
    navigate("/search", { state: response.data.data });
  };
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
      <div className="bg-muted p-4 rounded-lg w-fit">
        <div className="flex items-center m-2 max-h-10 gap-2">
          <img src={spotifyLogo} width={26} alt="Spotify Logo" />
          <p className="font-bold text-lg text-green-500 h-fit">Spotify</p>
        </div>

        <div className="flex bg-background items-center rounded-full px-3 h-fit">
          <Search
            size={18}
            className="text-text"
            onClick={() => {
              searchOnClick();
            }}
          />
          <Input
            className="outline-none border-0 focus-visible:ring-0 text-text"
            placeholder="What to play?"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col mt-2 bg-muted p-2 rounded-lg">
        <p className="text-text mr-1">Menu</p>
        {sideItems.map((item, index) => {
          const isActive = location.pathname === item.route;
          return (
            <div
              key={index}
              className={`flex items-center text-gray-400 h-10 cursor-pointer hover:bg-muted hover:rounded-full hover:w-fit hover:pr-6 ${
                isActive ? "bg-muted text-text rounded-full w-fit pr-6" : ""
              }`}
              onClick={() => navigate(item.route)}
            >
              <item.icon className="mx-3" size={18} />
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col mt-2 bg-muted p-2 rounded-lg h-[29vh]">
        <p className="text-text text-xl mx-2 mt-4 ">Library</p>
        <div className="flex flex-col justify-between h-full">
          <div className="">
            {Library.map((item, index) => {
              const isActive = location.pathname === item.route;
              return (
                <div
                  key={index}
                  className={`flex items-center h-10 cursor-pointer hover:bg-muted hover:rounded-full hover:w-fit hover:pr-6 ${
                    isActive ? "bg-muted text-text rounded-full w-fit pr-6" : ""
                  }`}
                  onClick={() => navigate(item.route)}
                >
                  <item.icon className="mx-2" size={18} />
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>

          <Popover>
            <PopoverTrigger className="bg-muted border-none ">
              <div className="flex items-center gap-2 cursor-pointer ">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className=" text-lg text-white">Miracle Labs</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit ml-5 flex flex-col-reverse gap-4 ">
              {/* <div className="flex gap-2 items-center">
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(e) => setTheme(e ? "dark" : "light")}
                />
                <span className="">Switch Theme</span>
              </div> */}
              <div
                className="flex text-lg items-center gap-4 ml-3 hover:cursor-pointer"
                // onClick={handleLogout}
              >
                <LucideLogOut size={20} />
                Logout
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Aside;
