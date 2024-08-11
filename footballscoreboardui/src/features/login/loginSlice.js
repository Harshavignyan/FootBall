import { createSlice } from '@reduxjs/toolkit';

// Function to get values from local storage
const getLocalStorageValues = () => {
    return {
        username: localStorage.getItem('username') || '',
        token: localStorage.getItem('token') || '',
        role: localStorage.getItem('role') || '',
        profilePic: localStorage.getItem('profilePic') || '', // Add profilePic
    };
};

const initialState = getLocalStorageValues();

const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token; // Store the token
            state.role = action.payload.role; // Store the role
            state.profilePic = action.payload.profilePic; // Store the profilePic
            
            // Save token, role, username, and profilePic to localStorage
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.role);
            localStorage.setItem('profilePic', action.payload.profilePic); // Save profilePic
        },
        logout: (state) => {
            state.username = '';
            state.token = '';
            state.role = ''; // Clear the role
            state.profilePic = ''; // Clear the profilePic
            
            // Remove username, token, role, and profilePic from localStorage
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('profilePic'); // Remove profilePic
        },
    },
});

export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
