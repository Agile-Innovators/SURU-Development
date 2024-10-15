import { Routes, Route } from 'react-router-dom';
// import { ROUTE_PATHS } from "./index.js";
import { Prueba } from '../pages/private/Prueba.jsx';
import { Favorites } from '../pages/private/Favorites.jsx';
import { ROUTE_PATHS } from './index.js';

export function PrivateRoutes() {
    return (
        <Routes>
            <Route path="/prueba" element={<Prueba />} />
            
        </Routes>
    );
}

export default PrivateRoutes;
