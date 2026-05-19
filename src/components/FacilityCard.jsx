"use client";

import { useRouter } from "next/navigation";
import {
  FaArrowRight,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

const FacilityCard = ({ facility }) => {
  const router = useRouter();

  const slots = facility?.available_slots || [];

  const handleBookNow = () => {
    router.push(`/facility/${facility._id}`);
  };

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[#1a2229] bg-[#071014] transition duration-300 hover:-translate-y-2 hover:border-[#00d18f] hover:shadow-[0_18px_50px_rgba(0,209,143,0.12)]">
      <div className="relative h-56 overflow-hidden">
        <img
          src={
            facility?.image ||
            "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop"
          }
          alt={facility?.name || "Facility"}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#030608] via-[#03060880] to-transparent" />

        <span className="absolute right-4 top-4 rounded-full bg-[#00d18f] px-4 py-1.5 text-xs font-extrabold text-[#020609]">
          {facility?.facility_type || "Sports"}
        </span>

        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm text-white">
          <FaMapMarkerAlt className="text-[#00d18f]" />
          {facility?.location || "Unknown Location"}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-extrabold text-white">
          {facility?.name || "Sports Facility"}
        </h3>

        <p className="mt-3 line-clamp-2 leading-7 text-[#a7b0b8]">
          {facility?.description ||
            "A quality sports facility for matches and training sessions."}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-[#a7b0b8]">
          <div className="flex items-center gap-2">
            <FaDollarSign className="text-[#00d18f]" />
            <span>${facility?.price_per_hour || 0}/hr</span>
          </div>

          <div className="flex items-center gap-2">
            <FaUsers className="text-[#00d18f]" />
            <span>{facility?.capacity || 0} people</span>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-[#a7b0b8]">
          <FaClock className="text-[#00d18f]" />

          {slots.slice(0, 3).map((slot) => (
            <span
              key={slot}
              className="rounded-lg bg-[#101820] px-2 py-1 text-xs"
            >
              {slot}
            </span>
          ))}

          {slots.length > 3 && (
            <span className="rounded-lg bg-[#101820] px-2 py-1 text-xs">
              +{slots.length - 3}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleBookNow}
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-6 py-4 font-extrabold text-[#020609] transition hover:scale-[1.02]"
        >
          Book Now
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default FacilityCard;