import axios from "axios";

// Create an Axios instance with a base URL from the environment variable.
const axiosAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor for error handling
axiosAPI.interceptors.request.use(
  (config) => {
    // You can add any request headers or configuration here
    config.headers["Content-Type"] = "application/json";
    config.headers["Access-Control-Allow-Origin"] = "http://127.0.0.1:3000";
    return config;
  },
  (error) => {
    // Handle request errors (e.g., network issues)
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
axiosAPI.interceptors.response.use(
  (response) => {
    // You can perform data transformations or checks on the response here
    return response;
  },
  (error) => {
    // Handle response errors (e.g., HTTP status codes outside the 2xx range)
    return Promise.reject(error);
  }
);

// Common GET request function
export const get = (url: string, config = {}) => {
  return axiosAPI.get(url, config);
};

// Common POST request function
export const post = (url: string, data = {}, config = {}) => {
  return axiosAPI.post(url, data, config);
};

// Common PATCH request function
export const patch = (url: string, data = {}, config = {}) => {
  return axiosAPI.patch(url, data, config);
};

// Common DELETE request function
export const deleteApi = (url: string, config = {}) => {
  return axiosAPI.delete(url, config);
};

export default axiosAPI;
