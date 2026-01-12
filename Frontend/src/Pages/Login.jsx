import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); // Page refresh hone se rokne ke liye
    
    if (!form.email || !form.password) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);
    const toastId = toast.loading("Verifying credentials...");

    try {
      const res = await axios.post("https://fullstack-medical-application-apis.onrender.com/user/login", form);
      
      // DEBUG: Isay console mein check karein ke backend kiya bhej raha hai
      console.log("Login Response:", res.data);

      /**
       * IMPORTANT FIX: 
       * Backend aksar token ko 'token' ya 'access_token' ki key mein bhejta hai.
       * Hum dono check kar rahe hain taake galti na ho.
       */
      const token = res.data.token || res.data.access_token;

      if (token) {
        // 1. Token ko localStorage mein save karein
        localStorage.setItem("token", token);
        
        toast.success("Welcome Back to MediBot!", { id: toastId });

        // 2. Navigation se pehle thora wait ya force refresh 
        // taake Navbar aur Assistant ko naya token mil jaye
        navigate("/assistant");
        window.location.reload(); 
      } else {
        toast.error("Token missing in server response", { id: toastId });
      }

    } catch (err) {
      console.error("Login Error:", err);
      const errorMsg = err.response?.data?.detail || "Invalid Email or Password";
      toast.error(errorMsg, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-green-900 mb-2">Login</h2>
          <p className="text-gray-500 font-medium">Access your medical assistant</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
            <input 
              type="email"
              required
              className="w-full mt-2 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all" 
              placeholder="name@example.com" 
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <input 
              type="password"
              required
              className="w-full mt-2 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all" 
              placeholder="••••••••" 
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} 
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition-all active:scale-95 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
            }`}
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-700 font-bold hover:underline">
              Sign Up Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}