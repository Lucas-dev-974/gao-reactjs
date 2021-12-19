import App from './router'

import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    dark: '',
    green: '',
  },

  fonts: {
    body: 'Arial, sans-serif'
  }
}

ReactDOM.render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider> 
    </BrowserRouter>,
  document.getElementById("app")
);