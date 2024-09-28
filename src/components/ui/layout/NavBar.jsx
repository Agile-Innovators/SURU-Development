import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../../routes/index.js';
import { useAuth } from '../../../global/AuthProvider.jsx';

const initialNavigation = [
  { name: 'Home', href: ROUTE_PATHS.HOME, current: false },
  { name: 'Partners', href: ROUTE_PATHS.PARTNERS_ANGEL, current: false },
  { name: 'Search', href: ROUTE_PATHS.SEARCH, current: false },
];

const userNavigationLinks = [
  { name: 'My account', to: '#', imageRoute: '/public/UserIcon.svg' },
  { name: 'My properties', to: ROUTE_PATHS.PROPERTY_MANAGEMENT , imageRoute: '/public/PropetiesIcon.svg' },
  // { name: 'Saved properties', to: '#', imageRoute: '/public/HomeIcon.svg' },
  // { name: 'My appointments', to: '#', imageRoute: '/public/CalendarIcon.svg' },
  { name: 'Log out', to: '#', imageRoute: '/public/LogoutIcon.svg' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { saveAuthToken } = useAuth();
  const [navigation, setNavigation] = useState(initialNavigation);

  useEffect(() => {
    const currentPath = location.pathname;
    setNavigation((prevNavigation) =>
      prevNavigation.map((item) => ({
        ...item,
        current: item.href === currentPath,
      }))
    );
  }, [location]);

  const handleLogout = () => {
    saveAuthToken(null);
    navigate(ROUTE_PATHS.LOGIN);
  };
  return (
    <Disclosure as="nav" className="bg-white border-b-light-grey border-b-2 font-primary">
      <div className="mx-auto max-w-7xl px-2 sm:px-0">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-light-blue hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition duration-300 ease-in-out transform hover:scale-105">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
            <div className="flex flex-shrink-0 items-center">
              <Link to={ROUTE_PATHS.HOME}>
                <img
                  alt="Your Company"
                  src="/Logo.svg"
                  className="h-6 w-auto"
                />
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-light-blue text-white' : 'text-primary hover:bg-light-blue hover:text-white transition duration-100 ease-in-out transform',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-light-grey p-1 text-white hover:bg-light-blue focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" />
            </button>

            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="User"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                {userNavigationLinks.map((item) => (
                  <MenuItem key={item.name} className="flex items-center gap-1">
                    {item.name === 'Log out' ? (
                      <button
                        onClick={handleLogout}
                        className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-light-blue hover:text-white w-full text-left"
                      >
                        <img src={item.imageRoute} alt={item.name} className="h-6 w-6 inline mr-2" />
                        {item.name}
                      </button>
                    ) : (
                      <Link to={item.to} className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-light-blue hover:text-white">
                        <img src={item.imageRoute} alt={item.name} className="h-6 w-6 inline mr-2" />
                        {item.name}
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              className={classNames(
                item.current ? 'bg-light-grey text-white' : 'text-primary hover:bg-light-blue hover:text-white',
                'block rounded-md px-3 py-2 text-base font-medium',
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}