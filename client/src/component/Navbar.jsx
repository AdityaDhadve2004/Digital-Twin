import Slider from "../component/Slider";
import MainLogo from "../assets/Untitled.jpg"
import { NavLink } from "react-router-dom"
import { useState } from "react";
export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <div className="w-64 h-screen bg-black/70 border border-white/10flex flex-col justify-between p-5">

            <div>
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 rounded-lg overflow-hidden">
                        <img src={MainLogo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-xl font-semibold text-white">
                        Digital Twin
                    </h1>
                </div>

                <nav className="space-y-2">

                    <NavLink
                        to="."
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                            ${isActive
                                ? "bg-orange-500 text-white shadow-lg"
                                : "text-zinc-300 hover:bg-orange-500/10 hover:text-orange-400"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/dashboard/calculation"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                            ${isActive
                                ? "bg-orange-500 text-white shadow-lg"
                                : "text-zinc-300 hover:bg-orange-500/10 hover:text-orange-400"
                            }`
                        }
                    >
                        SGPA & CGPA Calculation
                    </NavLink>


                    <button
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 bg-orange-500 text-white shadow-lg hover:bg-orange-500/10 hover:text-orange-400"
                        onClick={() => setOpen(!open)}
                    >
                        <span>Exam Predictions</span>
                        <svg
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"
                            }`}
                    >
                        <NavLink
                            to="/dashboard/predictions/ia1"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                            ${isActive
                                    ? "bg-orange-500 text-white shadow-lg"
                                    : "text-zinc-300 hover:bg-orange-500/10 hover:text-orange-400"
                                }`
                            }
                        >Early Semester Warning Prediction(IA1)
                        </NavLink>
                        <NavLink
                            to="/dashboard/predictions/ia2"
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                            ${isActive
                                    ? "bg-orange-500 text-white shadow-lg"
                                    : "text-zinc-300 hover:bg-orange-500/10 hover:text-orange-400"
                                }`
                            }
                        >End Semester Warning Prediction(IA2)
                        </NavLink>
                        
                    </div>

                </nav>
            </div>

        </div>
    );
}