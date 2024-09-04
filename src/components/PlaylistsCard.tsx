import { Lock } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

type Tracks = {
  Track_ID: string;
  TrackName: string;
  Duration: number;
  Path: string;
};

type Playlists = {
  ImageUrl: string;
  Playlist_ID: string;
  Playlist_Name: string;
  Status: string;
  Tracks: Tracks[];
};

type PlaylistsCardProps = {
  item: Playlists;
};

const PlaylistsCard: React.FC<PlaylistsCardProps> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      className="p-4 rounded-lg bg-[#121212] text-white w-40 cursor-pointer"
      onClick={() => {
        navigate(`/playlist/${item?.Playlist_Name}`, {
          state: item?.Playlist_ID,
        });
      }}
    >
      <img
        src={`${item?.ImageUrl}`}
        alt={item?.Playlist_Name}
        className="w-full object-cover rounded-lg"
      />
      <div className="mt-2">
        <h3 className="flex items-center justify-between text-lg font-bold">
          {item?.Playlist_Name}
          {item?.Status === "Private" ? <Lock size={16} /> : ""}
        </h3>
        <p className="text-gray-500 text-md"> {item?.Tracks?.length} songs</p>
      </div>
    </div>
  );
};

export default PlaylistsCard;
