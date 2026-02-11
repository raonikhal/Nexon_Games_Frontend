import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 10000,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  try {
    return config;
  } catch (err) {
    console.error("Request Error:", err);
  }
}
);

instance.interceptors.response.use((response) => {
  try {
    return response;
  } catch (err) {
    console.error("Response Error:", err);
  }
}

);

export default instance;
