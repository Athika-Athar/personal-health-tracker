import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/Sidebar/Sidebar";
import ReminderToast from "../components/ReminderToast";

function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Routes that require authentication
  const protectedRoutes = [
    "/dashboard",
    "/userprofile",
    "/workout",
    "/progress",
    "/history",
    "/sleep",
    "/sleepHistory",
    "/mood",
    "/moodHistory",
    "/water",
    "/waterHistory",
    "/medications", // ✅ Include medication for auth
  ];

  // ✅ Identify landing page (HeroSection)
  const isHomePage = location.pathname === "/";

  // Check auth token
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      setLoading(false);
    };

    checkToken();
    window.addEventListener("authChanged", checkToken);
    return () => {
      window.removeEventListener("authChanged", checkToken);
    };
  }, []);

  // Redirect unauthenticated users
  useEffect(() => {
    if (!loading && protectedRoutes.includes(location.pathname)) {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }
  }, [loading, location.pathname, navigate]);

  // Login/logout handler
  const handleLoginToggle = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");

      Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith("reminder-")) {
          sessionStorage.removeItem(key);
        }
      });

      window.dispatchEvent(new Event("authChanged"));
      setIsAuthenticated(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header
        isAuthenticated={isAuthenticated}
        handleLoginToggle={handleLoginToggle}
      />

      {/* Sidebar for authenticated pages */}
      {isAuthenticated && !isHomePage && (
        <div className="w-full overflow-x-auto bg-white border-b shadow-sm">
          <div className="flex gap-6 px-4 py-3 min-w-max justify-start items-center">
            <SideBar layout="horizontal" />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className={`flex-1 ${isHomePage ? "" : "p-4 bg-gray-100"}`}>
        <Outlet />
      </main>

      {/* Reminder Toast */}
      {isAuthenticated && !isHomePage && <ReminderToast />}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;