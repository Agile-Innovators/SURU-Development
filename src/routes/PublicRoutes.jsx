import { Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/public/Homepage.jsx";
import { Login } from "../pages/public/Login.jsx";
import { Register } from "../pages/public/Register.jsx";
import { PasswordReset } from "../pages/public/PasswordReset.jsx";

export function PublicRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password-reset" element={<PasswordReset />} />
            <Route path="/*" element={<Homepage />} />
        </Routes>
    );
}

export default PublicRoutes;