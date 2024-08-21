import axios from "axios";
const apiUrl = `http://localhost:8000`;

// Create an Axios instance
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("Authorization");
    const token: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6InJlZ3VsYXIiLCJpYXQiOjE3MjM4MDY2OTZ9.EWa8cNqaRAE_DaitAqaaR70GaLVIQorX5Vh-O2Ci1N0";

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
        `${apiUrl}/v1/app/fetch-songs?albumId=${albumId}`
      );
    },

    getArtistSongs: (artistId: string) => {
      return axiosInstance.get(
        `${apiUrl}/v1/app/fetch-artist-songs?artistId=${artistId}`
      );
    },
  },
  post: {
    login: (body: any) => {
      return axios.post(`${apiUrl}/login`, body);
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
