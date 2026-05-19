"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import toast from "react-hot-toast";
import {
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaPlusCircle,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth() || {};

  const {
    user = null,
    logoutUser = async () => {},
    authLoading = false,
  } = auth;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const publicLinks = [
    { name: "Home", href: "/" },
    { name: "All Facilities", href: "/facilities" },
  ];

  const privateLinks = [
    { name: "My Bookings", href: "/my-bookings", icon: FaCalendarAlt },
    { name: "Add Facility", href: "/add-facility", icon: FaPlusCircle },
    { name: "Manage My Facilities", href: "/manage-facilities", icon: FaCog },
  ];

  const isActive = (href) => pathname === href;

  const userName = user?.name || user?.displayName || "SportNest User";
  const userEmail = user?.email || "";
  const userPhoto =
    user?.photoURL || user?.photo || "https://i.ibb.co/4pDNDk1/avatar.png";

  const closeMenus = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      toast.success("Logged out successfully");
      closeMenus();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  const navLinkClass = (href) =>
    `text-sm font-semibold transition ${
      isActive(href)
        ? "text-[#00d18f] border-b-2 border-[#00d18f] pb-2"
        : "text-[#a7b0b8] hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#1a2229] bg-[#030608]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={closeMenus} className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] text-xl font-black text-[#020609]">
            S
          </span>

          <span className="text-2xl font-extrabold text-white">
            Sport<span className="text-[#00d18f]">Nest</span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
              {link.name}
            </Link>
          ))}

          {user &&
            privateLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                {link.name}
              </Link>
            ))}
        </div>

        <div className="hidden items-center lg:flex">
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
                <div className="absolute right-0 top-14 w-80 rounded-2xl border border-[#2a3238] bg-[#071014] p-4 shadow-2xl">
                  <div className="mb-3 flex items-center gap-3 border-b border-[#2a3238] pb-4">
                    <img
                      src={userPhoto}
                      alt={userName}
                      className="h-12 w-12 rounded-full border border-[#00d18f] object-cover"
                    />

                    <div className="min-w-0">
                      <p className="truncate font-bold text-white">{userName}</p>
                      <p className="truncate text-sm text-[#a7b0b8]">{userEmail}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {privateLinks.map((link) => {
                      const Icon = link.icon;

                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeMenus}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#a7b0b8] transition hover:bg-[#101820] hover:text-[#00d18f]"
                        >
                          <Icon />
                          {link.name}
                        </Link>
                      );
                    })}

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-3 font-bold text-white transition hover:bg-red-600"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          {!authLoading && !user && (
            <Link
              href="/login"
              className="rounded-xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-5 py-2.5 text-sm font-bold text-[#020609]"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#2a3238] text-white"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-[#1a2229] bg-[#030608] px-5 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            {publicLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenus}
                className={isActive(link.href) ? "text-[#00d18f]" : "text-[#a7b0b8]"}
              >
                {link.name}
              </Link>
            ))}

            {user &&
              privateLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenus}
                    className={`flex items-center gap-2 ${
                      isActive(link.href) ? "text-[#00d18f]" : "text-[#a7b0b8]"
                    }`}
                  >
                    <Icon />
                    {link.name}
                  </Link>
                );
              })}

            {user && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-red-500 py-3 font-bold text-white"
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