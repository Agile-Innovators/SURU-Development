import { BasicCard } from '../../components/ui/BasicCard';
import { ActionButton } from '../../components/ui/ActionButton';


export function Homepage() {
  return (
    <div>
      {/* <div className="flex mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
        <h1>Find Your Dream Property</h1>
        <img
          className="w-1/2" 
          src="/public/images/Group 104.png" 
          alt="Landing Page Image" />
      </div> */}
      {/* ----------------------------------------- */}
      <div className="flex flex-col items-center justify-center text-center mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
        <h2>Managing Properties Has Never Been This Simple</h2>
        <p>Access a platform that takes the complexity out of managing real estate</p>
        <div className="flex flex-col gap-4 m-4 sm:flex-row">
          <BasicCard
            customClass='border border-light-grey rounded-md p-4 m-4'
            src="/public/SellPropertyIcon.svg"
            title="Buy a property"
            text="Explore properties that match your lifestyle perfectly."
            children={<ActionButton text="Explore Properties 🡥" variant="border" customClass="w-2/3 h-1/2 px-0 mx-4" />}
          />
          <BasicCard
            customClass='border border-light-grey rounded-md p-4 m-4'
            src="/public/SellPropertyIcon.svg"
            title="Sell a property"
            text="Showcase your property to the right audience today."
            children={<ActionButton text="Publish a Property 🡥" variant="border" customClass="w-2/3 h-1/2 px-0 mx-4" />}
          />
          <BasicCard
            customClass='border border-light-grey rounded-md p-4 m-4'
            src="/public/SellPropertyIcon.svg"
            title="Rent a property"
            text="Connect with potential tenants or discover your next ..."
            children={<ActionButton text="Find Options 🡥" variant="border" customClass="w-2/3 h-1/2 px-0 mx-4" />}
          />
        </div>
        {/* -------------------------------------------------------------- */}
      </div>
      {/* <div className='flex flex-col  mx-auto max-w-6xl px-2 sm:px-6 lg:px-8'>
        <h3>Explore differents properties types</h3>
        <p>Access a platform that takes the complexity out of managing real estate.</p>
        
      </div> */}
    </div>




  );
}