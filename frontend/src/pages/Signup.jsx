import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/signup", form);
      alert("Account created successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <form onSubmit={handleSignup} className="bg-slate-900 p-8 rounded-2xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6">Create Account</h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded mb-4 text-black"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded mb-4 text-black"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded mb-4 text-black"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-blue-500 w-full py-3 rounded-lg">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;