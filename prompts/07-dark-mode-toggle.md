# Dark Mode Toggle for Survey Application

Conference attendees need to complete surveys in various lighting conditions, from bright conference halls to dimly lit evening sessions. This feature implements a comprehensive dark mode theme that automatically detects user preferences, allows manual theme switching, and persists the user's choice across sessions. The goal is to reduce eye strain, and meet modern user expectations for theme customization while maintaining the Equal Experts brand identity.

## Requirements

- User can toggle between light and dark themes using an accessible button/switch
- System automatically detects and respects the user's OS-level dark mode preference on first visit
- Theme preference persists across browser sessions using localStorage
- Theme applies instantly without flash of unstyled content (FOUC) or layout shift
- All text maintains WCAG AA contrast ratios in both light and dark modes (minimum 4.5:1 for normal text, 3:1 for large text)
- Focus indicators remain clearly visible in both themes
- Theme toggle is keyboard accessible (Tab to focus, Enter/Space to activate)
- Theme toggle announces its state to screen readers ("Dark mode enabled", "Light mode enabled")
- All UI components (buttons, forms, cards, modals) render correctly in both themes
- Loading states, error states, and success states have appropriate colors in both themes
- Works consistently across Chrome, Safari, Firefox, and Edge browsers
- No JavaScript errors or console warnings during theme switching
- Theme preference is accessible via CSS custom properties for easy maintenance

## Rules

- rules/react-rules.md
- rules/typescript-rules.md
- rules/mantine-ui-rules.md (if exists, or general component library rules)
- CLAUDE.md (Equal Experts branding colors)

## Component Architecture

```typescript
// Theme context and provider
interface ThemeContextValue {
  colorScheme: 'light' | 'dark';
  toggleColorScheme: () => void;
  setColorScheme: (scheme: 'light' | 'dark') => void;
}

// Mantine uses ColorSchemeProvider and useMantineColorScheme hook
// Leverage existing Mantine theming system

// Theme toggle component
interface ThemeToggleProps {
  variant?: 'icon' | 'button' | 'switch';
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}

// Component hierarchy:
// App (MantineProvider with theme config)
//   └── ColorSchemeScript (prevents FOUC)
//   └── ThemeToggle (can be placed in header/nav)
//   └── Survey pages (automatically themed via Mantine)
```

## Extra Considerations

- **User experience**: Smooth transition between themes using CSS transitions (200-300ms recommended)
- **User experience**: Maintain theme preference even if user clears browsing data (consider system preference fallback)
- **Brand consistency**: Ensure Equal Experts logo remains visible and on-brand in dark mode
- **Color palette**: Define a complete dark mode color palette including primary, secondary, backgrounds, borders, text colors
- **Image handling**: Consider inverting or adjusting images/logos that don't work well in dark mode

## Testing Considerations

**Unit Tests:**
- Theme toggle component renders correctly
- Theme context provides correct values
- toggleColorScheme function switches between light/dark
- localStorage reads/writes theme preference correctly

**Integration Tests:**
- Theme persists after page reload
- System preference is detected on first visit
- Theme applies to all pages in the app
- No FOUC occurs when loading with saved dark mode preference

**Cross-Browser Tests:**
- Chrome, Safari, Firefox, Edge all respect theme preference
- prefers-color-scheme media query works across browsers
- localStorage theme persistence works across browsers

## Implementation Notes

**Technology Choices:**
- Use Mantine UI's built-in ColorSchemeProvider and theme system
- Leverage Mantine's dark mode configuration in MantineProvider
- Use @mantine/hooks for useColorScheme or useLocalStorage hooks if needed
- ColorSchemeScript component to prevent FOUC

**Color Palette:**
Follow Equal Experts branding (from CLAUDE.md):
- Primary Blue: #1795d4 (may need darker variant for dark mode backgrounds)
- Navy: #22567c
- Charcoal: #2c3234

Dark mode palette should include:
- Background: Dark gray/charcoal (not pure black for reduced eye strain)
- Surface: Lighter gray for cards/panels
- Text primary: Off-white (#e0e0e0 or similar)
- Text secondary: Medium gray
- Borders: Subtle gray borders

**State Management:**
- Use Mantine's ColorSchemeProvider for global theme state
- Store preference in localStorage under key like 'mantine-color-scheme'
- Detect system preference using window.matchMedia('(prefers-color-scheme: dark)')

## Specification by Example

### User Journey 1: First-time visitor with system dark mode
1. User has macOS/Windows dark mode enabled
2. User opens survey at http://localhost:3000
3. Page loads directly in dark mode without flash
4. All text is readable (off-white on dark backgrounds)
5. Equal Experts logo is visible
6. Form inputs have appropriate dark styling
7. User sees sun/moon icon toggle in header
8. User completes survey in dark mode comfortably

### User Journey 2: Manual theme toggle
1. User opens survey (defaults to light mode based on system)
2. User clicks theme toggle button in header
3. Theme smoothly transitions to dark mode (300ms fade)
4. localStorage saves preference as 'dark'
5. User refreshes page
6. Page loads in dark mode immediately
7. User clicks toggle again
8. Theme switches back to light mode
9. Preference updated in localStorage

### Component API Usage
```typescript
// In App.tsx
import { MantineProvider, ColorSchemeScript } from '@mantine/core';

function App() {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <ThemeToggle />
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  );
}

// In ThemeToggle.tsx
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      variant="default"
      size="lg"
      aria-label={`Switch to ${colorScheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
    </ActionIcon>
  );
}
```

### Responsive Breakpoint Behavior
- **Desktop (>768px)**: Theme toggle shows with icon + label
- **Mobile (<768px)**: Theme toggle shows icon only to save space
- **Placement**: Top-right corner of header/navigation bar
- **Size**: Touch-friendly (minimum 44x44px tap target)

### Keyboard Navigation Flow
1. Tab to theme toggle button (focus ring visible)
2. Press Enter or Space to toggle theme
3. Screen reader announces: "Dark mode enabled" or "Light mode enabled"
4. Focus remains on toggle button after activation

### Error State Example
In dark mode, error messages should use:
- Background: Subtle dark red (#5c1f1f)
- Border: Brighter red (#ef4444)
- Text: Light red or white (#fca5a5 or #ffffff)
- Maintains contrast ratio of 4.5:1

## Verification

- [ ] Theme toggle component renders in header/navigation
- [ ] Clicking toggle switches between light and dark themes instantly
- [ ] Theme preference persists after browser refresh
- [ ] System preference is detected on first visit (test with both light/dark OS settings)
- [ ] No flash of unstyled content when loading page with saved dark mode preference
- [ ] All text meets WCAG AA contrast requirements in both modes (tested with contrast checker)
- [ ] Focus indicators are clearly visible in both themes
- [ ] Theme toggle is keyboard accessible (Tab to focus, Enter/Space to activate)
- [ ] Screen reader announces theme state changes (test with VoiceOver/NVDA)
- [ ] All survey pages render correctly in dark mode (survey form, thank you page, admin dashboard)
- [ ] Form inputs, buttons, and interactive elements styled appropriately in dark mode
- [ ] Equal Experts logo is visible and on-brand in dark mode
- [ ] Theme switching completes within 300ms with smooth transition
- [ ] No layout shift (CLS) occurs during theme change
- [ ] Works correctly in Chrome, Safari, Firefox, and Edge
- [ ] localStorage correctly stores and retrieves theme preference
- [ ] Error states, loading states, and success messages have appropriate dark mode styling
- [ ] Hover states and active states are visible in both themes
- [ ] Mobile responsive - toggle works on touch devices
- [ ] No console errors or warnings during theme switching
