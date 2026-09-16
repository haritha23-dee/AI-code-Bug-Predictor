import { createContext, useContext, useEffect, useState, useMemo } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider( {children} ){
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('scrs_theme');
        return stored === 'light' || stored === 'dark' ? stored: 'dark';
    });
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') root.classList.add('dark');
        else root.classList.remove('dark');
        localStorage.setItem('scrs_theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => 
    (t === 'dark' ? 'light' : 'dark' ));

    const value = useMemo(() =>
    ({theme, setTheme, toggleTheme}), [theme]
    );

    return (
        <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
    return ctx;
}