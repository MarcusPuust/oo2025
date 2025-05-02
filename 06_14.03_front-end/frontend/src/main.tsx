import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  './i18n';
import 'bootstrap/dist/css/bootstrap.min.css'; // className="accordion"
import './index.css'//.accordion {width: 500px !important;}
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'leaflet/dist/leaflet.css';

// navigeerimiseks (URLde vahetamiseks):
// 1. npm i react-router-dom
// 2. importida BrowserRouter ja ümbritseda see <App /> tagi ümber
// 3. teha seoseid failide ja URLde vahel App.tsx failis
// localhost:5173/cart ---> Cart.tsx
// localhost:5173/login ---> Login.tsx

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
