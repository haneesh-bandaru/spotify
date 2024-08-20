import { ReactNode } from "react";
import CardComponent from "../Card";
import ArtistsCard from "../ArtistsCard";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-full flex transition-all  bg-[#121212]">
      {children}
      <div className="bg-[#212121] w-full m-2 p-4 rounded-lg">
        <div className=" flex justify-between">
          <p className="text-white">Popular Artists</p>
          <p className="text-gray-400 cursor-pointer">Show all</p>
        </div>
        <div className="flex w-56 gap-6">
          <ArtistsCard />
          <ArtistsCard />
          <ArtistsCard />
          <ArtistsCard />
          <ArtistsCard />
          <ArtistsCard />
        </div>

        <div className=" flex justify-between mt-6">
          <p className="text-white">Popular Albums</p>
          <p className="text-gray-400 cursor-pointer">Show all</p>
        </div>
        <div className="flex gap-2 overflow-x-hidden">
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
          <CardComponent />
        </div>
      </div>
    </div>
  );
};

export default Layout;
