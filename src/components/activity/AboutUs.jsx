export function AboutUs() {
  return (
    <div className="mt-20 flex flex-col lg:flex-row gap-6">
      <img className="w-[28rem] mx-auto" src="/public/about-us-img.svg" alt="Icon" />
      <section className="flex flex-col justify-center gap-5">
        <h2>About us</h2>
        <p>Transform the way you find your ideal home! With our rental and real estate app, access exclusive options and a hassle-free process. Start today and discover the place you’ve always dreamed of!</p>

        <div className="grid grid-cols-auto-100 gap-4">
          <div>
            <span className="font-semibold">+120</span>
            <p>Active users</p>
          </div>
          <div>
            <span className="font-semibold">+50</span>
            <p>Availables properties</p>
          </div>
          <div>
            <span className="font-semibold">+15</span>
            <p>Partner Companies</p>
          </div>
        </div>

      </section>
    </div>
  );
}
export default AboutUs;
