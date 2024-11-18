import { useState, useContext } from 'react';
import { SkeletonLoader } from '../../ui/SkeletonLoader.jsx';
import { Droplet, Wifi, Zap, Tv } from 'lucide-react';
import { RequestAppointmentModal } from '../../ui/modals/RequestAppointmentModal';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeContext } from '../../../global/ThemeContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { LayoutModal } from '../../ui/modals/LayoutModal.jsx';
import { MainButton } from '../../ui/buttons/MainButton.jsx';
import { FaTiktok, FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { X } from 'lucide-react';
export function PropertyPricingDetails({ propertyTemp, isLoading }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const property = propertyTemp;
    const { theme } = useContext(ThemeContext);

    console.log('property', property);
    // Obtener el usuario logeado de localStorage
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const loggedInUserId = user?.id;

    const [isModalVisible, setIsModalVisible] = useState(false);



    // Función para alternar el estado del modal
    const toggleModal = () => {
        if (loggedInUserId) {
            setIsModalOpen((prev) => !prev);
        } else {
            toast.error('You must be logged in to schedule a visit.');
        }
    };

    // Función para contactar al dueño de la propiedad
    const contactOwner = ({ phone_number }) => {
        console.log('phone_number', phone_number);
        if (loggedInUserId) {
            //modal que muestra la información del usuario que vende

            setIsModalVisible(true);
        } else {
            toast.error('You must be logged in to contact the owner.');
        }
    };

    const showPricingDetails = (property) => {
        return (
            <div className="flex flex-col gap-4">
                <ToastContainer
                    position="top-center"
                    autoClose={2500}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={theme}
                />
                <div className="flex flex-col border-2 gap-2 rounded-md p-4">
                    <LayoutModal status={isModalVisible} customClass="flex items-center justify-center">
                        <div className="flex flex-col gap-6 bg-white h-auto p-4 rounded-lg shadow-lg dark:bg-[#0d273e]">
                            <button onClick={() => setIsModalVisible(false)} className='flex justify-end'>
                                <X className="hover:text-blue-500" />
                            </button>
                            {/* Título */}
                            <h2 className=" text-center text-gray-800">Owner Information</h2>

                            {/* Información del propietario */}
                            <div className="flex flex-col gap-2 text-gray-700">
                                <p>
                                    <b>Owner Name:</b> {property.owner_name}
                                </p>
                                {!property.owner_phone ? null : (
                                    <p>
                                        <b>Phone:</b> (+506) {property.owner_phone}
                                    </p>
                                )}
                                <p>
                                    <b>Email:</b> example@example.com
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mt-2 sm:grid-cols-2 md:grid-cols-2">
                                
                                {!property.owner_phone ? null : (
                                    <MainButton
                                    onClick={() => window.open(`https://wa.me/506${property.owner_phone}`, '_blank')}
                                    text={
                                        <div className="flex items-center space-x-2">
                                            <FaWhatsapp /> <span className='text-white'>WhatsApp</span>
                                        </div>
                                    }
                                    className="bg-green-500 dark:bg-cyan-700 text-white px-2 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
                                />
                                )}
                                <MainButton
                                    onClick={() => window.open(`mailto:example@example.com`, '_blank')}
                                    text={
                                        <div className="flex items-center space-x-2">
                                            <FaEnvelope /> <span className='text-white'>Email</span>
                                        </div>
                                    }
                                    className="bg-orange-500 dark:bg-[#4c6376] text-white px-2 py-2 rounded-md hover:bg-orange-600 transition-colors duration-200"
                                />
                            </div>

                        </div>
                    </LayoutModal>

                    <h3>Pricing details</h3>
                    {/* este if verifica el tipo de propiedad */}
                    {property.property_transaction === 'Sale' ? (
                        <div className="flex justify-between">
                            <p>Sale Payment</p>
                            <p className="font-medium">
                                {property.currency_code} {property.price}
                            </p>
                        </div>
                    ) : property.property_transaction === 'Rent' ? (
                        <div>
                            <div className="flex justify-between">
                                <p>Rental Price</p>
                                <p className="font-medium">
                                    {property.currency_code}{' '}
                                    {property.rent_price}{' '}
                                    {property.payment_frequency}
                                </p>
                            </div>
                            {property.deposit_price &&
                                property.deposit_price > 0 ? (
                                <div className="flex justify-between">
                                    <p>Security Deposit</p>
                                    <p className="font-medium">
                                        {property.currency_code}{' '}
                                        {property.deposit_price}
                                    </p>
                                </div>
                            ) : (
                                <p className="font-medium">
                                    No security deposit available
                                </p>
                            )}
                        </div>
                    ) : property.property_transaction === 'Dual' ? (
                        <div>
                            <div className="flex justify-between">
                                <p>Sale Payment</p>
                                <p className="font-medium">
                                    {property.currency_code} {property.price}
                                </p>
                            </div>
                            <div className="border border-b-1 m-2"></div>
                            <div className="flex justify-between mt-2">
                                <p>Rental Price</p>
                                <p className="font-medium">
                                    {property.currency_code}{' '}
                                    {property.rent_price}{' '}
                                    {property.payment_frequency}
                                </p>
                            </div>
                            {property.deposit_price &&
                                property.deposit_price > 0 ? (
                                <div className="flex justify-between">
                                    <p>Security Deposit</p>
                                    <p className="font-medium">
                                        {property.currency_code}{' '}
                                        {property.deposit_price}
                                    </p>
                                </div>
                            ) : (
                                <p className="font-medium">
                                    No security deposit available
                                </p>
                            )}
                        </div>
                    ) : (
                        <p className="font-medium">
                            Transaction type not available
                        </p>
                    )}

                    {/* Botón para abrir el modal */}
                    <button
                        className="text-secondary dark:text-light-blue dark:border-light-blue border-2 border-secondary hover:bg-secondary hover:text-white py-3 mt-4 rounded-sm"
                        onClick={toggleModal}
                    >
                        Schedule a Visit
                    </button>
                    <button
                        className="text-white border-2 border-secondary bg-secondary hover:bg-light-blue hover:border-light-blue hover:text-white py-3 mt-1 rounded-sm"
                        onClick={() => contactOwner({ phone_number: property.owner_phone })}

                    >
                        Contact Owner
                    </button>
                </div>

                <div className="flex flex-col border-2 gap-2 rounded-md p-4">
                    <h3>Utilities</h3>
                    <div className="flex justify-center gap-4">
                        {property.utilities && property.utilities.length > 0 ? (
                            property.utilities.map((utility) => {
                                switch (utility.name) {
                                    case 'Water':
                                        return (
                                            <div
                                                key={utility.id}
                                                className="utility-box water"
                                            >
                                                <Droplet />
                                                <p>Water </p>
                                            </div>
                                        );
                                    case 'Wifi':
                                        return (
                                            <div
                                                key={utility.id}
                                                className="utility-box wifi"
                                            >
                                                <Wifi />
                                                <p>Wifi </p>
                                            </div>
                                        );
                                    case 'Electricity Access':
                                        return (
                                            <div
                                                key={utility.id}
                                                className="utility-box electricity"
                                            >
                                                <Zap />
                                                <p>Electricity </p>
                                            </div>
                                        );
                                    case 'Cable':
                                        return (
                                            <div
                                                key={utility.id}
                                                className="utility-box cable"
                                            >
                                                <Tv />
                                                <p>Furnished</p>
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
                            })
                        ) : (
                            <p>No utilities available</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const showLoader = () => {
        return (
            <div className="flex flex-col gap-4">
                <SkeletonLoader customClass="h-64 w-full" />
            </div>
        );
    };

    return (
        <div>
            {isLoading ? showLoader() : showPricingDetails(property)}

            {/* Modal para solicitar una cita */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <RequestAppointmentModal
                        handleModal={setIsModalOpen}
                        userId={loggedInUserId}
                        propertyId={property.id}
                    />
                </div>
            )}
        </div>
    );
}

export default PropertyPricingDetails;

PropertyPricingDetails.propTypes = {
    propertyTemp: PropTypes.number,
    property: PropTypes.object,
    isLoading: PropTypes.bool,
    toggleModal: PropTypes.func,
    contactOwner: PropTypes.func,
    showPricingDetails: PropTypes.func,
    showLoader: PropTypes.func,
    isModalOpen: PropTypes.bool,
    setIsModalOpen: PropTypes.func
};
