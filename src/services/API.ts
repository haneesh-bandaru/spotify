import axios from "axios";
const apiUrl = `http://localhost:8000`;

// Create an Axios instance
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  get: {
    getAlbums: () => {
      return axiosInstance.get(`${apiUrl}/v1/app/fetch-albums`);
    },

    getArtists: () => {
      return axiosInstance.get(`${apiUrl}/v1/app/fetch-artists`);
    },

    getSongs: (albumId: string) => {
      return axiosInstance.get(
        `${apiUrl}/v1/app/fetch-track?albumId=${albumId}`
      );
    },

    getArtistSongs: (artistId: string) => {
      return axiosInstance.get(
        `${apiUrl}/v1/app/fetch-artist-track?artistId=${artistId}`
      );
    },

    getPlaylists: (userId: string) => {
      return axiosInstance.get(
        `${apiUrl}/v1/app/fetch-playlists?userId=${userId}`
      );
    },

    getPlaylistDetails: (playlistId: string) => {
      return axiosInstance.get(
        `${apiUrl}/v1/app/fetch-playlist-details?playlistId=${playlistId}`
      );
    },

    getLikedSongs: (userId: string) => {
      return axiosInstance.get(
        `${apiUrl}/v1/app/fetch-liked-songs?userId=${userId}`
      );
    },

    globalSearch: (track: string) => {
      return axios.get(
        `https://jiosaavn-api-lac.vercel.app/api/search?query=${track}`
      );
    },
  },
  post: {
    login: (body: any) => {
      return axios.post(`${apiUrl}/login`, body);
    },

    signup: (body: any) => {
      return axios.post(`${apiUrl}/signup`, body);
    },

    likeTrack: (body: any) => {
      return axios.post(`${apiUrl}/v1/app/toggle-like-track`, body);
    },
  },
  put: {
    fakeProduct: (body: any) => {
      return axiosInstance.put("https://fakestoreapi.com/products/7", body);
    },
  },
  delete: {
    fakeProduct: () =>
      axiosInstance.delete("https://fakestoreapi.com/products/6"),
  },
};
