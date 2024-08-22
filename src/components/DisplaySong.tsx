import { Play } from "lucide-react";

type Song = {
  "Song Name": string;
  Duration: number;
  Path: string;
};

const DisplaySong = ({ song, index }) => {
  return (
      <div
        key={index}
        className="flex justify-between p-4  hover:bg-[#212121] mx-3 mt-3 rounded-xl group h-4"
      >
        <div className="flex gap-4 ">
          <p>{index + 1}</p>
          <p className="font-bold">{song["Song Name"]}</p>
        </div>
        <div className=" flex items-center group gap-6">
          <div className="hidden group-hover:block">
            <div className="bg-primary text-black rounded-full w-[20px] h-[20px] p-1">
              <Play size={20} />
            </div>
          </div>
          <p>
            {Math.floor(song.Duration / 60)}:{" "}
            {song.Duration / 60 - song.Duration / 60}
          </p>
        </div>
      </div>
  );
};

export default DisplaySong;
