import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Apply() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    skills: "",
    linkedin: "",
    portfolio: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later this will send data to backend API
    console.log(formData);

    // Redirect to home
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black pt-24 px-4">

  <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl shadow-lg">

    <h1 className="text-3xl font-bold text-center mb-6 text-white">
      Internship Application
    </h1>

    <form className="space-y-4">

      <input
        type="text"
        placeholder="Full Name"
        className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
      />

      <input
        type="email"
        placeholder="Email Address"
        className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
      />

      <input
        type="tel"
        placeholder="Phone Number"
        className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
      />

      <input
        type="text"
        placeholder="College / University"
        className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
      />

      <input
        type="text"
        placeholder="Skills (React, Python, AI...)"
        className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
      />

      <input
        type="text"
        placeholder="LinkedIn Profile"
        className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
      />

      <input
        type="text"
        placeholder="Portfolio / GitHub"
        className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
      />

      <textarea
        placeholder="Why should we hire you?"
        rows="4"
        className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
      />

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 py-3 rounded-lg font-semibold hover:opacity-90 transition"
      >
        Submit Application
      </button>

    </form>

  </div>

</div>
  );
}