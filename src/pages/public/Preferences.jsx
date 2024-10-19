import { MainButton } from '../../components/ui/buttons/MainButton';
import { Moon, Sun } from 'lucide-react';
import { useContext } from 'react';
import { ThemeContext } from '../../routes/ThemeContext'; // Asegúrate de importar el contexto

export function Preferences() {
    const { theme, toggleTheme } = useContext(ThemeContext); // Usamos el contexto del tema

    const handleThemeChange = (event) => {
        toggleTheme(event.target.value); // Cambia el tema basado en la selección
    };

    return (
        <div className='p-4'>
            <div className='flex'>
                <div className='flex flex-col gap-2'>
                    <h2>Preferences</h2>
                    <p>Change your preference settings</p>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-8 mt-4 sm:grid-cols-3'>
                <div className="grid  gap-2">
                    <label htmlFor="language-select">Language</label>
                    <select
                        name="language"
                        id="language-select"
                        className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                        <option value="Español">Spanish</option>
                        <option value="Inglés">English</option>
                    </select>
                </div>
                <div className="grid gap-2">
                    <label htmlFor="notifications-select">Notifications</label>
                    <select
                        name="notifications"
                        id="notifications-select"
                        className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                        <option value="On">On</option>
                        <option value="Off">Off</option>
                    </select>
                </div>
                <div className="grid gap-2">
                    <label htmlFor="theme-select">Theme</label>
                    <select
                        name="theme"
                        id="theme-select"
                        value={theme} // El valor actual del tema
                        onChange={handleThemeChange} // Cambiar tema al seleccionar
                        className="p-3 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
