'use babel';

import React from 'react';

const { remote } = require('electron');
const { Menu, MenuItem } = remote;

const template = [ // {
    //     label: 'Connect'
    // }, {
    //     label: 'Light',
    //     submenu: [
    //         {
    //             label: 'Red',
    //             type: 'checkbox'
    //         }, {
    //             label: 'Green',
    //             type: 'checkbox'
    //         }, {
    //             label: 'Orange',
    //             type: 'checkbox'
    //         }, {
    //             label: 'Off',
    //             type: 'checkbox',
    //             checked: true
    //         }
    //     ]
    // }, {
    //     type: 'separator'
    // },
    {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ?
            'Command+Q' :
            'Ctrl+Q',
        role: 'close'
    }
];

const contextMenu = Menu.buildFromTemplate(template);

export default class Image extends React.Component {
    componentDidMount() {
        document.getElementById('image').addEventListener('contextmenu', (event) => {
            event.preventDefault();
            contextMenu.popup(remote.getCurrentWindow());
        }, false);
    }

    render() {
        return (
            <section id='image'>
                <img
                    src='./img/brick.png'
                    draggable = 'false'
                    className={
                        this.props.brickConnected ?
                        '' :
                        'brick-disconnected'
                    }
                />
            </section>
        );
    }
}
