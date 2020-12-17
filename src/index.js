import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import TRAIL_DATA from './data/trail_data.json';
import TRAIL_INFO from './data/trail_info.json';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyDaTBM1zaAm1nnvyAbzv_HVECXxu8vv__4",
  authDomain: "saveusertrails.firebaseapp.com",
  projectId: "saveusertrails",
  storageBucket: "saveusertrails.appspot.com",
  messagingSenderId: "560231256993",
  appId: "1:560231256993:web:27448a99b71413b332f1e0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<BrowserRouter><App info={TRAIL_INFO} data={TRAIL_DATA} /></BrowserRouter>, document.getElementById('root'));