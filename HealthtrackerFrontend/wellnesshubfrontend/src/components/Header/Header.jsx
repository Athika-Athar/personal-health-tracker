import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserCircle2, Menu, X, Download } from "lucide-react";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ isAuthenticated, handleLoginToggle }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    handleLoginToggle();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleExport = async () => {
    try {
      const response = await fetch("http://localhost:8080/export/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Export failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "WellnessHub_Report.csv";
      link.click();

      toast.success("Health data exported successfully!");
    } catch {
      toast.error("Failed to export data");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white shadow-md w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 md:px-8">

        {/* ✅ LOGO → LANDING PAGE */}
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-blue-600"
        >
          WellnessHub
        </button>

        {/* ✅ RIGHT SIDE ONLY */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <UserCircle2 className="w-7 h-7 text-blue-600" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 w-full px-4 py-2 text-green-600 hover:bg-gray-100"
                  >
                    <Download size={16} />
                    Export Report
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLoginToggle}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={3000} transition={Slide} />
    </div>
  );
};

export default Header;