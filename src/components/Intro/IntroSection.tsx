import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, BookOpen, Target } from 'lucide-react';

interface IntroSectionProps {
  onComplete: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ onComplete }) => {
  const features = [
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Sự trỗi dậy của Trung lưu',
      description: 'Từ 7.7% (2010) lên 50% dân số vào 2035 - Thành quả của công cuộc Đổi mới',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Cơ cấu xã hội mới',
      description: 'Trí thức + Doanh nhân + Công nhân hiện đại = Lực lượng nòng cốt',
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Lý luận CNXH Khoa học',
      description: 'Phân tích theo Chương 5 - Cơ cấu xã hội giai cấp trong thời kỳ quá độ',
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Kỷ nguyên vươn mình',
      description: 'Hướng tới mục tiêu 2045: Việt Nam là nước phát triển, thu nhập cao',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vietnam-red-50 via-vietnam-gold-50 to-white p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          {/* Star Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <svg className="w-24 h-24 text-vietnam-gold-500 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="absolute inset-0 bg-vietnam-gold-500 blur-2xl opacity-40" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-vietnam-red-700 mb-4"
          >
            Tầng lớp Trung lưu Việt Nam
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl text-vietnam-gold-600 mb-4 font-semibold"
          >
            Trong Kỷ Nguyên Vươn Mình
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-gray-700 max-w-3xl mx-auto"
          >
            Nghiên cứu vai trò của tầng lớp trung lưu trong bối cảnh phát triển kinh tế thị trường 
            định hướng XHCN - Dựa trên nền tảng lý luận Chương 5: Cơ cấu xã hội - giai cấp 
            trong thời kỳ quá độ lên Chủ nghĩa xã hội.
          </motion.p>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 inline-flex items-center gap-2 bg-vietnam-red-100 text-vietnam-red-700 px-4 py-2 rounded-full text-sm font-medium"
          >
            <span className="w-2 h-2 bg-vietnam-red-500 rounded-full animate-pulse" />
            Môn học: Chủ nghĩa xã hội khoa học (MLN131)
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.15 }}
              className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-vietnam-gold-200"
            >
              <div className="text-vietnam-red-600 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="bg-gradient-to-r from-vietnam-red-600 to-vietnam-red-700 rounded-2xl p-6 mb-8 text-white"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-vietnam-gold-400">7.7%</p>
              <p className="text-sm opacity-80">2010</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-vietnam-gold-400">16.3%</p>
              <p className="text-sm opacity-80">2018</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-vietnam-gold-400">26%</p>
              <p className="text-sm opacity-80">Dự kiến 2026</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-vietnam-gold-400">50%</p>
              <p className="text-sm opacity-80">Mục tiêu 2035</p>
            </div>
          </div>
          <p className="text-center mt-4 text-sm opacity-80">
            Tỷ lệ tầng lớp trung lưu trong dân số Việt Nam (Nguồn: World Bank)
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3 }}
          className="text-center"
        >
          <button
            onClick={onComplete}
            className="px-12 py-4 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white font-bold text-lg rounded-full shadow-vietnam-lg hover:shadow-vietnam-xl hover:scale-105 transition-all"
          >
            Bắt đầu khám phá →
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default IntroSection;
