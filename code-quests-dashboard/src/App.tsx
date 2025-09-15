import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthLayout, DashboardLayout } from "./modules/shared/components/template";
import Login from "./modules/Auth/Login";
import Dashboard from "./modules/Dashboard";
import Settings from "./modules/Settings";


function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
