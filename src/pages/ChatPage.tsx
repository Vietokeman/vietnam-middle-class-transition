import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Sparkles } from 'lucide-react';
import { FloatingChatBot } from '@/components/ChatBot';

const ChatPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-vietnam-red-50 via-vietnam-gold-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-vietnam-red-100 text-vietnam-red-700 px-4 py-2 rounded-full mb-4">
            <Sparkles size={20} />
            <span className="font-medium">AI Trợ lý học tập</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Chatbot Thông minh
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trợ lý AI chuyên về Chủ nghĩa xã hội khoa học và tầng lớp trung lưu Việt Nam. 
            Được huấn luyện dựa trên Chương 5 của giáo trình.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-vietnam-gold-200">
            <MessageCircle className="w-10 h-10 text-vietnam-red-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Hỏi đáp tức thì</h3>
            <p className="text-gray-600 text-sm">
              Đặt câu hỏi và nhận câu trả lời ngay lập tức từ AI
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-vietnam-gold-200">
            <Send className="w-10 h-10 text-vietnam-gold-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Dựa trên giáo trình</h3>
            <p className="text-gray-600 text-sm">
              Trả lời chính xác theo nội dung Chương 5 CNXH Khoa học
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg border border-vietnam-gold-200">
            <Sparkles className="w-10 h-10 text-purple-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Gemini AI</h3>
            <p className="text-gray-600 text-sm">
              Sử dụng công nghệ Gemini 2.5 của Google
            </p>
          </div>
        </motion.div>

        {/* Chat Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Bạn có thể hỏi về:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Khái niệm tầng lớp trung lưu theo Mác-Lênin là gì?',
              'Tại sao tầng lớp trung lưu Việt Nam phát triển mạnh từ Đổi mới 1986?',
              'Số liệu World Bank về tầng lớp trung lưu Việt Nam',
              'Vai trò của doanh nhân trong cơ cấu xã hội mới',
              'Mối quan hệ giữa kinh tế và cơ cấu xã hội giai cấp',
              'Mục tiêu 2045 về tầng lớp trung lưu',
              'Kỷ nguyên vươn mình là gì?',
              'Giải pháp định hướng XHCN cho tầng lớp trung lưu',
            ].map((question, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-vietnam-red-50 transition-colors cursor-pointer"
              >
                <span className="text-vietnam-gold-500">💡</span>
                <span className="text-gray-700 text-sm">{question}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 rounded-2xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-4">
            Bắt đầu trò chuyện ngay!
          </h2>
          <p className="mb-6 text-white/90">
            Nhấn vào nút ⭐ ở góc phải màn hình để mở chatbot AI
          </p>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <Sparkles className="w-8 h-8 text-vietnam-red-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* The actual chatbot is rendered in App.tsx */}
    </div>
  );
};

export default ChatPage;
