import {
  FaShieldAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCreditCard,
  FaUserCheck,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    title: "Secure Booking",
    description:
      "Book sports facilities with a safe and reliable system. Your booking data stays protected.",
    icon: FaShieldAlt,
  },
  {
    title: "Instant Confirmation",
    description:
      "Check available slots and confirm your booking quickly without unnecessary delays.",
    icon: FaClock,
  },
  {
    title: "Nearby Facilities",
    description:
      "Find football turfs, badminton courts, pools, and tennis courts around your preferred location.",
    icon: FaMapMarkerAlt,
  },
  {
    title: "Easy Payment Tracking",
    description:
      "View booking price, total hours, and booking status clearly before confirming your reservation.",
    icon: FaCreditCard,
  },
  {
    title: "Owner Management",
    description:
      "Facility owners can add, update, and manage their own sports venues from one simple dashboard.",
    icon: FaUserCheck,
  },
  {
    title: "Smooth Support",
    description:
      "A clean booking experience helps users manage reservations and cancellations with confidence.",
    icon: FaHeadset,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#030608] px-5 py-24 text-white sm:px-8 lg:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#00d18f14,transparent_30%),radial-gradient(circle_at_85%_20%,#0ea5e914,transparent_28%)]" />

      <div className="relative w-full">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-[#2a3238] bg-[#071014] px-5 py-2 text-sm font-semibold text-[#00d18f]">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            The{" "}
            <span className="bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] bg-clip-text text-transparent">
              SportNest
            </span>{" "}
            Advantage
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#a7b0b8]">
            SportNest makes sports facility booking faster, cleaner, and easier
            for players, teams, and facility owners.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-[#1a2229] bg-[#071014] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#00d18f] hover:shadow-[0_18px_50px_rgba(0,209,143,0.12)]"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#2a3238] bg-[#101820] text-[#00d18f] transition group-hover:border-[#00d18f] group-hover:bg-[#00d18f] group-hover:text-[#020609]">
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-extrabold text-white">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-[#a7b0b8]">
                  {item.description}
                </p>

                <div className="mt-7 h-1 w-12 rounded-full bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] transition group-hover:w-24" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;