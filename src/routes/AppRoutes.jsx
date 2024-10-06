import { NavBar } from '../components/ui/layout/NavBar.jsx';
import { Footer } from '../components/ui/layout/Footer.jsx';
import { PublicRoutes } from './PublicRoutes.jsx';
import { PrivateRoutes } from './PrivateRoutes.jsx';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from '../global/ProtectedRoutes.jsx';
import '../index.css';
import { UserAuth } from '../components/ui/layout/userAuth.jsx';
export function AppRoutes() {
    return (
        <>
            {/* <UserAuth /> */}
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
        </>
    );
}

export default AppRoutes;
