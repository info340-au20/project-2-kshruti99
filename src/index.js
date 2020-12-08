import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import TRAIL_DATA from './data/trail_data.json';
import TRAIL_INFO from './data/trail_info.json';
import firebase from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyBU3ipk7MteDrfWHvJKn2TKl-zKYmD3x34",
    authDomain: "traillists.firebaseapp.com",
    projectId: "traillists",
    storageBucket: "traillists.appspot.com",
    messagingSenderId: "678958262386",
    appId: "1:678958262386:web:397385e537011771063aeb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<BrowserRouter><App info={TRAIL_INFO} data={TRAIL_DATA} /></BrowserRouter>, document.getElementById('root'));