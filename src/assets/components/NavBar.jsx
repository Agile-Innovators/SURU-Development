export function NavBar(){
    return(
        <nav className="flex justify-between px-10 py-5 border-b-2 bg-white sticky top-0">
            <img src="../../../public/Logo.svg" alt="suru logo" className="w-20"/>
            <ul className="flex gap-4">
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Test</a></li>
                <li><a href="#">Test</a></li>
                <li><a href="#">Test</a></li>
                <li><a href="#">Test</a></li>
                <li><a href="#">Test</a></li>
            </ul>
        </nav>
    )
}