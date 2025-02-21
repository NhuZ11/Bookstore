import axios from 'axios';

// Base URL for your Django backend
const API_URL = 'http://127.0.0.1:8000/api/';


interface UserData {
    username: string;
    email?: string;
    password: string;
    name?: string;  
    address?: string;
    phone?: string;  
    confirmPassword?: string;
}

// Register a new user
export const register = async (userData: UserData) => {
    const payload = {
        username: userData.username, 
        name: userData.username, 
        email: userData.email,
        password: userData.password,
        address: userData.address,
        phone: userData.phone,
    };
    try {
        console.log("Sending data:", payload);
        const response = await axios.post(`${API_URL}register/`, payload);
        console.log("Registration successful:", response.data);
        return response.data;
    } catch (error: any) {
        console.log("Registration error:", error.response?.data || error.message);
        throw error;
    }
};


// Login and get tokens
export const login = async (userData: UserData) => {
    const response = await axios.post(`${API_URL}login/`, userData);
    if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
    }
    return response.data;
};

// Logout function 
export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

// Refresh the access token
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;

    try {
        const response = await axios.post(`${API_URL}token/refresh/`, { refresh: refreshToken });
        localStorage.setItem('access_token', response.data.access);
        return response.data.access;
    } catch (error) {
        logout(); // Clear tokens if refresh fails
        return null;
    }
};

// Fetch protected data
export const fetchProtectedData = async () => {
    let accessToken = localStorage.getItem('access_token');
    
    const response = await axios.get(`${API_URL}protected-endpoint/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });

    return response.data;
};
