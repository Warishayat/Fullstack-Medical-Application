import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaHeart } from "react-icons/fa"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-900 text-green-50 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Medi<span className="text-green-400">Bot</span>.ai
          </h2>
          <p className="text-green-200 text-sm leading-relaxed">
            Empowering your health with AI-driven insights. Your 24/7 personal medical assistant for quick information and guidance.
          </p>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white transition-colors"><FaFacebook /></a>
            <a href="#" className="hover:text-white transition-colors"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition-colors"><FaLinkedin /></a>
            <a href="#" className="hover:text-white transition-colors"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Platform</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-400 transition-colors">Home</Link></li>
            <li><Link to="/assistant" className="hover:text-green-400 transition-colors">AI Assistant</Link></li>
            <li><Link to="/about" className="hover:text-green-400 transition-colors">Our Mission</Link></li>
            <li><Link to="/contact" className="hover:text-green-400 transition-colors">Contact Support</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-green-400 transition-colors">Medical Disclaimer</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Stay Updated</h3>
          <p className="text-sm text-green-200 mb-4">Get the latest health tech updates.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Email" 
              className="bg-green-800 border-none rounded-l-md px-3 py-2 w-full focus:ring-1 focus:ring-green-400 text-white outline-none"
            />
            <button className="bg-green-500 hover:bg-green-400 text-green-900 font-bold px-4 py-2 rounded-r-md transition-colors">
              Go
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-green-800 text-center text-sm text-green-300">
        <p className="flex items-center justify-center gap-1">
          © {currentYear} MediBot.ai. Built with <FaHeart className="text-red-500 text-xs" /> for a healthier world.
        </p>
      </div>
    </footer>
  );
}