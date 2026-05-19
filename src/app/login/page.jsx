"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/AuthProvider";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const { loginUser, googleLogin } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      await loginUser({
        email: data.email,
        password: data.password,
      });

      toast.success("Login successful");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse?.credential;

      if (!credential) {
        toast.error("Google credential not found");
        return;
      }

      await googleLogin(credential);

      toast.success("Google login successful");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Google login failed");
    }
  };

  return (
    <section className="min-h-screen bg-[#030608] px-5 py-16 text-white sm:px-8 lg:px-14">
      <div className="mx-auto max-w-xl rounded-3xl border border-[#1a2229] bg-[#071014] p-6 shadow-2xl sm:p-10">
        <div className="text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] text-3xl font-black text-[#020609]">
            S
          </span>

          <h1 className="mt-6 text-3xl font-black sm:text-4xl">
            Welcome{" "}
            <span className="bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] bg-clip-text text-transparent">
              Back
            </span>
          </h1>

          <p className="mt-3 text-[#a7b0b8]">
            Sign in to continue managing your bookings and facilities.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block font-bold">Email Address</label>

            <div className="flex items-center gap-3 rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4">
              <FaEnvelope className="text-[#00d18f]" />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none placeholder:text-[#7f8a93]"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-bold">Password</label>

            <div className="flex items-center gap-3 rounded-2xl border border-[#1a2229] bg-[#101820] px-4 py-4">
              <FaLock className="text-[#00d18f]" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none placeholder:text-[#7f8a93]"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#a7b0b8] hover:text-[#00d18f]"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-[#00d18f] to-[#0ea5e9] px-6 py-4 font-extrabold text-[#020609] transition hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#1a2229]" />
          <span className="text-sm text-[#a7b0b8]">or</span>
          <div className="h-px flex-1 bg-[#1a2229]" />
        </div>

        <div className="flex justify-center rounded-2xl border border-[#1a2229] bg-[#101820] p-5">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error("Google login failed")}
          />
        </div>

        <p className="mt-8 text-center text-[#a7b0b8]">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-[#00d18f]">
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
}