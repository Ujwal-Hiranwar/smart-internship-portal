import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function CandidateLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        "http://https://smartinternship-backend.onrender.com/signin",
        {
          email,
          password
        }
      );

      const token = response.data;

      // store token
      localStorage.setItem("token", token);

      // ⭐ store candidate email (used in My Applications page)
      localStorage.setItem("candidateEmail", email);

      navigate("/home");

    } catch (error) {

      alert("Invalid email or password");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">

      {/* LOGIN CARD */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-[420px] p-10">

        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Candidate Login
        </h2>

        <p className="text-gray-300 text-center mb-8">
          Login to apply for internships
        </p>

        <form onSubmit={handleLogin} className="space-y-6">

          {/* EMAIL */}

          <div>
            <label className="text-gray-200 text-sm">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:border-pink-400 transition"
            />
          </div>

          {/* PASSWORD */}

          <div>
            <label className="text-gray-200 text-sm">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:border-pink-400 transition"
            />
          </div>

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition py-3 rounded-lg text-white font-semibold shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* SIGNUP LINK */}

        <p className="text-gray-300 text-center mt-6 text-sm">

          Don't have an account?

          <Link
            to="/candidate/signup"
            className="text-pink-400 hover:underline ml-1"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>

  );
}