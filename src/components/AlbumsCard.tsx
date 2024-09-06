import { Card, CardContent } from "./ui/card";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Album {
  AlbumId: string;
  AlbumName: string;
  Release_Date: string;
  "Number of Songs": number;
  Duration: string;
  AlbumImage: string;
}

interface AlbumsCardProps {
  item: Album;
}

export default function AlbumsCard({ item }: AlbumsCardProps) {
  const navigate = useNavigate();
  return (
    <Card className="bg-background min-h-64 group">
      <CardContent className="p-4">
        <img
          src={item.AlbumImage}
          height={150}
          width={150}
          alt=""
          className=" rounded-full object-cover"
        />
      </CardContent>
      <CardContent className="flex justify-between group">
        <div className="">
          <p className="text-text">{item.AlbumName}</p>
          <p className="text-gray-400">{item.Release_Date.slice(0, 10)}</p>
        </div>
        <div
          className="bg-primary rounded-full w-[24px] h-[24px] p-1 cursor-pointer hidden group-hover:block"
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
