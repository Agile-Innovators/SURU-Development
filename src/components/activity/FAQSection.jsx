import { ArrowDown } from 'lucide-react';
import { useState } from "react";
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';


const Businesses = [
    { question: "¿Cómo puedo registrarme?", answer: "Puedes registrarte haciendo clic en el botón de registro en la esquina superior derecha." },
    { question: "¿Cómo puedo restablecer mi contraseña?", answer: "Puedes restablecer tu contraseña haciendo clic en 'Olvidé mi contraseña' en la página de inicio de sesión." },
    { question: "¿Dónde puedo encontrar más información?", answer: "Puedes encontrar más información en nuestra sección de ayuda o contactándonos directamente." }
];

const BuyersRenters = [
    { question: "¿Cómo puedo cambiar mi dirección de correo?", answer: "Puedes cambiar tu dirección de correo en la configuración de tu cuenta." },
    { question: "¿Cómo puedo eliminar mi cuenta?", answer: "Puedes eliminar tu cuenta en la configuración de tu cuenta." },
    { question: "¿Cómo puedo contactar con soporte?", answer: "Puedes contactar con soporte a través de nuestro formulario de contacto." }
];

const SellersLandlords = [
    { question: "¿Cómo puedo actualizar mi perfil?", answer: "Puedes actualizar tu perfil en la configuración de tu cuenta." },
    { question: "¿Cómo puedo cambiar mi contraseña?", answer: "Puedes cambiar tu contraseña en la configuración de tu cuenta." },
    { question: "¿Cómo puedo desactivar las notificaciones?", answer: "Puedes desactivar las notificaciones en la configuración de tu cuenta." }
];

const faqData = [Businesses, BuyersRenters, SellersLandlords];

export function FAQSection() {
    // Estado para controlar la opción seleccionada
    const [selectedOption, setSelectedOption] = useState(1);
    // Función para renderizar acordeones
    const renderAccordions = (data) => {
        return data.map((faq, index) => (
            <Accordion key={index}>
                <AccordionSummary expandIcon={<ArrowDown />}>
                    <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{faq.answer}</Typography>
                </AccordionDetails>
            </Accordion>
        ));
    };
    return (
        <div className="py-20 bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h3 className="text-base font-semibold leading-7 text-indigo-600">Complementary Services</h3>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">How does it work</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Quis tellus eget adipiscing convallis sit sit eget aliquet quis. Suspendisse eget egestas a elementum pulvinar et feugiat blandit at. In mi viverra elit nunc.</p>
                </div>
                {/* Botones para cambiar la opción seleccionada */}
                <div className="flex w-fit grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] m-auto justify-center my-4 rounded-lg sm:rounded-lg overflow-hidden">
                    <button onClick={() => setSelectedOption(1)} className="px-4 py-2  bg-indigo-600 text-white ">Businesses</button>
                    <button onClick={() => setSelectedOption(2)} className="px-4 py-2 bg-indigo-600 text-white ">Buyers/Renters</button>
                    <button onClick={() => setSelectedOption(3)} className="px-4 py-2 bg-indigo-600 text-white ">Sellers/Landlords</button>
                </div>

                {/* Acordeones condicionados por el estado */}
                <div className="faq-section">
                    {/* Botones para seleccionar la opción */}
                    {/* Renderizar acordeones según la opción seleccionada */}
                    {renderAccordions(faqData[selectedOption - 1])}
                </div>
            </div>
        </div>
    );
}
