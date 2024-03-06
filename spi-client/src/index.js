import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
//import { configureStore } from '@reduxjs/toolkit';
//import globalReducer from "./state";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}> {/* Wrap App with Provider */}

        <App />
    </Provider>,
);
