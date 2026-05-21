"use client";

import { useEffect, useState } from "react";
import FacilityCard from "@/components/FacilityCard";
import { authClient } from "@/lib/auth-client";


const FeaturedFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await authClient("/facilities");
        setFacilities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching facilities:", error);
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  return (
    <section className="w-full bg-[#030608] px-5 py-24 text-white sm:px-8 lg:px-14">
      <div className="text-center">
        <span className="inline-flex rounded-full border border-[#2a3238] bg-[#071014] px-5 py-2 text-sm font-semibold text-[#00d18f]">
          Featured Facilities
        </span>

        <h2 className="mt-5 text-3xl font-black sm:text-5xl">
          Discover Top{" "}
          <span className="bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] bg-clip-text text-transparent">
            Sports Venues
          </span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[#a7b0b8]">
          Explore our latest sports facilities from the database.
        </p>
      </div>

      {loading ? (
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[430px] animate-pulse rounded-3xl bg-[#071014]"
            />
          ))}
        </div>
      ) : facilities.length === 0 ? (
        <div className="mt-14 rounded-3xl border border-[#1a2229] bg-[#071014] p-10 text-center">
          <h3 className="text-2xl font-extrabold">No facilities found</h3>

          <p className="mt-3 text-[#a7b0b8]">
            Please add facilities from the Add Facility page.
          </p>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {facilities.slice(0, 6).map((facility, index) => (
            <FacilityCard
              key={facility?._id || index}
              facility={facility}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedFacilities;