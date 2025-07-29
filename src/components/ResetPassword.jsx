// src/components/ResetPassword.jsx

import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/update-password", 
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset email sent. Check your inbox and click the link.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleResetPassword}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Reset your password</h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Do you remember your password again?
        </p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 mb-4 border border-gray-300 rounded w-full"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-2 rounded w-full hover:bg-black"
        >
          {loading ? "Sending..." : "Reset Password"}
        </button>
        {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}
        {message && <p className="text-green-600 text-sm text-center mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
