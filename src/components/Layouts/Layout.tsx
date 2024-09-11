import { Toaster } from "../ui/toaster";
import Aside from "./aside/Aside";
import PlaySongs from "../PlaySongs";

const Layout = ({ onLogout,children }) => {
  return (
    <div className="flex flex-col justify-between bg-background w-screen h-screen">
      <div className="flex">
        <Aside onLogout={onLogout} />
        <Toaster />
        {children}
      </div>
      <PlaySongs />
    </div>
  );
};

export default Layout;
