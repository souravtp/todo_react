import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context from './Store/context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context>
      <App />
    </Context >
);

