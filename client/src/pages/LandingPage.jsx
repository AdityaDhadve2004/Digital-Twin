import MainLogo from "../assets/Untitled.jpg"
import { Link } from "react-router-dom";
import React from "react";
import {
  ArrowRight,
  Brain,
  TrendingUp,
  Target,
  BookOpen,
  Award,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description:
      "Get personalized recommendations based on your learning patterns, strengths, and areas for improvement.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Monitor your academic performance with detailed analytics and visual progress charts.",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description:
      "Set SMART goals and receive guided action plans to achieve your academic milestones.",
  },
  {
    icon: BookOpen,
    title: "Personalized Study Plans",
    description:
      "Receive customized study schedules optimized for your learning style and course load.",
  },
  {
    icon: Award,
    title: "Skill Development",
    description:
      "Track both technical and soft skills, with recommendations for courses and certifications.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-stone-700 flex items-center gap-3">
            <div><img src={MainLogo} width="40px" height="35px" alt=""/></div>
            Digital Twin
          </h1>

          <div className="flex items-center gap-4">
            <Link to="/login" className="px-5 py-2 text-stone-700 hover:text-stone-900 transition">
              Login
            </Link>

            <Link to="/signup" className="px-5 py-2 rounded-lg bg-stone-700 text-white hover:bg-stone-800 transition">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-semibold text-stone-800 leading-tight">
              Your Personal Guide to
              <span className="block text-stone-700">
                Engineering Excellence
              </span>
            </h1>

            <p className="mt-8 text-xl text-stone-600 leading-relaxed">
              Navigate your engineering journey with confidence. Get
              personalized insights, track your progress, and achieve your
              academic goals.
            </p>

            <div className="mt-10">
              <Link to="/signup" className="flex items-center gap-2 px-8 py-4 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition">
                Get Started
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-2xl shadow-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <img
                src="https://images.unsplash.com/photo-1742093651514-df86c7742aa6?auto=format&fit=crop&w=1200&q=80"
                alt="Students learning together"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-8 bg-stone-100/50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-semibold text-stone-700">
              Everything You Need to Excel
            </h2>

            <p className="mt-6 text-xl text-stone-600">
              Our comprehensive platform provides all the tools and guidance
              you need to succeed in your engineering journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={index}
                  className="group p-8 rounded-xl bg-white border border-stone-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-stone-100 flex items-center justify-center mb-6 group-hover:bg-stone-200 transition">
                    <Icon className="w-7 h-7 text-stone-600" />
                  </div>

                  <h3 className="text-xl font-semibold text-stone-800 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-stone-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}