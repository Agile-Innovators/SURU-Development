import { NavBar } from "./assets/components/NavBar";
import { Footer } from "./assets/components/Footer";
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
