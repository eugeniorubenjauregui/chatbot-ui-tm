// src/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* Apply the global font and theme-based colors */
  body {
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.fonts.main};
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.text};
  }

  /* Optionally, set the font for other HTML elements */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${(props) => props.theme.fonts.main};
  }

  p, span, div, input, button, textarea, select {
    font-family: ${(props) => props.theme.fonts.main};
  }

  /* Handle RTL languages font direction if necessary */
  [dir="rtl"] {
    font-family: ${(props) => props.theme.fonts.main};
  }
  
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  /* Optional: Reset box-sizing */
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;