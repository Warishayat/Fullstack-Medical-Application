import { useState } from "react";
import { FaUserMd, FaBookMedical, FaLock, FaShieldAlt } from "react-icons/fa";

const faqs = [
  {
    q: "What is MediBot.ai?",
    a: "MediBot.ai is an AI-powered medical assistant designed to provide accurate and educational medical information.",
  },
  {
    q: "Where does MediBot.ai get its knowledge?",
    a: "It is trained using trusted medical books and verified medical sources to ensure high-quality information.",
  },
  {
    q: "Can MediBot.ai replace a doctor?",
    a: "No. MediBot.ai is for guidance and learning only. Always consult a healthcare professional for diagnosis or treatment.",
  },
  {
    q: "Is MediBot.ai free to use?",
    a: "Yes, our core mission is to make medical knowledge accessible for educational and learning purposes.",
  },
  {
    q: "Is user data secure?",
    a: "Absolutely. We use industry-standard encryption and secure APIs to ensure your data remains private and protected.",
  },
];

export default function About() {
  const [open, setOpen] = useState(null);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-green-50 py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-6">
            Bridging Technology and <span className="text-green-600">Health</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            MediBot.ai is a modern medical application built to help users understand complex medical concepts 
            using advanced artificial intelligence. We focus on providing safe, informative, and 
            easy-to-understand answers.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <FaBookMedical className="text-green-600 text-4xl mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Verified Sources</h3>
          <p className="text-gray-600 text-sm">Trained on reliable medical literature and textbooks to ensure accuracy.</p>
        </div>
        <div className="p-8 bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <FaShieldAlt className="text-green-600 text-4xl mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Safety First</h3>
          <p className="text-gray-600 text-sm">Designed for educational purposes with built-in medical disclaimers.</p>
        </div>
        <div className="p-8 bg-white border border-green-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <FaLock className="text-green-600 text-4xl mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Secure Data</h3>
          <p className="text-gray-600 text-sm">Your privacy is our priority. All interactions are encrypted and private.</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto py-12 px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-900">Frequently Asked Questions</h2>
          <div className="h-1 w-20 bg-green-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className={`border rounded-xl transition-all duration-300 ${
                open === index ? "border-green-500 bg-green-50/30" : "border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full text-left p-5 flex justify-between items-center group"
              >
                <span className={`font-semibold ${open === index ? "text-green-700" : "text-gray-700 group-hover:text-green-600"}`}>
                  {item.q}
                </span>
                <span className={`transition-transform duration-300 transform ${open === index ? "rotate-180 text-green-600" : "text-gray-400"}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  open === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}