import { NavBar } from "./assets/components/NavBar";
import { Footer } from "./assets/components/Footer";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Homepage } from './assets/pages/homepage';
import Partners from "./assets/pages/Partners";


function App() {
    return (
        <div>
            <Partners/>
        {/* <BrowserRouter basename="/app">
            <NavBar />
            <Routes>
                <Route path="/" element={<Homepage/>}/>
            </Routes>
            <Footer />
        </BrowserRouter> */}
        </div>

    );
}

export default App;
