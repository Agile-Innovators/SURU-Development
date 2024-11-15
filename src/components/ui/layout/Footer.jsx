import { useContext } from 'react';
import { ThemeContext } from '../../../global/ThemeContext.jsx';

export function Footer() {
    const { theme } = useContext(ThemeContext); // Acceso al theme del ThemeContext

    return (
        <footer className="bg-white dark:bg-gray-900 text-primary dark:text-white font-primary border-t-2 border-light-grey dark:border-gray-700">
            <div className="flex items-center flex-col sm:flex-row justify-between max-w-7xl m-auto p-4 py-6 lg:py-12">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
                    <a href="#" className="flex items-center">
                        <img
                            src={theme === 'dark' ? '/LogoDark.svg' : '/Logo.svg'}
                            className="h-8 me-3"
                            alt="SURU Logo"
                        />
                    </a>
                    <div className="border-b sm:border-l border-gray-500 dark:border-gray-300 h-0 mx-4 w-12 sm:h-10 sm:w-0"></div>
                    <div>
                        <ul className="flex justify-between text-gray-500 dark:text-gray-400 font-medium gap-4">
                            <li>
                                <a href="/#about-us" className="hover:underline">About us</a>
                            </li>
                            <li>
                                <a href="/partners#FAQs" className="hover:underline">FAQs</a>
                            </li>
                            <li>
                                <p className='dark:text-gray-400 font-medium'>Support: team.agile.innovators@gmail.com</p>
                            </li>
                        </ul>
                        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">© 2024 <a href="#" className="hover:underline">SÜRÜ™</a>. All Rights Reserved.</span>
                    </div>
                </div>
                
            </div>
        </footer>
    );
}
