import { MainButton } from '../buttons/MainButton';
import { X } from 'lucide-react';

export function ContactModal({ handleModal, email, phone }) {
    const handleOpenModal = () => {
        handleModal((prev) => !prev);
    };

    return (
        <div className="bg-white p-8 border rounded-md gap-6 grid w-full sm:w-auto sm:min-w-[30rem] md:min-w-[40rem]">
            <div className="w-full flex justify-between items-center border-b-2">
                <h3>Contact Info</h3>
                <button onClick={handleOpenModal} type="button" >
                    <X className="hover:text-blue-500" />
                </button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 items-center justify-between">
                <p><strong>Email:</strong> {email}</p>
                <MainButton type={'external'} text={'contact'} href={`mailto:${email}`} customClass='w-fit justify-self-end'/>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-4 items-center justify-between">
                <p><strong>Phone:</strong> {phone}</p>
                <MainButton type={'external'} text={'contact'} href={`tel:${phone}`} customClass='w-fit justify-self-end'/>
            </div>
        </div>
    );
}
