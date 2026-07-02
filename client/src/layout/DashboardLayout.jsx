import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar"

export default function DashboardLayout() {
 
  return (
    <div className="flex min-h-screen bg-[#1B1917] text-[#ECE7DF]">
      <Navbar  />
      <div className="flex-1 overflow-y-auto px-10 py-8">
        <div className="max-w-[1600px] mx-auto">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}