import axios from "axios";

var api = axios.create({
  baseURL: "https://localhost:7272/api",
});
export default api;
