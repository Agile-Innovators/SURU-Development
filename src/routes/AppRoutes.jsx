import { NavBar } from '../components/ui/layout/NavBar.jsx';
import { Footer } from '../components/ui/layout/Footer.jsx';
import { PublicRoutes } from './PublicRoutes.jsx';
import { PrivateRoutes } from './PrivateRoutes.jsx';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from '../global/ProtectedRoutes.jsx';
import '../index.css';
import ScrollToTop from './ScrollToTop.jsx';

export function AppRoutes() {
    return (
        <div id='body' className='min-h-screen'>
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
    );
}

export default AppRoutes;
