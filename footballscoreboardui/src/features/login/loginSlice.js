import { createSlice } from '@reduxjs/toolkit';

// Function to get values from local storage
const getLocalStorageValues = () => {
    return {
        username: localStorage.getItem('username') || '',
        token: localStorage.getItem('token') || '',
        role: localStorage.getItem('role') || '',
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
            // Save token and role to localStorage
            localStorage.setItem('username', action.payload.username);
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('role', action.payload.role);
        },
        logout: (state) => {
            state.username = '';
            state.token = '';
            state.role = ''; // Clear the role
            localStorage.removeItem('username'); // Remove username from localStorage
            localStorage.removeItem('token'); // Remove token from localStorage
            localStorage.removeItem('role'); // Remove role from localStorage
        },
    },
});

export const { setUser, logout } = loginSlice.actions;
export default loginSlice.reducer;
