'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

    if (!mounted) {
        return <div className="theme-toggle-placeholder" aria-hidden="true" />;
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <button
            type="button"
            className="theme-toggle"
            aria-label="Toggle dark mode"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
        >
            {isDark ? (
                <>
                    <Sun aria-hidden="true" className="h-5 w-5" />
                </>
            ) : (
                <>
                    <Moon aria-hidden="true" className="h-5 w-5" />
                </>
            )}
        </button>
    );
};

export default ThemeToggle;
