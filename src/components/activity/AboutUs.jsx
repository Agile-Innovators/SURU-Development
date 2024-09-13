
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import React, { useState } from 'react';
export function AboutUs() {
  const [startCounting, setStartCounting] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true, // Ejecuta la función solo una vez cuando el elemento entra en vista
    threshold: 0.1,    // Configura el umbral de visibilidad (10%)
  });

  React.useEffect(() => {
    if (inView) {
      setStartCounting(true);
    }
  }, [inView]);
  return (
    <div className="mt-20 flex flex-col lg:flex-row gap-6">
      <img className="w-[28rem] mx-auto" src="/about-us-img.svg" alt="Icon" />
      <section className="flex flex-col justify-center gap-5">
        <h2>About us</h2>
        <p>Transform the way you find your ideal home! With our rental and real estate app, access exclusive options and a hassle-free process. Start today and discover the place you’ve always dreamed of!</p>

        <div className="grid grid-cols-auto-100 gap-4">
          <div>
            <span
              ref={ref}
              className="font-semibold"
            >
              {startCounting && <CountUp start={0} end={120} duration={2.5} prefix="+" />}
            </span>
            <p>Active users</p>
          </div>
          <div>
            <span
              ref={ref}
              className="font-semibold"
            >
              {startCounting && <CountUp start={0} end={50} duration={2.5} prefix="+" />}
            </span>
            <p>Availables properties</p>
          </div>
          <div>
            <h4
              ref={ref}
              className="font-semibold text-md"
            >
              {startCounting && <CountUp start={0} end={60} duration={2.5} prefix="+" />}
            </h4>
            <p>Partner Companies</p>
          </div>
        </div>

      </section>
    </div>
  );
}
export default AboutUs;
