import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError(" Passwords do not match.");
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoading(true);

    const { success, error: signupError } = await signUpNewUser(email, password);

    if (!success) {
      setError(` ${signupError}`);
      setTimeout(() => setError(null), 3000);
    } else {
      // ✅ After sign-up, user gets confirmation email
   
      setTimeout(() => {
        setError(null);
        navigate("/signin");
      }, 3000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-gray-100 p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        <div className="flex flex-col mb-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            type="email"
            placeholder="Email"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            type="password"
            placeholder="Password"
            required
          />
        </div>

        <div className="flex flex-col mb-4">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
            type="password"
            placeholder="Confirm Password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {error && <p className="text-red-600 text-center mt-4">{error}</p>}

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
