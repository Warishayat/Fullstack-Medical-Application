import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", discussion_topic: "", message: "" });

  const submit = async () => {
    // 1. Validation
    if (!form.email || !form.message) {
      return toast.error("Please fill in the required fields");
    }

    // 2. Token Retrieval
    const token = localStorage.getItem("token");
    if (!token) {
      return toast.error("Please login to send a message");
    }

    setLoading(true);
    const toastId = toast.loading("Sending your message...");

    try {
      // 3. API Call with Authorization Header
      await axios.post(
        "http://127.0.0.1:8000/chat/message_us", 
        form,
        {
          headers: {
            "Authorization": `Bearer ${token}`, // THE FIX: Essential for FastAPI/Supabase
            "Content-Type": "application/json"
          }
        }
      );

      toast.success("Message sent successfully!", { id: toastId });
      setForm({ name: "", email: "", discussion_topic: "", message: "" }); // Reset form
      
    } catch (error) {
      console.error("Contact Error:", error);
      
      // Handling 401 specifically
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.", { id: toastId });
      } else {
        toast.error("Failed to send message", { id: toastId });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-grow max-w-6xl mx-auto px-4 py-16 w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-green-900 mb-4">Get In Touch</h2>
          <p className="text-gray-600">Have questions about MediBot.ai? We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-green-800 text-white p-8 rounded-2xl shadow-xl h-full">
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-green-700 p-3 rounded-lg">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <p className="text-green-200 text-sm">Email us at</p>
                    <p className="font-medium break-all">warishayat666@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-700 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-green-200 text-sm">Our Office</p>
                    <p className="font-medium text-lg leading-tight">Islamabad, Pakistan</p>
                    <p className="text-xs text-green-300 mt-1 italic tracking-wide uppercase">Sector F-10, Blue Area</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-700 p-3 rounded-lg">
                    <FaPhoneAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="text-green-200 text-sm">Call us</p>
                    <p className="font-medium">+92 3090333420</p>
                  </div>
                </div>
              </div>

              <div className="mt-16 pt-8 border-t border-green-700">
                <p className="text-sm text-green-200 opacity-70">
                  Our team typically responds within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input 
                  value={form.name}
                  placeholder="John Doe"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                <input 
                  value={form.email}
                  type="email"
                  placeholder="name@email.com"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  onChange={e => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-1 mb-4">
              <label className="text-sm font-semibold text-gray-700">Discussion Topic</label>
              <input 
                value={form.discussion_topic}
                placeholder="How can we help?"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                onChange={e => setForm({...form, discussion_topic: e.target.value})}
              />
            </div>

            <div className="space-y-1 mb-6">
              <label className="text-sm font-semibold text-gray-700">Message</label>
              <textarea 
                value={form.message}
                rows="5"
                placeholder="Write your message here..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                onChange={e => setForm({...form, message: e.target.value})}
              />
            </div>

            <button 
              onClick={submit} 
              disabled={loading}
              className={`w-full md:w-max flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-white font-bold transition-all shadow-lg ${
                loading ? "bg-green-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800 hover:shadow-green-200 active:scale-95"
              }`}
            >
              <FaPaperPlane /> {loading ? "Sending..." : "Send Message"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}