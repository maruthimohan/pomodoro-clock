import React from 'react';
import './ClockHandler.scss';
import { IconButton } from '@material-ui/core';
import { PlayArrowRounded, PauseRounded, SettingsBackupRestoreRounded } from '@material-ui/icons';

// Calculate the time format based on the current time in seconds
const formatTime = (currentTime) => {
    let minutes = Math.floor(currentTime/60);
    if(minutes.toString().length === 1) {
        minutes = '0' + minutes;
    }
    let seconds = currentTime%60;
    if(seconds.toString().length === 1) {
        seconds = '0' + seconds;
    }
    return `${minutes}:${seconds}`;
}

const breakBorder = {
    border: '1px solid red'
};

export default function ClockHandler(props) {
    // Break styles
    const breakStyle = !props.isSession ? breakBorder : {};

    return (
        <div className="clock-panel">
            <div className="session-panel" style={breakStyle}>
                <div className="session" id="timer-label">
                    {
                        props.isSession ? 'SESSION' : 'BREAK'
                    }
                </div>
                <div className="time-left" id="time-left">
                    {formatTime(props.timeRemaining)}
                </div>
            </div>
            <div className="clock-button-group">
                <IconButton onClick={props.handleTimer} id="start_stop">
                    {
                        props.isClockPaused ?
                            <PlayArrowRounded /> :
                            <PauseRounded />
                    }
                </IconButton>
                <IconButton onClick={props.resetTimer} id="reset">
                    <SettingsBackupRestoreRounded />
                </IconButton>
            </div>
        </div>
    );
}