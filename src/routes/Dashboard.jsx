import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate("/");
    } catch (err) {
      console.error("Unexpected error signing out:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        <p className="text-gray-700 text-lg">
          Welcome, <span className="font-medium text-black">{session?.user?.email}</span>
        </p>

        <button
          onClick={handleSignOut}
          className="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
