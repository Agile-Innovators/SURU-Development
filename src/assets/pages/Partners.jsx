import { MainButton } from "../../components/ui/MainButton";
import { BasicCard } from "../../components/ui/BasicCard";
import { ROUTE_PATHS } from "../../routes";

export function Partners() {
    return (
        <section className="flex flex-col max-w-7xl m-auto mt-5 p-4 sm:p-0">
                <div className="flex flex-row items-center">
                    <MainButton
                        text="back"
                        to={ROUTE_PATHS.HOME}
                        type="link"
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
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="m15 19-7-7 7-7"
                                />
                            </svg>
                        }
                    />
                    <p className="ml-3 text-secondary font-medium text-lg">
                        Go back
                    </p>
                </div>

                <div>
                    <h2 className="mt-12 text-secondary">
                        Martha Jiménez Orleans
                    </h2>
                    <p className="mt-2 text-primary ">
                        ¡Bienvenida al módulo de servicios complementarios!
                    </p>
                </div>

                <div className="grid justify-center mt-16 gap-4">
                    <h3 className="text-center text-secondary">
                        Servicios adicionales disponibles
                    </h3>
                    <div className="text-center">
                        <p className="m-0 text-primary">
                            Esta sección está diseñada para facilitar servicios
                            que puedan ser requeridos durante el proceso de
                            traslado. Podrás encontrar empresas relacionadas con
                            la limpieza, control de plagas, transporte,
                            jardinería, entre muchas otras más. 10 servicios
                            disponibles
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-4 mt-12 justify-items-center">
                    <BasicCard
                        src=""
                        title="Limpieza"
                        variant="border"
                        text="10 servicios disponibles"
                    />
                    <BasicCard
                        src="/public/gardening.png"
                        title="jardinería"
                        variant="border"
                        text="10 servicios disponibles"
                    />
                    <BasicCard
                        src="/public/technology.png"
                        title="Seguridad"
                        variant="border"
                        text="10 servicios disponibles"
                    />
                    <BasicCard
                        src="/public/truck.png"
                        title="Mudanza"
                        variant="border"
                        text="10 servicios disponibles"
                    />
                    <BasicCard
                        src="/public/delivery.png"
                        title="Transporte"
                        variant="border"
                        text="10 servicios disponibles"
                    />
                    <BasicCard
                        src="/public/cockroach.png"
                        title="Plagas"
                        variant="border"
                        text="10 servicios disponibles"
                    />
                </div>
        </section>
    );
}
