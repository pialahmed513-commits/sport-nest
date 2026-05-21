"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaEnvelope,
  FaSearch,
  FaTimesCircle,
} from "react-icons/fa";

export default function MyBookingsPage() {
  const { user, authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const fetchBookings = async (searchEmail) => {
    if (!searchEmail) {
      setBookings([]);
      return;
    }

    try {
      setLoading(true);

      const data = await authClient(
        `/my-bookings?email=${encodeURIComponent(searchEmail)}`
      );

      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("My bookings fetch error:", error);
      toast.error(error?.message || "Failed to load bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user?.email) {
      setEmail(user.email);
      fetchBookings(user.email);
    }

    if (!authLoading && !user?.email) {
      setLoading(false);
    }
  }, [user, authLoading]);

  const handleSearchBookings = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    fetchBookings(email);
  };

  const handleCancelBooking = async () => {
    if (!selectedBooking?._id) return;

    try {
      setCancelLoading(true);

      const data = await authClient(`/bookings/${selectedBooking._id}`, {
        method: "PATCH",
      });

      if (data?.success) {
        toast.success("Booking cancelled successfully");

        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === selectedBooking._id
              ? { ...booking, status: "cancelled" }
              : booking
          )
        );

        setSelectedBooking(null);
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Cancel booking error:", error);
      toast.error(error?.message || "Server connection failed");
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <section className="min-h-screen w-full overflow-x-hidden bg-[#030608] px-4 py-16 text-white sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-7xl text-center">
        <span className="inline-flex rounded-full border border-[#2a3238] bg-[#071014] px-5 py-2 text-sm font-semibold text-[#00d18f]">
          My Bookings
        </span>

        <h1 className="mt-5 text-4xl font-black sm:text-5xl">
          Track Your{" "}
          <span className="bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] bg-clip-text text-transparent">
            Bookings
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#a7b0b8]">
          Enter the email you used while booking to view your facility
          reservations.
        </p>
      </div>

      <form
        onSubmit={handleSearchBookings}
        className="mx-auto mt-10 flex w-full max-w-3xl flex-col gap-4 rounded-3xl border border-[#1a2229] bg-[#071014] p-5 sm:flex-row"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4">
          <FaEnvelope className="flex-none text-[#00d18f]" />

          <input
            type="email"
            placeholder="Enter your booking email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 w-full bg-transparent text-white outline-none placeholder:text-[#7f8a93]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex flex-none items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-7 py-4 font-extrabold text-[#020609] transition hover:scale-[1.02] disabled:opacity-60"
        >
          <FaSearch />
          {loading ? "Searching..." : "Find Bookings"}
        </button>
      </form>

      {loading ? (
        <div className="mt-14 text-center font-bold text-[#00d18f]">
          Loading bookings...
        </div>
      ) : bookings.length === 0 ? (
        <div className="mx-auto mt-14 w-full max-w-7xl rounded-3xl border border-[#1a2229] bg-[#071014] p-10 text-center">
          <h3 className="text-2xl font-extrabold">No bookings found</h3>

          <p className="mt-3 text-[#a7b0b8]">
            Search with the same email you used during booking.
          </p>
        </div>
      ) : (
        <div className="mx-auto mt-14 grid w-full max-w-7xl grid-cols-1 gap-6 xl:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="w-full min-w-0 overflow-hidden rounded-3xl border border-[#1a2229] bg-[#071014] p-5 transition hover:border-[#00d18f]"
            >
              <div className="flex min-w-0 flex-col gap-5 md:flex-row">
                <img
                  src={
                    booking.facility_image ||
                    "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=400"
                  }
                  alt={booking.facility_name || "Facility"}
                  className="h-56 w-full flex-none rounded-2xl object-cover md:h-44 md:w-52"
                />

                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h3 className="break-words text-xl font-extrabold text-white">
                        {booking.facility_name}
                      </h3>

                      <p className="mt-1 break-words text-sm text-[#a7b0b8]">
                        {booking.facility_type}
                      </p>
                    </div>

                    <span
                      className={`w-fit flex-none rounded-full px-4 py-1.5 text-sm font-bold capitalize ${
                        booking.status === "cancelled"
                          ? "bg-red-500/15 text-red-400"
                          : "bg-[#00d18f]/15 text-[#00d18f]"
                      }`}
                    >
                      {booking.status || "pending"}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 text-[#a7b0b8]">
                    <p className="flex min-w-0 items-start gap-2 break-words">
                      <FaCalendarAlt className="mt-1 flex-none text-[#00d18f]" />
                      <span className="min-w-0 break-words">
                        {booking.booking_date}
                      </span>
                    </p>

                    <p className="flex min-w-0 items-start gap-2 break-words">
                      <FaClock className="mt-1 flex-none text-[#00d18f]" />
                      <span className="min-w-0 break-words">
                        {booking.time_slot} — {booking.hours} hour
                      </span>
                    </p>

                    <p className="flex min-w-0 items-start gap-2 break-words">
                      <FaDollarSign className="mt-1 flex-none text-[#00d18f]" />
                      <span className="min-w-0 break-words">
                        Total Price: ${booking.total_price}
                      </span>
                    </p>
                  </div>

                  {booking.status !== "cancelled" && (
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(booking)}
                      className="mt-5 flex w-fit items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-600"
                    >
                      <FaTimesCircle />
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-[#1a2229] bg-[#071014] p-7 text-white">
            <h3 className="text-2xl font-black">Cancel Booking?</h3>

            <p className="mt-3 leading-7 text-[#a7b0b8]">
              Are you sure you want to cancel your booking for{" "}
              <span className="break-words font-bold text-white">
                {selectedBooking.facility_name}
              </span>
              ?
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="flex-1 rounded-2xl border border-[#2a3238] px-5 py-3 font-bold text-[#a7b0b8] transition hover:border-[#00d18f] hover:text-[#00d18f]"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={handleCancelBooking}
                disabled={cancelLoading}
                className="flex-1 rounded-2xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-600 disabled:opacity-60"
              >
                {cancelLoading ? "Cancelling..." : "Yes, Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}