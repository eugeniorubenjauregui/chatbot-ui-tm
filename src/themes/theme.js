export const lightTheme = {
  colors: {
    // Core brand colors
    primary: '#60AB67',           // A medium-bright green
    secondary: '#3B7C44',         // A deeper green for accents
    
    // Backgrounds & text
    background: '#FFFFFF',
    mainPageBackground: '#F7FFFA', // Slight green tint
    messageListBackground: '#F5F5F5',
    text: '#111111',
    textLight: '#FFFFFF',

    // Example "special" text color if needed 
    textDaiad: '#60AB67',         // Ties in with primary green

    // Category Header Background Color
    categoryHeaderBg: '#7CA882',
    categoryHeaderText: '#FFFFFF',
    
    // Header & card surfaces
    header: '#60AB67',
    headerText: '#FFFFFF',
    cardBackground: '#FFFFFF',
    cardHeader: '#679186',        // Subtle greenish highlight
    cardFooter: '#679186',

    // Icons
    iconColor: '#eee',
    iconHover: '#111',

    // Message colors (kept as-is, centered around greens/yellows you like)
    userMessageBg: '#FEF3C7',
    userMessageBgHover: '#FCE08C', 
    userMessageText: '#111111',

    botMessageBg: '#F7FEE7',
    botMessageBgHover: '#DEE4D0',
    botMessageText: '#111111',

    botActionMessageBg: '#60AB6720',
    botActionMessageBgHover: '#60AB6760',
    botActionMessageText: '#111111',

    // Metadata / tooltip
    messageMetadataText: '#666',
    tooltipBg: '#333',
    tooltipText: '#fff',
  },
  fonts: {
    main: "'Josefin Sans', sans-serif",
    bigheading: '5rem',
    bigtext: '2rem',
  },
  shadows: {
    card: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  // Button-specific styling
  buttons: {
    font: "'Josefin Sans', sans-serif", 
    background: 'linear-gradient(165deg, #28a745, #218838)', 
    hoverBackground: '#218838',
    textColor: '#FFFFFF', // white text on buttons
  },
};

export const redTheme = {
  colors: {
    // Core brand colors
    primary: '#EA2139',           // Bright red
    secondary: '#C8102E',         // Deeper red for accents
    
    // Backgrounds & text
    background: '#FFFFFF',        // Clean white backgrounds
    mainPageBackground: '#FFFFFF',// Clean white main background
    messageListBackground: '#F5F5F5',
    text: '#111111',              // Primary text stays dark for readability
    textLight: '#FFFFFF',

    // Example "special" text color if needed 
    textDaiad: '#EA2139',         // Ties in with primary red

    // Category Header Background Color
    categoryHeaderBg: '#DA6074',
    categoryHeaderText: '#FFFFFF',

    // Header & card surfaces
    header: '#EA2139',
    headerText: '#FFFFFF',
    cardBackground: '#FFFFFF',
    cardHeader: '#C8102E',        // Subtle reddish highlight
    cardFooter: '#C8102E',

    // Icons
    iconColor: '#eee',
    iconHover: '#111',

    // Message colors (retaining original structure; adjust if needed)
    userMessageBg: '#FEF3C7',
    userMessageBgHover: '#FCE08C', 
    userMessageText: '#111111',

    botMessageBg: '#F7FEE7',
    botMessageBgHover: '#DEE4D0',
    botMessageText: '#111111',

    botActionMessageBg: '#EA213920',   // Red tint with transparency
    botActionMessageBgHover: '#EA213960',
    botActionMessageText: '#111111',

    // Metadata / tooltip
    messageMetadataText: '#666',
    tooltipBg: '#333',
    tooltipText: '#fff',
  },
  fonts: {
    main: "'Josefin Sans', sans-serif", // General font remains unchanged
    bigheading: '5rem',
    bigtext: '2rem',
  },
  shadows: {
    card: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },

  // Button-specific styling
  buttons: {
    font: "'Arial', sans-serif", 
    background: 'linear-gradient(165deg, #EA2139, #C8102E)',
    hoverBackground: '#C8102E',
    textColor: '#FFFFFF', // white text on buttons
  },
};

export const darkTheme = {
  colors: {
    // Muted, pastel-like greens that contrast nicely with a dark background
    primary: '#9EC9A8',
    secondary: '#82AD8B',

    // Backgrounds & text
    background: '#121212',
    mainPageBackground: '#121212',
    messageListBackground: '#1B1B1B',
    text: '#FFFFFF',
    textLight: '#000000',

    // Example "special" text color if needed
    textDaiad: '#60AB67',         

    // Category Header Background Color
    categoryHeaderBg: '#ACC8B2',
    categoryHeaderText: '#FFFFFF',
    
    // Header & card surfaces
    header: '#60AB67',
    headerText: '#FFFFFF',
    cardBackground: '#1F1F1F',
    cardHeader: '#2C2C2C',
    cardFooter: '#2C2C2C',

    // Icons
    iconColor: '#AAA',
    iconHover: '#FFF',

    // Message colors (same for consistency; still “centered around” the green/gold)
    userMessageBg: '#FEF3C7',
    userMessageBgHover: '#FCE08C',
    userMessageText: '#111111',

    botMessageBg: '#F7FEE7',
    botMessageBgHover: '#DEE4D0',
    botMessageText: '#111111',

    botActionMessageBg: '#60AB6720',
    botActionMessageBgHover: '#60AB6760',
    botActionMessageText: '#111111',

    // Metadata / tooltip
    messageMetadataText: '#666',
    tooltipBg: '#333',
    tooltipText: '#fff',
  },
  fonts: {
    main: "'Josefin Sans', sans-serif",
    bigheading: '5rem',
    bigtext: '2rem',
  },
  shadows: {
    card: '0 4px 6px rgba(0, 0, 0, 0.3)',
  },
  // Button-specific styling
  buttons: {
    font: "'Josefin Sans', sans-serif", 
    background: 'linear-gradient(165deg, #9EC9A8, #82AD8B)',
    hoverBackground: '#82AD8B',
    textColor: '#FFFFFF', // white text on buttons
  },
};