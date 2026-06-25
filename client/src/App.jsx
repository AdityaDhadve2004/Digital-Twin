import LandingPage from "./pages/LandingPage"
import Login, {actionLogin} from "./pages/Login"
import SignupPage, {actionSignup} from "./pages/Signup"
import DashboardLayout from "./layout/DashboardLayout"
import Dashboard, {loader as userLoader} from "./pages/Dashboard"
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from "react-router-dom"
import { actionSubject } from "./form/AddSubjectForm"
import Calculation,{loader as subjectLoader} from "./pages/Calculation"
import IA1, {loader as ia1Loader,actionIA1Prediction} from "./component/IA1"
import IA2, {loader as ia2Loader,actionIA2Prediction} from "./component/IA2"
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route index element={<LandingPage/>}/>
    <Route path="/login" element={<Login/>} action={actionLogin}/>
    <Route path="/signup" element={<SignupPage/>} action={actionSignup}/>
    <Route path="/dashboard" element={<DashboardLayout/>}>
      <Route index element={<Dashboard/>} loader={userLoader} action={actionSubject}/>
      <Route path="/dashboard/calculation" element={<Calculation/>} loader={subjectLoader}/> 
      <Route path="/dashboard/predictions/ia1" element={<IA1/>} loader={ia1Loader} action={actionIA1Prediction}/> 
      <Route path="/dashboard/predictions/ia2" element={<IA2/>} loader={ia2Loader} action={actionIA2Prediction}/>   
    </Route>
    </>
  ))

  return (
    <>
    <RouterProvider router={router}/> 
    </>
  )
}

export default App
