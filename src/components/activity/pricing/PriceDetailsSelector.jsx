import { Input } from '../../ui/forms/Input';
import SectionDivider from '../../ui/layout/SectionDivider';
import { useEffect, useState } from 'react';

export function PriceDetailsSelector({ transactionType, fillData, initialData }) {
    const [currency, setCurrency] = useState(initialData?.currency_id || '1'); // Default currency from initialData
    const [paymentFrequency, setPaymentFrequency] = useState(initialData?.payment_frequency_id || '');

    // Set currency and payment frequency based on initialData only once when component mounts
    useEffect(() => {
        fillData('currency_id', initialData?.currency_id || '1'); // Set currency_id from initialData or default to "1"
        fillData('payment_frequency_id', initialData?.payment_frequency_id || '');
    }, []); // Empty dependency array ensures this only runs once on mount

    // Handle changes in the currency select
    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setCurrency(newCurrency);
        fillData('currency_id', newCurrency);
    };

    const handlePaymentFrequency = (e) => {
        const frequencyValue = e.target.value;
        setPaymentFrequency(frequencyValue);
        fillData('payment_frequency_id', frequencyValue);
    };

    const createSaleSection = () => (
        <div className="flex items-end gap-2 w-full">
            <Input
                inputName={'salePriceInput'}
                inputId={'salePriceInput'}
                labelText={'Sale Price'}
                customClass={'h-12 w-full'}
                required={true}
                type={'number'}
                defaultValue={initialData?.price || ''}
                onChange={(e) => fillData('price', e.target.value)}
                min={0}
            />
            <select
                id="currencySelect"
                name="currencySelect"
                value={currency}
                onChange={handleCurrencyChange}
                className="currencySelect w-fit h-12 mb-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            >
                <option value="1">USD</option>
                <option value="2">CRC</option>
            </select>
        </div>
    );

    const createRentSection = () => (
        <>
            <div className="flex items-end gap-2 w-full">
                <Input
                    inputName={'rentPriceInput'}
                    inputId={'rentPriceInput'}
                    labelText={'Rent Price'}
                    customClass={'h-12 w-full'}
                    required={true}
                    type={'number'}
                    defaultValue={initialData?.rent_price || ''}
                    onChange={(e) => fillData('rent_price', e.target.value)}
                    min={0}
                />
                <select
                    id="currencySelect"
                    name="currencySelect"
                    value={currency}
                    onChange={handleCurrencyChange}
                    className="currencySelect w-fit h-12 mb-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    <option value="1">USD</option>
                    <option value="2">CRC</option>
                </select>
            </div>
            <div className="flex items-end gap-2 w-full">
                <Input
                    inputName={'depositPrice'}
                    inputId={'depositPrice'}
                    labelText={'Deposit'}
                    required={true}
                    type={'number'}
                    defaultValue={initialData?.deposit_price || ''}
                    onChange={(e) => fillData('deposit_price', e.target.value)}
                    min={0}
                />
                <select
                    id="currencySelect"
                    name="currencySelect"
                    value={currency}
                    onChange={handleCurrencyChange}
                    className="currencySelect w-fit h-12 mb-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    <option value="1">USD</option>
                    <option value="2">CRC</option>
                </select>
            </div>
            <div className="grid gap-1">
                <label htmlFor="select_frequency">Frequency</label>
                <select
                    id="select_frequency"
                    name="select_frequency"
                    value={paymentFrequency}
                    onChange={handlePaymentFrequency}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                    required
                >
                    <option value="" disabled>
                        Select a payment frequency
                    </option>
                    <option value="1">Monthly</option>
                    <option value="2">Biweekly</option>
                    <option value="3">Weekly</option>
                </select>
            </div>
        </>
    );

    const renderPriceSection = () => (
        <div id="priceDetailsContainer">
            <SectionDivider text={'Payment Information'} />
            {(transactionType === 1 || transactionType === 3) && createSaleSection()}
            {(transactionType === 2 || transactionType === 3) && createRentSection()}
        </div>
    );

    return renderPriceSection();
}
