const API_CONFIG = {
    BASE_URL: 'http://localhost:8000',
    API_VERSION: '/v1/api',
    ENDPOINTS: {
        LOGIN: '/login/',
        REGISTER: '/register/',
        REFRESH_TOKEN: '/token/refresh/',
    }
};

export const getApiUrl = (endpoint) => {
    return `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${endpoint}`;
};

export default API_CONFIG;