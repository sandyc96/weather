import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#c5d3e9',
      main: '#5c7fc0',
      dark: '#395fab',
    },
    secondary: {
      light: '#158f98',
      main: '#16727c',
      dark: '#1b706c',
    },
  },
  typography: {
    fontFamily: 'Chiron GoRound TC',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 481,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
