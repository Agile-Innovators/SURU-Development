import { ArrowDown } from 'lucide-react';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Businesses = [
    {
        question: 'How can I join as a partner?',
        answer: "First, you must register on the platform and submit a request to SÜRÜ. We'll explain how! Fill in your company's details using the following link. Complete the online form, and SÜRÜ will contact you soon.",
    },
    {
        question:
            'What types of companies can be part of the complementary services?',
        answer: 'Companies that can join the complementary services include: Moving Services, Cleaning Services, Property Maintenance, Legal and Consulting Services, Interior Design & Remodeling, Security Services, Insurance Services, Real Estate Agents, and Storage Services.',
    },
    {
        question: 'Where can I find more information?',
        answer: 'You can find more information in our help section or by contacting us directly.',
    },
];

const BuyersRenters = [
    {
        question: 'Can I request a complementary service?',
        answer: 'Yes, all SURU users can request complementary services.',
    },
];

const SellersLandlords = [
    {
        question: 'Can I request a complementary service?',
        answer: 'Yes, all SURU users can request complementary services.',
    },
    {
        question:
            'Where can I find information to request a complementary service?',
        answer: "You can find information on requesting complementary services in the 'Services' section of your account.",
    },
    {
        question: 'Where can I find more information?',
        answer: 'You can find more information in our help section or by contacting us directly.',
    },
];

const faqData = [Businesses, BuyersRenters, SellersLandlords];

export function FAQSection() {
    // Estado para controlar la opción seleccionada
    const [selectedOption, setSelectedOption] = useState(1);
    // Función para renderizar acordeones
    const renderAccordions = (data) => {
        return data.map((faq, index) => (
            <Accordion key={index} className="dark:bg-gray-700">
                <AccordionSummary expandIcon={<ArrowDown />}>
                    <Typography className="dark:text-white/85">
                        {faq.question}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className="dark:text-white/60">
                        {faq.answer}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ));
    };
    return (
        <div className="py-10 md:py-20 bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h3 className="text-base font-semibold leading-7 text-light-blue dark:text-light-blue">
                        Complementary Services
                    </h3>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl dark:text-white ">
                        Frequenly Asked Question
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
                        At SURU, we offer a variety of services to cover all
                        your real estate needs. From moving assistance to legal
                        advice, our trusted partners are ready to help. Below,
                        you&apos;ll find answers to common questions about our
                        complementary services. Feel free to reach out with any
                        additional questions!
                    </p>
                </div>
                {/* Botones para cambiar la opción seleccionada */}
                <div className="flex flex-wrap w-fit grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] m-auto justify-center my-4 rounded-lg sm:rounded-lg overflow-hidden">
                    <button
                        onClick={() => setSelectedOption(1)}
                        className={
                            selectedOption === 1
                                ? 'bg-light-blue dark:bg-cyan-800 text-white px-4 py-2'
                                : 'px-4 py-2 bg-cyan-200/55 dark:bg-cyan-200/25 text-secondary/70 dark:text-white/80'
                        }
                    >
                        Businesses
                    </button>
                    <button
                        onClick={() => setSelectedOption(2)}
                        className={
                            selectedOption === 2
                                ? 'bg-light-blue dark:bg-cyan-800 text-white px-4 py-2'
                                : 'px-4 py-2 bg-cyan-200/55 dark:bg-cyan-200/25 text-secondary/70 dark:text-white/80'
                        }
                    >
                        Buyers/Renters
                    </button>
                    <button
                        onClick={() => setSelectedOption(3)}
                        className={
                            selectedOption === 3
                                ? 'bg-light-blue dark:bg-cyan-800 text-white px-4 py-2'
                                : 'px-4 py-2 bg-cyan-200/55 dark:bg-cyan-200/25 text-secondary/70 dark:text-white/80'
                        }
                    >
                        Sellers/Landlords
                    </button>
                </div>

                {/* Acordeones condicionados por el estado */}
                <div className="faq-section ">
                    {/* Renderizar acordeones según la opción seleccionada */}
                    {renderAccordions(faqData[selectedOption - 1])}
                </div>
            </div>
        </div>
    );
}
