import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Tennis Player",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
    review:
      "SportNest made booking a tennis court so easy. I found the right venue, checked the slot, and booked everything within minutes.",
  },
  {
    name: "Michael Carter",
    role: "Football Coach",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop",
    review:
      "As a coach, I need reliable turf booking for team practice. SportNest gives me a smooth and organized booking experience.",
  },
  {
    name: "Emily Roberts",
    role: "Swimmer",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500&auto=format&fit=crop",
    review:
      "Finding swimming lanes used to take time. Now I can compare facilities and choose the best available slot easily.",
  },
];

const ClientTestimonials = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#030608] px-5 py-24 text-white sm:px-8 lg:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,#00d18f12,transparent_30%),radial-gradient(circle_at_85%_80%,#0ea5e912,transparent_28%)]" />

      <div className="relative w-full">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-[#2a3238] bg-[#071014] px-5 py-2 text-sm font-semibold text-[#00d18f]">
            Client Testimonials
          </span>

          <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            What Our{" "}
            <span className="bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#a7b0b8]">
            Players, coaches, and sports lovers use SportNest to book their
            favorite facilities faster and more confidently.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="group relative rounded-3xl border border-[#1a2229] bg-[#071014] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#00d18f] hover:shadow-[0_18px_50px_rgba(0,209,143,0.12)]"
            >
              <div className="absolute right-7 top-7 text-[#00d18f]/20">
                <FaQuoteLeft size={42} />
              </div>

              <div className="flex items-center gap-4">
                <img
                  src={item.photo}
                  alt={item.name}
                  className="h-16 w-16 rounded-2xl border border-[#00d18f] object-cover"
                />

                <div>
                  <h3 className="text-lg font-extrabold text-white">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#a7b0b8]">{item.role}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-1 text-[#00d18f]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p className="mt-5 leading-7 text-[#a7b0b8]">
                “{item.review}”
              </p>

              <div className="mt-7 h-1 w-12 rounded-full bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] transition group-hover:w-24" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonials;