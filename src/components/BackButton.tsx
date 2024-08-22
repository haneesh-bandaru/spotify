import { ArrowLeft, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ route }: string) => {
  const navigate = useNavigate();
  return (
    <div
      className="pt-2 pl-2 w-fit h-8 text-white group"
      onClick={() => {
        navigate(route);
      }}
    >
      <ChevronLeft className="bg-[#121212] rounded-full    p-1 group-hover:hidden" />
      <ArrowLeft className="bg-[#121212] rounded-full    p-1 group-hover:block hidden" />
    </div>
  );
};

export default BackButton;
