import { NavBar } from '../components/ui/layout/NavBar.jsx';
import { Footer } from '../components/ui/layout/Footer.jsx';
import { PublicRoutes } from './PublicRoutes.jsx';
import { PrivateRoutes } from './PrivateRoutes.jsx';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoutes from '../global/ProtectedRoutes.jsx';
import { LayoutModal } from '../components/ui/modals/LayoutModal.jsx';
import '../index.css';
import ScrollToTop from './ScrollToTop.jsx';
import { useAuth } from '../global/AuthProvider';
import { useState, useEffect } from 'react';
import { SessionExpiredModal } from '../components/ui/modals/SessionExpiredModal.jsx';
import { ROUTE_PATHS } from './index.js';
import { ThemeProvider } from '../global/ThemeContext.jsx';

export function AppRoutes() {
    const navigate = useNavigate();
    const { isSessionExpired, logout } = useAuth();
    const [isModalVisible, setIsModalVisible] = useState(isSessionExpired);

    useEffect(() => {
        setIsModalVisible(isSessionExpired);

        //Close modal and session after 3 seconds
        if (isSessionExpired) {
            setTimeout(() => {
                logout();
                navigate(ROUTE_PATHS.LOGIN);
                setIsModalVisible(false);
            }, 3000);
        }
    }, [isSessionExpired]);

    return (
        <ThemeProvider>
            <div id='body' className='min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white'>
                <ScrollToTop />
                <NavBar />

                {isModalVisible && (
                    <LayoutModal status={isModalVisible}>
                        <SessionExpiredModal handleModal={setIsModalVisible} />
                    </LayoutModal>
                )}

                <Routes>
                    <Route path="/*" element={<PublicRoutes />} />
                    <Route path="/suru/*" element={<ProtectedRoutes><PrivateRoutes /></ProtectedRoutes>}/>
                </Routes>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default AppRoutes;
