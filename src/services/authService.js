import axiosInstance from './axiosInstance';
import API_CONFIG from '../config/api';

const authService = {
    login: async (username, password) => {
        try {
            const response = await axiosInstance.post(API_CONFIG.ENDPOINTS.LOGIN, {
                username,
                password
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await axiosInstance.post(API_CONFIG.ENDPOINTS.REGISTER, userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    refreshToken: async (refreshToken) => {
        try {
            const response = await axiosInstance.post(API_CONFIG.ENDPOINTS.REFRESH_TOKEN, {
                refresh: refreshToken
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default authService;