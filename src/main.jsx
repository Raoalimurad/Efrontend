import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/auth';
import { SearchProvider } from './Context/Search'; // Corrected import
import "antd/dist/reset.css";
import { Provider } from 'react-redux';
import { store } from './redux/app/store.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SearchProvider> 
        <Provider store = {store}>
    <App />
    </Provider>
        </SearchProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
