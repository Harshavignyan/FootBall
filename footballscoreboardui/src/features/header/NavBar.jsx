// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ token, role }) => (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <Link className="nav-link" to="/customer">Matches</Link>
        </li>
        {token && role === "admin" && (
            <li className="nav-item">
                <Link className="nav-link" to="/prematchboard">Start Match</Link>
            </li>
        )}
        {!token && (
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        )}
    </ul>
);

export default NavBar;
