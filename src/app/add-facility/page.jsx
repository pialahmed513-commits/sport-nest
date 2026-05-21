"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";
import { authClient } from "@/lib/auth-client";

export default function AddFacilityPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleAddFacility = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const ownerEmail = user?.email || data.owner_email;

    if (!ownerEmail) {
      toast.error("Owner email is required");
      return;
    }

    const facilityData = {
      name: data.name,
      facility_type: data.facility_type,
      image: data.image,
      location: data.location,
      price_per_hour: Number(data.price_per_hour),
      capacity: Number(data.capacity),
      available_slots: data.available_slots
        .split(",")
        .map((slot) => slot.trim())
        .filter(Boolean),
      description: data.description,
      owner_email: ownerEmail,
    };

    try {
      setLoading(true);

      const result = await authClient("/facilities", {
        method: "POST",
        body: JSON.stringify(facilityData),
      });

      if (result?.insertedId) {
        toast.success("Facility added successfully");
        form.reset();
        router.push("/facilities");
      } else {
        toast.error("Failed to add facility");
      }
    } catch (error) {
      console.log("Add facility error:", error);
      toast.error(error?.message || "Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#030608] px-5 py-16 text-white sm:px-8 lg:px-14">
      <div className="mx-auto max-w-5xl rounded-3xl border border-[#1a2229] bg-[#071014] p-6 sm:p-10">
        <div className="mb-10 text-center">
          <span className="inline-flex rounded-full border border-[#2a3238] bg-[#101820] px-5 py-2 text-sm font-semibold text-[#00d18f]">
            Add Facility
          </span>

          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Add New{" "}
            <span className="bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] bg-clip-text text-transparent">
              Sports Facility
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-[#a7b0b8]">
            Fill the information below to add a sports venue into the database.
          </p>
        </div>

        <form
          onSubmit={handleAddFacility}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div className="md:col-span-2">
            <label className="mb-2 block font-bold">Facility Name</label>
            <input
              type="text"
              name="name"
              placeholder="Premier Football Stadium"
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-bold">Facility Type</label>
            <select
              name="facility_type"
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            >
              <option value="">Select type</option>
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Swimming">Swimming</option>
              <option value="Badminton">Badminton</option>
              <option value="Cricket">Cricket</option>
              <option value="Gym">Gym</option>
              <option value="Volleyball">Volleyball</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-bold">Price Per Hour</label>
            <input
              type="number"
              name="price_per_hour"
              placeholder="150"
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-bold">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Downtown Sports Complex"
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-bold">Capacity</label>
            <input
              type="number"
              name="capacity"
              placeholder="22"
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-bold">Image URL</label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/facility.jpg"
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-bold">Available Time Slots</label>
            <input
              type="text"
              name="available_slots"
              placeholder="9:00 AM, 10:00 AM, 2:00 PM, 6:00 PM"
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            />
            <p className="mt-2 text-sm text-[#a7b0b8]">
              Use comma between slots.
            </p>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-bold">Owner Email</label>
            <input
              type="email"
              name="owner_email"
              defaultValue={user?.email || ""}
              placeholder="owner@example.com"
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block font-bold">Description</label>
            <textarea
              name="description"
              rows="5"
              placeholder="Write facility description..."
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-6 py-4 font-extrabold text-[#020609] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Adding Facility..." : "Add Facility"}
          </button>
        </form>
      </div>
    </section>
  );
}