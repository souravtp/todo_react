import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context from './Store/context';
import AuthContext from './Store/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContext>
    <Context>
      <App />
    </Context >
  </AuthContext>
);

