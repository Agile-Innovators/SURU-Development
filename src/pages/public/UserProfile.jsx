import { GeneralInformation } from "../../components/activity/user_profile/GeneralInformation";
import { UserPreference } from "../../components/activity/user_profile/UserPreference";
import { UserOperationalHours } from "../../components/activity/user_profile/UserOperationalHours";
import { Input } from "../../components/ui/forms/Input";
import { MainButton } from "../../components/ui/buttons/MainButton";
import { useState } from "react";


export function UserProfile() {
    const [password, setPassword] = useState('');

    return (
        <div className="bg-light-grey py-8">
            <section className="max-w-7xl m-auto">
                <GeneralInformation />
                <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2">
                    <UserPreference />
                    <UserOperationalHours />
                </div>
                <div className="bg-white p-6 mt-5">
                    <h2>General Information</h2>
                    <p>
                        You want to change your pass word?{" "}
                        <a href="#" className="text-black">
                            Request a code here
                        </a>
                    </p>
                    <form className="grid gap-4 mt-5 sm:flex sm:flex-row sm:items-end">
                        <Input
                            inputName="oldPassword"
                            inputId="oldPassword-input"
                            labelText="Old password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                        <Input
                            inputName="newPassword"
                            inputId="newPassword-input"
                            labelText="New password"
                            required={true}
                        />
                        <Input
                            inputName="confirmPassword"
                            inputId="confirmPassword-input"
                            labelText="Confirm password"
                            required={true}
                        />
                        <Input
                            inputName="verifyCode"
                            inputId="verifyCode-input"
                            labelText="Verify Code"
                            required={true}
                        />
                        <div className="grid items-end gap-4 sm:flex">
                            <MainButton
                                type="button"
                                variant="fill"
                                text="Save changes"
                                customClass="h-12 items-center"
                            />
                            <MainButton
                                type="button"
                                variant="border"
                                text="Cancel"
                                customClass="h-12 items-center"
                            />
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
