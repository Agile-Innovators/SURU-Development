import { Route, Routes } from "react-router-dom";
import { Homepage } from "../pages/public/Homepage.jsx";
import { Login } from "../pages/public/Login.jsx";
import { EmailSent } from "../pages/public/EmailSent.jsx";
import { Register } from "../pages/public/Register.jsx";
import { EmailCode } from "../pages/public/EmailCode.jsx";
import { ResetPassword } from "../pages/public/ResetPassword.jsx";
import { ConfirmPassword } from "../pages/public/ConfirmPassword.jsx";
import { ForgotPassword } from "../pages/public/ForgotPassword.jsx";
import { ROUTE_PATHS } from "./index.js";
import { Partners } from "../pages/public/Partners.jsx";
import { CreateProperty } from "../pages/public/CreateProperty.jsx";
import { Search } from "../pages/public/Search.jsx";


export function PublicRoutes() {
    return (
        <Routes>
            <Route path={ROUTE_PATHS.HOME} element={<Homepage />} />
            <Route path={ROUTE_PATHS.LOGIN} element={<Login />} />
            <Route path={ROUTE_PATHS.REGISTER} element={<Register />} />
            <Route path={ROUTE_PATHS.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={ROUTE_PATHS.EMAIL_CODE} element={<EmailCode />} />
            <Route path={ROUTE_PATHS.EMAIL_SEND} element={<EmailSent />} />
            <Route path={ROUTE_PATHS.RESET_PASSWORD} element={<ResetPassword />} />
            <Route path={ROUTE_PATHS.CONFIRM_PASSWORD} element={<ConfirmPassword />} />
            <Route path={ROUTE_PATHS.PARTNERS} element={<Partners />} />
            <Route path={ROUTE_PATHS.NOT_FOUND} element={<Homepage />} />
            <Route path={ROUTE_PATHS.HOME} element={<Homepage />} />
            <Route path={ROUTE_PATHS.CREATE_PROPERTY} element={<CreateProperty/>} />
            <Route path={ROUTE_PATHS.SEARCH} element={<Search/>} />
        </Routes>
    );
}

export default PublicRoutes;