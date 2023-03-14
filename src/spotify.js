import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";

const clientId = "c84200fd412149268f5ac1eb25def881";

const redirectUri = "http://localhost:3000/";

const scopes = [
  "playlist-read-private,user-follow-modify,user-follow-read,user-follow-read,user-library-read",
];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
