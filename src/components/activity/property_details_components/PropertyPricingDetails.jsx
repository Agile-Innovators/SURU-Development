import React, { useState } from 'react';
import { SkeletonLoader } from '../../ui/SkeletonLoader.jsx';
import { MainButton } from '../../ui/buttons/MainButton';
import { Droplet, Wifi, Zap, Tv } from 'lucide-react';
import { RequestAppointmentModal } from '../../ui/modals/RequestAppointmentModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function PropertyPricingDetails({ propertyTemp, isLoading }) {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const property = propertyTemp;

    // Obtener el usuario logeado de localStorage
    const user = JSON.parse(localStorage.getItem('user')) || null;
    const loggedInUserId = user?.id;

    // Función para alternar el estado del modal
    const toggleModal = () => {
        if (loggedInUserId) {
            setIsModalOpen((prev) => !prev);
        } else {
            toast.error('You must be logged in to schedule a visit.');
        }
    };

    const showPricingDetails = (property) => {
        return (
            <div className="flex flex-col gap-4">
                <ToastContainer
                    position="top-center"
                    autoClose={200}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="flex flex-col border-2 gap-2 rounded-md p-4">
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
                        className="text-secondary border-2 border-secondary hover:bg-secondary hover:text-white py-3 mt-4"
                        onClick={toggleModal}
                    >
                        Schedule a Visit
                    </button>
                    <MainButton text="Get Property" type="button" />
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
                    console.log("Owner ID:", property.owner_id);
                </div>
            )}
        </div>
    );
}
