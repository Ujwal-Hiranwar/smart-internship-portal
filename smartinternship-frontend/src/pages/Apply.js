import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export default function Apply() {

  const navigate = useNavigate();
  const { id } = useParams(); // internship id from URL

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    skills: "",
    linkedin: "",
    portfolio: "",
    whyHire: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ FIX: Retrieve the JWT token stored at login time
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to apply. Please login first.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://https://smartinternship-backend.onrender.com/applications/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // ✅ FIX: Send the JWT token so Spring Security can authenticate the request
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          internshipId: Number(id)
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        throw new Error(`Failed to submit application: ${response.status}`);
      }

      alert("Application submitted successfully!");
      navigate("/home");

    } catch (error) {
      console.error(error);
      alert("Error submitting application. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-black pt-24 px-4">

      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Internship Application
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
            required
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
            required
          />

          <input
            type="text"
            name="college"
            value={formData.college}
            onChange={handleChange}
            placeholder="College / University"
            className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
            required
          />

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills (React, Python, AI...)"
            className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
          />

          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn Profile"
            className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
          />

          <input
            type="text"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="Portfolio / GitHub"
            className="w-full p-3 rounded-lg bg-black/40 text-white border border-white/10 focus:outline-none"
          />

          <textarea
            name="whyHire"
            value={formData.whyHire}
            onChange={handleChange}
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