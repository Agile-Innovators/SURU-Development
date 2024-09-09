import { AvailableServices } from "../../components/activity/AvailableServices.jsx";
import { CTAForm } from "../../components/ui/CTAForm.jsx";
import { BackButton } from "../../components/ui/BackButton.jsx";

export function Partners() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex-col px-12 xl:px-36 my-16 hover:text-white">
        <BackButton />
        <section>
          <h2 className="mt-12 text-secondary">Martha Jiménez Orleans</h2>
          <p className="mt-2 text-primary ">
            Welcome to the complementary services module!
          </p>
        </section>

        <AvailableServices />
        <CTAForm
            title="Do you want to be part of the facilitating companies?"
            description="First, you must register on the platform and submit a request to Suru. We&apos;ll explain how!"
            description2="Fill in your company&apos;s details using the following link. Complete the online form, and Suru will contact you soon."
            text="Go to the form"
            type="link"
            to="/"
        />

      </main>
    </div>
  );
}

export default Partners;
