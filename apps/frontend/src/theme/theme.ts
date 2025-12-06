import { MantineThemeOverride, createTheme } from '@mantine/core';

export const theme: MantineThemeOverride = createTheme({
  // Primary color: Equal Experts Blue
  primaryColor: 'equalBlue',

  colors: {
    // Custom Equal Experts color palette
    equalBlue: [
      '#e6f5fc', // 0 - lightest
      '#b3e0f5', // 1
      '#80cbee', // 2
      '#4db5e6', // 3
      '#1795d4', // 4 - PRIMARY (Equal Experts blue)
      '#1377aa', // 5 - darker
      '#0f5980', // 6
      '#0b3b56', // 7
      '#071d2b', // 8
      '#030e15', // 9 - darkest
    ],
    equalNavy: [
      '#e8f0f5', // 0
      '#c4d8e6', // 1
      '#9fc0d7', // 2
      '#7ba8c8', // 3
      '#5690b9', // 4
      '#22567c', // 5 - PRIMARY (Equal Experts navy)
      '#1b4563', // 6
      '#14334a', // 7
      '#0d2231', // 8
      '#061118', // 9
    ],
    equalCharcoal: [
      '#e9eaea', // 0
      '#c8c9ca', // 1
      '#a7a9aa', // 2
      '#86888a', // 3
      '#65686a', // 4
      '#2c3234', // 5 - PRIMARY (Equal Experts charcoal)
      '#23282a', // 6
      '#1a1e1f', // 7
      '#121415', // 8
      '#090a0a', // 9
    ],
    dark: [
      '#e0e0e0', // 0 - text primary (off-white)
      '#a6a6a6', // 1 - text secondary
      '#5c5c5c', // 2 - borders/subtle elements
      '#3a3a3a', // 3 - hover states
      '#2c2c2c', // 4 - surface (cards/panels)
      '#242424', // 5 - background secondary
      '#1e1e1e', // 6 - background primary
      '#181818', // 7 - background darker
      '#121212', // 8 - background darkest
      '#0a0a0a', // 9 - near black
    ],
  },

  // Typography
  fontFamily: 'Lexend, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',

  headings: {
    fontFamily: 'Lexend, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    fontWeight: '500',
    sizes: {
      h1: { fontSize: '44px', lineHeight: '1.25', fontWeight: '500' },
      h2: { fontSize: '36px', lineHeight: '1.3', fontWeight: '500' },
      h3: { fontSize: '28px', lineHeight: '1.35', fontWeight: '500' },
      h4: { fontSize: '24px', lineHeight: '1.4', fontWeight: '500' },
      h5: { fontSize: '20px', lineHeight: '1.5', fontWeight: '500' },
      h6: { fontSize: '18px', lineHeight: '1.5', fontWeight: '500' },
    },
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
  },

  // Spacing
  spacing: {
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },

  // Border radius
  radius: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },

  // Shadows
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },

  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },

    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },

    Textarea: {
      defaultProps: {
        radius: 'md',
        minRows: 3,
      },
    },

    Card: {
      defaultProps: {
        shadow: 'sm',
        padding: 'lg',
        radius: 'md',
      },
      styles: {
        root: {
          transition: 'border-color 200ms ease, background-color 200ms ease',
        },
      },
    },
  },
});