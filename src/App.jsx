import { NavBar } from "./assets/components/NavBar";
import { PrimaryButton } from "./assets/components/PrimaryButton";
import { SecondaryButton } from "./assets/components/SecondaryButton";
import { Input } from "./assets/components/Input";
import { BasicCard } from "./assets/components/BasicCard";
import { AdvancedCard } from './assets/components/Advancedcard';



function App() {
    return (
        <section className="max-w-screen-lg m-auto">
            <NavBar />
            <div className="flex gap-2">
                <PrimaryButton text={"Click"} />
                <SecondaryButton text={"Click2"} />
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
                    <PrimaryButton text={"Click"} type="submit" />
                </form>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] mt-20 gap-4">
                {/* <BasicCard /> */}

                <BasicCard>
                    <PrimaryButton text={"Click"} />
                </BasicCard>

                <AdvancedCard srcImage={"../public/images/house-image.png"}>
                    <PrimaryButton text={"Click"} />
                </AdvancedCard>
                <AdvancedCard srcImage={"../public/images/house-image.png"}>
                    <PrimaryButton text={"Click"} />
                </AdvancedCard>
            </div>
        </section>
    );
}

export default App;
