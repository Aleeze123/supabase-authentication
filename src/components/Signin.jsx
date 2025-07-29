import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { success, error: signInError, data } = await signInUser(email, password);

    if (!success) {
      if (signInError.toLowerCase().includes("email not confirmed")) {
        setError("Please check your email for confirmation.");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      const user = data?.user;

      if (!user?.confirmed_at) {
        setError("Please confirm your email before logging in.");
      } else {
        navigate("/dashboard");
      }
    }

    setLoading(false);

    // Auto-clear error after 3 seconds
    if (error) {
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSignIn}
        className="w-full max-w-md bg-gray-100 p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>

        <div className="flex flex-col mb-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="text-right text-sm mb-4">
          <Link to="/reset-password" className="text-blue-600 hover:underline">
            Reset Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        <p className="text-center text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
