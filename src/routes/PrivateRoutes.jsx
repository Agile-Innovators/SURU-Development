import { Routes, Route } from 'react-router-dom';
import { Favorites } from '../pages/private/Favorites.jsx';
import { ROUTE_PATHS } from "./index.js";
import { CreateProperty } from "../pages/private/CreateProperty.jsx";
import { PropertyManagement } from "../pages/private/PropertyManagement.jsx";

export function PrivateRoutes() {
    return (

        <Routes>
            <Route
                path={ROUTE_PATHS.CREATE_PROPERTY}
                element={<CreateProperty />}
            />
            <Route
                path={ROUTE_PATHS.PROPERTY_MANAGEMENT}
                element={<PropertyManagement />}
            />
            <Route
                path={ROUTE_PATHS.FAVORITES}
                element={<Favorites />} 
            />
        </Routes>
    );
}

export default PrivateRoutes;