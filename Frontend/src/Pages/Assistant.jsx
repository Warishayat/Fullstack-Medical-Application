import { useState, useRef, useEffect } from "react";
import { FaRobot, FaPaperPlane, FaUser } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Assistant() {
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const askBot = async () => {
    if (!question.trim()) return;

    // IMPORTANT: Token hamesha function ke andar se uthayein taake naya mile
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to use the assistant");
      return;
    }

    const userQ = question;
    setChat((prev) => [...prev, { role: "user", text: userQ }]);
    setLoading(true);
    setQuestion("");

    try {
      const res = await fetch("https://fullstack-medical-application-apis.onrender.com/medical/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Fix: Bearer ke baad space lazmi check karein
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: userQ }),
      });

      if (res.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        return;
      }
      const data = await res.json();
      setChat((prev) => [...prev, { role: "bot", text: data.response }]);
    } catch (error) {
      console.error("Assistant Error:", error);
      toast.error("Connection failed. Check your server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] bg-gray-50 max-w-5xl mx-auto my-6 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white">
      {/* Top Header */}
      <div className="bg-green-800 p-6 text-white font-bold flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaRobot className="text-2xl" />
          <span>MediBot AI Assistant</span>
        </div>
        <div className="text-[10px] bg-green-700 px-3 py-1 rounded-full animate-pulse">
          SYSTEM ACTIVE
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white/50 backdrop-blur-sm">
        {chat.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <FaRobot size={40} className="mx-auto mb-4 opacity-20" />
            <p className="italic">
              How can I assist you with your medical query today?
            </p>
          </div>
        )}

        {chat.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-3 max-w-[85%] ${
                m.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  m.role === "user"
                    ? "bg-green-700 text-white"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {m.role === "user" ? (
                  <FaUser size={12} />
                ) : (
                  <FaRobot size={12} />
                )}
              </div>
              <div
                className={`p-4 rounded-2xl shadow-sm text-sm ${
                  m.role === "user"
                    ? "bg-green-700 text-white rounded-tr-none"
                    : "bg-white text-gray-800 rounded-tl-none border border-green-50"
                }`}
              >
                {m.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-green-600 animate-pulse text-[10px] font-bold ml-12">
            MediBot is typing...
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div className="p-6 bg-white border-t flex gap-4">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && askBot()}
          className="flex-1 border-none bg-gray-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Ask about symptoms, medicines, or anatomy..."
        />
        <button
          onClick={askBot}
          disabled={loading}
          className={`p-5 rounded-2xl shadow-lg transition-all ${
            loading
              ? "bg-gray-300"
              : "bg-green-700 text-white hover:bg-green-800 active:scale-95"
          }`}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}
