import Slider from "../component/Slider";
import MainLogo from "../assets/Firefly_Gemini Flash_Design a premium minimal flat vector logo for an AI-powered academic assistant called 373158.png"
import { NavLink } from "react-router-dom"
import { useState } from "react";
export default function Navbar() {
    const [open, setOpen] = useState(false);
    return (
        <aside className="w-72 h-screen bg-[#171614] border-r border-[#302d28] flex flex-col px-5 py-7">

            <div>
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg">
                        <img src={MainLogo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight text-[#ECE7DF]">
                        Digital Twin
                    </h1>
                    <p className="text-sm text-[#A79F95]">
                        AI Academic Assistant
                    </p>
                </div>

                <nav className="space-y-3">

                    <NavLink
                        to="."
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200 border
                            
                            ${isActive
                                ? "bg-[#2B2823] border-[#D97757]/30 text-white"
                                : "border-transparent text-[#B5ADA4] hover:bg-[#24211D] hover:text-white"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/dashboard/calculation"
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-all duration-200 border
                            
                            ${isActive
                                ? "bg-[#2B2823] border-[#D97757]/30 text-white"
                                : "border-transparent text-[#B5ADA4] hover:bg-[#24211D] hover:text-white"
                            }`
                        }
                    >
                        SGPA & CGPA Calculation
                    </NavLink>


                    <button
                        onClick={() => setOpen(!open)}
                        className="w-full flex items-center justify-between rounded-2xl px-4 py-3.5 border border-[#35312C] bg-[#24211D] text-[#ECE7DF] hover:bg-[#2B2823] transition-all duration-200"
                    >
                        <span>Exam Predictions</span>

                        <svg
                            width="20"
                            height="20"
                            fill="none"
                            stroke="#D97757"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                            className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                                }`}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ${open
                                ? "max-h-60 opacity-100 mt-3"
                                : "max-h-0 opacity-0"
                            }`}
                    >
                        <div className="ml-5 border-l border-[#35312C] pl-5 space-y-2">

                            <NavLink
                                to="/dashboard/predictions/ia1"
                                className={({ isActive }) =>
                                    `block rounded-xl px-3 py-3 transition-all duration-200
                                    
                                    ${isActive
                                        ? "bg-[#2B2823] text-[#D97757]"
                                        : "text-[#B5ADA4] hover:bg-[#24211D] hover:text-white"
                                    }`
                                }
                            >
                                Early Semester Warning (IA1)
                            </NavLink>

                            <NavLink
                                to="/dashboard/predictions/ia2"
                                className={({ isActive }) =>
                                    `block rounded-xl px-3 py-3 transition-all duration-200
                                    
                                    ${isActive
                                        ? "bg-[#2B2823] text-[#D97757]"
                                        : "text-[#B5ADA4] hover:bg-[#24211D] hover:text-white"
                                    }`
                                }
                            >
                                End Semester Warning (IA2)
                            </NavLink>

                        </div>
                    </div>

                </nav>
            </div>
            <div className="mt-auto pt-8 border-t border-[#302D28]">
                <p className="text-xs text-[#7E776F] tracking-wide">
                    Digital Twin v1.0
                </p>
            </div>


        </aside>
    );
}