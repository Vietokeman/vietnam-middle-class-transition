import React from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle, AlertTriangle, Code, BookOpen, MessageCircle, Sparkles } from 'lucide-react';

const AIUsagePage: React.FC = () => {
  const aiUsages = [
    {
      tool: 'Gemini 2.5 Flash',
      icon: <Sparkles className="w-8 h-8" />,
      purpose: 'Chatbot trợ lý học tập',
      description: 'Xây dựng chatbot AI trả lời câu hỏi về tầng lớp trung lưu dựa trên Chương 5 CNXH Khoa học',
      tasks: [
        'Trả lời câu hỏi về lý luận Mác-Lênin',
        'Giải thích các khái niệm phức tạp',
        'Cung cấp số liệu và ví dụ thực tế',
        'Hỗ trợ ôn tập kiến thức',
      ],
      responsible: true,
    },
    {
      tool: 'GitHub Copilot / Claude',
      icon: <Code className="w-8 h-8" />,
      purpose: 'Hỗ trợ lập trình',
      description: 'Sử dụng AI để hỗ trợ viết code, debug và tối ưu hóa cấu trúc dự án',
      tasks: [
        'Tạo components React TypeScript',
        'Xây dựng UI/UX với Tailwind CSS',
        'Cấu hình Firebase và API Gemini',
        'Debug và refactor code',
      ],
      responsible: true,
    },
  ];

  const principles = [
    {
      title: 'Minh bạch',
      description: 'Công khai việc sử dụng AI trong dự án, không che giấu',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      title: 'Kiểm chứng',
      description: 'Nội dung AI tạo ra được kiểm tra và đối chiếu với giáo trình',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      title: 'Bổ trợ',
      description: 'AI là công cụ hỗ trợ, không thay thế việc học và nghiên cứu',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
    {
      title: 'Định hướng',
      description: 'Nội dung AI tuân thủ quan điểm chính thống của Đảng và Nhà nước',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 bg-vietnam-page">
      {/* Floating Stars */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="floating-star hidden md:block"
          style={{
            top: `${15 + i * 20}%`,
            right: `${5 + i * 3}%`,
            animationDelay: `${i * 0.7}s`,
            fontSize: `${16 + i * 4}px`
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
            <Bot size={20} />
            <span className="font-medium">Báo cáo AI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Ứng dụng AI có trách nhiệm
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Báo cáo minh bạch về việc sử dụng trí tuệ nhân tạo trong dự án 
            "Tầng lớp trung lưu Việt Nam trong kỷ nguyên vươn mình"
          </p>
        </motion.div>

        {/* AI Tools Used */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles className="text-vietnam-gold-500" />
            Các công cụ AI được sử dụng
          </h2>

          <div className="space-y-6">
            {aiUsages.map((usage, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-vietnam-red-100 to-vietnam-gold-100 rounded-xl flex items-center justify-center text-vietnam-red-600">
                    {usage.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{usage.tool}</h3>
                      {usage.responsible && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Có trách nhiệm
                        </span>
                      )}
                    </div>
                    <p className="text-vietnam-red-600 font-medium mb-2">{usage.purpose}</p>
                    <p className="text-gray-600 mb-4">{usage.description}</p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {usage.tasks.map((task, taskIndex) => (
                        <div key={taskIndex} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Responsible AI Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircle className="text-green-500" />
            Nguyên tắc sử dụng AI có trách nhiệm
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-5 shadow-lg border border-green-100"
              >
                <div className="flex items-start gap-3">
                  {principle.icon}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{principle.title}</h3>
                    <p className="text-gray-600 text-sm">{principle.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-yellow-800 mb-2">Lưu ý quan trọng</h3>
              <ul className="space-y-2 text-yellow-700 text-sm">
                <li>• AI chatbot được huấn luyện dựa trên Chương 5 giáo trình CNXH Khoa học, nội dung có thể không bao quát toàn bộ kiến thức.</li>
                <li>• Các câu trả lời của AI nên được đối chiếu với giáo trình gốc để đảm bảo chính xác.</li>
                <li>• Dự án này là sản phẩm học tập, không nhằm mục đích thương mại.</li>
                <li>• Việc sử dụng AI tuân thủ quy định về học thuật và đạo đức của nhà trường.</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 rounded-2xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-6">Công nghệ sử dụng</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'React', desc: 'Frontend' },
              { name: 'TypeScript', desc: 'Type Safety' },
              { name: 'Tailwind CSS', desc: 'Styling' },
              { name: 'Vite', desc: 'Build Tool' },
              { name: 'Firebase', desc: 'Backend' },
              { name: 'Gemini AI', desc: 'Chatbot' },
              { name: 'Framer Motion', desc: 'Animation' },
              { name: 'GSAP', desc: '3D Effects' },
            ].map((tech, index) => (
              <div key={index} className="bg-white/10 rounded-lg p-3 text-center">
                <div className="font-bold">{tech.name}</div>
                <div className="text-xs text-white/70">{tech.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIUsagePage;
