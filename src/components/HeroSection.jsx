import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarCheck,
  FaPlay,
  FaStar,
  FaUsers,
  FaBuilding,
} from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#030608] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#00d18f26,transparent_32%),radial-gradient(circle_at_85%_25%,#0ea5e926,transparent_30%),linear-gradient(135deg,#03120d_0%,#030608_45%,#061827_100%)]" />

      <div className="absolute left-10 top-28 h-40 w-40 rounded-full border border-[#00d18f]/20 blur-sm" />
      <div className="absolute right-16 bottom-20 h-56 w-56 rounded-full border border-[#0ea5e9]/20 blur-sm" />

      <div className="relative flex min-h-screen w-full items-center justify-center px-5 py-24 sm:px-8 lg:px-14">
        <div className="w-full text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2a3238] bg-[#071014]/80 px-5 py-2 text-sm font-semibold text-[#a7b0b8]">
            <FaStar className="text-[#00d18f]" />
            Premium Sports Facility Booking Platform
          </div>

          <h1 className="mx-auto max-w-6xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Book Your Perfect{" "}
            <span className="bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] bg-clip-text text-transparent">
              Sports Venue
            </span>{" "}
            Today
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#a7b0b8] sm:text-lg">
            Discover and reserve premium sports facilities near you. From
            football turfs to tennis courts, find the perfect space for your
            next game or training session.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/facilities"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-8 py-4 font-extrabold text-[#020609] shadow-[0_0_35px_rgba(0,209,143,0.25)] transition hover:-translate-y-1 hover:shadow-[0_0_45px_rgba(14,165,233,0.35)]"
            >
              Explore Facilities
              <FaArrowRight />
            </Link>

            <Link
              href="/facilities"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#2a3238] bg-[#071014]/80 px-8 py-4 font-bold text-white transition hover:border-[#00d18f] hover:text-[#00d18f]"
            >
              <FaPlay className="text-sm" />
              Book Now
            </Link>
          </div>

          <div className="mt-14 grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#1a2229] bg-[#071014]/75 p-5">
              <FaBuilding className="mx-auto mb-3 text-2xl text-[#00d18f]" />
              <h3 className="text-3xl font-black text-[#00d18f]">500+</h3>
              <p className="mt-1 text-sm text-[#a7b0b8]">Facilities</p>
            </div>

            <div className="rounded-2xl border border-[#1a2229] bg-[#071014]/75 p-5">
              <FaCalendarCheck className="mx-auto mb-3 text-2xl text-[#00d18f]" />
              <h3 className="text-3xl font-black text-[#00d18f]">10K+</h3>
              <p className="mt-1 text-sm text-[#a7b0b8]">Bookings</p>
            </div>

            <div className="rounded-2xl border border-[#1a2229] bg-[#071014]/75 p-5">
              <FaUsers className="mx-auto mb-3 text-2xl text-[#00d18f]" />
              <h3 className="text-3xl font-black text-[#00d18f]">98%</h3>
              <p className="mt-1 text-sm text-[#a7b0b8]">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;