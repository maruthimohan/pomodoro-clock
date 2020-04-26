import React from 'react';
import './App.scss';
import { Card } from '@material-ui/core';  
import ActionHandler from './ActionHandler';
import ClockHandler from './ClockHandler';
import DefaultAlarm from '../sounds/alarm.mp3';

const initialClockState = {
    breakLength: 5,
    sessionLength: 25,
    currentClockTimeinSec: 1500,
    isClockPaused: true,
    isSession: true
};

// A Global variable to store the Interval ID for the setInterval Method
let setIntervalID;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialClockState;
        // Bind the action method in the constructor
        this.handleTimer = this.handleTimer.bind(this);
        this.calculateCurrentTime = this.calculateCurrentTime.bind(this);
        this.handleBreakSettings = this.handleBreakSettings.bind(this);
        this.handleSessionSettings = this.handleSessionSettings.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.soundAlarm = this.soundAlarm.bind(this);
        this.resetAlarm = this.resetAlarm.bind(this);
    }

    handleTimer = () => {
        if(this.state.isClockPaused) {
            this.setState({
                isClockPaused : false
            });
            // Start running the time
            setIntervalID = setInterval(this.calculateCurrentTime, 1000);
        } else {
            // Clear the interval
            clearInterval(setIntervalID);
            // reset the interval ID
            setIntervalID = null;
            // Set the clock to paused state
            this.setState({
                isClockPaused : true
            });
        }
    }

    calculateCurrentTime = () => {
        let currentTime = this.state.currentClockTimeinSec;
        // Check the time if it is less than zero
        // If clock is running, clear the interval
        // Start a break, if the value of Break Length is not zero
        // Otherwise, take the session length and start a new session if the current session length is not zero
        // console.log('Time Remaining');
        // console.log((currentTime - 1));
        if((currentTime - 1) < 0) {
            // Current Break or Session has ended
            if(this.state.isSession) {
                // If the current session is ended, then check for a break time
                // if the break time is not great than zero, and session length is not greater than zero do not start a new session
                // just reset - Check it
                const breakLength = this.state.breakLength;
                const sessionLength = this.state.sessionLength;
                if(breakLength > 0) {
                    this.setState({
                        isSession: false,
                        currentClockTimeinSec: breakLength * 60
                    });
                } else if(sessionLength > 0) {
                    this.setState({
                        isSession: true,
                        currentClockTimeinSec: sessionLength * 60
                    });
                } else {
                    // Remove the interval to update the clock
                    // Clear the interval
                    clearInterval(setIntervalID);
                    // reset the interval ID
                    setIntervalID = null;
                }
            } else {
                // If the current session is ended, then check for a break time
                // if the break time is not great than zero, and session length is not greater than zero do not start a new session
                // just reset - Check it
                const breakLength = this.state.breakLength;
                const sessionLength = this.state.sessionLength;
                if(sessionLength > 0) {
                    this.setState({
                        isSession: true,
                        currentClockTimeinSec: sessionLength * 60
                    });
                } else if(breakLength > 0) {
                    this.setState({
                        isSession: false,
                        currentClockTimeinSec: breakLength * 60
                    });
                } else {
                    // Remove the interval to update the clock
                    // Clear the interval
                    clearInterval(setIntervalID);
                    // reset the interval ID
                    setIntervalID = null;
                }
            }
        } else {
            this.setState({
                currentClockTimeinSec : currentTime - 1
            });
            // Sound the alarm
            if(((currentTime - 1) === 0) && this.state.isSession) {
                this.soundAlarm();
            }
        }
    }

    handleBreakSettings = (action, e) => {
        const actionSent = action;
        const breakLength = this.state.breakLength;
        // Check for the action type and update the value
        if(actionSent === 'INCREMENT') {
            if(breakLength + 1 <= 60) {
                this.setState({
                    breakLength: breakLength + 1
                });
            }
        } else if(actionSent === 'DECREMENT') {
            if(breakLength - 1 >= 1) {
                this.setState({
                    breakLength: breakLength - 1
                });
            }
        }
    }

    handleSessionSettings = (action, e) => {
        const actionSent = action;
        const sessionLength = this.state.sessionLength;
        // Check for the action type and update the value
        if(actionSent === 'INCREMENT') {
            if(sessionLength + 1 <= 60) {
                this.setState({
                    sessionLength: sessionLength + 1,
                    currentClockTimeinSec: (sessionLength + 1) * 60
                });
            }
        } else if(actionSent === 'DECREMENT') {
            if(sessionLength - 1 >= 1) {
                this.setState({
                    sessionLength: sessionLength - 1,
                    currentClockTimeinSec: (sessionLength - 1) * 60
                });
            }
        }
    }

    resetTimer = () => {
        this.setState(initialClockState);
        // Clear the interval
        clearInterval(setIntervalID);
        // reset the interval ID
        setIntervalID = null;
        // Reset the alarm sound
        this.resetAlarm();
    }

    soundAlarm = () => {
        // fetch the HTML Audio Element
        const alarm = document.getElementById('beep');
        // Set the current playing time to 0
        alarm.currentTime = 0;
        // Play the sound
        alarm.play();
    }

    resetAlarm = () => {
        // fetch the HTML Audio Element
        const alarm = document.getElementById('beep');
        // Pause the sound
        alarm.pause();
        // Set the current playing time to 0
        alarm.currentTime = 0;
    }

    render() {
        return (
            <div className="App">
                <Card className="app-card">
                    <div className="app-header">
                        POMODORO CLOCK
                    </div>
                    <ActionHandler
                        header="BREAK LENGTH"
                        id="break-label"
                        incrementId="break-increment"
                        decrementId="break-decrement"
                        counterId="break-length"
                        counter={this.state.breakLength}
                        handleAction={this.handleBreakSettings}
                        isClockPaused={this.state.isClockPaused}
                    ></ActionHandler>
                    <ActionHandler
                        header="SESSION LENGTH"
                        id="session-label"
                        incrementId="session-increment"
                        decrementId="session-decrement"
                        counterId="session-length"
                        counter={this.state.sessionLength}
                        handleAction={this.handleSessionSettings}
                        isClockPaused={this.state.isClockPaused}
                    ></ActionHandler>
                    <ClockHandler
                        isClockPaused={this.state.isClockPaused}
                        timeRemaining={this.state.currentClockTimeinSec}
                        handleTimer={this.handleTimer}
                        resetTimer={this.resetTimer}
                        isSession={this.state.isSession}
                    ></ClockHandler>
                </Card>
                {/* 
                    An audio element to sound horn when the remaining session time is 0
                 */}
                 <audio id="beep" src={DefaultAlarm}></audio>
            </div>
        );
    }
}

export default App;
