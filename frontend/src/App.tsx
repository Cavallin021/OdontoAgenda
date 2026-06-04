import { AuthProvider, useAuth } from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Login from "./pages/Login";
import MenuBar from "./components/MenuBar";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import NewAppointments from "./pages/NewAppointments";

function AppRoutes() {
  const { token } = useAuth(); // O AppRoutes agora pega o token do contexto

  return (
    <Routes>
      <Route
        path="/"
        element={!token ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={
          token ? (
            <main className="flex w-full min-h-screen">
              <MenuBar />
              <div className="flex-1">
                <Dashboard />
              </div>
            </main>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/appointments"
        element={
          token ? (
            <main className="flex w-full min-h-screen">
              <MenuBar />
              <div className="flex-1">
                <Appointments />
              </div>
            </main>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
      <Route
        path="/appointments/new"
        element={
          token ? (
            <main className="flex w-full min-h-screen">
              <MenuBar />
              <div className="flex-1">
                <NewAppointments />
              </div>
            </main>
          ) : (
            <Navigate to="/dashboard" />
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
