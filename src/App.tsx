import { Route, Routes, useNavigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AlbumsScreen from "./screens/AlbumsScreen";
import Login from "./screens/LoginScreen";
import { useEffect, useState } from "react";
import Layout from "./components/layouts/Layout";
import ArtistsScreen from "./screens/ArtistsScreen";
import AllArtistScreen from "./screens/AllArtistScreen";
import RadioScreen from "./screens/RadioScreen";
import PodcastsScreen from "./screens/PodcastsScreen";
import PlaylistScreen from "./screens/PlaylistScreen";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex ">
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Layout onLogout={handleLogout} />}>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/albums/:slug" element={<AlbumsScreen />} />
            <Route path="/artists/:slug" element={<ArtistsScreen />} />
            <Route path="/playlist/:slug" element={<PlaylistScreen />} />
            <Route path="/artists" element={<AllArtistScreen />} />
            <Route path="/radio" element={<RadioScreen />} />
            <Route path="/podcasts" element={<PodcastsScreen />} />
          </Route>
        ) : (
          <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
