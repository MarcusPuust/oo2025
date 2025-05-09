import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom'; // ⬅️ vajalik!

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* ⬅️ vajalik! */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
