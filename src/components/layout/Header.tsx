import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Youtube, Gamepad2, BookOpen, Info, Images } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Trang chủ', icon: <Home size={18} /> },
    { path: '/kien-thuc', label: 'Kiến thức', icon: <BookOpen size={18} /> },
    { path: '/video', label: 'Video', icon: <Youtube size={18} /> },
    { path: '/game', label: 'Trò chơi', icon: <Gamepad2 size={18} /> },
    { path: '/thu-vien-3d', label: 'Thư viện 3D', icon: <Images size={18} /> },
    { path: '/ai-usage', label: 'Báo cáo AI', icon: <BookOpen size={18} /> },
    { path: '/about', label: 'Giới thiệu', icon: <Info size={18} /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-vietnam-red-700 via-vietnam-red-600 to-vietnam-red-700 backdrop-blur-md shadow-lg border-b border-vietnam-gold-500/30'
          : 'bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with spinning star animation */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="relative"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <svg
                className="w-10 h-10 text-vietnam-gold-500 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-white drop-shadow-md">
                Trung lưu Việt Nam
              </h1>
              <p className="text-xs text-vietnam-gold-400">
                Kỷ nguyên vươn mình
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  location.pathname === item.path
                    ? 'bg-vietnam-gold-500/20 text-vietnam-gold-400 border border-vietnam-gold-500/30'
                    : 'text-white/80 hover:bg-white/10 hover:text-vietnam-gold-400'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gradient-to-b from-vietnam-red-800 to-vietnam-red-900 border-t border-vietnam-gold-500/30 shadow-lg"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    location.pathname === item.path
                      ? 'bg-vietnam-gold-500/20 text-vietnam-gold-400 border border-vietnam-gold-500/30'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
