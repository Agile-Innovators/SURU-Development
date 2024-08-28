import { NavBar } from "./assets/components/NavBar";
import { Footer } from "./assets/components/Footer";
import { Input } from "./assets/components/Input";
import { BasicCard } from "./assets/components/BasicCard";
import { AdvancedCard } from './assets/components/Advancedcard';
import { ActionButton } from "./assets/components/ActionButton";
import { RedirectButton } from "./assets/components/RedirectButton";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Homepage } from './assets/pages/homepage';


function App() {
    return (
        <div>
    
        <BrowserRouter basename="/app">
            <NavBar />
            <Routes>
                <Route path="/" element={<Homepage/>}/>
            </Routes>
            <Footer />
        </BrowserRouter>
        </div>

    );
}

export default App;
