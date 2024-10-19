import { NavBar } from '../components/ui/layout/NavBar.jsx';
import { Footer } from '../components/ui/layout/Footer.jsx';
import { PublicRoutes } from './PublicRoutes.jsx';
import { PrivateRoutes } from './PrivateRoutes.jsx';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '../global/ThemeContext.jsx';
import ProtectedRoutes from '../global/ProtectedRoutes.jsx';
import '../index.css';
import ScrollToTop from './ScrollToTop.jsx';

export function AppRoutes() {
    return (
        <ThemeProvider>
            <div id='body' className='min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white'>
                <ScrollToTop />
                <NavBar />
                <Routes>
                    <Route path="/*" element={<PublicRoutes />} />
                    <Route
                        path="/suru/*"
                        element={
                            <ProtectedRoutes>
                                <PrivateRoutes />
                            </ProtectedRoutes>
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default AppRoutes;
