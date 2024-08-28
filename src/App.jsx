import { NavBar } from "./assets/components/NavBar";
import { Input } from "./assets/components/Input";
import { BasicCard } from "./assets/components/BasicCard";
import { AdvancedCard } from './assets/components/Advancedcard';
import { ActionButton } from "./assets/components/ActionButton";
import { RedirectButton } from "./assets/components/RedirectButton";



function App() {
    return (
        <section className="max-w-screen-lg m-auto">
            <NavBar />
            <div className="flex gap-2">
                <form>
                    <Input
                        inputName={"Email"}
                        inputId={"input-email"}
                        type="email"
                        labelText="Email"
                        required={true}
                    />
                    <Input
                        inputName={"Password"}
                        inputId={"input-password"}
                        type="password"
                        labelText="Password"
                        required={true}
                    />
                    <ActionButton text={"Click"} type={"submit"} variant="border"/>
                </form>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] mt-20 gap-4">
                {/* <BasicCard /> */}

                <BasicCard>
                    <RedirectButton text={'Click'} variant="border" href="/test"/>
                </BasicCard>

                <AdvancedCard srcImage={"../public/images/house-image.png"}>
                    
                </AdvancedCard>
                <AdvancedCard srcImage={"../public/images/house-image.png"}>
                    
                </AdvancedCard>
                <Input
                        inputName={"btn"}
                        inputId={"btn"}
                        labelText="Password"
                        placeholder="password"
                        type={"password"}
                    />
                
            </div>
            <RedirectButton text={'Click'} variant="fill" href="/test"/>
        </section>
    );
}

export default App;
