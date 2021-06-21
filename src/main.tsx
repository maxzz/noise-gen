import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LocalStore from './components/LocalStore';

ReactDOM.render(
    <React.StrictMode>
        <LocalStore>
            <App />
        </LocalStore>
    </React.StrictMode>,
    document.getElementById('root')
);
