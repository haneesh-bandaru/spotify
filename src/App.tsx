import { Route, Routes, useNavigate } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import AlbumsScreen from "./screens/AlbumsScreen";
import Login from "./screens/LoginScreen";
import Layout from "./components/layouts/Layout";
import ArtistsScreen from "./screens/ArtistsScreen";
import AllArtistScreen from "./screens/AllArtistScreen";
import RadioScreen from "./screens/RadioScreen";
import PodcastsScreen from "./screens/PodcastsScreen";
import PlaylistScreen from "./screens/PlaylistScreen";
import SignUpForm from "./screens/SignupScreen";
import useAuthStore from "./store/store";
import LikedSongs from "./screens/LikedSongsScreen";
import Task from "./screens/Task";

const App = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex">
      <Routes></Routes>
      {isLoggedIn ? (
        <Routes>
          <Route path="/" element={<Layout onLogout={handleLogout} />}>
            <Route path="/task" element={<Task />} />
            <Route path="/home" element={<HomeScreen />} />
            <Route path="*" element={<HomeScreen />} />
            <Route path="/albums/:slug" element={<AlbumsScreen />} />
            <Route path="/artists/:slug" element={<ArtistsScreen />} />
            <Route path="/playlist/:slug" element={<PlaylistScreen />} />
            <Route path="/artists" element={<AllArtistScreen />} />
            <Route path="/radio" element={<RadioScreen />} />
            <Route path="/podcasts" element={<PodcastsScreen />} />
            <Route path="/liked-songs/:id" element={<LikedSongs />} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
