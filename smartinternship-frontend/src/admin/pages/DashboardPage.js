import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

export default function DashboardPage() {

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  const [recentApplications, setRecentApplications] = useState([]);

  const fetchDashboardData = async () => {
    try {

      // ✅ FIX: Attach admin JWT token to every dashboard request
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.warn("No admin token found.");
        return;
      }

      const headers = {
        "Authorization": `Bearer ${token}`
      };

      const statsRes = await fetch("http://https://smartinternship-backend.onrender.com/admin/dashboard/stats", { headers });

      if (!statsRes.ok) {
        throw new Error(`Stats fetch failed: ${statsRes.status}`);
      }

      const statsData = await statsRes.json();

      const recentRes = await fetch("http://https://smartinternship-backend.onrender.com/admin/dashboard/recent", { headers });

      if (!recentRes.ok) {
        throw new Error(`Recent fetch failed: ${recentRes.status}`);
      }

      const recentData = await recentRes.json();

      setStats(statsData);
      setRecentApplications(recentData);

    } catch (err) {
      console.error("Dashboard load error", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // ✅ Real-time polling every 5 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AdminLayout>
      <div className="p-10 bg-[#020617] min-h-screen text-white">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800 shadow-lg">
            <p className="text-gray-400">Total Applications</p>
            <h2 className="text-3xl font-bold text-blue-400">{stats.total}</h2>
          </div>

          <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800 shadow-lg">
            <p className="text-gray-400">Pending Reviews</p>
            <h2 className="text-3xl font-bold text-yellow-400">{stats.pending}</h2>
          </div>

          <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800 shadow-lg">
            <p className="text-gray-400">Approved</p>
            <h2 className="text-3xl font-bold text-green-400">{stats.approved}</h2>
          </div>

          <div className="bg-[#0f172a] p-6 rounded-xl border border-gray-800 shadow-lg">
            <p className="text-gray-400">Rejected</p>
            <h2 className="text-3xl font-bold text-red-400">{stats.rejected}</h2>
          </div>

        </div>

        {/* Recent Applications */}
        <div className="bg-[#0f172a] rounded-xl border border-gray-800 p-6 shadow-lg">

          <h2 className="text-xl font-semibold mb-6">
            Recent Applications
          </h2>

          <table className="w-full">
            <thead className="border-b border-gray-700 text-gray-400">
              <tr>
                <th className="text-left py-3">Candidate</th>
                <th className="text-left py-3">Email</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr
                  key={app.id}
                  className="border-b border-gray-800 hover:bg-[#1e293b]"
                >
                  <td className="py-4">{app.fullName}</td>
                  <td>{app.email}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-sm
                      ${app.status === "Pending" && "bg-yellow-500/20 text-yellow-400"}
                      ${app.status === "Approved" && "bg-green-500/20 text-green-400"}
                      ${app.status === "Rejected" && "bg-red-500/20 text-red-400"}
                    `}>
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </AdminLayout>
  );
}