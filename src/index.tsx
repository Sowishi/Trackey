import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import UserListPage from "./pages/users/list";
import ManageKeys from "./pages/manage-keys";
import LocateKeys from "./pages/locate-keys";
import Schedules from "./pages/schedules";
import Logs from "./pages/logs";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/protectedRoute";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          {/* ✅ Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-keys"
            element={
              <ProtectedRoute>
                <ManageKeys />
              </ProtectedRoute>
            }
          />
          <Route
            path="/locate-keys"
            element={
              <ProtectedRoute>
                <LocateKeys />
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedules"
            element={
              <ProtectedRoute>
                <Schedules />
              </ProtectedRoute>
            }
          />
          <Route
            path="/logs"
            element={
              <ProtectedRoute>
                <Logs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/list"
            element={
              <ProtectedRoute>
                <UserListPage />
              </ProtectedRoute>
            }
          />

          {/* ✅ Public routes */}
          <Route path="/authentication/sign-in" element={<SignInPage />} />
          <Route path="/authentication/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Flowbite>
  </StrictMode>
);
