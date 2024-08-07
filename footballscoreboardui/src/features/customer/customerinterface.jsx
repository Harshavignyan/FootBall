import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

function Customerinterface() {
    // Retrieve initial state from Redux store
    const { leftCountryName, rightCountryName, leftCountryScore, rightCountryScore } = useSelector((state) => state.scoreboard);
    // Local state to handle updates
    const [leftName, setLeftName] = useState(leftCountryName);
    const [rightName, setRightName] = useState(rightCountryName);
    const [leftScore, setLeftScore] = useState(leftCountryScore);
    const [rightScore, setRightScore] = useState(rightCountryScore);

    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        socketRef.current = io('http://localhost:3000');

        socketRef.current.on('scoreUpdated', (data) => {
            setLeftName(data.leftCountryName);
            setRightName(data.rightCountryName);
            setLeftScore(data.leftCountryScore);
            setRightScore(data.rightCountryScore);
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <div className="d-flex flex-column justify-content-evenly vh-100">
            <div className="d-flex container justify-content-evenly">
                <h1 className="display-3 p-2 m-2">Current Scores:</h1>
            </div>
            <div className="align-items-center justify-content-evenly d-flex flex-row text-center container">
                <p className="w-25 list-group-item display-4 list-group-item-action list-group-item-warning">IND: {leftScore}</p>
                <p className="w-25 list-group-item display-4 list-group-item-action list-group-item-dark">ENG: {rightScore}</p>
            </div>
        </div>
    );
}

export default Customerinterface;
