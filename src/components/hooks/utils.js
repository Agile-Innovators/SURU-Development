export const forceLightMode = (theme) => {
    if (theme === 'dark') {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
};