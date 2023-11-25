import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context from './Store/context';
import AuthenticationProvider from './Store/AuthenticationProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthenticationProvider>
    <Context>
      <App />
    </Context >
  </AuthenticationProvider>
);

