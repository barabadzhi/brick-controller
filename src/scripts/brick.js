import React from 'react';
import ReactDOM from 'react-dom';

import Brick from '../views/brick.jsx';

window.onload = function() {
    ReactDOM.render(<Brick/> , document.getElementsByTagName('main')[0]);
};
