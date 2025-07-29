// src/components/UpdatePassword.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const UpdatePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🟢 Parse access_token from URL hash and set session
  useEffect(() => {
    const handleSessionFromUrl = async () => {
      const { error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
      if (error) {
        setMessage("Token error: " + error.message);
      }
    };

    handleSessionFromUrl();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setMessage(" Error: " + error.message);
    } else {
      setMessage("Password updated!");
      setTimeout(() => navigate("/signin"), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Set a new password</h2>
        <input
          type="password"
          placeholder="New Password"
          required
          className="p-3 mb-4 border border-gray-300 rounded w-full"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white py-2 rounded w-full hover:bg-black"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
        {message && <p className="text-center text-sm mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default UpdatePassword;
