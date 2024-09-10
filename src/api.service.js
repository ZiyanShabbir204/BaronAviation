// ApiService.js
import axios from "axios";

class ApiService {
  static api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })

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

export default ApiService;
