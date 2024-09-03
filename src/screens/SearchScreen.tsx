import { useLocation, useNavigate } from "react-router-dom";
import dummyImage from "/dummyImage.png";

const SearchScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  return (
    <div className="h-[80vh] w-screen bg-[#212121] mt-2 mb-3 rounded-lg mr-2 p-3 text-white overflow-scroll">
      {/* Albums Section */}
      <div>
        <h2 className="  text-lg font-semibold mb-2">Albums</h2>
        <div className="flex gap-10 ">
          {data.albums.results.map((album, index) => (
            <div
              className="hover:bg-[#121212] mb-4 p-4 rounded-lg cursor-pointer"
              key={index}
              onClick={() => {
                navigate(`/albums/${album.title}`, { state: album.id });
              }}
            >
              <img
                src={album.image[2].url}
                alt={album.title}
                className="w-40 h-40 rounded-xl"
              />
              <p className="text-white w-40">{album.title}</p>
              <p className="text-gray-400 w-40">{album.description}</p>
              <p className="text-gray-500">
                {album.language[0].toUpperCase() + album.language.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Songs Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Songs</h2>
        <div className="flex gap-10">
          {data.songs.results.map((song, index) => (
            <div
              className="hover:bg-[#121212] mb-4 p-4 rounded-lg cursor-pointer"
              key={index}
              onClick={() => {
                navigate(`/song/${song.title}`, { state: song.id });
              }}
            >
              <img
                src={song.image[2].url}
                alt={song.title}
                className="w-40 h-40"
              />
              <p className="text-white w-40">{song.title}</p>
              <p className="text-gray-400">{song.description.slice(0, 20)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Artists Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Artists</h2>
        <div className="flex gap-10">
          {data.artists.results.map((artist, index) => (
            <div
              className="hover:bg-[#121212] mb-4 p-4 rounded-lg cursor-pointer"
              key={index}
              onClick={() => {
                navigate(`/artists/${artist.title}`, { state: artist.id });
              }}
            >
              <img
                src={artist.image[2].url || dummyImage}
                alt={artist.title}
                className="w-40 h-40"
              />
              <p className="text-white ">{artist.title}</p>
              <p className="text-gray-400">{artist.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Playlists Section */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Playlists</h2>
        {data.playlists.results.length === 0 ? (
          <p>No playlists found.</p>
        ) : (
          <div className="flex gap-10">
            {data.playlists.results.map((playlist, index) => (
              <div
                className="hover:bg-[#121212] mb-4 p-4 rounded-lg cursor-pointer"
                key={index}
                onClick={() => {
                  navigate(`/playlist/${playlist.title}`, {
                    state: playlist.id,
                  });
                }}
              >
                <img
                  src={playlist.image[2].url || dummyImage}
                  alt={playlist.title}
                  className="w-40 h-40"
                />
                <p className="text-white">{playlist.title}</p>
                <p>{playlist.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
