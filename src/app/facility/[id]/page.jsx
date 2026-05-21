"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaUsers,
} from "react-icons/fa";

export default function FacilityDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [userEmail, setUserEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [hours, setHours] = useState("1");

  useEffect(() => {
    if (user?.email) {
      setUserEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const data = await authClient(`/facilities/${id}`);
        setFacility(data);
      } catch (error) {
        console.error("Facility load error:", error);
        toast.error(error?.message || "Failed to load facility");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFacility();
    }
  }, [id]);

  const totalPrice = useMemo(() => {
    return Number(facility?.price_per_hour || 0) * Number(hours || 1);
  }, [facility, hours]);

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!facility?._id) {
      toast.error("Facility data not found");
      return;
    }

    if (!userEmail || !bookingDate || !timeSlot || !hours) {
      toast.error("Please fill all booking fields");
      return;
    }

    const bookingData = {
      facility_id: facility._id,
      facility_name: facility.name,
      facility_type: facility.facility_type,
      facility_image: facility.image,
      user_email: userEmail,
      booking_date: bookingDate,
      time_slot: timeSlot,
      hours: Number(hours),
      total_price: totalPrice,
      status: "pending",
    };

    try {
      setBookingLoading(true);

      const result = await authClient("/bookings", {
        method: "POST",
        body: JSON.stringify(bookingData),
      });

      if (result?.success || result?.result?.insertedId || result?.insertedId) {
        toast.success("Booking submitted successfully");
        router.push("/my-bookings");
      } else {
        toast.error("Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error?.message || "Server connection failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#030608] px-5 py-16 text-white">
        <div className="h-[500px] animate-pulse rounded-3xl bg-[#071014]" />
      </section>
    );
  }

  if (!facility) {
    return (
      <section className="min-h-screen bg-[#030608] px-5 py-20 text-center text-white">
        <h2 className="text-3xl font-black">Facility not found</h2>

        <button
          type="button"
          onClick={() => router.push("/facilities")}
          className="mt-6 rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-7 py-3 font-bold text-[#020609]"
        >
          Back to Facilities
        </button>
      </section>
    );
  }

  const slots = facility?.available_slots || [];

  return (
    <section className="min-h-screen bg-[#030608] px-5 py-14 text-white sm:px-8 lg:px-14">
      <button
        type="button"
        onClick={() => router.push("/facilities")}
        className="mb-8 flex items-center gap-2 text-[#a7b0b8] transition hover:text-[#00d18f]"
      >
        <FaArrowLeft />
        Back to Facilities
      </button>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_420px]">
        <div>
          <img
            src={
              facility.image ||
              "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=1200"
            }
            alt={facility.name || "Facility"}
            className="h-[300px] w-full rounded-3xl object-cover md:h-[430px]"
          />

          <div className="mt-7 rounded-3xl border border-[#1a2229] bg-[#071014] p-6 sm:p-7">
            <span className="rounded-full bg-[#00d18f]/15 px-4 py-1.5 text-sm font-bold text-[#00d18f]">
              {facility.facility_type}
            </span>

            <h1 className="mt-4 text-3xl font-black sm:text-4xl">
              {facility.name}
            </h1>

            <div className="mt-5 flex flex-wrap gap-5 text-[#a7b0b8]">
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#00d18f]" />
                {facility.location}
              </p>

              <p className="flex items-center gap-2">
                <FaUsers className="text-[#00d18f]" />
                {facility.capacity} capacity
              </p>
            </div>

            <div className="my-7 h-px bg-[#1a2229]" />

            <h3 className="text-xl font-extrabold">Description</h3>

            <p className="mt-4 leading-8 text-[#a7b0b8]">
              {facility.description}
            </p>

            <div className="my-7 h-px bg-[#1a2229]" />

            <h3 className="text-xl font-extrabold">Available Time Slots</h3>

            <div className="mt-5 flex flex-wrap gap-3">
              {slots.map((slot) => (
                <span
                  key={slot}
                  className="rounded-xl bg-[#101820] px-4 py-2 text-sm text-[#a7b0b8]"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={handleBooking}
          className="h-fit rounded-3xl border border-[#1a2229] bg-[#071014] p-6 sm:p-7"
        >
          <h2 className="text-2xl font-black">Book This Facility</h2>

          <div className="mt-7">
            <label className="mb-3 block font-bold">Your Email</label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            />
          </div>

          <div className="mt-6">
            <label className="mb-3 flex items-center gap-2 font-bold">
              <FaCalendarAlt />
              Booking Date
            </label>

            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            />
          </div>

          <div className="mt-6">
            <label className="mb-3 flex items-center gap-2 font-bold">
              <FaClock />
              Time Slot
            </label>

            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
              required
            >
              <option value="">Select a time slot</option>

              {slots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-6">
            <label className="mb-3 flex items-center gap-2 font-bold">
              <FaDollarSign />
              Duration
            </label>

            <select
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-full rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4 outline-none focus:border-[#00d18f]"
            >
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="4">4 hours</option>
            </select>
          </div>

          <div className="mt-7 rounded-2xl bg-[#101820] p-5">
            <div className="flex justify-between text-[#a7b0b8]">
              <span>
                ${facility.price_per_hour} × {hours} hour
              </span>
              <span>${totalPrice}</span>
            </div>

            <div className="mt-4 flex justify-between text-xl font-black">
              <span>Total</span>
              <span className="text-[#00d18f]">${totalPrice}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={bookingLoading}
            className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-6 py-4 font-extrabold text-[#020609] transition hover:scale-[1.02] disabled:opacity-60"
          >
            <FaCheckCircle />
            {bookingLoading ? "Submitting..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </section>
  );
}