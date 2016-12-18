'use babel';

import React from 'react';

import Controller from './controller.jsx';
import Header from './header.jsx';
import Image from './image.jsx';

export default class Brick extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            brickConnected: false
        };
    }

    handleConnect() {
        this.setState({brickConnected: true});
    }

    handlePoweroff() {
        this.setState({brickConnected: false});
    }

    render() {
        return (
            <section id='brick'>
                <Header/>
                <Image
                    brickConnected={this.state.brickConnected}
                />
                <Controller
                    brickConnected={this.state.brickConnected}
                    handleConnect={this.handleConnect.bind(this)}
                    handlePoweroff={this.handlePoweroff.bind(this)}
                />
            </section>
        );
    }
}
