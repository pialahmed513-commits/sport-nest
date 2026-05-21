"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaTimes, FaSignOutAlt, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { user, logoutUser, authLoading } = useAuth();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "All Facilities", href: "/facilities" },
  ];

  const privateLinks = [
    { name: "Add Facility", href: "/add-facility" },
    { name: "My Bookings", href: "/my-bookings" },
    { name: "Manage Facilities", href: "/manage-facilities" },
  ];

  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;

  const isActive = (href) => pathname === href;

  const closeMenu = () => {
    setOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();

      toast.success("Logged out successfully");
      closeMenu();

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const userName = user?.name || "SportNest User";
  const userEmail = user?.email || "";
  const userPhoto =
    user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png";

  return (
    <header className="sticky top-0 z-50 border-b border-[#1a2229] bg-[#030608]/95 backdrop-blur-xl">
      <nav className="flex h-20 w-full items-center justify-between px-5 sm:px-8 lg:px-14">
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] text-xl font-black text-[#020609]">
            S
          </span>

          <span className="text-2xl font-extrabold text-white">
            Sport<span className="text-[#00d18f]">Nest</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-sm font-bold transition ${
                isActive(link.href)
                  ? "border-b-2 border-[#00d18f] pb-2 text-[#00d18f]"
                  : "text-[#a7b0b8] hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-5 lg:flex">
          {authLoading ? (
            <div className="h-11 w-24 animate-pulse rounded-2xl bg-[#101820]" />
          ) : !user ? (
            <Link
              href="/login"
              className="rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-7 py-3 font-bold text-[#020609] transition hover:scale-105"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 rounded-2xl border border-[#2a3238] bg-[#071014] px-3 py-2 transition hover:border-[#00d18f]"
              >
                <img
                  src={userPhoto}
                  alt={userName}
                  className="h-10 w-10 rounded-full border border-[#00d18f] object-cover"
                />

                <FaChevronDown
                  className={`text-sm text-[#a7b0b8] transition ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-72 rounded-2xl border border-[#2a3238] bg-[#071014] p-4 shadow-2xl">
                  <div className="mb-4 border-b border-[#2a3238] pb-4">
                    <p className="font-bold text-white">{userName}</p>
                    <p className="truncate text-sm text-[#a7b0b8]">
                      {userEmail}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-bold text-white transition hover:bg-red-600"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2a3238] text-white lg:hidden"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[#1a2229] bg-[#030608] px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`font-bold transition ${
                  isActive(link.href)
                    ? "text-[#00d18f]"
                    : "text-[#a7b0b8] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!authLoading && !user && (
              <Link
                href="/login"
                onClick={closeMenu}
                className="mt-3 rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] py-3 text-center font-bold text-[#020609]"
              >
                Login
              </Link>
            )}

            {!authLoading && user && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-red-500 py-3 font-bold text-white"
              >
                <FaSignOutAlt />
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;