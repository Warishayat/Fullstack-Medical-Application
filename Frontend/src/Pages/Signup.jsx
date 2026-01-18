import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error("All fields are required");

    setLoading(true);
    try {
      const res = await axios.post(
    "https://fullstack-medical-application-apis.onrender.com/user/register",
    {
      name,
      email,
      password
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
      toast.success("Account created! Please login.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-green-900 mb-2">Join Us</h2>
          <p className="text-gray-500">Start your medical AI journey today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
            <input 
              type="text"
              className="w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none" 
              placeholder="John Doe" 
              onChange={e => setForm({...form, name: e.target.value})} 
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
            <input 
              type="email"
              className="w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none" 
              placeholder="john@example.com" 
              onChange={e => setForm({...form, email: e.target.value})} 
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <input 
              type="password"
              className="w-full mt-1 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none" 
              placeholder="Minimum 8 characters" 
              onChange={e => setForm({...form, password: e.target.value})} 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800 active:scale-95'}`}
          >
            {loading ? "Creating Account..." : "Create Free Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-green-700 font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}