import React from 'react';
import ReactDOM from 'react-dom/client';
import StartPage from './pages/StartPage';
import './styles/index.scss';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StartPage />
    </Provider>
  </React.StrictMode>
);