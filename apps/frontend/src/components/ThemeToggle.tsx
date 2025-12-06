import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({ size = 'lg' }: ThemeToggleProps) {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleTheme = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ActionIcon
      onClick={toggleTheme}
      variant="default"
      size={size}
      aria-label={`Switch to ${computedColorScheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${computedColorScheme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        transition: 'transform 200ms ease',
      }}
    >
      {computedColorScheme === 'dark' ? (
        <IconSun size={18} stroke={1.5} />
      ) : (
        <IconMoon size={18} stroke={1.5} />
      )}
    </ActionIcon>
  );
}
