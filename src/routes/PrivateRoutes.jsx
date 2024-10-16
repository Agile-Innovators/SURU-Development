import { Routes, Route } from 'react-router-dom';
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
        </Routes>
    );
}

export default PrivateRoutes;
