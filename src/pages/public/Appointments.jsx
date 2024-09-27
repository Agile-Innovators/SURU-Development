import { MainButton } from "../../components/ui/buttons/MainButton";


export function Appointments() {
    return (
        <div className="max-w-7xl m-auto p-4">
        
        <div className="flex flex-row mt-10 justify-between">
            <h1>Appointments</h1>
            <MainButton text="Add Request Manually" type="link" variant="fill" customClass="bg-red-500"/>
        </div>

        
        <div className="flex flex-row gap-5 mt-7 text-xl font-primary font-semibold">
            <button>Active</button>
            <button>Upcoming</button>
        </div>



        <div className="overflow-x-auto mt-10">
            <table className="min-w-full bg-white border-collapse mb-10">
                <thead>
                    <tr className="bg-secondary text-white font-light font border-4">
                        <th className="py-2 px-4 text-center">Name</th>
                        <th className="py-2 px-4 text-center">Date</th>
                        <th className="py-2 px-4 text-center">Hour</th>
                        <th className="py-2 px-4 text-center">Location</th>
                        <th className="py-2 px-4 text-center">Confirmation</th>
                    </tr>
                </thead>
                <tbody>

                    <tr className="border-t text-xl font-primary font-semibold border-4">
                        <td className="py-5 px-4 text-center">Carlos Vásquez N. </td>
                        <td className="py-5 px-4 text-center">20/09/2024</td>
                        <td className="py-5 px-4 text-center">9:00 am</td>
                        <td className="py-5 px-4 text-center">Marañonal</td>
                        <td className="py-5 px-4 text-center">
                            <div className="flex justify-center space-x-2">
                                <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">✔</button>
                                <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">X</button>
                            </div>
                        </td>
                    </tr>

                    <tr className="border-t text-xl font-primary font-semibold border-4">
                        <td className="py-5 px-4 text-center">Carlos Vásquez N. </td>
                        <td className="py-5 px-4 text-center">20/09/2024</td>
                        <td className="py-5 px-4 text-center">9:00 am</td>
                        <td className="py-5 px-4 text-center">Marañonal</td>
                        <td className="py-5 px-4 text-center">
                            <div className="flex justify-center space-x-2">
                                <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">✔</button>
                                <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">X</button>
                            </div>
                        </td>
                    </tr>

                    <tr className="border-t text-xl font-primary font-semibold border-4">
                        <td className="py-5 px-4 text-center">Carlos Vásquez N. </td>
                        <td className="py-5 px-4 text-center">20/09/2024</td>
                        <td className="py-5 px-4 text-center">9:00 am</td>
                        <td className="py-5 px-4 text-center">Marañonal</td>
                        <td className="py-5 px-4 text-center">
                            <div className="flex justify-center space-x-2">
                                <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">✔</button>
                                <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">X</button>
                            </div>
                        </td>
                    </tr>

                    <tr className="border-t text-xl font-primary font-semibold border-4">
                        <td className="py-5 px-4 text-center">Carlos Vásquez N. </td>
                        <td className="py-5 px-4 text-center">20/09/2024</td>
                        <td className="py-5 px-4 text-center">9:00 am</td>
                        <td className="py-5 px-4 text-center">Marañonal</td>
                        <td className="py-5 px-4 text-center">
                            <div className="flex justify-center space-x-2">
                                <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">✔</button>
                                <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">X</button>
                            </div>
                        </td>
                    </tr>

                    <tr className="border-t text-xl font-primary font-semibold border-4">
                        <td className="py-5 px-4 text-center">Carlos Vásquez N. </td>
                        <td className="py-5 px-4 text-center">20/09/2024</td>
                        <td className="py-5 px-4 text-center">9:00 am</td>
                        <td className="py-5 px-4 text-center">Marañonal</td>
                        <td className="py-5 px-4 text-center">
                            <div className="flex justify-center space-x-2">
                                <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">✔</button>
                                <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">X</button>
                            </div>
                        </td>
                    </tr>

                    
                    
                    

           








                </tbody>
            </table>
        </div>
    </div>
    );
}

export default Appointments;
