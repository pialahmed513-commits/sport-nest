"use client";

import { useEffect, useMemo, useState } from "react";
import FacilityCard from "@/components/FacilityCard";
import { authClient } from "@/lib/auth-client";
import { FaSearch } from "react-icons/fa";

const sportTypes = [
  "All",
  "Football",
  "Basketball",
  "Tennis",
  "Swimming",
  "Badminton",
  "Cricket",
  "Gym",
  "Volleyball",
];

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await authClient("/facilities");
        setFacilities(Array.isArray(data) ? data : []);
      } catch (error) {
        console.log("Error fetching facilities:", error);
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const filteredFacilities = useMemo(() => {
    return facilities.filter((facility) => {
      const name = facility?.name?.toLowerCase() || "";
      const type = facility?.facility_type?.toLowerCase() || "";
      const selected = selectedType.toLowerCase();

      const matchSearch = name.includes(searchText.toLowerCase());
      const matchType = selectedType === "All" || type === selected;

      return matchSearch && matchType;
    });
  }, [facilities, searchText, selectedType]);

  return (
    <section className="min-h-screen bg-[#030608] px-5 py-16 text-white sm:px-8 lg:px-14">
      <div className="text-center">
        <span className="inline-flex rounded-full border border-[#2a3238] bg-[#071014] px-5 py-2 text-sm font-semibold text-[#00d18f]">
          All Facilities
        </span>

        <h1 className="mt-5 text-4xl font-black sm:text-5xl">
          Explore Sports{" "}
          <span className="bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] bg-clip-text text-transparent">
            Facilities
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#a7b0b8]">
          Search and book available sports facilities from the database.
        </p>
      </div>

      <div className="mt-10">
        <div className="flex items-center gap-3 rounded-2xl border border-[#1a2229] bg-[#071014] px-5 py-4">
          <FaSearch className="text-[#a7b0b8]" />

          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by facility name..."
            className="w-full bg-transparent text-white outline-none placeholder:text-[#7f8a93]"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {sportTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`rounded-full border px-5 py-2 text-sm font-bold transition ${
                selectedType === type
                  ? "border-[#00d18f] bg-[#00d18f] text-[#020609]"
                  : "border-[#2a3238] text-[#a7b0b8] hover:border-[#00d18f] hover:text-[#00d18f]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[430px] animate-pulse rounded-3xl border border-[#1a2229] bg-[#071014]"
            />
          ))}
        </div>
      ) : filteredFacilities.length === 0 ? (
        <div className="mt-14 rounded-3xl border border-[#1a2229] bg-[#071014] p-10 text-center">
          <h3 className="text-2xl font-extrabold">No facilities found</h3>

          <p className="mt-3 text-[#a7b0b8]">
            Please add facilities or try a different search/filter.
          </p>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredFacilities.map((facility, index) => (
            <FacilityCard
              key={facility?._id || index}
              facility={facility}
            />
          ))}
        </div>
      )}
    </section>
  );
}