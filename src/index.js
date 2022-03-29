import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reducer, { initialState } from './components/stateprovider/Reducer';
import { StateProvider } from './components/stateprovider/StateProvider';

ReactDOM.render(
    <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
    </StateProvider>
    </React.StrictMode>
    , document.getElementById('root'));
