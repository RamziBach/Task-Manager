import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { ThemeContextProvider } from './context/ThemeContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);