import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // Import the CSS file for styling

function Userdashboard() {
    const state = useSelector((state) => state.auth);
    const { theme } = useTheme(); // Get the current theme from ThemeContext

    return (
        <div>
            <div className={`dashboard-container ${theme}`}>
                <div className="profile-section">
                    <div className="profile-pic-container">
                        <img
                            src={state.profilePic ? `http://localhost:3000/${state.profilePic}` : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                            alt="Profile"
                            className="profile-pic"
                        />
                    </div>
                    <h1 className="username">{state.username}</h1>
                </div>
            </div>
            <div>
                <Link to='./signup' className="dashboard-link">Add Admin</Link>
            </div>
        </div>
    );
}

export default Userdashboard;
