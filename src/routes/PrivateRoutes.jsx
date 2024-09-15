import { Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "./index.js";
import { useGetToken } from "../utils/authUtils";

export function PrivateRoutes() {
    const token = useGetToken();

    if (!token) {
        return <Navigate to={ROUTE_PATHS.LOGIN} />;
    }
    return (
        <Routes>
            
        </Routes>
    );
}

export default PrivateRoutes;
