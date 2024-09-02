import { Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/public/Homepage.jsx";
import { Login } from "../pages/public/Login.jsx";
import { EmailSent } from "../pages/public/EmailSent.jsx";
import { Register } from "../pages/public/Register.jsx";
import { EmailCode } from "../pages/public/EmailCode.jsx";
import { ResetPassword } from "../pages/public/ResetPassword.jsx";
import { ConfirmPassword } from "../pages/public/ConfirmPassword.jsx";
import { ForgotPassword } from "../pages/public/ForgotPassword.jsx";

export function PublicRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/email-code" element={<EmailCode />} />
            <Route path="/email-sent" element={<EmailSent />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/confirm-password" element={<ConfirmPassword />} />
            <Route path="/*" element={<Homepage />} />
            <Route path="/home" element={<Homepage />} />
        </Routes>
    );
}

export default PublicRoutes;