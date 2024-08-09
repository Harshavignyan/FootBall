import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lcScore, rcScore } from './operatorSlice';
import io from 'socket.io-client';
import { useTheme } from '../theme/ThemeContext';

function Operatorinterface() {
    const dispatch = useDispatch();
    const { leftCountryName, rightCountryName, leftCountryScore, rightCountryScore, leftCountryFlag, rightCountryFlag } = useSelector((state) => state.scoreboard);
    const socketRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        // Initialize WebSocket connection
        socketRef.current = io('http://localhost:3000');

        // Listen for 'updateScore' event
        socketRef.current.on('updateScore', (data) => {
            dispatch(lcScore(data.leftCountryScore));
            dispatch(rcScore(data.rightCountryScore));
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [dispatch]);

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
        <div className={`d-flex flex-column justify-content-evenly vh-100 operatorinterface ${theme}`}>
            <div className="d-flex container justify-content-evenly">
                <h1 className="display-3 p-2 m-2">Update Score:</h1>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <div className="d-flex justify-content-evenly align-middle w-50 h-100">
                    <button className="btn btn-outline-success p-2 m-2" onClick={() => sendUpdate(1, 0)}>
                        <img src={leftCountryFlag} alt={leftCountryName} style={{ width: '80px', height: '50px' }} />
                        {/* {leftCountryName} */}
                    </button>
                    <button className="btn btn-outline-danger p-2 m-2" onClick={() => sendUpdate(0, 1)}>
                        <img src={rightCountryFlag} alt={rightCountryName} style={{ width: '80px', height: '50px' }} />
                        {/* {rightCountryName} */}
                    </button>
                </div>
            </div>
            <div className="align-items-center justify-content-between d-flex flex-row text-center container">
                <p className="w-50 list-group-item display-4 list-group-item-action list-group-item">
                    {/* <img src={leftCountryFlag} alt={leftCountryName} style={{ width: '50px', height: '30px' }} /> */}
                    {leftCountryName}: {leftCountryScore}
                </p>
                <p className="w-50 list-group-item display-4 list-group-item-action list-group-item">
                    {/* <img src={rightCountryFlag} alt={rightCountryName} style={{ width: '50px', height: '30px' }} /> */}
                    {rightCountryName}: {rightCountryScore}
                </p>
            </div>
        </div>
    );
}

export default Operatorinterface;
