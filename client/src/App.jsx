import LandingPage from "./pages/LandingPage"
import Login, {actionLogin} from "./pages/Login"
import SignupPage, {actionSignup} from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route index element={<LandingPage/>}/>
    <Route path="/login" element={<Login/>} action={actionLogin}/>
    <Route path="/signup" element={<SignupPage/>} action={actionSignup}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    </>
  ))

  return (
    <>
    <RouterProvider router={router}/> 
    </>
  )
}

export default App
