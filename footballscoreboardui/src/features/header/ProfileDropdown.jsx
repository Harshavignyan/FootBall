// ProfileDropdown.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = ({ profilePic, handleLogout }) => (
    <div className="dropdown">
        <a
            className="dropdown-toggle d-flex align-items-center hidden-arrow"
            href="#"
            id="navbarDropdownMenuAvatar"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
        >
            <img
                src={profilePic ? `http://localhost:3000/${profilePic}` : "https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"}
                className="rounded-circle profile-img"
                alt="Profile"
                loading="lazy"
            />
        </a>
        <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="navbarDropdownMenuAvatar"
        >
            <li>
                <Link className="dropdown-item" to="/dashboard">My profile</Link>
            </li>
            <li>
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
            </li>
        </ul>
    </div>
);

export default ProfileDropdown;
