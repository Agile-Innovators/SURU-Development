import { Input } from "../../ui/forms/Input.jsx";
import { MainButton } from "../../ui/buttons/MainButton.jsx";
import { ROUTE_PATHS } from "../../../routes/index.js";

export function EmailCodeForm(){
    return (
        <form className="m-auto text-center">
            <h1>Enter Code</h1>
            <span className="text-grey">Enter the code received by your gmail account</span>

            <Input type="text" name="code" id="code" placeholder="Enter Code"/>
            <MainButton text="Verify" type='link' to={ROUTE_PATHS.RESET_PASSWORD} variant="fill" customClass="w-full mt-3"/>
        </form>
    );
}
export default EmailCodeForm;