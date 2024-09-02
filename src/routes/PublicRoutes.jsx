import { Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/public/Homepage.jsx";

export function PublicRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/*" element={<Homepage />} />
            <Route path="/home" element={<Homepage />} />
        </Routes>
    );
}

export default PublicRoutes;