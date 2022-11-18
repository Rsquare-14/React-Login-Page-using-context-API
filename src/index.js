import React from 'react';
import ReactDOM from 'react-dom/client';
import {ContextProvider} from "./authentication/Auth-context"
import './index.css';
import App from './App';

function AppWithProvider() {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AppWithProvider />);