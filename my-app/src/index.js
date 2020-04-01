import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
//import JoshTextFieldComponent from './components/JoshTextFieldComponent';
//import MyUserName from './components/MyUserName';
//import MyButton from './components/MyButton';
import OuterSquare from './components/OuterSquare';
//import ValidationForm from './components/ValidationForm';

//import MyPassword from './components/MyPassword';
//import AlreadyUser from './components/alreadyUser';

ReactDOM.render(
  <React.StrictMode>
  <OuterSquare/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change<JoshTextFieldComponent /*placeholder='Plese enter text'*//><br/>
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
