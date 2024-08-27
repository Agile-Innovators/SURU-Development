import { NavBar } from "./assets/components/NavBar";
import { PrimaryButton } from "./assets/components/PrimaryButton";

function App() {
    return (
        <section className="max-w-screen-lg m-auto">
            <NavBar />
            <PrimaryButton  text={"Click"}/>
        </section>
    );
}

export default App;
