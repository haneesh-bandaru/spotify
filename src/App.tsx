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
import useAuthStore from "./store/AuthStore";
import LikedSongs from "./screens/LikedSongsScreen";
import Task from "./screens/Task";
import Task2 from "./screens/Task2";
import SearchScreen from "./screens/SearchScreen";
import SongsScreen from "./screens/SongsScreen";

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
      {isLoggedIn ? (
        <Layout onLogout={handleLogout}>
          <Routes>
            <Route path="*" element={<HomeScreen />} />
            <Route path="/task" element={<Task />} />
            <Route path="/task2" element={<Task2 />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/home" index={true} element={<HomeScreen />} />
            <Route path="/albums/:slug" element={<AlbumsScreen />} />
            <Route path="/artists/:slug" element={<ArtistsScreen />} />
            <Route path="/playlist/:slug" element={<PlaylistScreen />} />
            <Route path="/song/:slug" element={<SongsScreen />} />
            <Route path="/artists" element={<AllArtistScreen />} />
            <Route path="/radio" element={<RadioScreen />} />
            <Route path="/podcasts" element={<PodcastsScreen />} />
            <Route path="/liked-songs/:id" element={<LikedSongs />} />
          </Routes>
        </Layout>
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
