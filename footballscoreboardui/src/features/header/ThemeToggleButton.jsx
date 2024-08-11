// ThemeToggleButton.js
import React from 'react';

const ThemeToggleButton = ({ theme, toggleTheme }) => (
    <button className="btn btn-outline-secondary me-2" onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
    </button>
);

export default ThemeToggleButton;
