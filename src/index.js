import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS-Files/index.css';
import App from './App';
import bootstrap from 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { GlobalContextProvider } from './Components/GlobalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>
);
