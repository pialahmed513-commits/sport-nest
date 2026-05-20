"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/AuthProvider"; // সঠিক কাস্টম হুক পাথ
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
  const { user } = useAuth(); // কাস্টম হুক থেকে ইউজার নেওয়া হচ্ছে
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // বুকিং ডাটা ফেচ করার ফাংশন
  const fetchBookings = async (searchEmail) => {
    if (!searchEmail) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/my-bookings?email=${searchEmail}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // ইউজার লগইন থাকলে অটোমেটিক ইমেইল বসে যাবে ও ডাটা লোড হবে
  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
      fetchBookings(user.email);
    }
  }, [user]);

  // ম্যানুয়াল সার্চ হ্যান্ডলার
  const handleSearchBookings = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    fetchBookings(email);
  };

  // বুকিং ক্যানসেল হ্যান্ডলার
  const handleCancelBooking = async () => {
    if (!selectedBooking?._id) return;

    try {
      setCancelLoading(true);
      const res = await fetch(`http://localhost:5000/bookings/${selectedBooking._id}`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Booking cancelled successfully");

        // ক্লায়েন্ট সাইড স্টেট আপডেট (ইনস্ট্যান্ট UI চেঞ্জ)
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
      console.error(error);
      toast.error("Server connection failed");
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#030608] px-5 py-16 text-white sm:px-8 lg:px-14">
      <div className="text-center">
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
          Enter the email you used while booking to view your facility reservations.
        </p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSearchBookings}
        className="mx-auto mt-10 flex max-w-3xl flex-col gap-4 rounded-3xl border border-[#1a2229] bg-[#071014] p-5 sm:flex-row"
      >
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4">
          <FaEnvelope className="text-[#00d18f]" />
          <input
            type="email"
            placeholder="Enter your booking email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent text-white outline-none placeholder:text-[#7f8a93]"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-7 py-4 font-extrabold text-[#020609] transition hover:scale-[1.02] disabled:opacity-60"
        >
          <FaSearch />
          {loading ? "Searching..." : "Find Bookings"}
        </button>
      </form>

      {/* Bookings Container */}
      {loading ? (
        <div className="mt-14 text-center text-[#00d18f] font-bold">Loading bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="mt-14 rounded-3xl border border-[#1a2229] bg-[#071014] p-10 text-center">
          <h3 className="text-2xl font-extrabold">No bookings found</h3>
          <p className="mt-3 text-[#a7b0b8]">Search with the same email you used during booking.</p>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-3xl border border-[#1a2229] bg-[#071014] p-5 transition hover:border-[#00d18f]"
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                <img
                  src={booking.facility_image || "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=400"}
                  alt={booking.facility_name}
                  className="h-44 w-full rounded-2xl object-cover sm:w-48"
                />
                <div className="flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-extrabold text-white">{booking.facility_name}</h3>
                      <p className="mt-1 text-sm text-[#a7b0b8]">{booking.facility_type}</p>
                    </div>
                    <span
                      className={`w-fit rounded-full px-4 py-1.5 text-sm font-bold capitalize ${
                        booking.status === "cancelled"
                          ? "bg-red-500/15 text-red-400"
                          : "bg-[#00d18f]/15 text-[#00d18f]"
                      }`}
                    >
                      {booking.status || "pending"}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3 text-[#a7b0b8]">
                    <p className="flex items-center gap-2">
                      <FaCalendarAlt className="text-[#00d18f]" /> {booking.booking_date}
                    </p>
                    <p className="flex items-center gap-2">
                      <FaClock className="text-[#00d18f]" /> {booking.time_slot} — {booking.hours} hour
                    </p>
                    <p className="flex items-center gap-2">
                      <FaDollarSign className="text-[#00d18f]" /> Total Price: ${booking.total_price}
                    </p>
                  </div>

                  {booking.status !== "cancelled" && (
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(booking)}
                      className="mt-5 flex items-center gap-2 rounded-full bg-red-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-red-600"
                    >
                      <FaTimesCircle /> Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-[#1a2229] bg-[#071014] p-7 text-white">
            <h3 className="text-2xl font-black">Cancel Booking?</h3>
            <p className="mt-3 leading-7 text-[#a7b0b8]">
              Are you sure you want to cancel your booking for <span className="font-bold text-white">{selectedBooking.facility_name}</span>?
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