import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        "https://smartinternship-backend.onrender.com/signin",
        {
          email: email,
          password: password
        }
      );

      const token = response.data;

      // store JWT token
      localStorage.setItem("token", token);

      alert("Login Successful");

      // redirect to admin dashboard
      navigate("/admin");

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert("Invalid Email or Password");
      } else {
        alert("Server error. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#020617] via-[#020617] to-[#0f172a]">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">

        <div className="text-center px-12">

          <h1 className="text-5xl font-bold text-purple-400 mb-6">
            SmartInterns
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            Manage internships, applications and candidates efficiently.
          </p>

          <img
            src="https://illustrations.popsy.co/gray/work-from-home.svg"
            alt="admin"
            className="w-[420px] mx-auto opacity-90 animate-float"
          />

        </div>

      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="flex w-full lg:w-1/2 items-center justify-center">

        <div className="bg-[#020617]/70 backdrop-blur-lg border border-purple-500/20 p-10 rounded-2xl shadow-2xl w-[420px]">

          <h2 className="text-3xl font-bold text-white mb-2">
            Admin Login
          </h2>

          <p className="text-gray-400 mb-8">
            Login to access the admin dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* EMAIL */}
            <div>

              <label className="text-gray-400 text-sm">
                Email Address
              </label>

              <input
                type="email"
                placeholder="admin@company.com"
                className="w-full mt-2 px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

            </div>

            {/* PASSWORD */}
            <div>

              <label className="text-gray-400 text-sm">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="w-full mt-2 px-4 py-3 bg-[#0f172a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 transition duration-300 py-3 rounded-lg font-semibold text-white shadow-lg"
            >
              {loading ? "Logging in..." : "Login to Admin Panel"}
            </button>

          </form>

          {/* BACK BUTTON */}
          <div className="text-center mt-6">

            <button
              onClick={() => navigate("/")}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              ← Back to role selection
            </button>

          </div>

        </div>

      </div>

      {/* FLOAT ANIMATION */}
      <style>
        {`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        `}
      </style>

    </div>
  );
}

export default AdminLogin;