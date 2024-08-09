import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import { useTheme } from '../theme/ThemeContext';


function Customerinterface() {
    // Retrieve initial state from Redux store
    const { leftCountryName, rightCountryName, leftCountryScore, rightCountryScore, leftCountryFlag, rightCountryFlag } = useSelector((state) => state.scoreboard);

    // Local state to handle updates
    const [leftName, setLeftName] = useState(leftCountryName);
    const [rightName, setRightName] = useState(rightCountryName);
    const [leftScore, setLeftScore] = useState(leftCountryScore);
    const [rightScore, setRightScore] = useState(rightCountryScore);
    const [leftFlag, setLeftFlag] = useState(leftCountryFlag);
    const [rightFlag, setRightFlag] = useState(rightCountryFlag);
    const [matchStarted, setMatchStarted] = useState(false);

    const { theme } = useTheme();
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        socketRef.current = io('http://localhost:3000');

        // Listen for the 'countriesUpdated' event
        socketRef.current.on('countriesUpdated', (data) => {
            console.log('Received countriesUpdated:', data); // Check the console to see if this is logged
            setLeftName(data.leftCountryName);
            setRightName(data.rightCountryName);
            setLeftFlag(data.leftCountryFlag);
            setRightFlag(data.rightCountryFlag);
            setMatchStarted(true); // Set matchStarted to true
        });

        // Listen for the 'scoreUpdated' event
        socketRef.current.on('scoreUpdated', (data) => {
            setLeftScore(data.leftCountryScore);
            setRightScore(data.rightCountryScore);
        });

        // Cleanup on component unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <div className={`d-flex flex-column justify-content-evenly vh-100 customerinterface ${theme}`}>
            <div className="d-flex container justify-content-evenly">
                <h1 className="display-3 p-2 m-2">Current Score:</h1>
            </div>
            {!matchStarted && (
                <div className="alert alert-info text-center">
                    Match hasn't started yet.
                </div>
            )}
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex justify-content-evenly align-middle w-50 h-100">
                    <button className="btn btn-outline-success p-2 m-2">
                        <img src={leftFlag} alt={leftName} style={{ width: '80px', height: '50px' }} />
                        {/* {leftName} */}
                    </button>
                    <button className="btn btn-outline-danger p-2 m-2">
                        <img src={rightFlag} alt={rightName} style={{ width: '80px', height: '50px' }} />
                        {/* {rightName} */}
                    </button>
                </div>
            </div>
            <div className="align-items-center justify-content-between d-flex flex-row text-center container">
                <p className="w-50 list-group-item display-4 list-group-item-action list-group-item">
                    {leftName}: {leftScore}
                </p>
                <p className="w-50 list-group-item display-4 list-group-item-action list-group-item">
                    {rightName}: {rightScore}
                </p>
            </div>
        </div>
    );
}

export default Customerinterface;
