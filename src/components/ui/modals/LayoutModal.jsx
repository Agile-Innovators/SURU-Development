export function LayoutModal( {children} ){
    return(
        <div className="flex w-screen min-h-screen justify-center  z-50 left-0 top-0 bg-black/70  p-4 fixed">
            {children}
        </div>
    )
}