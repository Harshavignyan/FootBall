import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Dropdown } from 'mdb-ui-kit';
import { useTheme } from '../theme/ThemeContext';
import { logout } from '../login/loginSlice';

function Header() {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Access token and role from Redux state
    const token = useSelector(state => state.auth.token);
    const role = useSelector(state => state.auth.role);

    useEffect(() => {
        // Manually initialize dropdown
        const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
        dropdownElementList.map(function (dropdownToggleEl) {
            return new Dropdown(dropdownToggleEl);
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        dispatch(logout());
        navigate('/');
    };

    return (
        <>
            <nav className={`navbar navbar-expand-lg navbar-light bg-body-tertiary ${theme}`}>
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link className="navbar-brand mt-2 mt-lg-0" to="/">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                                height="15"
                                alt="MDB Logo"
                                loading="lazy"
                            />
                        </Link>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {(token && role === "admin") ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/customer">Matches</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/prematchboard">Start Match</Link>
                                    </li>
                                </>
                            ) : role === "user" ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/customer">Matches</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/customer">Matches</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <div className="d-flex align-items-center">
                        <button className="btn btn-outline-secondary me-2" onClick={toggleTheme}>
                            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        </button>
                        {token && (
                            <div>
                                <div className="dropdown">
                                    <a
                                        className="dropdown-toggle d-flex align-items-center hidden-arrow"
                                        href=""
                                        id="navbarDropdownMenuAvatar"
                                        data-mdb-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                                            className="rounded-circle"
                                            height="25"
                                            alt="Black and White Portrait of a Man"
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
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Header;
