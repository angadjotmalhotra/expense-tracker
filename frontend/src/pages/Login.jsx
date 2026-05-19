import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <form onSubmit={handleLogin} className="bg-slate-900 p-8 rounded-2xl w-[400px]">
        <h1 className="text-3xl font-bold mb-6">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded mb-4 text-black"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded mb-4 text-black"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-blue-500 w-full py-3 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;