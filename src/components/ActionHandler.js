import React from 'react';
import './ActionHandler.scss';
import { 
    Card, 
    Button,
    IconButton,
    Tooltip
 } from '@material-ui/core';
 import {
    ArrowUpwardRounded,
    ArrowDownwardRounded
 } from '@material-ui/icons';

export default function ActionHandler(props) {
    const disabledDecrementButton = (
        <Tooltip title="Session in progress!, pause the Session to change." arrow>
            <span>
                <IconButton disabled>
                    <ArrowUpwardRounded />
                </IconButton>
            </span>
        </Tooltip>
    );
    
    const disabledIncrementButton = (
        <Tooltip title="Session in progress!, pause the Session to change." arrow>
            <span>
                <IconButton disabled>
                    <ArrowDownwardRounded />
                </IconButton>
            </span>
        </Tooltip>
    );

    return (
        <div className="action-panel">
            <div className="action-header" id={props.id}>
                {props.header}
            </div>
            <div className="action-button-group">
                {
                    props.isClockPaused ?
                    (
                        <IconButton 
                            className="action-button" 
                            id={props.incrementId}
                            onClick={(e) => props.handleAction('INCREMENT', e)}
                        >
                            <ArrowUpwardRounded />
                        </IconButton>
                    ) : disabledDecrementButton
                }
                <div 
                    className="action-count" 
                    id={props.counterId}
                >
                    {props.counter}
                </div>
                {
                    props.isClockPaused ?
                    (
                        <IconButton 
                            className="action-button" 
                            id={props.decrementId} 
                            onClick={(e) => props.handleAction('DECREMENT', e)}
                        >
                            <ArrowDownwardRounded/>
                        </IconButton>
                    ) : disabledIncrementButton
                }
            </div>
        </div>
    );
}