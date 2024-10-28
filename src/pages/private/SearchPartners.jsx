import { SecondaryFilterTag } from './../../components/ui/buttons/SecondaryFilterTag';
import { MainFilterTag } from '../../components/ui/buttons/MainFilterTag';
import { MapPin } from 'lucide-react';
import { MainButton } from '../../components/ui/buttons/MainButton';

export function SearchPartners() {
    return (
        <section className="max-w-7xl m-auto p-4 ">
            <div className='flex gap-4 p-4 border border-light-grey rounded-md'>
                <SecondaryFilterTag text={'filter'} />
                <SecondaryFilterTag text={'filter'} />
                <SecondaryFilterTag text={'filter'} />
                {/* <MainFilterTag text={'filter'}/> */}
            </div>
            <div className="mt-5 gap-4 grid grid-cols-[repeat(auto-fit,_minmax(700px,_1fr))]">
                <div className="flex flex-wrap p-4 gap-4 min-h-40 border border-light-grey rounded-md">
                    <div className="w-40">
                        <img
                            src="https://unavatar.io/github/Microsoft"
                            alt=""
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-4 flex-grow">
                        <div className='grid gap-2'>
                            <h2>Microsoft</h2>
                            <p className='flex flex-wrap'>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Culpa quas iste dolor,
                                excepturi blanditiis magnam numquam dolore
                            </p>
                            <p className="flex">
                                <span>
                                    <MapPin />
                                </span>
                                Puntarenas, Costa Rica
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-4 py-1 bg-light-grey rounded-lg">
                                Service1
                            </span>
                            <span className="px-4 py-1 bg-light-grey rounded-lg">
                                Service2
                            </span>
                            <span className="px-4 py-1 bg-light-grey rounded-lg">
                                Service3
                            </span>
                        </div>
                        <div className="w-full flex flex-grow justify-end items-end">
                            <MainButton text={'Ver'} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap p-4 gap-4 min-h-40 border border-light-grey rounded-md">
                    <div className="w-40">
                        <img
                            src="https://unavatar.io/github/Microsoft"
                            alt=""
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-4 flex-grow">
                        <div className='grid gap-2'>
                            <h2>Microsoft</h2>
                            <p className='flex flex-wrap'>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Culpa quas iste dolor,
                                excepturi blanditiis magnam numquam dolore
                            </p>
                            <p className="flex">
                                <span>
                                    <MapPin />
                                </span>
                                Puntarenas, Costa Rica
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-4 py-1 bg-light-grey rounded-lg">
                                Service1
                            </span>
                            <span className="px-4 py-1 bg-light-grey rounded-lg">
                                Service2
                            </span>
                            <span className="px-4 py-1 bg-light-grey rounded-lg">
                                Service3
                            </span>
                        </div>
                        <div className="w-full flex flex-grow justify-end items-end">
                            <MainButton text={'Ver'} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
