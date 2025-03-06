import axios from "axios";
import { BASE_URL } from "./urls";

// Create axios instance with base configuration
export const apiInstance = axios.create({
    baseURL: process.env.REACT_APP_ENV === "development"
        ? "https://bs9m28vrpo.execute-api.localhost.localstack.cloud:4566/dev"
        : BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000 // 10 seconds timeout
});

// Request interceptor for API calls
apiInstance.interceptors.request.use(
    (config) => {
        // You can add auth tokens here if needed
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for API calls
apiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        console.error(`API Error: ${errorMessage}`);
        return Promise.reject(error);
    }
);

// Helper functions for common API operations
export const apiService = {
    get: async (url, config = {}) => {
        try {
            const response = await apiInstance.get(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    post: async (url, data, config = {}) => {
        try {
            const response = await apiInstance.post(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    put: async (url, data, config = {}) => {
        try {
            const response = await apiInstance.put(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    delete: async (url, config = {}) => {
        try {
            const response = await apiInstance.delete(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};


