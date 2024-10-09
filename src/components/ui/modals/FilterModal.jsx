import { Input } from '../forms/Input';

export function FilterModal() {
    return (
        <div className="flex w-screen min-h-screen justify-center  z-50 left-0 top-0 bg-black/70  p-4 fixed">
            <div className="bg-white p-4 rounded-xl overflow-hidden relative h-fit sm:p-8 sm:min-w-96">
                <div className="w-full flex justify-between items-center border-b-2">
                    <h3>Filters</h3>
                    <p>
                        <strong>X</strong>
                    </p>
                </div>
                <div className=''>
                    <div className="grid sm:grid-cols-2 sm:gap-8">
                        <Input labelText={'minPrice'} customClass=''/>
                        <Input labelText={'maxPrice'} />
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}
