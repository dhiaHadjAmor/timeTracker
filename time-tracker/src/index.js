/*eslint-disable import/default */
import 'babel-polyfill';
import React  from 'react';
import ReactDOM from 'react-dom'
// import './styles/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css'
import App from './components/app'

ReactDOM.render(<App />, document.getElementById('root'));


