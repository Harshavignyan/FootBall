import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lcName, rcName, lcScore, rcScore } from './operatorSlice';
import io from 'socket.io-client';

function Operatorinterface() {
    const dispatch = useDispatch();
    const { leftCountryName, rightCountryName, leftCountryScore, rightCountryScore } = useSelector((state) => state.scoreboard);
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        socketRef.current = io('http://localhost:3000');

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    const sendUpdate = (leftIncrement, rightIncrement) => {
        const newLeftScore = leftCountryScore + leftIncrement;
        const newRightScore = rightCountryScore + rightIncrement;

        dispatch(lcScore(leftIncrement));
        dispatch(rcScore(rightIncrement));

        // Emit the state update through WebSocket including names and scores
        socketRef.current.emit('updateScore', {
            leftCountryScore: newLeftScore,
            rightCountryScore: newRightScore
        });
    };

    return (
        <div className="d-flex flex-column justify-content-evenly vh-100">
            <div className="d-flex container justify-content-evenly">
                <h1 className="display-3 p-2 m-2">Update Score:</h1>
            </div>
            <div className=" d-flex flex-row justify-content-center ">
                <div className="d-flex justify-content-evenly align-middle w-50 h-100">
                    <button className="btn btn-outline-success p-2 m-2" onClick={() => sendUpdate(1, 0)}>
                        IND
                    </button>
                    <button className="btn btn-outline-danger p-2 m-2" onClick={() => sendUpdate(0, 1)}>
                        ENG
                    </button>
                </div>
            </div>
            <div className="align-items-center justify-content-evenly d-flex flex-row text-center container">
                <p class="w-25 list-group-item display-4 list-group-item-action list-group-item-warning">IND: {leftCountryScore}</p>
                <p class="w-25 list-group-item display-4 list-group-item-action list-group-item-dark">ENG: {rightCountryScore}</p>
            </div>
        </div>
    );
}

export default Operatorinterface;
