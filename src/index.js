import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import{ BrowserRouter } from 'react-router-dom';
import TRAIL_DATA from './data/trail_data.json';
import TRAIL_INFO from './data/trail_info.json';

ReactDOM.render(<BrowserRouter><App info={TRAIL_INFO} data={TRAIL_DATA} /></BrowserRouter>, document.getElementById('root'));