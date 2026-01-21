import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, GraduationCap, Star, Heart, BookOpen, Rocket } from 'lucide-react';

const AboutPage: React.FC = () => {
  const projectGoals = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Chiều sâu học thuật',
      description: 'Phân tích tầng lớp trung lưu dựa trên lý luận Chương 5 CNXH Khoa học, kết hợp số liệu thực tế từ World Bank và các nghị quyết của Đảng.',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Sáng tạo hình thức',
      description: 'Website tương tác với intro loader, animations, chatbot AI và trò chơi quiz - mang lại trải nghiệm học tập hấp dẫn.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Tính tương tác',
      description: 'Quiz kiểm tra kiến thức, chatbot hỏi đáp AI, và video YouTube nhúng trực tiếp giúp người dùng chủ động học tập.',
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Ứng dụng AI có trách nhiệm',
      description: 'Sử dụng Gemini AI minh bạch, tuân thủ nguyên tắc đạo đức và phù hợp với quan điểm chính thống.',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Cập nhật thực tiễn',
      description: 'Liên hệ với Đại hội XIV, Kỷ nguyên vươn mình, Nghị quyết 41-NQ/TW và các sự kiện đương đại.',
    },
  ];

  const reasons = [
    {
      question: 'Tại sao chọn chủ đề "Tầng lớp trung lưu"?',
      answer: 'Tầng lớp trung lưu là chủ đề nóng hổi và thiết thực, phản ánh sự chuyển đổi của xã hội Việt Nam trong thời kỳ mới. Đây là minh chứng sống động cho quy luật: "Kinh tế thay đổi → Xã hội thay đổi".',
    },
    {
      question: 'Tại sao sử dụng công nghệ AI?',
      answer: 'AI giúp mang lại trải nghiệm học tập cá nhân hóa, cho phép sinh viên hỏi đáp 24/7 và tiếp cận kiến thức một cách chủ động. Đồng thời, việc sử dụng AI có trách nhiệm cũng là kỹ năng quan trọng trong kỷ nguyên số.',
    },
    {
      question: 'Dự án hướng tới ai?',
      answer: 'Dự án phục vụ sinh viên học môn Chủ nghĩa xã hội khoa học (MLN131), đặc biệt là những ai muốn tìm hiểu sâu về Chương 5 - Cơ cấu xã hội giai cấp trong thời kỳ quá độ.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 bg-vietnam-page">
      {/* Floating Stars */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="floating-star hidden md:block"
          style={{
            top: `${12 + i * 16}%`,
            left: `${4 + i * 2}%`,
            animationDelay: `${i * 0.5}s`,
            fontSize: `${14 + i * 4}px`
          }}
        >
          ★
        </div>
      ))}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-vietnam-gold-500/20 text-vietnam-gold-400 border border-vietnam-gold-500/30 px-4 py-2 rounded-full mb-4">
            <Target size={20} />
            <span className="font-medium">Giới thiệu dự án</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Về dự án này
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Tìm hiểu lý do và mục tiêu của dự án "Tầng lớp trung lưu Việt Nam trong kỷ nguyên vươn mình"
          </p>
        </motion.div>

        {/* Project Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-vietnam-red-500 to-vietnam-gold-500 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Bài tập nhóm MLN131</h2>
              <p className="text-gray-600">Chủ nghĩa xã hội khoa học</p>
            </div>
          </div>

          <div className="prose prose-lg text-gray-700">
            <p>
              Dự án này được xây dựng như một sản phẩm sáng tạo cho môn học 
              <strong> Chủ nghĩa xã hội khoa học (MLN131)</strong>, tập trung vào chủ đề 
              <strong> "Tầng lớp trung lưu Việt Nam trong bối cảnh phát triển kinh tế thị trường định hướng XHCN"</strong>.
            </p>
            <p>
              Website kết hợp giữa kiến thức học thuật từ Chương 5 với công nghệ hiện đại (React, AI, animations) 
              để tạo ra trải nghiệm học tập tương tác và hấp dẫn.
            </p>
          </div>
        </motion.div>

        {/* Goals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Đáp ứng tiêu chí đánh giá
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectGoals.map((goal, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 bg-gradient-to-r from-vietnam-red-100 to-vietnam-gold-100 rounded-xl flex items-center justify-center text-vietnam-red-600 mb-4">
                  {goal.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{goal.title}</h3>
                <p className="text-gray-600 text-sm">{goal.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why This Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Heart className="text-vietnam-red-500" />
            Lý do thực hiện dự án
          </h2>

          <div className="space-y-4">
            {reasons.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-vietnam-gold-500"
              >
                <h3 className="font-bold text-gray-900 mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Nhóm thực hiện</h2>
          <p className="text-white/90 mb-6">
            Sinh viên môn Chủ nghĩa xã hội khoa học (MLN131)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Thành viên 1', 'Thành viên 2', 'Thành viên 3', 'Thành viên 4'].map((member, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-4">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <Users className="w-8 h-8" />
                </div>
                <p className="font-medium">{member}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/70">
            * Cập nhật tên thành viên tại src/pages/AboutPage.tsx
          </p>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>
            Dự án kế thừa cấu trúc từ{' '}
            <span className="font-medium">Light of the Party</span> và{' '}
            <span className="font-medium">VietInnov-Spark</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
