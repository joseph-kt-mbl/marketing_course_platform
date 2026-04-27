import './App.css'
import { Routes, Route } from "react-router-dom";

import Start from "./pages/Start";
import Welcome from "./pages/Welcome";
import Content from "./pages/Content";
import Verify from "./pages/Verify";
import Register from "./pages/Register";
import OtpUi from "./components/OtpUi";
import AuthGuard from "./AuthGuard";
import Dashboard from "./pages/Dashboard";
import PaymentGuard from "./PaymentGuard";

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Start />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/verify-otp" element={<OtpUi/>} />
        <Route path="/dashboard"
            element={
              <AuthGuard>
                <Dashboard />
              </AuthGuard>
            }
        />
         <Route path="/content"
            element={
              <PaymentGuard>
                <Content />
              </PaymentGuard>
            }
        />

      </Routes>
    </>
  )
}

export default App
