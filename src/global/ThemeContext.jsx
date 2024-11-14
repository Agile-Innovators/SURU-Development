import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        // Sincroniza el tema con el localStorage cada vez que cambie
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        } else {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Escucha los cambios de tema en el localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme && storedTheme !== theme) {
                setTheme(storedTheme);
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [theme]);

    const toggleTheme = (selectedTheme) => {
        setTheme(selectedTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
