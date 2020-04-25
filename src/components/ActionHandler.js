import React from 'react';
import './ActionHandler.scss';
import { 
    Card, 
    Button,
    IconButton
 } from '@material-ui/core';
 import {
    ArrowUpwardRounded,
    ArrowDownwardRounded
 } from '@material-ui/icons';

export default function ActionHandler(props) {

    return (
        <div className="action-panel">
            <div className="action-header" id={props.id}>
                {props.header}
            </div>
            <div className="action-button-group">
                <IconButton 
                    className="action-button" 
                    id={props.incrementId}
                    onClick={(e) => props.handleAction('INCREMENT', e)}
                >
                    <ArrowUpwardRounded />
                </IconButton>
                <div 
                    className="action-count" 
                    id={props.counterId}
                >
                    {props.counter}
                </div>
                <IconButton 
                    className="action-button" 
                    id={props.decrementId} 
                    onClick={(e) => props.handleAction('DECREMENT', e)}
                >
                    <ArrowDownwardRounded/>
                </IconButton>
            </div>
        </div>
    );
}