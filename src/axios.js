import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_Google, // THE API (cloud function) URL
});
export default instance;
