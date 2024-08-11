// Header.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Dropdown } from 'mdb-ui-kit';
import { useTheme } from '../theme/ThemeContext';
import { logout } from '../login/loginSlice';
import NavBar from './NavBar';
import ThemeToggleButton from './ThemeToggleButton';
import ProfileDropdown from './ProfileDropdown';
import { Link } from 'react-router-dom';

function Header() {
    const { theme, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(state => state.auth.token);
    const role = useSelector(state => state.auth.role);
    const profilePic = useSelector(state => state.auth.profilePic);

    useEffect(() => {
        const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
        dropdownElementList.map(function (dropdownToggleEl) {
            return new Dropdown(dropdownToggleEl);
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('profilePic');
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
                        <NavBar token={token} role={role} />
                    </div>

                    <div className="d-flex align-items-center">
                        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
                        {token && <ProfileDropdown profilePic={profilePic} handleLogout={handleLogout} />}
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    );
}

export default Header;
