import React from 'react';
import './App.scss';
import { Card } from '@material-ui/core';  
import ActionHandler from './ActionHandler';
import ClockHandler from './ClockHandler';

const initialClockState = {
    breakLength: 5,
    sessionLength: 25,
    currentClockTimeinSec: 1500,
    isClockPaused: true
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
        this.setState({
            currentClockTimeinSec : currentTime - 1
        });
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
            if(breakLength - 1 >= 0) {
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
                    sessionLength: sessionLength + 1
                });
            }
        } else if(actionSent === 'DECREMENT') {
            if(sessionLength - 1 >= 0) {
                this.setState({
                    sessionLength: sessionLength - 1
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
                    ></ActionHandler>
                    <ActionHandler
                        header="SESSION LENGTH"
                        id="session-label"
                        incrementId="session-increment"
                        decrementId="session-decrement"
                        counterId="session-length"
                        counter={this.state.sessionLength}
                        handleAction={this.handleSessionSettings}
                    ></ActionHandler>
                    <ClockHandler
                        isClockPaused={this.state.isClockPaused}
                        timeRemaining={this.state.currentClockTimeinSec}
                        handleTimer={this.handleTimer}
                        resetTimer={this.resetTimer}
                    ></ClockHandler>
                </Card>
                
            </div>
        );
    }
}

export default App;
