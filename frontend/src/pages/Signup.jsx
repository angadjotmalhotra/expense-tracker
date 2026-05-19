import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.18), rgba(255,255,255,0.30)), url('/finance-bg.png')",
      }}
    >
      <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-[3rem] overflow-hidden backdrop-blur-2xl shadow-2xl border border-white/30">
        <div className="hidden lg:flex flex-col justify-between bg-emerald-950/80 text-white p-12">
          <div>
            <h1 className="text-5xl font-black">SpendWise</h1>

            <p className="mt-5 text-emerald-100 text-lg leading-relaxed">
              Build healthier financial habits with beautiful expense tracking
              and smarter budgeting tools.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-5">
              <p className="text-sm text-emerald-100">
                “Every dollar you save today gives you freedom tomorrow.”
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/10 rounded-3xl p-5 flex-1">
                <p className="text-3xl font-black">24k+</p>
                <p className="text-sm text-emerald-100">Transactions Tracked</p>
              </div>

              <div className="bg-white/10 rounded-3xl p-5 flex-1">
                <p className="text-3xl font-black">98%</p>
                <p className="text-sm text-emerald-100">Happy Users</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-2xl p-8 md:p-14">
          <div className="max-w-md mx-auto">
            <div className="mb-10">
              <h2 className="text-5xl font-black text-slate-950">
                Create Account
              </h2>

              <p className="text-slate-700 mt-3 text-lg">
                Start tracking your finances beautifully.
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl px-5 py-4 outline-none shadow-lg"
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl px-5 py-4 outline-none shadow-lg"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl px-5 py-4 outline-none shadow-lg"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>

              <button className="w-full bg-emerald-900 hover:bg-emerald-950 transition-all text-white py-4 rounded-2xl font-black shadow-xl">
                Create Account
              </button>
            </form>

            <p className="mt-8 text-center text-slate-700">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-black text-emerald-900 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;