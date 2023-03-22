import axios from "axios";

const instance = axios.create({
  baseURL: "https://movieplus.online",
  withCredentials:true,
});

export default instance;