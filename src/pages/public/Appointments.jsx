import { MainButton } from './../../components/ui/buttons/MainButton';
import { Table } from '../../components/ui/tables/Table';
import { Check, X } from 'lucide-react';


export function Appointments() {
    const columns = ['Name', 'Date', 'Hour', 'Location'];
  
    const data = [
      { name: 'Carlos Vásquez N.', date: '20/09/2024', hour: '9:00 am', location: 'Marañonal' },
      { name: 'Ana Pérez', date: '22/09/2024', hour: '10:00 am', location: 'Centro' },
      
    ];
  
    const actions = [
      () => (
        <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">
          <Check size={22} />
        </button>
      ),
      () => (
        <button className="bg-white border border-black rounded px-2 py-1 hover:bg-light-blue">
          <X size={22} />
        </button>
      )
    ];
  
    return (
      <div className="max-w-7xl m-auto p-4">
        <div className="flex flex-row mt-10 justify-between">
          <h1>Appointments</h1>
          <MainButton text="Add Request Manually" type="link" customClass="items-center flex" />
        </div>
  
        <div className="flex flex-row gap-5 mt-7 text-xl font-primary font-semibold">
          <button>Active</button>
          <button>Upcoming</button>
        </div>
  
        <Table columns={columns} data={data} actions={actions} />
      </div>
    );
  }
  
  export default Appointments;