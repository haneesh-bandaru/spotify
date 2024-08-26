import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Image {
  quality: string;
  url: string;
}

interface ResultItem {
  id: string;
  title: string;
  image: Image[];
  type: string;
  description: string;
  artist?: string;
  url?: string;
  year?: string;
  language?: string;
  primaryArtists?: string;
  singers?: string;
  album?: string;
  songIds?: string;
}

interface QueryData {
  success: boolean;
  data: {
    topQuery?: {
      results: ResultItem[];
      position: number;
    };
    songs?: {
      results: ResultItem[];
      position: number;
    };
    albums?: {
      results: ResultItem[];
      position: number;
    };
    artists?: {
      results: ResultItem[];
      position: number;
    };
    playlists?: {
      results: ResultItem[];
      position: number;
    };
  };
}

const fetchSearchResults = async (query: string): Promise<QueryData> => {
  const response = await axios.get<QueryData>(`/api/search?query=${query}`);
  return response.data;
};

const SearchScreen: React.FC = () => {
  const location = useLocation();
  const query: string = location.state?.query ?? "";

  const { data, isLoading, isError } = useQuery<QueryData>(
    ["searchResults", query],
    () => fetchSearchResults(query)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="h-[80vh] w-full mt-2 mr-3 p-4 rounded-lg bg-[#212121] text-white">
      {data?.data?.albums?.results && (
        <div>
          <h2>Albums</h2>
          <ul>
            {data.data.albums.results.map((album) => (
              <li key={album.id}>
                <img src={album.image[0].url} alt={album.title} />
                <p>{album.title}</p>
                <p>{album.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Repeat for other categories like songs, artists, playlists, etc. */}
    </div>
  );
};

export default SearchScreen;
