import { createGlobalStyle } from 'styled-components';
import { theme, media } from '../theme';

export const GlobalStyles = createGlobalStyle`
  /* Base Reset */
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Smooth Scrolling */
  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  /* Font Imports */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Pacifico&family=Poppins:wght@700;800&display=swap');

  /* Base Typography */
  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    min-height: 100vh;
    text-rendering: optimizeLegibility;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  /* Theme-specific styles */
  body.dark-theme {
    --primary: ${({ theme }) => theme.colors.primary};
    --secondary: ${({ theme }) => theme.colors.secondary};
    --background: ${({ theme }) => theme.colors.background};
    --card: ${({ theme }) => theme.colors.card};
    --text: ${({ theme }) => theme.colors.text};
    --text-light: ${({ theme }) => theme.colors.textLight};
    --border: ${({ theme }) => theme.colors.border};
    --icon: ${({ theme }) => theme.colors.icon};
    --button-gradient: ${({ theme }) => theme.colors.buttonGradient};
    --nav-background: ${({ theme }) => theme.colors.navBackground};
  }

  /* Layout */
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin-bottom: ${theme.spacing.sm};
    font-weight: 700;
  }

  p {
    margin-bottom: ${theme.spacing.md};
  }

  /* Interactive Elements */
  button, 
  [role="button"],
  [type="button"],
  [type="reset"],
  [type="submit"] {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: 1rem;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  /* Form Elements */
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: 1rem;
    max-width: 100%;
    
    &:focus {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
  }

  /* Images & Media */
  img,
  svg,
  video {
    max-width: 100%;
    height: auto;
    vertical-align: middle;
  }

  /* Lists */
  ul, ol {
    padding-left: ${theme.spacing.lg};
    margin-bottom: ${theme.spacing.md};
  }

  /* Links */
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: color ${theme.transitions.default};
    
    &:hover,
    &:focus {
      color: ${theme.colors.secondary};
      text-decoration: underline;
    }
  }

  /* Accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Print Styles */
  @media print {
    body {
      background: white;
      color: black;
    }
    
    a[href^="http"]::after {
      content: " (" attr(href) ")";
      font-size: 0.8em;
      font-weight: normal;
    }
  }

  /* Responsive Typography */
  ${media.sm} {
    html {
      font-size: 17px;
    }
  }

  ${media.md} {
    html {
      font-size: 18px;
    }
  }

  /* Prevent long words from breaking layout */
  * {
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }

  /* iOS Touch Highlight */
  a, button, input, textarea, select {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  /* Remove default button styling on iOS */
  input[type="button"],
  input[type="submit"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`;
