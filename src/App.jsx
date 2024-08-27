import { NavBar } from "./assets/components/NavBar";
import { PrimaryButton } from "./assets/components/PrimaryButton";
import {Footer} from "./assets/components/Footer";
import { SecondaryButton } from "./assets/components/SecondaryButton";
import { Input } from "./assets/components/Input";
import { BasicCard } from "./assets/components/BasicCard";

function App() {
    return (
        <div>
            <NavBar />
            <div className="flex gap-2">
                <PrimaryButton text={"Click"} />
                <SecondaryButton text={"Click2"} />
                <form>
                    <Input inputName={'Email'} inputId={"input-email"} type="email" labelText="Email" required={true}/>
                    <Input inputName={'Password'} inputId={"input-password"} type="password" labelText="Password" required={true}  />
                    <PrimaryButton text={"Click"} type="submit"/>
                </form>

                <BasicCard/>

                <BasicCard>
                    <PrimaryButton text={"Click"} />
                </BasicCard>

            </div>
            <Footer />
        </div>
    );
}

export default App;
