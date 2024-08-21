import { Outlet } from "react-router-dom";
import { Toaster } from "../ui/toaster";
import Aside from "./aside/Aside";

const Layout = ({ onLogout }) => {
  return (
    <div className="flex bg-[#121212] w-screen h-screen">
      <Aside onLogout={onLogout} />
      <Toaster />
      <Outlet />
    </div>
  );
};

export default Layout;
