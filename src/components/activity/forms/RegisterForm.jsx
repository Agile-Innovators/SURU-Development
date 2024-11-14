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

import { useNavigate } from 'react-router-dom';
import { Input } from '../../ui/forms/Input.jsx';
import { CheckBox } from '../../ui/forms/CheckBox.jsx';
import { TextLink } from '../../ui/navigation/TextLink.jsx';
import { MainButton } from '../../ui/buttons/MainButton.jsx';
import { ROUTE_PATHS } from '../../../routes/index.js';
import { useAuth } from '../../../global/AuthProvider.jsx';
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

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
            setError(err.response?.data?.message || 'An error occurred');
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
            <h1 >Let&apos;s get started</h1>
            <span className="text-grey">
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
                    <p className="text-grey text-sm">
                        I agree to the{' '}
                        <span onClick={() => openModal('Terms of Service')} className="text-blue-500 cursor-pointer">
                            Terms of Service
                        </span> and{' '}
                        <span onClick={() => openModal('Privacy Policy')} className="text-blue-500 cursor-pointer">
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
                       <h2 className="text-xl font-bold mb-4 ">Términos de Servicio de Sürü</h2>
                        <p className="mb-2"><strong>1. Aceptación de los Términos</strong><br/>
                        Al acceder o utilizar Sürü, acepta estos Términos de Servicio. Si no está de acuerdo, no debe utilizar la Plataforma.</p>
                        
                        <p className="mb-2"><strong>2. Servicios Proporcionados</strong><br/>
                        Sürü permite a los usuarios:<br/>
                        - Publicar propiedades para venta o alquiler.<br/>
                        - Buscar propiedades disponibles para alquiler, venta o terrenos en Costa Rica.</p>
                        
                        <p className="mb-2"><strong>3. Registro de Usuarios</strong><br/>
                        Los usuarios deben crear una cuenta para acceder a ciertas funciones, proporcionando información precisa. Sürü se reserva el derecho de suspender cuentas que violen estos términos o incumplan leyes aplicables.</p>
                        
                        <p className="mb-2"><strong>4. Publicación de Propiedades</strong><br/>
                        Los usuarios que publiquen propiedades deben contar con los permisos necesarios y ser responsables de la exactitud de la información proporcionada. Sürü no se responsabiliza de la veracidad de las publicaciones.</p>
                        
                        <p className="mb-2"><strong>5. Responsabilidades de los Usuarios</strong><br/>
                        Los usuarios deben usar la Plataforma de manera legal y ética, evitando la publicación de contenido falso o fraudulento y la participación en actividades ilícitas.</p>
                        
                        <p className="mb-2"><strong>6. Pagos y Comisiones</strong><br/>
                        Algunos servicios pueden estar sujetos a comisiones, claramente indicadas al momento de la transacción.</p>
                        
                        <p className="mb-2"><strong>7. Limitación de Responsabilidad</strong><br/>
                        Sürü actúa como intermediario y no se responsabiliza de las transacciones entre usuarios, la veracidad de las publicaciones ni acuerdos fuera de la Plataforma.</p>
                        
                        <p className="mb-2"><strong>8. Propiedad Intelectual</strong><br/>
                        El contenido de Sürü, incluyendo su marca, es propiedad exclusiva de la empresa y no puede ser usado sin permiso.</p>
                        
                        <p className="mb-2"><strong>9. Modificaciones a los Términos</strong><br/>
                        Sürü se reserva el derecho de modificar estos Términos de Servicio en cualquier momento.</p>
                        
                        <p className="mb-2"><strong>10. Ley Aplicable y Jurisdicción</strong><br/>
                        Estos Términos se rigen por las leyes de Costa Rica. Cualquier disputa se resolverá en sus tribunales.</p>
                    </div>
                ) : (
                    <div>
                         <h2 className="text-xl font-bold mb-4">Política de Privacidad de Sürü</h2>
                        <p className="mb-2"><strong>1. Información Recopilada</strong><br/>
                        Recopilamos información proporcionada directamente por el usuario al registrarse o publicar propiedades, como nombre, correo electrónico, y detalles de las propiedades.</p>
                        
                        <p className="mb-2"><strong>2. Uso de la Información</strong><br/>
                        La información se utiliza para:<br/>
                        - Facilitar la interacción entre usuarios.<br/>
                        - Mejorar la experiencia en la Plataforma.<br/>
                        - Enviar notificaciones y actualizaciones sobre servicios.</p>
                        
                        <p className="mb-2"><strong>3. Compartir Información con Terceros</strong><br/>
                        Sürü no comparte información personal con terceros sin consentimiento del usuario, excepto cuando sea requerido por ley.</p>
                        
                        <p className="mb-2"><strong>4. Protección de Datos</strong><br/>
                        Implementamos medidas de seguridad para proteger la información del usuario. Sin embargo, no garantizamos una seguridad absoluta contra accesos no autorizados.</p>
                        
                        <p className="mb-2"><strong>5. Cookies y Tecnologías de Seguimiento</strong><br/>
                        Usamos cookies para mejorar la experiencia del usuario. El usuario puede controlar el uso de cookies a través de la configuración de su navegador.</p>
                        
                        <p className="mb-2"><strong>6. Derechos del Usuario</strong><br/>
                        Los usuarios tienen derecho a acceder, corregir o eliminar su información personal. Pueden contactarnos para ejercer estos derechos.</p>
                        
                        <p className="mb-2"><strong>7. Cambios en la Política de Privacidad</strong><br/>
                        Sürü se reserva el derecho de modificar esta Política de Privacidad. Los cambios se notificarán a través de la Plataforma.</p>
                        
                        <p className="mb-2"><strong>8. Contacto</strong><br/>
                        Para cualquier duda o solicitud sobre la privacidad, puede contactarnos a través de nuestro servicio de atención al cliente.</p>
                        
                        <p className="mb-2"><strong>9. Ley Aplicable</strong><br/>
                        Esta Política de Privacidad se rige por las leyes de Costa Rica.</p>
                    </div>
                )}
            </LayoutModal>
        </form>
    );
}

export default RegisterForm;
