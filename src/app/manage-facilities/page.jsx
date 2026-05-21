"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { authClient } from "@/lib/auth-client";
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
  const { user, authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);

  const fetchFacilities = useCallback(async (searchEmail) => {
    if (!searchEmail) {
      setFacilities([]);
      return;
    }

    try {
      setLoading(true);

      const data = await authClient(
        `/my-facilities?email=${encodeURIComponent(searchEmail)}`
      );

      setFacilities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Manage facilities fetch error:", error);
      toast.error(error?.message || "Failed to load facilities");
      setFacilities([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user?.email) {
      setEmail(user.email);
      fetchFacilities(user.email);
    }
  }, [user, authLoading, fetchFacilities]);

  const handleSearchFacilities = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter owner email");
      return;
    }

    fetchFacilities(email);
  };

  const handleDeleteFacility = async (facilityId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this facility?"
    );

    if (!confirmDelete) return;

    try {
      setDeleteLoadingId(facilityId);

      const result = await authClient(`/facilities/${facilityId}`, {
        method: "DELETE",
      });

      if (result?.success) {
        toast.success("Facility deleted successfully");

        setFacilities((prev) =>
          prev.filter((facility) => facility._id !== facilityId)
        );
      } else {
        toast.error("Failed to delete facility");
      }
    } catch (error) {
      console.log("Delete facility error:", error);
      toast.error(error?.message || "Server connection failed");
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const handleUpdateFacility = async (e) => {
    e.preventDefault();

    if (!selectedFacility?._id) {
      toast.error("Facility not selected");
      return;
    }

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

      const result = await authClient(`/facilities/${selectedFacility._id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedFacility),
      });

      if (result?.success) {
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
      console.log("Update facility error:", error);
      toast.error(error?.message || "Server connection failed");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full overflow-x-hidden bg-[#030608] px-4 py-16 text-white sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-7xl text-center">
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
        className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-4 rounded-3xl border border-[#1a2229] bg-[#071014] p-5 sm:flex-row"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4">
          <FaEnvelope className="flex-none text-[#00d18f]" />

          <input
            type="email"
            placeholder="Enter owner email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 w-full bg-transparent text-white outline-none placeholder:text-[#7f8a93]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex flex-none items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-7 py-4 font-extrabold text-[#020609] disabled:opacity-60"
        >
          <FaSearch />
          {loading ? "Searching..." : "Find Facilities"}
        </button>
      </form>

      {loading ? (
        <div className="mt-14 text-center font-bold text-[#00d18f]">
          Loading facilities...
        </div>
      ) : facilities.length === 0 ? (
        <div className="mx-auto mt-14 w-full max-w-7xl rounded-3xl border border-[#1a2229] bg-[#071014] p-10 text-center">
          <h3 className="text-2xl font-extrabold">No facilities found</h3>

          <p className="mt-3 text-[#a7b0b8]">
            Search with the owner email used while adding a facility.
          </p>
        </div>
      ) : (
        <div className="mx-auto mt-14 grid w-full max-w-7xl grid-cols-1 gap-6 xl:grid-cols-2">
          {facilities.map((facility) => (
            <div
              key={facility._id}
              className="w-full min-w-0 overflow-hidden rounded-3xl border border-[#1a2229] bg-[#071014] p-5 transition hover:border-[#00d18f]"
            >
              <div className="flex min-w-0 flex-col gap-5 md:flex-row">
                <img
                  src={
                    facility.image ||
                    "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200&auto=format&fit=crop"
                  }
                  alt={facility.name || "Facility"}
                  className="h-56 w-full flex-none rounded-2xl object-cover md:h-44 md:w-52"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="break-words text-xl font-extrabold">
                        {facility.name}
                      </h3>

                      <p className="mt-1 break-words text-sm text-[#00d18f]">
                        {facility.facility_type}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-[#a7b0b8]">
                    <p className="flex min-w-0 items-start gap-2 break-words">
                      <FaMapMarkerAlt className="mt-1 flex-none text-[#00d18f]" />
                      <span className="min-w-0 break-words">
                        {facility.location}
                      </span>
                    </p>

                    <p className="flex min-w-0 items-start gap-2 break-words">
                      <FaDollarSign className="mt-1 flex-none text-[#00d18f]" />
                      <span className="min-w-0 break-words">
                        ${facility.price_per_hour}/hr
                      </span>
                    </p>

                    <p className="flex min-w-0 items-start gap-2 break-words">
                      <FaUsers className="mt-1 flex-none text-[#00d18f]" />
                      <span className="min-w-0 break-words">
                        {facility.capacity} people
                      </span>
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
                      disabled={deleteLoadingId === facility._id}
                      className="flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-60"
                    >
                      <FaTrash />
                      {deleteLoadingId === facility._id
                        ? "Deleting..."
                        : "Delete"}
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