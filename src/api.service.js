import axios from "axios";
import { createBrowserHistory } from "history"; // Create a history object for redirection
import Cookies from "js-cookie";

const history = createBrowserHistory(); // Create a history instance

class ApiService {
  static api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // Static method to set up interceptors
  static setupInterceptors() {
    this.api.interceptors.response.use(
      (response) => response, // Return the response if successful
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token has expired or is invalid, redirect to login
          console.log("interceptorrrr");
          window.location.href = "/login";
        }
        return Promise.reject(error); // Reject the promise for further handling
      }
    );
  }

  static addToken() {
    this.api.interceptors.request.use(
      (config) => {
        // Get the token from cookies
        const token = Cookies.get("authorization"); // Replace with your actual cookie name
        if (token) {
          // Set the token in the Authorization header
          config.headers["Authorization"] = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  //   static initialize() {

  //   }
  // }

  // GET Method
  static async get(endpoint) {
    try {
      const response = await this.api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("GET Error:", error);
      throw error;
    }
  }

  // POST Method
  static async post(endpoint, data) {
    try {
      const response = await this.api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("POST Error:", error);
      throw error;
    }
  }

  // PUT Method
  static async put(endpoint, data) {
    try {
      const response = await this.api.put(endpoint, data);
      return response.data;
    } catch (error) {
      console.error("PUT Error:", error);
      throw error;
    }
  }

  // DELETE Method
  static async delete(endpoint) {
    try {
      const response = await this.api.delete(endpoint);
      return response.data;
    } catch (error) {
      console.error("DELETE Error:", error);
      throw error;
    }
  }
}

// Set up interceptors when the ApiService is first imported/used
// ApiService.setupInterceptors();
ApiService.addToken();

export default ApiService;
