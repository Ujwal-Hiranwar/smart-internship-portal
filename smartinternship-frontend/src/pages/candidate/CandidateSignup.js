import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function CandidateSignup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      await axios.post(
        "http://https://smartinternship-backend.onrender.com/signup",
        {
          name,
          email,
          password,
          role: "CANDIDATE"
        }
      );

      alert("Account created successfully");

      navigate("/candidate/login");

    } catch (error) {

      alert("Signup failed");

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-[450px] p-10">

        <h2 className="text-3xl font-bold text-white mb-2 text-center">
          Create Candidate Account
        </h2>

        <p className="text-gray-300 text-center mb-8">
          Start applying for internships
        </p>

        <form onSubmit={handleSignup} className="space-y-5">

          {/* NAME */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:border-pink-400"
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:border-pink-400"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:border-pink-400"
          />

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-black/30 border border-white/20 text-white focus:outline-none focus:border-pink-400"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition py-3 rounded-lg text-white font-semibold shadow-lg"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>

        </form>

        {/* LOGIN LINK */}

        <p className="text-gray-300 text-center mt-6 text-sm">

          Already have an account?

          <Link
            to="/candidate/login"
            className="text-pink-400 hover:underline ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}