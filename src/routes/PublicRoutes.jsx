import { Route, Routes } from 'react-router-dom';
import { Homepage } from '../pages/public/Homepage.jsx';
import { Login } from '../pages/public/Login.jsx';
import { EmailSent } from '../pages/public/EmailSent.jsx';
import { Register } from '../pages/public/Register.jsx';
import { EmailCode } from '../pages/public/EmailCode.jsx';
import { ResetPassword } from '../pages/public/ResetPassword.jsx';
import { ConfirmPassword } from '../pages/public/ConfirmPassword.jsx';
import { ForgotPassword } from '../pages/public/ForgotPassword.jsx';
import { ROUTE_PATHS } from './index.js';
import { Partners } from '../pages/public/Partners.jsx';
import { Search } from '../pages/public/Search.jsx';
import { PartnerIntegrationRequest } from '../pages/public/PartnerIntegrationRequest.jsx';
import { PropertyDetails } from '../pages/public/PropertyDetails.jsx';
import { Appointments } from '../pages/public/Appointments.jsx';
import { RequestAppointment } from '../pages/public/RequestAppointment.jsx';
import { UserProfile } from '../pages/public/UserProfile.jsx';
import { GeneralInformation } from '../pages/public/GeneralInformation.jsx';
import { Preferences } from '../pages/public/Preferences.jsx';
import { OperationalHours } from '../pages/public/OperationalHours.jsx';
import { ChangePassword } from '../pages/public/ChangePassword.jsx';
import { EditProperty } from '../pages/public/EditProperty.jsx';
import { Favorites } from '../pages/private/Favorites.jsx';
import { CreateProperty } from '../pages/private/CreateProperty.jsx';
import { PropertyManagement } from '../pages/private/PropertyManagement.jsx'
import { PartnersAdministration } from '../pages/public/PartnersAdministration.jsx';
import { GeneralInformationPartner } from '../pages/public/GeneralInformationPartner.jsx';
import { useAuth } from '../global/AuthProvider.jsx';
import { PartnerServices } from '../pages/public/PartnerServices.jsx';
export function PublicRoutes() {
    const { getUser } = useAuth();
    const { user } = getUser();
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
            <Route path={ROUTE_PATHS.SEARCH} element={<Search />} />
            <Route path={ROUTE_PATHS.PARTNER_INTEGRATION_REQUEST} element={<PartnerIntegrationRequest />} />
            <Route path={ROUTE_PATHS.PROPERTY_DETAILS} element={<PropertyDetails />} />
            <Route path={ROUTE_PATHS.APPOINTMENTS} element={<Appointments />} />
            <Route path={ROUTE_PATHS.PARTNERS_ADMINISTRATION} element={< PartnersAdministration />} />
            <Route
                path={ROUTE_PATHS.REQUEST_APPOINTMENTS}
                element={<RequestAppointment />}
            />
            <Route path={ROUTE_PATHS.PROPERTY_MANAGEMENT} element={<PropertyManagement />} />
            <Route
                path={ROUTE_PATHS.EDIT_PROPERTY}
                element={<EditProperty />}
            />
            <Route
                path={ROUTE_PATHS.CREATE_PROPERTY}
                element={<CreateProperty />}
            />
            <Route path={ROUTE_PATHS.REQUEST_APPOINTMENTS} element={<RequestAppointment />} />
            <Route path="/*" element={ROUTE_PATHS.NOT_FOUND} />
            <Route path={ROUTE_PATHS.FAVORITES} element={<Favorites />} />

            <Route path={ROUTE_PATHS.USER_PROFILE} element={<UserProfile />}>
                {/* <Route path={ROUTE_PATHS.GENERAL_INFORMATION_PARTNER} element={<GeneralInformationPartner />} />, */}
                <Route path={ROUTE_PATHS.GENERAL_INFORMATION} element={<GeneralInformation />} />,
                <Route path={ROUTE_PATHS.PARTNER_SERVICES} element={<PartnerServices />} />
                <Route path={ROUTE_PATHS.PREFERENCES} element={<Preferences />} />
                <Route path={ROUTE_PATHS.OPERATIONAL_HOURS} element={<OperationalHours />} />
                <Route path={ROUTE_PATHS.CHANGE_PASSWORD} element={<ChangePassword />} />

            </Route>
        </Routes>
    );
}

export default PublicRoutes;
