import { BrowserRouter, Routes, Route } from "react-router-dom";
import Invitation from "./pages/Invitation";
import Menu from "./pages/Menu";
import AdminRsvps from "./pages/AdminRsvps";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import AdminVerifyOtp from "./pages/AdminVerifyOtp";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Invitation />} />
        <Route path="/menu" element={<Menu />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/verify-otp" element={<AdminVerifyOtp />} />
        <Route
          path="/admin/rsvps"
          element={
            <ProtectedAdminRoute>
              <AdminRsvps />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;