import Link from "next/link";
import {
  FaFootballBall,
  FaBasketballBall,
  FaSwimmer,
  FaDumbbell,
} from "react-icons/fa";
import { GiTennisRacket, GiShuttlecock, GiCricketBat } from "react-icons/gi";
import { MdSportsVolleyball } from "react-icons/md";

const categories = [
  {
    name: "Football",
    venues: "45 venues",
    icon: FaFootballBall,
  },
  {
    name: "Basketball",
    venues: "38 venues",
    icon: FaBasketballBall,
  },
  {
    name: "Tennis",
    venues: "52 venues",
    icon: GiTennisRacket,
  },
  {
    name: "Swimming",
    venues: "28 venues",
    icon: FaSwimmer,
  },
  {
    name: "Badminton",
    venues: "34 venues",
    icon: GiShuttlecock,
  },
  {
    name: "Cricket",
    venues: "26 venues",
    icon: GiCricketBat,
  },
  {
    name: "Gym",
    venues: "40 venues",
    icon: FaDumbbell,
  },
  {
    name: "Volleyball",
    venues: "22 venues",
    icon: MdSportsVolleyball,
  },
];

const SportsCategories = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#030608] px-5 py-24 text-white sm:px-8 lg:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#00d18f12,transparent_30%),radial-gradient(circle_at_90%_70%,#0ea5e912,transparent_28%)]" />

      <div className="relative w-full">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-[#2a3238] bg-[#071014] px-5 py-2 text-sm font-semibold text-[#00d18f]">
            Sports Categories
          </span>

          <h2 className="mt-6 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Browse by{" "}
            <span className="bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] bg-clip-text text-transparent">
              Sport Type
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#a7b0b8]">
            Find the perfect facility for your favorite sport. Explore venues
            for training, matches, tournaments, and fitness activities.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={`/facilities?type=${category.name}`}
                className="group rounded-3xl border border-[#1a2229] bg-[#071014] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#00d18f] hover:shadow-[0_18px_50px_rgba(0,209,143,0.12)]"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#2a3238] bg-[#101820] text-[#00d18f] transition group-hover:border-[#00d18f] group-hover:bg-[#00d18f] group-hover:text-[#020609]">
                  <Icon size={28} />
                </div>

                <h3 className="text-xl font-extrabold text-white">
                  {category.name}
                </h3>

                <p className="mt-2 text-sm text-[#a7b0b8]">
                  {category.venues}
                </p>

                <div className="mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] transition group-hover:w-24" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SportsCategories;