import { useContext, useEffect, useState } from "react";
import { AdvancedCard } from "../../components/ui/AdvancedCard";
import { SearchFilter } from "../../components/ui/SearchFilters";
import { globalProvider } from "../../global/GlobalProvider";
import { useFetchFilter } from "../../components/hooks/useFetchFilter";
import { MainButton } from "../../components/ui/MainButton";
import { stepperClasses } from "@mui/joy";

export function Search() {
    //llamar una funcion global que vacie los estados, propuesta
    const { regionId, minPrice, maxPrice, propertyTypeId, isFilterUsed } =
        useContext(globalProvider);
    const { data, isLoading } = useFetchFilter();

    //testing
    const [properties, setProperties] = useState(data);

    const setFilterProperties = (data) => {
        setProperties(data);
    }

    useEffect(()=>{
        setProperties(data)
    }, [isLoading])

    function showFilteredProperties(properties) {
        if (!properties || properties.length === 0) {
            return <h2>Not found</h2>;
        }

        return properties.map((item) => (
            <AdvancedCard
                key={item.id}
                srcImage={`http://localhost:1337${item.images[0].url}`}
                title={item.title}
                location={`${item.city_id.name}, ${item.city_id.region.name}`}
                price={item.sale_price}
                frequency={"monthly"}
                qtyBedrooms={item.bedrooms} 
                qtyBathrooms={item.bathrooms} 
                qtyGarages={item.garages}
            >
                <MainButton text={'Rent'} type={'button'} customClass="px-10 m-0 sm:m-auto"/>
            </AdvancedCard>
        ));
    }

    console.log(regionId, minPrice, maxPrice, propertyTypeId, isFilterUsed);
    return (
        <section className="max-w-7xl m-auto mt-5 p-4 xl:p-0">
            <h2>Search properties</h2>
            <SearchFilter setData={setFilterProperties}/>

            <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-4 mt-5 mb-5">
                {isLoading ? <p>Cargando</p> : showFilteredProperties(properties)}
            </div>
        </section>
    );
}