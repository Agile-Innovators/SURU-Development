import { Input } from '../forms/Input';
import { MainButton } from '../buttons/MainButton';
import { SecondaryFilterTag } from './../buttons/SecondaryFilterTag';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useFetchPropertyCategories } from '../../hooks/useFetchPropertyCategories';
import { useFetchLocations } from './../../hooks/useFetchLocations';

export function FilterModal({ handleModal }) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [bedrooms, setBedrooms] = useState(0);
    const [bathrooms, setBathrooms] = useState(0);
    const [floors, setFloors] = useState(0);
    const [pools, setPools] = useState(0);
    const [garages, setGarages] = useState(0);
    const [size, setSize] = useState(0);
    const [ Utilities, setUtilities ] = useState([]);

    const handleOpenModal = () => {
        handleModal((prev) => !prev);
    };

    const handleFilter = async (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={(e) => handleFilter(e)} className="max-h-[90vh] overflow-hidden overflow-y-auto bg-white p-4 mt-6 rounded-xl overflow-hidden relative h-fit sm:p-8 sm:min-w-[40rem] md:min-w-[50rem]">
            <div className="w-full flex justify-between items-center border-b-2">
                <h3>Filters</h3>
                <button onClick={handleOpenModal}>
                    <X className='hover:text-blue-500'/>
                </button>
            </div>
            <div className="mt-4">
                <div>
                    <h4>Price range</h4>
                    <div className="grid mt-4 sm:grid-cols-2 sm:gap-8">
                        <Input
                            labelText={'minPrice'}
                            inputName={'minPriceInput'}
                            inputId={'min-price-input'}
                            type={'number'}
                            min={0}
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <Input
                            labelText={'maxPrice'}
                            inputName={'maxPriceInput'}
                            inputId={'max-price-input'}
                            type={'number'}
                            min={0}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <h4>Property details</h4>
                    <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] mt-4 mb-4 gap-4 sm:gap-8">
                        <div className='grid'>
                            <label htmlFor="">Property Category</label>
                            <select name="propertyCategory" id="" className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300'>
                                <option value="1">Side</option>
                            </select>
                        </div>
                        <div className='grid'>
                            <label htmlFor="">Property Transaction</label>
                            <select name="propertyTransactionType" id="" className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300'>
                                <option value="1">Side</option>
                            </select>
                        </div>
                        <div className='grid'>
                            <label htmlFor="">Region</label>
                            <select name="propertyTransactionType" id="" className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300'>
                                <option value="1">Side</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>Structure</h4>
                    <div className="grid gap-4 grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] mt-4 sm:gap-6">
                        <Input
                            labelText={'Bedrooms'}
                            type={'number'}
                            min={0}
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                        />
                        <Input
                            labelText={'Bathrooms'}
                            type={'number'}
                            min={0}
                            value={bathrooms}
                            onChange={(e) => setBathrooms(e.target.value)}
                        />
                        <Input
                            labelText={'Floors'}
                            type={'number'}
                            min={0}
                            value={floors}
                            onChange={(e) => setFloors(e.target.value)}
                        />
                        <Input
                            labelText={'Pools'}
                            type={'number'}
                            min={0}
                            value={pools}
                            onChange={(e) => setPools(e.target.value)}
                        />
                        <Input
                            labelText={'Garages'}
                            type={'number'}
                            min={0}
                            value={garages}
                            onChange={(e) => setGarages(e.target.value)}
                        />
                        <Input
                            labelText={'Size in m2'}
                            type={'number'}
                            min={0}
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <h4>Included Utilities</h4>
                    <div className="flex flex-wrap gap-4 mt-4">
                        <SecondaryFilterTag text={'Allows Pets'} />
                        <SecondaryFilterTag text={'Green Area'} />
                        <SecondaryFilterTag text={'Wifi'} idValue={4}/>
                        <SecondaryFilterTag text={'Furnished'} idValue={3}/>
                    </div>
                </div>
                <div className="w-full flex justify-end mt-4">
                    <MainButton text="search" type={'submit'}/>
                </div>
            </div>
        </form>
    );
}
