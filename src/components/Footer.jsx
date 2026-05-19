import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Facilities", href: "/facilities" },
    { name: "My Bookings", href: "/my-bookings" },
    { name: "Add Facility", href: "/add-facility" },
    { name: "Manage My Facilities", href: "/manage-facilities" },
  ];

  const sports = [
    "Football Turf",
    "Badminton Court",
    "Swimming Lane",
    "Tennis Court",
    "Basketball Arena",
    "Cricket Ground",
  ];

  const socials = [
    { label: "Facebook", href: "#", icon: FaFacebookF },
    { label: "X", href: "#", icon: FaXTwitter },
    { label: "Instagram", href: "#", icon: FaInstagram },
    { label: "LinkedIn", href: "#", icon: FaLinkedinIn },
    { label: "YouTube", href: "#", icon: FaYoutube },
  ];

  return (
    <footer className="w-full border-t border-[#1a2229] bg-[#030608] text-white">
      <div className="w-full px-5 py-12 sm:px-8 sm:py-14 lg:px-14">
        <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-4">
          <div className="sm:col-span-2 xl:col-span-1">
            <Link href="/" className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] text-xl font-black text-[#020609]">
                S
              </span>

              <span className="text-2xl font-extrabold">
                Sport<span className="text-[#00d18f]">Nest</span>
              </span>
            </Link>

            <p className="max-w-md text-sm leading-7 text-[#a7b0b8] sm:text-base">
              SportNest helps players find, book, and manage sports facilities
              easily. Reserve courts, turfs, pools, and training spaces from
              one simple platform.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {socials.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#2a3238] text-[#a7b0b8] transition hover:border-[#00d18f] hover:text-[#00d18f]"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-extrabold">Quick Links</h3>

            <div className="space-y-3 text-sm text-[#a7b0b8] sm:text-base">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block transition hover:text-[#00d18f]"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-extrabold">Sports Facilities</h3>

            <div className="space-y-3 text-sm text-[#a7b0b8] sm:text-base">
              {sports.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-extrabold">
              Contact Information
            </h3>

            <div className="space-y-4 text-sm text-[#a7b0b8] sm:text-base">
              <p className="flex items-start gap-3">
                <FaMapMarkerAlt
                  className="mt-1 shrink-0 text-[#00d18f]"
                  size={17}
                />
                <span>
                  123 Sports Avenue, Athletic District, NY 10001
                </span>
              </p>

              <p className="flex items-center gap-3">
                <FaPhoneAlt className="shrink-0 text-[#00d18f]" size={16} />
                <span>+1 (234) 567-890</span>
              </p>

              <p className="flex items-center gap-3">
                <FaEnvelope className="shrink-0 text-[#00d18f]" size={17} />
                <span className="break-all">info@sportnest.com</span>
              </p>
            </div>

            <div className="mt-7">
              <h4 className="mb-3 font-bold">Newsletter</h4>

              <div className="flex w-full flex-col gap-3 sm:flex-row xl:flex-col 2xl:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 rounded-xl border border-[#2a3238] bg-[#071014] px-4 py-3 text-sm text-white outline-none placeholder:text-[#7f8a93] focus:border-[#00d18f]"
                />

                <button
                  type="button"
                  className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-5 font-bold text-[#020609] transition hover:scale-[1.02] sm:w-14 xl:w-full 2xl:w-14"
                  aria-label="Subscribe"
                >
                  <FaPaperPlane size={15} />
                  <span className="sm:hidden xl:inline 2xl:hidden">
                    Subscribe
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-[#1a2229] px-5 py-6 sm:px-8 lg:px-14">
        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-[#a7b0b8] md:flex-row md:text-left">
          <p>© {currentYear} SportNest. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-5 md:justify-end">
            <Link href="#" className="transition hover:text-[#00d18f]">
              Privacy Policy
            </Link>

            <Link href="#" className="transition hover:text-[#00d18f]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;