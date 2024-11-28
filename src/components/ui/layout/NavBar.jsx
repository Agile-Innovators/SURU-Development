import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../routes/index.js';
import { useAuth } from '../../../global/AuthProvider.jsx';
import { useAxios } from '../../hooks/useAxios.js';
import { ThemeContext } from '../../../global/ThemeContext.jsx';



function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export function NavBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { getUser, logout } = useAuth();
    const authToken = getUser().authToken;
    const axios = useAxios();

    const initialNavigation = [
        { name: 'Home', href: ROUTE_PATHS.HOME, current: false, isLogin: true },
        { name: 'Partners', href: ROUTE_PATHS.PARTNERS, current: false, isLogin: true },
        { name: 'Explore Properties', href: ROUTE_PATHS.SEARCH, current: false, isLogin: true },
        { name: 'Find Partners', href: ROUTE_PATHS.SEARCH_PARTNERS, current: false, isLogin: true },
        
        { name: 'Log In', href: ROUTE_PATHS.LOGIN, current: false, isLogin: false },
        { name: 'Sign Up', href: ROUTE_PATHS.REGISTER, current: false, isLogin: false },
    ];

    const [navigation, setNavigation] = useState(initialNavigation);
    const [currentUser, setCurrentUser] = useState(getUser().user);
    const { theme } = useContext(ThemeContext); // Acceso al theme del ThemeContext

    useEffect(() => {
        setCurrentUser(getUser().user);
    }, [getUser]);

    useEffect(() => {
        const currentPath = location.pathname;
        setNavigation((prevNavigation) =>
            prevNavigation.map((item) => ({
                ...item,
                current: item.href === currentPath,
            }))
        );
    }, [location]);

    // Lista de enlaces de navegación para el usuario con los iconos que cambian según el tema
    const userNavigationLinks = [
        { name: 'Manage account', to: ROUTE_PATHS.USER_PROFILE, imageBase: '/UserIcon' },
        { name: 'My properties', to: ROUTE_PATHS.PROPERTY_MANAGEMENT, imageBase: '/PropertiesIcon' },
        { name: 'Appointments', to: ROUTE_PATHS.APPOINTMENTS, imageBase: '/AppointmentsIcon' },
        { name: 'Favorite Properties', to: ROUTE_PATHS.FAVORITES, imageBase: '/LikeIcon' },
        ...(currentUser?.user_type === 'admin'
            ? [{ name: 'Partners Administration', to: ROUTE_PATHS.PARTNERS_ADMINISTRATION, imageBase: '/Partner_Icon2' }]
            : []),
        { name: 'Log out', to: '#', imageBase: '/LogoutIcon' },
    ];

    const handleLogout = async () => {
        try {
            const response = await axios.post('/logout', authToken);

            if (response.status === 200) {
                logout();
                navigate(ROUTE_PATHS.LOGIN);
            } else {
                console.error('Logout error:', response);
            }
        } catch (err) {
            console.error('Logout error:', err);
        }

        logout();
        navigate(ROUTE_PATHS.LOGIN);
    };

    return (
        <Disclosure as="nav" className="bg-white dark:bg-gray-900 border-b border-light-grey dark:border-gray-700 font-primary">
            <div className="mx-auto max-w-7xl px-2 sm:px-0">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-light-blue hover:text-white dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 ease-in-out transform hover:scale-105">
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" />
                            <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                        <div className="flex flex-shrink-0 items-center">
                            <Link to={ROUTE_PATHS.HOME}>
                                <img
                                    alt="Suru Logo"
                                    src={theme === 'dark' ? '/LogoDark.svg' : '/Logo.svg'}
                                    className="h-6 w-auto"
                                />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map(
                                    (item) =>
                                        (item.isLogin || (!item.isLogin && !authToken && !currentUser)) && (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current && item.isLogin ? 'text-cyan-500 font-semibold' : 'text-gray-600 dark:text-gray-300 hover:text-light-blue dark:hover:text-light-blue transition duration-200 ease-in-out',
                                                    item.name === 'Log In' ? 'bg-light-blue hover:bg-cyan-600/85 border-none text-white hover:text-white' : item.name === 'Sign Up' ? 'bg-none text-gray-600 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-200 bg-gray-300 dark:bg-gray-700' : '',
                                                    !item.isLogin ? 'rounded-md hover:text-primary' : '',
                                                    'px-4 py-2 text-sm font-medium rounded-md'
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                    {authToken && currentUser && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="flex rounded-full bg-gray-800 dark:bg-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="sr-only">Open user menu</span>
                                        <img alt="User" src={currentUser.image_url} className="h-8 w-8 rounded-full" />
                                    </MenuButton>
                                </div>
                                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                                    {userNavigationLinks.map((item) => (
                                        <MenuItem key={item.name} className="flex items-center gap-1">
                                            {item.name === 'Log out' ? (
                                                <button onClick={handleLogout} className="block px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-light-blue dark:hover:bg-gray-600 w-full text-left">
                                                    <img src={`${item.imageBase}${theme === 'dark' ? 'Dark' : ''}.svg`} alt={item.name} className="h-6 w-6 inline mr-2" />
                                                    {item.name}
                                                </button>
                                            ) : (
                                                <Link to={item.to} className="block px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-light-blue dark:hover:bg-gray-600">
                                                    <img src={`${item.imageBase}${theme === 'dark' ? 'Dark' : ''}.svg`} alt={item.name} className="h-6 w-6 inline mr-2" />
                                                    {item.name}
                                                </Link>
                                            )}
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>
                    )}
                </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) =>
                        item.isLogin ||
                        (!item.isLogin && !authToken && !currentUser) ? (
                            <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className={classNames(
                                    item.current
                                        ? 'bg-cyan-700 text-white'
                                        : 'text-primary dark:text-gray-300 hover:brightness(.5) hover:text-light-blue dark:hover:text-light-blue',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )}
                            >
                                {item.name}
                            </Disclosure.Button>
                        ) : null
                    )}

                    {/* Botón de Logout si el usuario está autenticado */}
                    {authToken && currentUser && (
                        <Disclosure.Button
                            key="logout"
                            as="a"
                            onClick={handleLogout} 
                            className="block rounded-md px-3 py-2 text-base font-medium text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800"
                        >
                            Logout
                        </Disclosure.Button>
                    )}
                </div>
            </Disclosure.Panel>
        </Disclosure>
    );
}

export default NavBar;
