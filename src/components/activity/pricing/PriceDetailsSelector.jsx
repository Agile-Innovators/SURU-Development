import { Input } from '../../ui/forms/Input';
import SectionDivider from '../../ui/layout/SectionDivider';
import { useEffect, useState } from 'react';

export function PriceDetailsSelector({ transactionType, fillData }) {
    const [currency, setCurrency] = useState('1');
    const [paymentFrequency, setPaymentFrequency] = useState('');

    //cargar currency al renderizarse el componente
    useEffect(() => {
        let currencyValueSelect =
            document.getElementById('currencySelect').value;
        fillData('currency_id', currencyValueSelect);
    }, []);

    //actualizar todos los valores de los selects de currency
    const updateCurrencyForAllSelectors = (newCurrency) => {
        const container = document.getElementById('priceDetailsContainer');
        const currencySelects = container.querySelectorAll(
            'select.currencySelect'
        );
        currencySelects.forEach((select) => {
            select.value = newCurrency;
        });
    };

    //manejar los cambios en los select de currency
    const handleCurrencyChange = (e) => {
        const newCurrency = e.target.value;
        setCurrency(newCurrency);
        fillData('currency_id', newCurrency);
        updateCurrencyForAllSelectors(newCurrency);
    };

    const handlePaymentFrequency = (e) => {
        setPaymentFrequency(e.target.value);
        fillData('payment_frequency_id', e.target.value);
    };

    const createSaleSection = () => {
        return (
            <div className="flex items-end gap-2 w-full">
                <Input
                    inputName={'salePriceInput'}
                    inputId={'salePriceInput'}
                    labelText={'Sale Price'}
                    customClass={'h-12 w-full'}
                    required={true}
                    type={'number'}
                    onChange={(e) => fillData('price', e.target.value)}
                />
                <select
                    id="currencySelect"
                    name={`currencySelect`}
                    defaultValue={currency}
                    onChange={handleCurrencyChange}
                    className="currencySelect w-fit h-12 mb-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                >
                    <option value="1">USD</option>
                    <option value="2">CRC</option>
                </select>
            </div>
        );
    };

    const createRentSection = () => {
        return (
            <>
                <div className="flex items-end gap-2 w-full">
                    <Input
                        inputName={'rentPriceInput'}
                        inputId={'rentPriceInput'}
                        labelText={'Rent Price'}
                        customClass={'h-12 w-full'}
                        required={true}
                        type={'number'}
                        onChange={(e) => fillData('rent_price', e.target.value)}
                    />
                    <select
                        id="currencySelect"
                        name={`currencySelect`}
                        defaultValue={currency}
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
                        onChange={(e) =>
                            fillData('deposit_price', e.target.value)
                        }
                    />
                    <select
                        id="currencySelect"
                        name={`currencySelect`}
                        defaultValue={currency}
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
                        name={`select_frequency`}
                        value={paymentFrequency}
                        onChange={handlePaymentFrequency}
                        className="w-full  p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
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
    };

    const renderPriceSection = () => {
        return (
            <div id="priceDetailsContainer">
                <SectionDivider text={'Payment Information'} />
                {(transactionType === 1 || transactionType === 3) &&
                    createSaleSection()}
                {(transactionType === 2 || transactionType === 3) &&
                    createRentSection()}
            </div>
        );
    };

    return renderPriceSection();
}
