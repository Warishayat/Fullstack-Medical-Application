import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaRobot } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status whenever the component mounts
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    setIsOpen(false); // Close mobile menu on logout
  };

  // About page ab yahan shamil hai
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Assistant", path: "/assistant" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-green-700 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-green-100">
              <FaRobot className="text-white text-xl" />
            </div>
            <span className="text-xl font-black text-green-900 tracking-tighter">
              MediBot<span className="text-green-600">.ai</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="text-gray-600 hover:text-green-700 font-bold transition-colors"
              >
                {link.name}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="bg-red-50 text-red-600 px-5 py-2 rounded-xl font-bold hover:bg-red-100 transition-all border border-red-100"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-gray-700 font-bold hover:text-green-700">Login</Link>
                <Link to="/signup" className="bg-green-700 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-800 transition-all shadow-md shadow-green-200">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-900 focus:outline-none p-2 rounded-lg hover:bg-gray-50"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 space-y-2 bg-white border-t border-gray-50 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-4 text-base font-bold text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition-all"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3 pb-6">
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="w-full text-left px-4 py-4 text-red-600 font-bold hover:bg-red-50 rounded-xl"
              >
                Logout
              </button>
            ) : (
              <>
                <Link 
                  to="/login" 
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-4 font-bold text-gray-700 hover:bg-gray-50 rounded-xl"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-green-700 text-white px-6 py-4 rounded-2xl font-bold text-center shadow-lg shadow-green-100 active:scale-95 transition-transform"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}