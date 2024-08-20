import { Image, TextInput, ThemeIcon } from "@mantine/core";
import {
  DiscAlbum,
  Headphones,
  Heart,
  Home,
  LucideProps,
  Podcast,
  Radio,
  Search,
} from "lucide-react";
import spotifyLogo from "../../../assets/spotify.png";
// import { Button } from "@/components/ui/button";

type sideItemsType = {
  text: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

const sideItems: sideItemsType[] = [
  {
    text: "Home",
    icon: Home,
  },
  {
    text: "Radio",
    icon: Radio,
  },
  {
    text: "Artists",
    icon: Headphones,
  },
  {
    text: "Podcasts",
    icon: Podcast,
  },
];

const Library: sideItemsType[] = [
  {
    text: "Liked Albums",
    icon: DiscAlbum,
  },
  {
    text: "Liked Songs",
    icon: Heart,
  },
];

const Aside = () => {
  return (
    <div className="p-2 overflow-hidden">
      <div className="bg-[#212121] p-4 rounded-lg w-fit ">
        <div className="flex items-center m-2 max-h-10">
          <ThemeIcon color="#212121">
            <Image src={spotifyLogo} w={26} />
          </ThemeIcon>
          <p className="font-bold text-lg text-green-500 h-fit">Spotify</p>
        </div>
        <TextInput
          variant="filled"
          leftSection={<Search size={18} />}
          placeholder="What to play?"
          styles={{
            input: {
              backgroundColor: "#121212",
              color: "white",
              borderRadius: 16,
              width: "150px",
            },
          }}
        />
      </div>

      <div className="flex flex-col mt-2 bg-[#212121]  p-2 rounded-lg w-44">
        <p className="text-white  mr-1">Menu</p>
        {sideItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center text-gray-400 hover:bg-black hover:w-fit  h-10 cursor-pointer"
          >
            <item.icon className="mx-3" size={18} />
            <p className="">{item.text}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-2 bg-[#212121] p-2 w-44 rounded-lg h-screen ">
        <p className="text-white  mr-1">Library</p>
        {Library.map((item, index) => (
          <div
            key={index}
            className="flex items-center text-gray-400 h-10 cursor-pointer"
          >
            <item.icon className="mx-2" size={18} />
            <p className="">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aside;
