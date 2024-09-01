import { NavBar } from "../components/ui/NavBar.jsx";
import { Footer } from "../components/ui/Footer.jsx";
import { PublicRoutes } from "./PublicRoutes.jsx";
import { PrivateRoutes } from "./PrivateRoutes.jsx";
import { Routes, Route } from 'react-router-dom';
import '../index.css'

export function AppRoutes() {
    return (
        <>
            <NavBar />
                <Routes>
                    <Route path="/*" element={<PublicRoutes />} />
                    <Route path="/suru/*" element={<PrivateRoutes />} />
                </Routes>
            <Footer />
        </>
    );
}

export default AppRoutes;
