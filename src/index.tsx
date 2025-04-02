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
          <Route path="/" element={<DashboardPage />} index />
          <Route path="/manage-keys" element={<ManageKeys />} />
          <Route path="/locate-keys" element={<LocateKeys />} />\
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/authentication/sign-in" element={<SignInPage />} />
          <Route path="/authentication/sign-up" element={<SignUpPage />} />
          <Route path="/users/list" element={<UserListPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </Flowbite>
  </StrictMode>
);
