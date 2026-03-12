import { useEffect, useState } from "react";

export default function Applications() {

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const email = localStorage.getItem("candidateEmail");

      // ✅ FIX: Attach JWT token to the request
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found — user may not be logged in.");
        return;
      }

      const res = await fetch(`http://https://smartinternship-backend.onrender.com/applications/my/${email}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      setApplications(data);

    } catch (err) {
      console.error("Error loading applications", err);
    }
  };

  const statusStyle = (status) => {
    if (status === "Approved")
      return "bg-green-500/20 text-green-400";

    if (status === "Rejected")
      return "bg-red-500/20 text-red-400";

    return "bg-yellow-500/20 text-yellow-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white pt-28 px-6">

      <h1 className="text-4xl font-bold text-center mb-12">
        My Applications
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">

        {applications.length === 0 && (
          <p className="text-center text-gray-300">
            You haven't applied to any internships yet.
          </p>
        )}

        {applications.map((app) => (

          <div
            key={app.id}
            className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl flex justify-between items-center"
          >

            <div>

              <h2 className="text-lg font-semibold">
                Application ID: {app.id}
              </h2>

              <p className="text-gray-300">
                Internship ID: {app.internshipId}
              </p>

              <p className="text-gray-400 text-sm">
                {app.email}
              </p>

            </div>

            <span
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${statusStyle(
                app.status
              )}`}
            >
              {app.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}