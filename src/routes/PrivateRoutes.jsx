import { Routes, Route } from "react-router-dom";
// import { ROUTE_PATHS } from "./index.js";
import { Prueba } from "../pages/private/Prueba.jsx"

export function PrivateRoutes() {

    return (
        <Routes>
            <Route path="/prueba" element={<Prueba />} />
        </Routes>
    );
}

export default PrivateRoutes;
