import axios from "axios";
import { createBrowserHistory } from "history"; // Create a history object for redirection

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

  //   static initialize() {

  //   }
  // }

  // GET Method
  static async get(endpoint) {
    try {
      const response = await this.api.get(endpoint, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      return response.data;
    } catch (error) {
      console.error("GET Error:", error);
      throw error;
    }
  }

  // POST Method
  static async post(endpoint, data) {
    try {
      const response = await this.api.post(endpoint, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      console.error("POST Error:", error);
      throw error;
    }
  }

  // PUT Method
  static async put(endpoint, data) {
    try {
      const response = await this.api.put(endpoint, data, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      console.error("PUT Error:", error);
      throw error;
    }
  }

  // DELETE Method
  static async delete(endpoint) {
    try {
      const response = await this.api.delete(endpoint, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      console.error("DELETE Error:", error);
      throw error;
    }
  }
}

// Set up interceptors when the ApiService is first imported/used
// ApiService.setupInterceptors();
// ApiService.addToken();

export default ApiService;
