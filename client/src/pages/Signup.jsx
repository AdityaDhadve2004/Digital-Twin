import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import MainLogo from "../assets/Firefly_Gemini Flash_Design a premium minimal flat vector logo for an AI-powered academic assistant called 373158.png"
import { useActionData, redirect } from "react-router-dom";
import { createUser } from "../api";
import React from "react";
import { Mail, Lock, ArrowRight, User } from "lucide-react";


export async function actionSignup({ request }) {
  const formData = await request.formData()
  console.log(formData);
  const jsonData = Object.fromEntries(formData);
  console.log(jsonData);
  const res = await createUser(jsonData);
  if (res) {
    return redirect("/login");
  }
}


export default function SignupPage() {
  const data = useActionData();
  console.log(data);
  return (
    <div className="min-h-screen bg-[#1B1917] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-xl">

        {/* Header */}

        <div className="text-center mb-10">

          <div className="inline-flex rounded-full border border-[#35312C] bg-[#24211D] px-4 py-2 text-sm text-[#A79F95] mb-6">
            🚀 Create Your Account
          </div>

          <div className="flex justify-center mb-5">

            <img
              src={MainLogo}
              alt="Digital Twin"
              className="w-16 h-16 rounded-2xl shadow-lg"
            />

          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-[#ECE7DF]">
            Join Digital Twin
          </h1>

          <p className="mt-3 text-lg text-[#A79F95]">
            Start your AI-powered academic journey today.
          </p>

        </div>

        {/* Signup Card */}

        <div className="rounded-[32px] border border-[#35312C] bg-[#24211D] p-10 shadow-[0_10px_30px_rgba(0,0,0,.20)]">

          <Form method="POST">

            {/* Username */}

            <div className="mb-7">

              <label className="mb-3 block text-sm font-medium text-[#B5ADA4]">
                Username
              </label>

              <div className="flex h-14 items-center rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 focus-within:border-[#D97757] transition">

                <User className="h-5 w-5 text-[#8A837A]" />

                <input
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  className="ml-4 w-full bg-transparent text-[#ECE7DF] placeholder:text-[#7F786F] outline-none"
                />

              </div>

            </div>

            {/* Email */}

            <div className="mb-7">

              <label className="mb-3 block text-sm font-medium text-[#B5ADA4]">
                Email Address
              </label>

              <div className="flex h-14 items-center rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 focus-within:border-[#D97757] transition">

                <Mail className="h-5 w-5 text-[#8A837A]" />

                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="ml-4 w-full bg-transparent text-[#ECE7DF] placeholder:text-[#7F786F] outline-none"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="mb-3 block text-sm font-medium text-[#B5ADA4]">
                Password
              </label>

              <div className="flex h-14 items-center rounded-2xl border border-[#35312C] bg-[#2B2823] px-5 focus-within:border-[#D97757] transition">

                <Lock className="h-5 w-5 text-[#8A837A]" />

                <input
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  className="ml-4 w-full bg-transparent text-[#ECE7DF] placeholder:text-[#7F786F] outline-none"
                />

              </div>

              <p className="mt-4 text-sm text-[#8A837A]">
                Use at least 8 characters for better security.
              </p>

            </div>

            {/* Signup Button */}

            <button
              type="submit"
              className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#D97757] text-lg font-medium text-white transition-all duration-200 hover:bg-[#C86645] hover:scale-[1.01]"
            >

              Create Account

              <ArrowRight className="h-5 w-5" />

            </button>

          </Form>

          {/* Divider */}

          <div className="my-8 flex items-center">

            <div className="h-px flex-1 bg-[#35312C]" />

            <span className="mx-4 text-sm text-[#7F786F]">
              OR
            </span>

            <div className="h-px flex-1 bg-[#35312C]" />

          </div>

          {/* Footer */}

          <p className="text-center text-[#A79F95]">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-medium text-[#D97757] transition hover:underline"
            >
              Sign In
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}