import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { RedirectButton } from "../components/RedirectButton";
import { BasicCard } from "../components/BasicCard";
import {
  Fence,
  Cctv,
  Truck,
  MapPinHouse,
  Rat,
  Paintbrush,
  ChevronLeft,
} from "lucide-react";

export default function Partners() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavBar />
      </header>

      <main className="flex-grow flex-col px-12  xl:px-36 my-16 hover:text-white">
        <div className="flex flex-row items-center">
          <RedirectButton
            text=""
            href="/"
            variant="border"
            customClass="w-[41px] h-[41px]"
            icon={<ChevronLeft />}
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
          <h3 className="mt-36 text-center text-secondary">
            Servicios adicionales disponibles
          </h3>
          <div className="container md:max-w-[500px] 2xl:max-w-[1032px] h-22 text-center mt-16">
            <p className="m-0 text-primary">
              Esta sección está diseñada para facilitar servicios que puedan ser
              requeridos durante el proceso de traslado. Podrás encontrar
              empresas relacionadas con la limpieza, control de plagas,
              transporte, jardinería, entre muchas otras más. ¡Atrévete a probar
              esta plataforma y ahorra tiempo!{" "}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8 mt-28 sm:mx-16 xl:mx-32 2xl:mx-64 items-center justify-items-center">
          <BasicCard
            icon={<Fence className="w-24 h-24 text-primary stroke-1" />}
            title="Jardinería"
            variant="border"
            text="10 servicios disponibles"
          />
          <BasicCard
            icon={<Cctv className="w-24 h-24 text-primary stroke-1" />}
            title="Seguridad"
            variant="border"
            text="10 servicios disponibles"
          />
          <BasicCard
            icon={<Truck className="w-24 h-24 text-primary stroke-1" />}
            title="Mudanza"
            variant="border"
            text="10 servicios disponibles"
          />
          <BasicCard
            icon={<MapPinHouse className="w-24 h-24 text-primary stroke-1" />}
            title="Transporte"
            variant="border"
            text="10 servicios disponibles"
          />
          <BasicCard
            icon={<Rat className="w-24 h-24 text-primary stroke-1" />}
            title="Plagas"
            variant="border"
            text="10 servicios disponibles"
          />
          <BasicCard
            icon={<Paintbrush className="w-24 h-24 text-primary stroke-1" />}
            title="Limpieza"
            variant="border"
            text="10 servicios disponibles"
          />
        </div>

        <div className="mt-56 border-gray border-2 rounded-lg p-6 w-2/5">
          <h5 className="font-medium">
            ¿Quieres formar parte de las empresas facilitadoras?
          </h5>
          <p className="container mt-3 ">
            Primero debes registrarte en la plataforma y enviar una solicitud a
            Suru, ¡te explicamos cómo!
          </p>
          <p className="container mt-8 ">
            Llena los datos de tu empresa mediante el siguiente enlace. Llena el
            formulario online y Suru te contactará muy pronto.
          </p>
          <RedirectButton
            text="Ir al formulario"
            href="/formulario"
            variant="fill"
            customClass="w-8/12 mt-12 p-4"
          />
        </div>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
