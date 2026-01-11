import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  FaStethoscope, FaMicroscope, FaUserMd, 
  FaLock, FaBook, FaLanguage, FaArrowRight 
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const features = [
    {
      title: "Symptom Analysis",
      para: "Describe your symptoms in simple words. Our AI analyzes patterns to provide educational insights on possible health conditions.",
      icon: <FaStethoscope />,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Verified Literature",
      para: "MediBot is specifically trained on globally recognized medical textbooks like Gray's Anatomy and Harrison's Principles.",
      icon: <FaBook />, 
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Student Research",
      para: "A powerful tool for medical students. Simplify complex pharmacological pathways or anatomical structures instantly.",
      icon: <FaMicroscope />,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      title: "Clinical Reference",
      para: "Access summaries of drug interactions, side effects, and clinical protocols used by healthcare professionals worldwide.",
      icon: <FaUserMd />,
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      title: "Privacy First",
      para: "Your health data is sensitive. We use enterprise-grade encryption to ensure your inquiries remain 100% private.",
      icon: <FaLock />,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      title: "Multi-Language",
      para: "Breaking communication barriers. Query medical concepts and receive detailed explanations in over 50 global languages.",
      icon: <FaLanguage />,
      color: "text-cyan-600",
      bg: "bg-cyan-50"
    }
  ];

  return (
    <div className="pb-24 font-sans text-slate-900">
      {/* --- Hero Section --- */}
      <section className="relative bg-gradient-to-b from-green-50 via-white to-white py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Next-Gen Medical AI
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8">
            Advanced Medical AI <br />
            <span className="text-green-700">For Everyone.</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Empowering patients and medical students with real-time insights 
            trained on trusted clinical research and verified literature.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate(isLoggedIn ? "/assistant" : "/signup")}
              className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-green-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoggedIn ? "Open Assistant" : "Get Started Free"} <FaArrowRight />
            </button>
            
            {!isLoggedIn && (
              <button 
                onClick={() => navigate("/about")}
                className="bg-white border-2 border-slate-200 text-slate-700 px-10 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all"
              >
                Learn More
              </button>
            )}
          </div>
        </div>

        {/* Decorative Background Blur */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-green-200/40 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-100/40 blur-[120px] rounded-full"></div>
      </section>

      {/* --- Feature Grid --- */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">Powerful Capabilities</h2>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto italic">
            Designed to provide speed, accuracy, and depth in medical learning.
          </p>
          <div className="h-1.5 w-24 bg-green-600 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((f, i) => (
            <div 
              key={i} 
              className="group p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >
              <div className={`text-4xl p-6 rounded-[2rem] inline-block mb-8 ${f.bg} ${f.color} group-hover:scale-110 transition-transform duration-500`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm lg:text-base font-medium">
                {f.para}
              </p>
              
              <div className="mt-8 flex items-center gap-2 text-green-700 font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                Learn Detail <FaArrowRight />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Trust Quote Section --- */}
      <section className="mt-32 max-w-6xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to meet your assistant?
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
              Join students and professionals who are using MediBot to simplify 
              their medical research and symptom understanding.
            </p>
            <button 
              onClick={() => navigate("/assistant")}
              className="bg-green-500 hover:bg-green-400 text-slate-900 px-12 py-4 rounded-2xl font-black transition-all hover:scale-105 active:scale-95 shadow-xl shadow-green-500/20"
            >
              Chat With MediBot Now
            </button>
          </div>
          
          {/* Accent Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
        </div>
      </section>
    </div>
  );
}