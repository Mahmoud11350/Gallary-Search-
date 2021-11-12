import axios from "axios";

export const unsplash = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: "Client-ID nvFzMmDi6pvOmQCDgtU-bfhZATN5Dfnipwa0BLl3RsI",
  },
});
