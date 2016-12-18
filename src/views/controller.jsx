'use babel';

import React from 'react';

const ffi = require('ffi');

const libbrick = ffi.Library('src/lib/libbrick', {
    'connect': ['int', []],
    'setup': ['int', []],
    'light': ['void', ['int']],
    'move': ['void', ['int']],
    'poweroff': ['void', []]
});

const light = {
    OFF: 0,
    RED: 1,
    GREEN: 2,
    ORANGE: 3
};

const direction = {
    STOP: 0,
    FORTH: 1,
    BACK: 2,
    LEFT: 3,
    RIGHT: 4
};

export default class Controller extends React.Component {
    brickConnect() {
        if (libbrick.connect() && libbrick.setup()) {
            this.props.handleConnect();
        } else {
            alert('An error occurred while connecting to brick!');
        }
    }

    brickPoweroff() {
        libbrick.poweroff();
        this.props.handlePoweroff();
    }

    componentDidMount() {
        document.getElementById('connect').addEventListener('click', (event) => {
            event.target.innerHTML === '🔌 Connect' ?
                this.brickConnect() :
                this.brickPoweroff();
        }, false);

        document.getElementById('up').addEventListener('click', () => {
            libbrick.move(direction.FORTH);
        }, false);
        document.getElementById('down').addEventListener('click', () => {
            libbrick.move(direction.BACK);
        }, false);
        document.getElementById('stop').addEventListener('click', () => {
            libbrick.move(direction.STOP);
        }, false);
        document.getElementById('left').addEventListener('click', () => {
            libbrick.move(direction.LEFT);
        }, false);
        document.getElementById('right').addEventListener('click', () => {
            libbrick.move(direction.RIGHT);
        }, false);

        let keyHold = false;

        document.addEventListener('keydown', (event) => {
            if (this.props.brickConnected && !keyHold) {
                switch (event.code) {
                    case 'ArrowUp':
                        libbrick.move(direction.FORTH);
                        break;
                    case 'ArrowDown':
                        libbrick.move(direction.BACK);
                        break;
                    case 'ArrowLeft':
                        libbrick.move(direction.LEFT);
                        break;
                    case 'ArrowRight':
                        libbrick.move(direction.RIGHT);
                        break;
                }
                keyHold = true;
            }
        });

        document.addEventListener('keyup', (event) => {
            if (this.props.brickConnected) {
                switch (event.code) {
                    case 'ArrowUp':
                    case 'ArrowDown':
                    case 'ArrowLeft':
                    case 'ArrowRight':
                        keyHold = false;
                        libbrick.move(direction.STOP);
                        break;
                }
            }
        });
    }

    render() {
        return (
            <section id='controller'>
                <button className='button' id='connect'>
                {
                    this.props.brickConnected ?
                    '🔌 Poweroff' :
                    '🔌 Connect'
                }
                </button>
                <button
                    className={
                        this.props.brickConnected ?
                        'button' :
                        'button button-disabled'
                    }
                    id='up'
                    disabled={!this.props.brickConnected}>
                    ▲Move up
                </button>
                <button
                    className={
                        this.props.brickConnected ?
                        'button' :
                        'button button-disabled'
                    }
                    id='left'
                    disabled={!this.props.brickConnected}>
                    ◀Move left
                </button>
                <button
                    className={
                        this.props.brickConnected ?
                        'button' :
                        'button button-disabled'
                    }
                    id='stop'
                    disabled={!this.props.brickConnected}>
                    ⏹Stop movement
                </button>
                <button
                    className={
                        this.props.brickConnected ?
                        'button' :
                        'button button-disabled'
                    }
                    id='right'
                    disabled={!this.props.brickConnected}>
                    ▶Move right
                </button>
                <button
                    className = {
                        this.props.brickConnected ?
                        'button' :
                        'button button-disabled'
                    }
                    id='down'
                    disabled={!this.props.brickConnected}>
                    ▼Move down
                </button>
            </section>
        );
    }
}
