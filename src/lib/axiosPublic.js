
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://sport-nest-server-pi.vercel.app", 
  withCredentials: true,
});

export default axiosPublic;