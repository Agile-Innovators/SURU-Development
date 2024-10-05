import { MainButton } from "../../ui/buttons/MainButton";
import { Input } from "../../ui/forms/Input";

export function GeneralInformation() {
    return (
        <div className="bg-white p-8">
            <h2>General Information</h2>
            <p>Change your profile information</p>
            <div className="mt-8 w-full">
                <h4 className="text-base">Profile picture</h4>
                <div className="flex gap-4 items-center mt-4 flex-col sm:flex-row">
                    <img
                        src="https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg"
                        alt="profile avatar"
                        className="rounded-full aspect-square h-24"
                    />
                    <MainButton
                        type="button"
                        variant="fill"
                        text="Upload New"
                        customClass="h-fit"
                    />
                    <MainButton
                        type="button"
                        variant="border"
                        text="Delete"
                        customClass="h-fit bg-gray-300 border-gray-300 text-gray-600 hover:bg-red-500 hover:text-white hover:border-red-500"
                    />
                </div>
            </div>
            <div className="mt-10">
                <h4 className="text-base">Personal Information</h4>
                <form className="grid grid-cols-1 gap-8 mt-4 sm:grid-cols-2">
                    <Input
                        inputName="name"
                        inputId="name-input"
                        labelText="Name"
                    />
                    <Input
                        inputName="username"
                        inputId="username-input"
                        labelText="Username"
                    />
                    <Input
                        inputName="firstLastname"
                        inputId="firstLastname-input"
                        labelText="First Lastname"
                    />
                    <Input
                        inputName="secondLastname"
                        inputId="secondLastname-input"
                        labelText="Second Lastname"
                    />
                    <Input
                        inputName="email"
                        inputId="email-input"
                        labelText="Email Address"
                        type="email"
                    />
                    <Input
                        inputName="phoneNumber"
                        inputId="phoneNumber-input"
                        labelText="Phone Number"
                        type="number"
                    />
                    <div className="flex flex-col gap-4 sm:flex-row">
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
        </div>
    );
}
