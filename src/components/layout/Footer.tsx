import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Github, Mail, BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Star className="w-8 h-8 text-vietnam-gold-500" fill="currentColor" />
              <div>
                <h3 className="font-bold text-xl">Tầng lớp Trung lưu Việt Nam</h3>
                <p className="text-gray-400 text-sm">Kỷ nguyên vươn mình</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Nền tảng học tập AI về vai trò tầng lớp trung lưu trong xây dựng CNXH. 
              Dựa trên Chương 5 - Cơ cấu xã hội giai cấp trong thời kỳ quá độ lên Chủ nghĩa xã hội.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-vietnam-red-900/50 px-3 py-1.5 rounded-full text-sm">
              <BookOpen size={14} />
              <span>Môn: Chủ nghĩa xã hội khoa học (MLN131)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-vietnam-gold-400">Liên kết</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/kien-thuc" className="text-gray-400 hover:text-white transition">
                  Tóm tắt kiến thức
                </Link>
              </li>
              <li>
                <Link to="/video" className="text-gray-400 hover:text-white transition">
                  Video giảng dạy
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-gray-400 hover:text-white transition">
                  Chatbot AI
                </Link>
              </li>
              <li>
                <Link to="/game" className="text-gray-400 hover:text-white transition">
                  Trò chơi
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-vietnam-gold-400">Tài nguyên</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/ai-usage" className="text-gray-400 hover:text-white transition">
                  Báo cáo AI
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  Giới thiệu dự án
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition flex items-center gap-2"
                >
                  <Github size={14} />
                  Source Code
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Tầng lớp Trung lưu Việt Nam. Bài tập nhóm MLN131.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="mailto:contact@example.com"
                className="text-gray-400 hover:text-white transition"
              >
                <Mail size={20} />
              </a>
              <a 
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition"
              >
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
