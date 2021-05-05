import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

module?.hot.accept();
