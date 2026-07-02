import MainLogo from "../assets/Firefly_Gemini Flash_Design a premium minimal flat vector logo for an AI-powered academic assistant called 373158.png"
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
    <div className="min-h-screen bg-[#1B1917] text-[#ECE7DF]">

      {/* ================= NAVBAR ================= */}

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#302D28] bg-[#1B1917]/90 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

          <div className="flex items-center gap-4">

            <img
              src={MainLogo}
              alt="Digital Twin"
              className="w-11 h-11 rounded-xl"
            />

            <div>

              <h1 className="text-xl font-semibold tracking-tight">
                Digital Twin
              </h1>

              <p className="text-sm text-[#9E978E]">
                Academic AI Assistant
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <Link
              to="/login"
              className="rounded-xl px-5 py-2.5 text-[#B5ADA4] transition hover:bg-[#24211D] hover:text-white"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="rounded-2xl bg-[#D97757] px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-[#C86645]"
            >
              Get Started
            </Link>

          </div>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="pt-40 pb-24">

        <div className="max-w-7xl mx-auto px-8">

          <div className="max-w-4xl">

            <div className="inline-flex items-center rounded-full border border-[#35312C] bg-[#24211D] px-5 py-2 text-sm text-[#B7AFA6]">

              ✨ AI Powered Academic Performance Predictor

            </div>

            <h1 className="mt-8 text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight">

              Your Academic

              <span className="block text-[#D97757]">

                Digital Twin

              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-[#A79F95]">

              Predict your Internal Assessment marks, calculate your CGPA,
              monitor semester progress and receive personalized AI insights
              powered by Gemini.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                to="/signup"
                className="flex items-center gap-3 rounded-2xl bg-[#D97757] px-8 py-4 font-medium text-white transition-all duration-200 hover:bg-[#C86645] hover:scale-[1.02]"
              >
                Start Free

                <ArrowRight size={18} />

              </Link>

              <Link
                to="/login"
                className="rounded-2xl border border-[#35312C] bg-[#24211D] px-8 py-4 text-[#ECE7DF] transition hover:border-[#D97757]/30 hover:bg-[#2B2823]"
              >
                Sign In
              </Link>

            </div>

          </div>

          {/* ================= STATS ================= */}

          <div className="grid gap-6 md:grid-cols-3 mt-24">

            <div className="rounded-3xl border border-[#35312C] bg-[#24211D] p-8 transition hover:border-[#D97757]/30">

              <p className="text-sm uppercase tracking-[0.2em] text-[#8A837A]">
                AI Powered
              </p>

              <h3 className="mt-4 text-3xl font-semibold">
                Gemini
              </h3>

              <p className="mt-3 text-[#A79F95] leading-7">
                Personalized academic predictions using Google's Gemini AI.
              </p>

            </div>

            <div className="rounded-3xl border border-[#35312C] bg-[#24211D] p-8 transition hover:border-[#D97757]/30">

              <p className="text-sm uppercase tracking-[0.2em] text-[#8A837A]">
                Track
              </p>

              <h3 className="mt-4 text-3xl font-semibold">
                8 Semesters
              </h3>

              <p className="mt-3 text-[#A79F95] leading-7">
                Store subjects, monitor progress and analyse performance across
                your engineering journey.
              </p>

            </div>

            <div className="rounded-3xl border border-[#35312C] bg-[#24211D] p-8 transition hover:border-[#D97757]/30">

              <p className="text-sm uppercase tracking-[0.2em] text-[#8A837A]">
                Predictions
              </p>

              <h3 className="mt-4 text-3xl font-semibold">
                IA1 • IA2
              </h3>

              <p className="mt-3 text-[#A79F95] leading-7">
                Receive intelligent predictions and actionable AI
                recommendations before your exams.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* PART 2 STARTS HERE */}

      {/* Keep your existing Features section temporarily.
       We'll completely replace it in the next step. */}

      {/* ================= HOW IT WORKS ================= */}

      <section className="py-28 bg-[#201E1B]">

        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center max-w-3xl mx-auto">

            <div className="inline-flex rounded-full border border-[#35312C] bg-[#24211D] px-5 py-2 text-sm text-[#A79F95]">

              How It Works

            </div>

            <h2 className="mt-8 text-5xl font-semibold text-[#ECE7DF]">

              From Data to AI Insights

            </h2>

            <p className="mt-6 text-xl leading-8 text-[#A79F95]">

              Digital Twin learns your academic performance and transforms it into
              personalized predictions and recommendations.

            </p>

          </div>

          <div className="grid lg:grid-cols-4 gap-8 mt-20">

            <div className="rounded-3xl border border-[#35312C] bg-[#24211D] p-8">

              <div className="w-12 h-12 rounded-2xl bg-[#302C27] flex items-center justify-center text-[#D97757] font-bold text-xl">

                1

              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#ECE7DF]">

                Add Subjects

              </h3>

              <p className="mt-4 leading-7 text-[#A79F95]">

                Register your engineering subjects along with semester and credits.

              </p>

            </div>

            <div className="rounded-3xl border border-[#35312C] bg-[#24211D] p-8">

              <div className="w-12 h-12 rounded-2xl bg-[#302C27] flex items-center justify-center text-[#D97757] font-bold text-xl">

                2

              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#ECE7DF]">

                Enter Performance

              </h3>

              <p className="mt-4 leading-7 text-[#A79F95]">

                Fill attendance, MSE marks and practical scores before every IA.

              </p>

            </div>

            <div className="rounded-3xl border border-[#35312C] bg-[#24211D] p-8">

              <div className="w-12 h-12 rounded-2xl bg-[#302C27] flex items-center justify-center text-[#D97757] font-bold text-xl">

                3

              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#ECE7DF]">

                AI Analysis

              </h3>

              <p className="mt-4 leading-7 text-[#A79F95]">

                Gemini evaluates your performance and predicts your internal marks.

              </p>

            </div>

            <div className="rounded-3xl border border-[#35312C] bg-[#24211D] p-8">

              <div className="w-12 h-12 rounded-2xl bg-[#302C27] flex items-center justify-center text-[#D97757] font-bold text-xl">

                4

              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#ECE7DF]">

                Improve

              </h3>

              <p className="mt-4 leading-7 text-[#A79F95]">

                Follow AI recommendations to maximize your IA and semester scores.

              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="py-28 bg-[#1B1917]">

        <div className="max-w-7xl mx-auto px-8">

          <div className="grid lg:grid-cols-2 gap-8">

            {features.map((feature, index) => {

              const Icon = feature.icon;

              return (

                <div
                  key={index}
                  className="group rounded-3xl border border-[#35312C] bg-[#24211D] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#D97757]/30 hover:bg-[#2B2823]"
                >

                  <div className="w-16 h-16 rounded-2xl bg-[#302C27] flex items-center justify-center">

                    <Icon className="w-8 h-8 text-[#D97757]" />

                  </div>

                  <h3 className="mt-8 text-2xl font-semibold text-[#ECE7DF]">

                    {feature.title}

                  </h3>

                  <p className="mt-5 text-[#A79F95] leading-8">

                    {feature.description}

                  </p>

                </div>

              );

            })}

          </div>

        </div>

      </section>

      {/* ================= CTA ================= */}

      <section className="py-28">

        <div className="max-w-5xl mx-auto px-8">

          <div className="rounded-[40px] border border-[#35312C] bg-[#24211D] p-16 text-center">

            <h2 className="text-5xl font-semibold text-[#ECE7DF]">

              Ready to Build Your Academic Digital Twin?

            </h2>

            <p className="mt-8 text-xl leading-8 text-[#A79F95] max-w-2xl mx-auto">

              Start tracking your academic journey today and receive intelligent
              predictions before every Internal Assessment.

            </p>

            <div className="mt-12 flex justify-center gap-5 flex-wrap">

              <Link
                to="/signup"
                className="rounded-2xl bg-[#D97757] px-10 py-4 text-lg font-medium text-white transition hover:bg-[#C86645]"
              >

                Create Free Account

              </Link>

              <Link
                to="/login"
                className="rounded-2xl border border-[#35312C] bg-[#2B2823] px-10 py-4 text-lg text-[#ECE7DF] transition hover:border-[#D97757]/30"
              >

                Sign In

              </Link>

            </div>

          </div>

        </div>

      </section>
    </div>
  );
}