import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyAvbRcvXDnRZeAEhZ_3y2eKKJvY6lYY-cU",
  authDomain: "volunteer-app-650f4.firebaseapp.com",
  projectId: "volunteer-app-650f4",
  storageBucket: "volunteer-app-650f4.appspot.com",
  messagingSenderId: "469010240216",
  appId: "1:469010240216:web:a8e1c5e8f0c3885366fdad",
  measurementId: "G-QBRN7BY3J4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database; 
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
