import React, { useState } from 'react';
import SectionDivider from "../../ui/SectionDivider";
import BaseFormsInfo from "../../ui/BaseFormsInfo";
import { InputForms } from "../../ui/InputForms";
import { MainButton } from "../../ui/MainButton";
import PriceDetails from '../../ui/PriceDetails';

const CreatePropertyForm = () => {
    const [tipoPropiedad, setTipoPropiedad] = useState(null);
    const [accion, setAccion] = useState(null);
    const [services, setServices] = useState({
        water: false,
        electricity: false,
        water_service: false,
        electricity_service: false,
        wifi: false,
        cable: false,
    });

     // Verificar si hay algún servicio seleccionado en "Available services"
     const hasSelectedService = Object.values(services).includes(true);

    // Función para manejar el cambio en el estado de los servicios
    const toggleService = (service) => {
        setServices(prevState => ({
            ...prevState,
            [service]: !prevState[service],
        }));
    };

    // Función para renderizar el formulario según el tipo de propiedad y acción
    const renderFormulario = () => {
        if (!tipoPropiedad || !accion) return null;

        const formulariosPorTipo = {
            house: (
                <form>
                    <SectionDivider text="House details" />
                    <BaseFormsInfo />
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <InputForms inputName="bedrooms" inputId="bedrooms" type="number" labelText="Bedrooms" />
                        <InputForms inputName="bathrooms" inputId="bathrooms" type="number" labelText="Bathrooms" />
                        <InputForms inputName="Floor" inputId="Floor" type="number" labelText="Floor" />
                        <InputForms inputName="Pools" inputId="Pools" type="boolean" labelText="Pools" />
                        <InputForms inputName="Pets" inputId="Pets" type="boolean" labelText="Pets" />
                        <InputForms inputName="Backyard" inputId="Backyard" type="boolean" labelText="Backyard" />
                        <InputForms inputName="Garage" inputId="Garage" type="boolean" labelText="Garage" />
                        <InputForms inputName="Size" inputId="Size" type="number" labelText="Size" placeholder='Property size in square meters' />
                    </div>
                    {accion === 'sale' && (
                        <div>
                        <PriceDetails type="Sale"/>
                        </div>
                    )}
                    {accion === 'rent' && (
                        <div>
                            <SectionDivider text="Include services" />
                            <div className="flex space-x-2">
                                {['water', 'electricity', 'wifi', 'cable'].map(service => (
                                    <MainButton
                                        key={service}
                                        onClick={() => toggleService(service)}
                                        type="boolean"
                                        variant='border'
                                        isChecked={services[service]}
                                        customClass="capitalize"
                                        text={service.charAt(0).toUpperCase() + service.slice(1)}
                                    />
                                ))}
                            </div>
                            <PriceDetails type="Rent"/>            
                        </div>
                    )}
                    {accion === 'both' && (
                        <div>
                              <SectionDivider text="Include services" />
                            <div className="flex space-x-2">
                                {['water', 'electricity', 'wifi', 'cable'].map(service => (
                                    <MainButton
                                        key={service}
                                        onClick={() => toggleService(service)}
                                        type="boolean"
                                        variant='border'
                                        isChecked={services[service]}
                                        customClass="capitalize"
                                        text={service.charAt(0).toUpperCase() + service.slice(1)}
                                    />
                                ))}
                            </div>
                           <PriceDetails type="Both"/>
                        </div>
                    )}
                </form>
            ),
            department: (
                <form>
                    <SectionDivider text="Department details" />
                    <BaseFormsInfo />
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <InputForms inputName="bedrooms" inputId="bedrooms" type="number" labelText="Bedrooms" />
                        <InputForms inputName="bathrooms" inputId="bathrooms" type="number" labelText="Bathrooms" />
                        <InputForms inputName="Floor" inputId="Floor" type="number" labelText="Floor" />
                        <InputForms inputName="Pools" inputId="Pools" type="boolean" labelText="Pools" />
                        <InputForms inputName="Pets" inputId="Pets" type="boolean" labelText="Pets" />
                        <InputForms inputName="Backyard" inputId="Backyard" type="boolean" labelText="Backyard" />
                        <InputForms inputName="Garage" inputId="Garage" type="boolean" labelText="Garage" />
                        <InputForms inputName="Size" inputId="Size" type="number" labelText="Size" placeholder='Property size in square meters' />
                    </div>
                    {accion === 'sale' && (
                        <div>
                        <PriceDetails type="Sale"/>
                        </div>
                    )}
                    {accion === 'rent' && (
                        <div>
                            <SectionDivider text="Include services" />
                            <div className="flex space-x-2">
                                {['water', 'electricity', 'wifi', 'cable'].map(service => (
                                    <MainButton
                                        key={service}
                                        onClick={() => toggleService(service)}
                                        type="boolean"
                                        variant='border'
                                        isChecked={services[service]}
                                        customClass="capitalize"
                                        text={service.charAt(0).toUpperCase() + service.slice(1)}
                                    />
                                ))}
                            </div>
                            <PriceDetails type="Rent"/>            
                        </div>
                    )}
                    {accion === 'both' && (
                        <div>
                              <SectionDivider text="Include services" />
                            <div className="flex space-x-2">
                                {['water', 'electricity', 'wifi', 'cable'].map(service => (
                                    <MainButton
                                        key={service}
                                        onClick={() => toggleService(service)}
                                        type="boolean"
                                        variant='border'
                                        isChecked={services[service]}
                                        customClass="capitalize"
                                        text={service.charAt(0).toUpperCase() + service.slice(1)}
                                    />
                                ))}
                            </div>
                           <PriceDetails type="Both"/>
                        </div>
                    )}
                </form>
            ),
            studio: (
                <form>
                <SectionDivider text="Studio details" />
                <BaseFormsInfo />
                <div className="grid grid-cols-2 gap-4 my-4">
                    <InputForms inputName="bedrooms" inputId="bedrooms" type="number" labelText="Bedrooms" />
                    <InputForms inputName="bathrooms" inputId="bathrooms" type="number" labelText="Bathrooms" />
                    <InputForms inputName="Floor" inputId="Floor" type="number" labelText="Floor" />
                    <InputForms inputName="Pools" inputId="Pools" type="boolean" labelText="Pools" />
                    <InputForms inputName="Pets" inputId="Pets" type="boolean" labelText="Pets" />
                    <InputForms inputName="Backyard" inputId="Backyard" type="boolean" labelText="Backyard" />
                    <InputForms inputName="Garage" inputId="Garage" type="boolean" labelText="Garage" />
                    <InputForms inputName="Size" inputId="Size" type="number" labelText="Size" placeholder='Property size in square meters' />
                </div>
                {accion === 'sale' && (
                    <div>
                    <PriceDetails type="Sale"/>
                    </div>
                )}
                {accion === 'rent' && (
                    <div>
                        <SectionDivider text="Include services" />
                        <div className="flex space-x-2">
                            {['water', 'electricity', 'wifi', 'cable'].map(service => (
                                <MainButton
                                    key={service}
                                    onClick={() => toggleService(service)}
                                    type="boolean"
                                    variant='border'
                                    isChecked={services[service]}
                                    customClass="capitalize"
                                    text={service.charAt(0).toUpperCase() + service.slice(1)}
                                />
                            ))}
                        </div>
                        <PriceDetails type="Rent"/>            
                    </div>
                )}
                {accion === 'both' && (
                    <div>
                          <SectionDivider text="Include services" />
                        <div className="flex space-x-2">
                            {['water', 'electricity', 'wifi', 'cable'].map(service => (
                                <MainButton
                                    key={service}
                                    onClick={() => toggleService(service)}
                                    type="boolean"
                                    variant='border'
                                    isChecked={services[service]}
                                    customClass="capitalize"
                                    text={service.charAt(0).toUpperCase() + service.slice(1)}
                                />
                            ))}
                        </div>
                       <PriceDetails type="Both"/>
                    </div>
                )}
            </form>
            ),
            'bare-land': (
    <form>
        <SectionDivider text="Bare Land details" />
        <BaseFormsInfo />
        <div className="grid grid-cols-2 gap-4 my-4">
            <InputForms inputName="Size" inputId="Size" type="number" labelText="Size" placeholder='Property size in square meters'/>
        </div>
        <div>
            <SectionDivider text="Available services" />
            <div className="flex space-x-2">
                {['water service', 'electricity service'].map(service => (
                    <MainButton
                        key={service}
                        onClick={() => toggleService(service)}
                        type="boolean"
                        variant='border'
                        isChecked={services[service]}
                        customClass="capitalize"
                        text={service.charAt(0).toUpperCase() + service.slice(1)}
                    />
                ))}
            </div>
        </div>
        {(accion === 'rent' || accion === 'both') && hasSelectedService && (
            <div>
                <SectionDivider text="Are any of this services include?" />
                <div className="flex space-x-2">
                    {Object.keys(services).filter(service => {
                        if (services['water service'] && services['electricity service']) {
                    
                            return ['water', 'electricity', 'wifi', 'cable'].includes(service);
                        }
                        if (services['water service']) {
                
                            return service === 'water';
                        }
                        if (services['electricity service']) {

                            return ['electricity', 'wifi', 'cable'].includes(service);
                        }
                        return false;
                    }).map(service => (
                        <MainButton
                            key={service}
                            type="boolean"
                            onClick={() => toggleService(service)}
                            variant='border'
                            isChecked={services[service]}
                            customClass="capitalize"
                            text={service.charAt(0).toUpperCase() + service.slice(1)}
                        />
                    ))}
                </div>
            </div>
        )}
        
        {accion === 'sale' && (
            <div>
                <PriceDetails type="Sale"/>
            </div>
        )}
        {accion === 'rent' && (
            <div>
                <PriceDetails type="Rent"/>
            </div>
        )}
        {accion === 'both' && (
            <div>
                <PriceDetails type="Both"/>
            </div>
        )}
    </form>
),

            'retail-space': (
                <form>
                    <SectionDivider text="Retail Space details" />
                    <BaseFormsInfo />
                    <div className="grid grid-cols-2 gap-4 my-4">
                        <InputForms inputName="bathrooms" inputId="bathrooms" type="number" labelText="Bathrooms" />
                        <InputForms inputName="Size" inputId="Size" type="number" labelText="Size" placeholder='Property size in square meters' />
                    </div>
                    {accion === 'sale' && (
                    <div>
                    <PriceDetails type="Sale"/>
                    </div>
                    )}
                    {accion === 'rent' && (
                        <div>
                            <SectionDivider text="Include services" />
                            <div className="flex space-x-2">
                                {['water', 'electricity', 'wifi', 'cable'].map(service => (
                                    <MainButton
                                        key={service}
                                        onClick={() => toggleService(service)}
                                        type="boolean"
                                        variant='border'
                                        isChecked={services[service]}
                                        customClass="capitalize"
                                        text={service.charAt(0).toUpperCase() + service.slice(1)}
                                    />
                                ))}
                            </div>
                            <PriceDetails type="Rent"/>            
                        </div>
                    )}
                    {accion === 'both' && (
                        <div>
                              <SectionDivider text="Include services" />
                            <div className="flex space-x-2">
                                {['water', 'electricity', 'wifi', 'cable'].map(service => (
                                    <MainButton
                                        key={service}
                                        onClick={() => toggleService(service)}
                                        type="boolean"
                                        variant='border'
                                        isChecked={services[service]}
                                        customClass="capitalize"
                                        text={service.charAt(0).toUpperCase() + service.slice(1)}
                                    />
                                ))}
                            </div>
                           <PriceDetails type="Both"/>
                        </div>
                    )}
                </form>
            ),
        };
        return formulariosPorTipo[tipoPropiedad] || null;
    };

    return (
        <div className="max-w-7xl m-auto">
            <h1 className="mt-10">Let's add a property</h1>
            <div className="container mx-auto">
                <SectionDivider text="Property type" />
                <div className="mb-4 flex space-x-2">
                    {['house', 'department', 'bare-land', 'retail-space', 'studio'].map(tipo => (
                        <MainButton
                            key={tipo}
                            onClick={() => setTipoPropiedad(tipo)}
                            type="button"
                            variant={tipoPropiedad === tipo ? "fill" : "border"}
                            customClass="capitalize"
                            text={tipo.replace('-', ' ').toUpperCase()}
                        />
                    ))}
                </div>
                <SectionDivider text="What will you do with this property?" />
                <div className="mb-4 flex space-x-2">
                    {['sale', 'rent', 'both'].map(acc => (
                        <MainButton
                            key={acc}
                            onClick={() => setAccion(acc)}
                            type="button"
                            variant={accion === acc ? "fill" : "border"}
                            customClass="capitalize"
                            text={acc.charAt(0).toUpperCase() + acc.slice(1)}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="mb-10">
                        {renderFormulario()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePropertyForm;



