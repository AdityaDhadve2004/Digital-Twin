import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import MainLogo from "../assets/Firefly_Gemini Flash_Design a premium minimal flat vector logo for an AI-powered academic assistant called 373158.png"
import React from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { loginUser } from "../api";
import { useActionData, redirect } from "react-router-dom";
export async function actionLogin({ request }) {
  const formData = await request.formData()
  console.log(formData);
  const jsonData = Object.fromEntries(formData);
  const res = await loginUser(jsonData);
  if (res) {
    return redirect("/dashboard");
  }
}

export default function Login() {
  const data = useActionData();
  console.log(data);

  return (
    <div className="min-h-screen bg-[#1B1917] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-xl">

        {/* Logo */}

        <div className="text-center mb-10">

          <div className="flex justify-center mb-5">

            <img
              src={MainLogo}
              alt="Digital Twin"
              className="w-16 h-16 rounded-2xl shadow-lg"
            />

          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-[#ECE7DF]">

            <div className="inline-flex rounded-full border border-[#35312C] bg-[#24211D] px-4 py-2 text-sm text-[#A79F95] mb-6">
              🔐 Secure Login
            </div>

          </h1>

          <p className="mt-3 text-lg text-[#A79F95]">

            Sign in to continue using your Academic Digital Twin.

          </p>

        </div>

        {/* Login Card */}

        <div className="rounded-[32px] border border-[#35312C] bg-[#24211D] p-10 shadow-[0_10px_30px_rgba(0,0,0,.20)]">

          <Form method="POST">

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
                  placeholder="Enter your password"
                  className="ml-4 w-full bg-transparent text-[#ECE7DF] placeholder:text-[#7F786F] outline-none"
                />

              </div>

              <div className="mt-4 flex justify-end">

                <button
                  type="button"
                  className="text-sm text-[#A79F95] transition hover:text-[#D97757]"
                >
                  Forgot Password?
                </button>

              </div>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#D97757] text-lg font-medium text-white transition-all duration-200 hover:bg-[#C86645] hover:scale-[1.01]"
            >

              Sign In

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

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-medium text-[#D97757] transition hover:underline"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

