import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

export default function Users() {

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {

    try {

      const res = await fetch("http://https://smartinternship-backend.onrender.com/admin/users");

      const data = await res.json();

      setUsers(data);

    } catch (err) {

      console.error("Error loading users", err);

    }

  };

  useEffect(() => {

    fetchUsers();

    const interval = setInterval(() => {

      fetchUsers();

    }, 5000); // refresh every 5 seconds

    return () => clearInterval(interval);

  }, []);

  return (

    <AdminLayout>

      <div className="p-10 bg-[#020617] min-h-screen text-white">

        <h1 className="text-3xl font-bold mb-8">
          Users
        </h1>

        <div className="bg-[#0f172a] rounded-xl border border-gray-800 p-6 shadow-lg">

          <table className="w-full">

            <thead className="border-b border-gray-700 text-gray-400">

              <tr>
                <th className="text-left py-3">ID</th>
                <th className="text-left py-3">Name</th>
                <th className="text-left py-3">Email</th>
              </tr>

            </thead>

            <tbody>

              {users.length === 0 && (

                <tr>

                  <td colSpan="3" className="text-center py-6 text-gray-400">
                    No users registered yet
                  </td>

                </tr>

              )}

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="border-b border-gray-800 hover:bg-[#1e293b] transition"
                >

                  <td className="py-4">
                    {user.id}
                  </td>

                  <td>
                    {user.name || "Candidate"}
                  </td>

                  <td>
                    {user.email}
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