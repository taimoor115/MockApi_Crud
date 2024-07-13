import axios from "axios";

export default axios.create({
  baseURL: "https://65fa8ab83909a9a65b1aa217.mockapi.io",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  // withCredentials: true,
});
