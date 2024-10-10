import { useState, useEffect } from "react"

export function LayoutModal( {children, customClass='', status} ){
    const [ isOpen, setIsOpen ] = useState(status);

    useEffect(() =>{
        setIsOpen(status);
    },[status]);

    return(
        <div className={`${isOpen ?  'flex' : 'hidden'} w-screen min-h-screen justify-center  z-50 left-0 top-0 bg-black/70  p-4 fixed ${customClass}`}>
            {children}
        </div>
    )
}