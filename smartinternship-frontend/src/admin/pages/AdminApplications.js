import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";

export default function AdminApplications() {

  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {

    const res = await fetch("https://smartinternship-backend.onrender.com/applications");
    const data = await res.json();

    setApplications(data);

  };

  const approveApplication = async (id) => {

    await fetch(`https://smartinternship-backend.onrender.com/applications/${id}/approve`, {
      method: "PUT"
    });

    fetchApplications();
  };

  const rejectApplication = async (id) => {

    await fetch(`https://smartinternship-backend.onrender.com/applications/${id}/reject`, {
      method: "PUT"
    });

    fetchApplications();
  };

  return (

    <AdminLayout>

      <div className="p-10 text-white">

        <h1 className="text-3xl font-bold mb-8">
          Manage Applications
        </h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">

          {applications.map((app) => (

            <div
              key={app.id}
              className="flex justify-between items-center border-b border-white/10 py-4"
            >

              <div>

                <h2 className="font-semibold text-lg">
                  {app.fullName}
                </h2>

                <p className="text-gray-300">
                  {app.email}
                </p>

                <p className="text-gray-400 text-sm">
                  Internship ID: {app.internshipId}
                </p>

              </div>

              <div className="flex items-center gap-4">

                <button
                  onClick={() => setSelectedApp(app)}
                  className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                >
                  Review
                </button>

                {app.status === "Pending" && (
                  <>
                    <button
                      onClick={() => approveApplication(app.id)}
                      className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectApplication(app.id)}
                      className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </>
                )}

              </div>

            </div>

          ))}

        </div>

        {selectedApp && (

          <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

            <div className="bg-gray-900 p-8 rounded-lg w-[500px]">

              <h2 className="text-2xl mb-4 font-bold">
                Application Review
              </h2>

              <p><b>Name:</b> {selectedApp.fullName}</p>
              <p><b>Email:</b> {selectedApp.email}</p>
              <p><b>Phone:</b> {selectedApp.phone}</p>
              <p><b>College:</b> {selectedApp.college}</p>
              <p><b>Skills:</b> {selectedApp.skills}</p>
              <p><b>LinkedIn:</b> {selectedApp.linkedin}</p>
              <p><b>Portfolio:</b> {selectedApp.portfolio}</p>
              <p><b>Why Hire:</b> {selectedApp.whyHire}</p>

              <button
                onClick={() => setSelectedApp(null)}
                className="mt-6 bg-purple-600 px-4 py-2 rounded"
              >
                Close
              </button>

            </div>

          </div>

        )}

      </div>

    </AdminLayout>

  );
}