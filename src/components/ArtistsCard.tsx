import { useNavigate } from "react-router-dom";

interface Artists {
  Artist_ID: string;
  Name: string;
  Genre: string;
  profile_image: string;
}

const ArtistsCard = ({ item }: Artists) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col mt-4 gap-4 p-4 items-center hover:bg-[#121212] hover:cursor-pointer hover:rounded-lg"
      onClick={() => {
        navigate(`/artists/${item.Name}`, { state: item.Artist_ID });
      }}
    >
      <img
        src={`${item.ProfileImage}`}
        height={160}
        width={160}
        alt={`${item.Name}`}
        className="rounded-full object-cover"
      />
      <p className="text-white">{item.Name}</p>
      <p className="text-gray-500">{item.Genre}</p>
    </div>
  );
};

export default ArtistsCard;
