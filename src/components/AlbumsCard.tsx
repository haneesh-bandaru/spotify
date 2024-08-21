import { Card, CardContent } from "./ui/card";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Album {
  AlbumId: string;
  AlbumName: string;
  Release_Date: string;
  "Number of Songs": number;
  Duration: string;
}

interface AlbumsCardProps {
  item: Album;
}

export default function AlbumsCard({ item }: AlbumsCardProps) {
  const navigate = useNavigate();
  return (
    <Card className="bg-[#121212] min-h-64">
      <CardContent className="p-4">
        <img
          src={`https://avatar.iran.liara.run/username?username=${item.AlbumName}`}
          height={150}
          width={150}
          alt="No way!"
          className=" rounded-full object-cover"
        />
      </CardContent>
      <CardContent className="flex justify-between">
        <div className="">
          <p className="text-white">{item.AlbumName}</p>
          <p className="text-gray-400">{item.Release_Date.slice(0, 10)}</p>
        </div>
        <div
          className="bg-primary rounded-full w-[24px] h-[24px] p-1"
          onClick={() => {
            navigate(`/albums/${item.AlbumName}`, { state: item.AlbumId });
          }}
        >
          <Play size={24} />
        </div>
      </CardContent>
    </Card>
  );
}
