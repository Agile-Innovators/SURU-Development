import { MainButton } from '../../components/ui/buttons/MainButton';
import { ServiceCard } from '../../components/ui/cards/ServiceCard';
import { MapPin } from 'lucide-react';

export function PartnerProfile() {
    return (
        <section className="max-w-7xl m-auto p-4">
            <header className="relative mb-12 mt-10">
                <div className="bg-gray-300 h-40 rounded-md overflow-hidden aspect-video sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full">
                    <img
                        src="https://via.placeholder.com/1200x400"
                        className="w-full h-full object-cover"
                        alt="Banner"
                    />
                </div>
                <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-28 sm:left-10 sm:translate-x-0 sm:w-32 md:w-36 lg:w-40 rounded-full overflow-hidden border-4 border-white">
                    <img
                        src="https://unavatar.io/github/kevGuido22"
                        alt="Foto de perfil"
                        className="w-full h-full object-cover"
                    />
                </div>
            </header>
            <div className="grid gap-8 mb-10">
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))]">
                    <div className="flex flex-col items-center sm:items-start">
                        <h2>Suru Partner</h2>
                        <p>Puntarenas, Costa Rica</p>
                        <p>kevinguidou@gamil.com</p>
                    </div>
                    <div className="flex flex-col justify-end items-center mt-4 sm:items-end">
                        <MainButton text={'Contactar'} customClass="h-fit" />
                    </div>
                </div>
                <div className="grid gap-4">
                    <h2>Services</h2>
                    <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-4">
                        <ServiceCard title={'Catgeory 1'} description={'dsdsdsd'}/>
                        <ServiceCard title={'Catgeory 2'} description={'dsdsdsd'}/>
                        <ServiceCard title={'Catgeory 3'} description={'dsdsdsd'}/>
                        <ServiceCard title={'Catgeory 4'} description={'dsdsdsd'}/>
                        <ServiceCard title={'Catgeory 5'} description={'dsdsdsd'}/>
                    </div>
                </div>
                <div className="grid gap-4">
                    <h2>Description</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Et dolorum ut voluptas harum rem quidem doloribus dicta
                        saepe blanditiis dolores minus ducimus illum placeat
                        aliquam sunt, error architecto in officia. Lorem ipsum
                        dolor sit amet consectetur adipisicing elit. Et dolorum
                        ut voluptas harum rem quidem doloribus dicta saepe
                        blanditiis dolores minus ducimus illum placeat aliquam
                        sunt, error architecto in officia.
                    </p>
                </div>
            </div>
        </section>
    );
}
