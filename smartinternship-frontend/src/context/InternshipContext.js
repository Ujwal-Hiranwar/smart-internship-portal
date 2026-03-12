import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const InternshipContext = createContext();

const API = "http://https://smartinternship-backend.onrender.com";

export const InternshipProvider = ({ children }) => {

  const [internships, setInternships] = useState([]);
  const [applications, setApplications] = useState([]);

  // -------------------------
  // GET ALL INTERNSHIPS
  // -------------------------

  const fetchInternships = async () => {
    try {
      const res = await axios.get(`${API}/internships`);
      setInternships(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------
  // ADD INTERNSHIP (ADMIN)
  // -------------------------

  const addInternship = async (data) => {
    try {
      await axios.post(`${API}/admin/internships`, data);
      fetchInternships();
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------
  // DELETE INTERNSHIP
  // -------------------------

  const deleteInternship = async (id) => {
    try {
      await axios.delete(`${API}/admin/internships/${id}`);
      fetchInternships();
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------
  // APPLY INTERNSHIP
  // -------------------------

  const applyInternship = async (data) => {
    try {
      await axios.post(`${API}/applications/apply`, data);
    } catch (err) {
      console.error(err);
    }
  };

  // -------------------------
  // GET APPLICATIONS
  // -------------------------

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${API}/applications`);
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  return (
    <InternshipContext.Provider
      value={{
        internships,
        applications,
        fetchInternships,
        addInternship,
        deleteInternship,
        applyInternship,
        fetchApplications
      }}
    >
      {children}
    </InternshipContext.Provider>
  );
};