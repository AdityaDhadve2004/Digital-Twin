import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar"

export default function DashboardLayout() {
 
  return (
    <div className="flex min-h-screen">
      <Navbar  />
      <div className="flex-1 bg-gray-50 p-8">
        <div className="mt-6">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}