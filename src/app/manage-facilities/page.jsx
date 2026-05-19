"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaEnvelope,
  FaSearch,
  FaEdit,
  FaTrash,
  FaDollarSign,
  FaUsers,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function ManageFacilitiesPage() {
  const [email, setEmail] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleSearchFacilities = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter owner email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/my-facilities?email=${email}`
      );

      const data = await res.json();
      setFacilities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load facilities");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFacility = async (facilityId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this facility?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/facilities/${facilityId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Facility deleted successfully");

        setFacilities((prev) =>
          prev.filter((facility) => facility._id !== facilityId)
        );
      } else {
        toast.error("Failed to delete facility");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server connection failed");
    }
  };

  const handleUpdateFacility = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const updatedFacility = {
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
      owner_email: data.owner_email,
    };

    try {
      setUpdateLoading(true);

      const res = await fetch(
        `http://localhost:5000/facilities/${selectedFacility._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFacility),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Facility updated successfully");

        setFacilities((prev) =>
          prev.map((facility) =>
            facility._id === selectedFacility._id
              ? { ...facility, ...updatedFacility }
              : facility
          )
        );

        setSelectedFacility(null);
      } else {
        toast.error("Failed to update facility");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server connection failed");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#030608] px-5 py-16 text-white sm:px-8 lg:px-14">
      <div className="text-center">
        <span className="inline-flex rounded-full border border-[#2a3238] bg-[#071014] px-5 py-2 text-sm font-semibold text-[#00d18f]">
          Manage Facilities
        </span>

        <h1 className="mt-5 text-4xl font-black sm:text-5xl">
          Manage My{" "}
          <span className="bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] bg-clip-text text-transparent">
            Facilities
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#a7b0b8]">
          Enter owner email to view, update, or delete your added sports
          facilities.
        </p>
      </div>

      <form
        onSubmit={handleSearchFacilities}
        className="mx-auto mt-10 flex max-w-3xl flex-col gap-4 rounded-3xl border border-[#1a2229] bg-[#071014] p-5 sm:flex-row"
      >
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4">
          <FaEnvelope className="text-[#00d18f]" />

          <input
            type="email"
            placeholder="Enter owner email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-[#7f8a93]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-7 py-4 font-extrabold text-[#020609] disabled:opacity-60"
        >
          <FaSearch />
          {loading ? "Searching..." : "Find Facilities"}
        </button>
      </form>

      {facilities.length === 0 ? (
        <div className="mt-14 rounded-3xl border border-[#1a2229] bg-[#071014] p-10 text-center">
          <h3 className="text-2xl font-extrabold">No facilities found</h3>
          <p className="mt-3 text-[#a7b0b8]">
            Search with the owner email used while adding a facility.
          </p>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {facilities.map((facility) => (
            <div
              key={facility._id}
              className="rounded-3xl border border-[#1a2229] bg-[#071014] p-5 transition hover:border-[#00d18f]"
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                <img
                  src={
                    facility.image ||
                    "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={facility.name}
                  className="h-44 w-full rounded-2xl object-cover sm:w-48"
                />

                <div className="flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold">
                        {facility.name}
                      </h3>

                      <p className="mt-1 text-sm text-[#00d18f]">
                        {facility.facility_type}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[#a7b0b8]">
                    <p className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-[#00d18f]" />
                      {facility.location}
                    </p>

                    <p className="flex items-center gap-2">
                      <FaDollarSign className="text-[#00d18f]" />
                      ${facility.price_per_hour}/hr
                    </p>

                    <p className="flex items-center gap-2">
                      <FaUsers className="text-[#00d18f]" />
                      {facility.capacity} people
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedFacility(facility)}
                      className="flex items-center gap-2 rounded-full bg-[#00d18f] px-5 py-2 text-sm font-bold text-[#020609]"
                    >
                      <FaEdit />
                      Update
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteFacility(facility._id)}
                      className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-sm font-bold text-white hover:bg-red-600"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedFacility && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 px-5 py-10">
          <div className="mx-auto max-w-4xl rounded-3xl border border-[#1a2229] bg-[#071014] p-6 text-white sm:p-8">
            <h2 className="text-2xl font-black">Update Facility</h2>

            <form
              onSubmit={handleUpdateFacility}
              className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              <div className="md:col-span-2">
                <label className="mb-2 block font-bold">Facility Name</label>
                <input
                  name="name"
                  defaultValue={selectedFacility.name}
                  className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-bold">Facility Type</label>
                <input
                  name="facility_type"
                  defaultValue={selectedFacility.facility_type}
                  className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-bold">Price Per Hour</label>
                <input
                  type="number"
                  name="price_per_hour"
                  defaultValue={selectedFacility.price_per_hour}
                  className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-bold">Location</label>
                <input
                  name="location"
                  defaultValue={selectedFacility.location}
                  className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block font-bold">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  defaultValue={selectedFacility.capacity}
                  className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-bold">Image URL</label>
                <input
                  name="image"
                  defaultValue={selectedFacility.image}
                  className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-bold">
                  Available Time Slots
                </label>
                <input
                  name="available_slots"
                  defaultValue={(selectedFacility.available_slots || []).join(
                    ", "
                  )}
                  className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-bold">Owner Email</label>
                <input
                  type="email"
                  name="owner_email"
                  defaultValue={selectedFacility.owner_email}
                  className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block font-bold">Description</label>
                <textarea
                  name="description"
                  rows="4"
                  defaultValue={selectedFacility.description}
                  className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
                  required
                />
              </div>

              <button
                type="button"
                onClick={() => setSelectedFacility(null)}
                className="rounded-2xl border border-[#2a3238] px-6 py-4 font-bold text-[#a7b0b8]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updateLoading}
                className="rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-6 py-4 font-extrabold text-[#020609] disabled:opacity-60"
              >
                {updateLoading ? "Updating..." : "Update Facility"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}