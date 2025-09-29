// Base theme configuration with shared properties
const baseTheme = {
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem',      // 48px
  },
  borderRadius: {
    sm: '0.75rem',    // 12px - Increased for softer look
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.1)',
  },
  breakpoints: {
    xs: '0px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
  container: {
    padding: {
      mobile: '1rem',
      desktop: '2rem',
    },
    maxWidth: '1200px',
  },
  transitions: {
    default: 'all 0.3s ease-in-out',
    fast: 'all 0.15s ease-in-out',
    slow: 'all 0.5s ease-in-out',
  },
};

// Light Theme: "Cotton Candy Daydream"
const lightTheme = {
  ...baseTheme,
  colors: {
    // Core Colors
    primary: '#87CEFA', // Sky Blue
    secondary: '#FFB6C1', // Bubblegum Pink
    background: '#FFDDEE', // Baby Pink
    card: '#FFFFFF', // White
    text: '#333333', // Charcoal Gray
    textLight: '#666666',
    success: '#48BB78',
    warning: '#F6E05E',
    error: '#F56565',
    border: 'rgba(230, 230, 250, 0.8)', // Soft Lavender with transparency
    icon: '#E6E6FA', // Soft Lavender
    
    // UI Elements
    buttonGradient: 'linear-gradient(135deg, #FFB6C1, #87CEFA)', // Pink to Blue
    buttonShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cardShadow: '0 4px 6px rgba(0,0,0,0.05)',
    navBackground: 'rgba(255, 255, 255, 0.9)',
    
    // Animations
    sparkle: 'rgba(255, 255, 255, 0.8)',
    confetti1: '#FFB6C1',
    confetti2: '#87CEFA',
    confetti3: '#E6E6FA',
  },
  animations: {
    sparkle: `
      @keyframes sparkle {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.2); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
    `,
    bounce: `
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `,
    confetti: `
      @keyframes confetti {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
    `,
  },
  typography: {
    h1: { 
      mobile: '1.75rem', 
      desktop: '2rem',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '700',
    },
    h2: { 
      mobile: '1.5rem', 
      desktop: '1.75rem',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '700',
    },
    h3: { 
      mobile: '1.25rem', 
      desktop: '1.5rem',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '700',
    },
    body: { 
      mobile: '1rem', 
      desktop: '1.125rem',
      fontFamily: 'Inter, sans-serif',
      fontWeight: '400',
    },
    caption: { 
      mobile: '0.875rem', 
      desktop: '1rem',
      fontFamily: 'Inter, sans-serif',
      fontWeight: '400',
    },
    accent: {
      fontFamily: 'Pacifico, cursive',
    },
  },
};

// Dark Theme: "Midnight Marshmallow"
const darkTheme = {
  ...baseTheme,
  colors: {
    primary: '#FF6EC7', // Neon Pink
    secondary: '#6ECFFF', // Electric Blue
    background: '#1A1A2E', // Midnight Navy
    card: '#2C2C54', // Deep Plum
    text: '#F5F5F5', // Soft White
    textLight: '#E0E0E0',
    success: '#48BB78',
    warning: '#F6E05E',
    error: '#F56565',
    border: '#4A3E6B',
    icon: '#CBAACB', // Lavender Mist
    buttonGradient: 'linear-gradient(135deg, #FF6EC7, #6ECFFF)', // Neon Pink to Electric Blue
    buttonShadow: '0 0 15px rgba(255, 110, 199, 0.5)',
    cardShadow: '0 4px 6px rgba(0,0,0,0.2)',
    navBackground: 'rgba(28, 28, 60, 0.9)',
  },
  typography: {
    h1: { 
      mobile: '1.75rem', 
      desktop: '2rem',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '700',
      color: '#FFFFFF',
    },
    h2: { 
      mobile: '1.5rem', 
      desktop: '1.75rem',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '700',
      color: '#FFFFFF',
    },
    h3: { 
      mobile: '1.25rem', 
      desktop: '1.5rem',
      fontFamily: 'Poppins, sans-serif',
      fontWeight: '700',
      color: '#FFFFFF',
    },
    body: { 
      mobile: '1rem', 
      desktop: '1.125rem',
      fontFamily: 'Inter, sans-serif',
      fontWeight: '400',
      color: '#E0E0E0',
    },
    caption: { 
      mobile: '0.875rem', 
      desktop: '1rem',
      fontFamily: 'Inter, sans-serif',
      fontWeight: '400',
      color: '#E0E0E0',
    },
    accent: {
      fontFamily: 'Pacifico, cursive',
      color: '#FF6EC7', // Neon Pink
    },
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.3)',
    md: '0 4px 6px rgba(0,0,0,0.25)',
    lg: '0 10px 15px rgba(0,0,0,0.2)',
    glow: '0 0 15px rgba(110, 207, 255, 0.5)',
  },
  animations: {
    glow: `
      @keyframes glow {
        0% { box-shadow: 0 0 5px #FF6EC7; }
        50% { box-shadow: 0 0 20px #6ECFFF; }
        100% { box-shadow: 0 0 5px #FF6EC7; }
      }
    `,
    twinkle: `
      @keyframes twinkle {
        0% { opacity: 0.5; }
        50% { opacity: 1; }
        100% { opacity: 0.5; }
      }
    `,
  },
};

// Export the default theme (light theme)
export const theme = lightTheme;

// Export theme names for switching
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

// Theme context to manage theme switching
export const getTheme = (themeName = THEMES.LIGHT) => {
  return themeName === THEMES.DARK ? darkTheme : lightTheme;
};

// Media query helper
export const media = Object.keys(theme.breakpoints).reduce((acc, label) => {
  acc[label] = (styles) => `
    @media (min-width: ${theme.breakpoints[label]}) {
      ${styles}
    }
  `;
  return acc;
}, {});

// Typography helper
export const typography = (type) => ({
  fontSize: theme.typography[type].mobile,
  fontFamily: theme.typography[type].fontFamily || 'Inter, sans-serif',
  fontWeight: theme.typography[type].fontWeight || '400',
  lineHeight: theme.typography[type].lineHeight || '1.5',
  [`@media (min-width: ${theme.breakpoints.md})`]: {
    fontSize: theme.typography[type].desktop || theme.typography[type].mobile,
  },
});
