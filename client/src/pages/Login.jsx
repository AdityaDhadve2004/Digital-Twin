import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import MainLogo from "../assets/Untitled.jpg"
import React from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";

export async function actionLogin({ request }){
  const formData = await request.formData()
  console.log(formData);
  const jsonData = Object.fromEntries(formData);
  console.log(jsonData);
}

export default function Login() {

  return (
    <div className="min-h-screen bg-[#f7f6f4] flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#2b241f] flex items-center gap-3">
          <div><img src={MainLogo} width="55px" height="40px" alt="" /></div>
          Digital Twin
        </h1>

        <p className="mt-4 text-2xl text-[#5f564e]">
          Welcome back! Sign in to continue
        </p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-200 shadow-lg p-10">
        {/* Email */}
        <Form method="POST">
          <div className="mb-8">
            <label className="block text-lg font-medium text-[#4d4741] mb-3">
              Email
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-5 h-16">
              <Mail className="w-6 h-6 text-gray-400" />

              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="ml-4 w-full bg-transparent outline-none text-lg text-[#4d4741] placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-medium text-[#4d4741] mb-3">
              Password
            </label>

            <div className="flex items-center border border-gray-300 rounded-2xl px-5 h-16">
              <Lock className="w-6 h-6 text-gray-400" />

              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="ml-4 w-full bg-transparent outline-none text-lg text-[#4d4741] placeholder:text-gray-400"
              />
            </div>

            <div className="mt-3 text-right">
              <button className="text-[#6a6159] hover:text-[#4d4741] transition">
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button className="w-full mt-8 bg-[#4a443d] hover:bg-[#3d3832] text-white font-semibold text-xl py-4 rounded-2xl flex items-center justify-center gap-3 shadow-md transition">
            Sign In
            <ArrowRight className="w-6 h-6" />
          </button>
        </Form>
        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-300"></div>

          <span className="px-4 text-[#6a6159]">or</span>

          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Footer */}
        <p className="text-center text-[#5f564e] text-lg">
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold text-[#3d3832] hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

