import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { RedirectButton } from "../components/RedirectButton";
import {BasicCard} from "../components/BasicCard"
import { Fence } from 'lucide-react';

export default function Partners() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>

      <main className="flex-grow flex-col mx-36 my-16 hover:text-white">
  <div className="flex flex-row items-center">
    <RedirectButton
      text=""
      href="/"
      variant="border"
      customClass="w-[41px] h-[41px]"
      icon={
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="m15 19-7-7 7-7"
          />
        </svg>
      }
    />
    <p className="ml-3 text-secondary font-medium text-lg">Go back</p>
  </div>

  <div>
    <h2 className="mt-12 text-secondary">Martha Jiménez Orleans</h2>
    <p className="mt-2 text-primary ">
      ¡Bienvenida al módulo de servicios complementarios!
    </p>
  </div>

  <div className="flex flex-col items-center justify-center">
    <h3 className="mt-36 text-center text-secondary">Servicios adicionales disponibles</h3>
    <div className="container md:max-w-[500px] 2xl:max-w-[1032px] h-22 text-center mt-16">
      <p className="m-0 text-primary">
        Esta sección está diseñada para facilitar servicios que puedan ser requeridos durante el proceso de traslado. Podrás encontrar empresas relacionadas con la limpieza, control de plagas, transporte, jardinería, entre muchas otras más. 10 servicios disponibles
      </p>
    </div>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-12 items-center justify-items-center">
    <BasicCard src='' title="Limpieza" variant="border" text="10 servicios disponibles"/>
    <BasicCard src="/public/gardening.png" title="jardinería" variant="border" text="10 servicios disponibles"/>
    <BasicCard src="/public/technology.png" title="Seguridad" variant="border" text="10 servicios disponibles"/>
    <BasicCard src="/public/truck.png" title="Mudanza" variant="border" text="10 servicios disponibles"/>
    <BasicCard src="/public/delivery.png" title="Transporte" variant="border" text="10 servicios disponibles"/>
    <BasicCard src="/public/cockroach.png" title="Plagas" variant="border" text="10 servicios disponibles"/>
  </div>
</main>




      <footer className="mt-auto ">
        <Footer />
      </footer>
    </div>
  );
}
