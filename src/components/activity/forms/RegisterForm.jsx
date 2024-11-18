import { useState, useEffect } from "react";


export function LayoutModal({ children, customClass = '', status, onClose }) {
    const [isOpen, setIsOpen] = useState(status);

    useEffect(() => {
        setIsOpen(status);
        if (status) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [status]);

    return (
        <div className={`${isOpen ? 'flex' : 'hidden'} w-screen min-h-screen justify-center z-50 left-0 top-0 bg-black/70 p-4 fixed ${customClass}`}>
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
                <button className="absolute top-2 right-2 text-xl" onClick={onClose}>✕</button>
                {children}
            </div>
        </div>
    );
}
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../ui/forms/Input.jsx';
import { CheckBox } from '../../ui/forms/CheckBox.jsx';
import { TextLink } from '../../ui/navigation/TextLink.jsx';
import { MainButton } from '../../ui/buttons/MainButton.jsx';
import { ROUTE_PATHS } from '../../../routes/index.js';
import { useAuth } from '../../../global/AuthProvider.jsx';
import { ThemeContext } from "../../../global/ThemeContext.jsx";
import { useAxios } from '../../../components/hooks/useAxios.js';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const navigate = useNavigate();
    const axios = useAxios();
    const { login } = useAuth();
    const { theme } = useContext(ThemeContext); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        if (!username || !email || !password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        if (!terms) {
            setError('You must agree to the Terms of Service and Privacy Policy.');
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            setLoading(false);
            return;
        }

        const data = {
            username,
            email,
            password,
            user_type_id: 2,
        };

        try {
            const response = await axios.post('/register', data);
            const { token, user } = response.data;
            login(token, user);
            navigate(ROUTE_PATHS.HOME);
        } catch (err) {
            setError('The username or email is already taken.');
            console.error(err.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    return (
        <form onSubmit={handleSubmit} className="m-auto">
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
            <h1>Let&apos;s get started</h1>
            <span className="text-grey dark:text-light-grey">
                Complete the form below to create your new account
            </span>

            {error && <div className="error text-red-500 mt-2">{error}</div>}

            <div className="grid gap-4 my-4">
                <Input
                    type="text"
                    label="Username"
                    inputName="username"
                    inputId="username"
                    labelText="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    spanText="Example: johndoe"
                />
                <Input
                    type="email"
                    label="Email"
                    inputName="email"
                    inputId="email"
                    labelText="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    spanText="Example: john@gmail.com"
                />
                <Input
                    type="password"
                    label="Password"
                    inputName="password"
                    inputId="password"
                    labelText="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    spanText="Password must be at least 8 characters"
                />

                <div className="flex align-center mt-2">
                    <CheckBox
                        inputName="terms"
                        inputId="terms"
                        checked={terms}
                        onChange={() => setTerms(!terms)}
                    />
                    <p className="text-grey dark:text-light-grey text-sm">
                        I agree to the{' '}
                        <span onClick={() => openModal('Terms of Service')} className="text-cyan-500 cursor-pointer">
                            Terms of Service
                        </span> and{' '}
                        <span onClick={() => openModal('Privacy Policy')} className="text-cyan-500 cursor-pointer">
                            Privacy Policy
                        </span>
                    </p>
                </div>
            </div>
            <MainButton
                text="Sign Up"
                type="submit"
                variant="fill"
                customClass="w-full mb-2"
            />
            <span className="text-grey text-sm mr-1">
                Do you have an account?
            </span>
            <TextLink route={ROUTE_PATHS.LOGIN} text="Sign In" />
            {loading && <p className="text-secondary dark:text-light-blue">Loading...</p>}

            <LayoutModal status={showModal} onClose={() => setShowModal(false)}>
                {modalContent === 'Terms of Service' ? (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Sürü Terms of Service</h2>
                        <p className="mb-2"><strong>1. Acceptance of Terms</strong><br />
                        By accessing or using Sürü, you agree to these Terms of Service. If you do not agree, you must not use the Platform.</p>
                        <p className="mb-2"><strong>2. Provided Services</strong><br />
                        Sürü allows users to:<br />
                        - List properties for sale or rent.<br />
                        - Search for properties available for rent, sale, or land in Costa Rica.</p>
                        <p className="mb-2"><strong>3. User Registration</strong><br />
                        Users must create an account to access certain features, providing accurate information. Sürü reserves the right to suspend accounts that violate these terms or applicable laws.</p>
                        <p className="mb-2"><strong>4. Property Listings</strong><br />
                        Users listing properties must have the necessary permissions and are responsible for the accuracy of the provided information. Sürü is not responsible for the veracity of listings.</p>
                        <p className="mb-2"><strong>5. User Responsibilities</strong><br />
                        Users must use the Platform in a legal and ethical manner, avoiding the publication of false or fraudulent content and engaging in illegal activities.</p>
                        <p className="mb-2"><strong>6. Payments and Fees</strong><br />
                        Some services may be subject to fees, clearly indicated at the time of the transaction.</p>
                        <p className="mb-2"><strong>7. Limitation of Liability</strong><br />
                        Sürü acts as an intermediary and is not responsible for transactions between users, the accuracy of listings, or agreements made outside the Platform.</p>
                        <p className="mb-2"><strong>8. Intellectual Property</strong><br />
                        The content of Sürü, including its brand, is the exclusive property of the company and cannot be used without permission.</p>
                        <p className="mb-2"><strong>9. Changes to the Terms</strong><br />
                        Sürü reserves the right to modify these Terms of Service at any time.</p>
                        <p className="mb-2"><strong>10. Governing Law and Jurisdiction</strong><br />
                        These Terms are governed by the laws of Costa Rica. Any disputes will be resolved in its courts.</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Sürü Privacy Policy</h2>
                        <p className="mb-2"><strong>1. Information Collected</strong><br />
                        We collect information provided directly by the user when registering or listing properties, such as name, email, and property details.</p>
                        <p className="mb-2"><strong>2. Use of Information</strong><br />
                        The information is used to:<br />
                        - Facilitate user interactions.<br />
                        - Improve the Platform experience.<br />
                        - Send notifications and service updates.</p>
                        <p className="mb-2"><strong>3. Sharing Information with Third Parties</strong><br />
                        Sürü does not share personal information with third parties without user consent, except when required by law.</p>
                        <p className="mb-2"><strong>4. Data Protection</strong><br />
                        We implement security measures to protect user information. However, we do not guarantee absolute security against unauthorized access.</p>
                        <p className="mb-2"><strong>5. Cookies and Tracking Technologies</strong><br />
                        We use cookies to enhance user experience. Users can control cookie usage through their browser settings.</p>
                        <p className="mb-2"><strong>6. User Rights</strong><br />
                        Users have the right to access, correct, or delete their personal information. They can contact us to exercise these rights.</p>
                        <p className="mb-2"><strong>7. Changes to the Privacy Policy</strong><br />
                        Sürü reserves the right to modify this Privacy Policy. Changes will be notified through the Platform.</p>
                        <p className="mb-2"><strong>8. Contact</strong><br />
                        For any questions or requests regarding privacy, contact us through our customer service.</p>
                        <p className="mb-2"><strong>9. Governing Law</strong><br />
                        This Privacy Policy is governed by the laws of Costa Rica.</p>
                    </div>
                )}
            </LayoutModal>
        </form>
    );
}

export default RegisterForm;
