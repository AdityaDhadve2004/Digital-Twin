import { Link } from "react-router-dom";
import { Form } from "react-router-dom";
import MainLogo from "../assets/Untitled.jpg"
import { useActionData,redirect } from "react-router-dom";
import { createUser } from "../api";
import React from "react";
import { Mail, Lock, ArrowRight, User } from "lucide-react";


export async function actionSignup({ request }){
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
    <div className="min-h-screen bg-[#f5f4f2] flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="text-center mb-10 mt-10">
        <h1 className="text-4xl font-bold text-[#26211d] mb-3 flex items-center gap-3">
          <div><img src={MainLogo} width="55px" height="40px" alt="" /></div>
          Digital Twin
        </h1>
        <p className="text-2xl text-[#5b5148]">
          Welcome back! Please sign in to your account
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl border border-gray-200 shadow-lg px-12 py-14">
        <Form method="POST">

          {/* Username */}
          <div className="mb-10">
            <label className="block text-xl font-medium text-[#4a433d] mb-4">
              Username
            </label>

            <div className="flex items-center h-20 border border-gray-300 rounded-2xl px-6">
              <User size={25} className="text-[#a39c96]" />
              <input
                name="username"
                type="name"
                placeholder="Enter your username"
                className="ml-5 w-full bg-transparent outline-none text-xl text-[#4a433d] placeholder:text-[#a39c96]"
              />
            </div>
          </div>
          {/* Email */}
          <div className="mb-10">
            <label className="block text-xl font-medium text-[#4a433d] mb-4">
              Email
            </label>

            <div className="flex items-center h-20 border border-gray-300 rounded-2xl px-6">
              <Mail size={25} className="text-[#a39c96]" />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="ml-5 w-full bg-transparent outline-none text-xl text-[#4a433d] placeholder:text-[#a39c96]"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xl font-medium text-[#4a433d] mb-4">
              Password
            </label>

            <div className="flex items-center h-20 border border-gray-300 rounded-2xl px-6">
              <Lock size={25} className="text-[#a39c96]" />
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="ml-5 w-full bg-transparent outline-none text-xl text-[#4a433d] placeholder:text-[#a39c96]"
              />
            </div>

            <button className="mt-4 text-xl text-[#6b625b] hover:text-[#4a433d] transition">
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button className="w-full mt-10 h-20 rounded-2xl bg-[#4b443d] hover:bg-[#3d3731] text-white text-xl font-semibold flex items-center justify-center gap-4 shadow-md transition">
            Sign In
            <ArrowRight size={25} />
          </button>
        </Form>


        {/* Divider */}
        <div className="flex items-center gap-5 my-10">
          <div className="flex-1 border-t border-gray-300" />
          <span className="text-[#6b625b] text-xl">or</span>
          <div className="flex-1 border-t border-gray-300" />
        </div>

        {/* Footer */}
        <div className="text-center text-xl text-[#5b5148]">
          If you have an account?{" "}
          <Link to="/login" className="font-semibold text-[#3d3731] hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}