import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';
import { useTheme } from '../theme/ThemeContext'; // Import ThemeContext
import './Dashboard.css'; // Import the CSS file for styling
import Admindashboard from './Admindashboard';
import Userdashboard from './Userdashboard';

function Dashboard() {
    const state = useSelector((state) => state.auth);
    const { theme } = useTheme(); // Get the current theme from ThemeContext

    return (
        <div className={`dashboard-container ${theme}`}>
            {state.role === "admin" ? <Admindashboard />: <Userdashboard /> }
            <Outlet />
        </div>
    );
}

export default Dashboard;
