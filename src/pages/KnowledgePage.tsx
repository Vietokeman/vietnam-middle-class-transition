import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Users, Target, ArrowRight, Star, Quote } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from '../components/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const KnowledgePage: React.FC = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.knowledge-section');
    sections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      );
    });
  }, []);

  const sections = [
    {
      id: 'part1',
      title: 'Phần 1: Mở đầu và Cơ sở lý luận',
      color: 'from-blue-500 to-blue-600',
      content: [
        {
          heading: 'Cơ sở lý luận (CNXH khoa học)',
          points: [
            'Cơ cấu xã hội - giai cấp có mối quan hệ biện chứng với cơ cấu kinh tế',
            'Quy luật: Khi phương thức sản xuất thay đổi → cơ cấu xã hội tất yếu thay đổi',
            'Thời kỳ quá độ: Tồn tại đan xen vừa đấu tranh, vừa liên minh giữa yếu tố cũ và mới',
          ],
        },
        {
          heading: 'Khái niệm tầng lớp trung lưu',
          points: [
            'Thuộc nhóm "tầng lớp xã hội mới" theo giáo trình CNXH',
            'Vị trí trung gian trong thang bậc xã hội',
            'Hình thành từ chuyển dịch: Nông nghiệp → Công nghiệp → Dịch vụ',
            'Bao gồm: Lao động trí óc, chuyên gia kỹ thuật, người sở hữu tài sản hợp pháp',
          ],
        },
        {
          heading: 'Trong lý luận Mác – Lênin',
          points: [
            'Xã hội Tư bản: "Trung lưu hóa" công nhân không thay đổi địa vị làm thuê',
            'Việt Nam: Tầng lớp trung lưu là tất yếu khách quan của kinh tế nhiều thành phần',
            'Không phải đối tượng xóa bỏ, mà là lực lượng cần định hướng để xây dựng CNXH',
          ],
        },
      ],
    },
    {
      id: 'part2',
      title: 'Phần 2: Thực trạng tầng lớp trung lưu Việt Nam',
      color: 'from-green-500 to-green-600',
      content: [
        {
          heading: 'Bối cảnh hình thành',
          points: [
            'Đại hội VI (1986): Chấp nhận kinh tế thị trường định hướng XHCN',
            'Phá vỡ cơ cấu xã hội "thuần nhất" → Tạo sự đa dạng',
            'Xuất hiện: Doanh nhân, tiểu chủ và tầng lớp trung lưu',
          ],
        },
        {
          heading: 'Các bộ phận cấu thành',
          points: [
            'Đội ngũ trí thức: Lao động sáng tạo trong kinh tế tri thức',
            'Đội ngũ doanh nhân: Tổ chức sản xuất, tạo việc làm, đóng thuế',
            'Công nhân hiện đại (trí thức hóa): Công nhân kỹ thuật cao, làm chủ công nghệ',
          ],
        },
        {
          heading: 'Đặc điểm kinh tế & chính trị',
          points: [
            'Gắn liền với lực lượng sản xuất hiện đại',
            'Thu nhập từ lao động phức tạp, kỹ năng quản lý, tư liệu sản xuất',
            'Dẫn dắt xu hướng tiêu dùng nội địa',
            'Ủng hộ ổn định chính trị, hoạt động dưới sự lãnh đạo của Đảng',
          ],
        },
      ],
    },
    {
      id: 'part3',
      title: 'Phần 3: Vai trò và Giải pháp định hướng',
      color: 'from-purple-500 to-purple-600',
      content: [
        {
          heading: 'Vai trò trong phát triển xã hội',
          points: [
            'Kinh tế: Nòng cốt CNH-HĐH, giải quyết việc làm và an sinh xã hội',
            'Xã hội: Giảm khoảng cách giàu nghèo (tạo lớp đệm)',
            'Văn hóa: Thúc đẩy các giá trị văn minh, tiến bộ',
          ],
        },
        {
          heading: 'Những thách thức',
          points: [
            'Gia tăng phân hóa giàu nghèo và chênh lệch vùng miền',
            'Nguy cơ phai nhạt lý tưởng, chạy theo lợi ích vật chất',
            'Bài toán đoàn kết các lợi ích khác biệt',
          ],
        },
        {
          heading: 'Giải pháp theo quan điểm CNXH khoa học',
          points: [
            'Kinh tế: Đẩy mạnh CNH-HĐH để mở rộng tầng lớp trung lưu',
            'Chính sách: Hoàn thiện thể chế, tạo môi trường minh bạch',
            'Văn hóa - Giáo dục: Xây dựng văn hóa Việt Nam tiên tiến, trách nhiệm xã hội',
          ],
        },
      ],
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
            top: `${15 + i * 15}%`,
            left: `${5 + i * 3}%`,
            animationDelay: `${i * 0.5}s`,
            fontSize: `${16 + i * 4}px`
          }}
        >
          ★
        </div>
      ))}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-vietnam-gold-500/20 text-vietnam-gold-400 border border-vietnam-gold-500/30 px-4 py-2 rounded-full mb-4">
            <BookOpen size={20} />
            <span className="font-medium" style={{ fontFamily: 'var(--font-atkinson)' }}>Tóm tắt kiến thức</span>
          </div>
          <AnimatedTitle title="T<b>Ầ</b>NG LỚ<b>P</b> TRUNG L<b>Ư</b>U <br /> VI<b>Ệ</b>T N<b>A</b>M" />
          <p className="text-lg text-white/80 max-w-3xl mx-auto mt-6" style={{ fontFamily: 'var(--font-atkinson)' }}>
            Nghiên cứu theo Chương 5: Cơ cấu xã hội - giai cấp trong thời kỳ quá độ lên Chủ nghĩa xã hội
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { value: '7.7%', label: '2010', icon: <Users size={20} /> },
            { value: '16.3%', label: '2018', icon: <TrendingUp size={20} /> },
            { value: '26%', label: 'Dự kiến 2026', icon: <ArrowRight size={20} /> },
            { value: '50%', label: 'Mục tiêu 2035', icon: <Target size={20} /> },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-lg border border-vietnam-gold-200 text-center"
            >
              <div className="text-vietnam-red-600 mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="space-y-8">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className="knowledge-section bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Section Header */}
              <div className={`bg-gradient-to-r ${section.color} text-white p-6`}>
                <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-crimson-pro)' }}>{section.title}</h2>
              </div>

              {/* Section Content */}
              <div className="p-6 space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-crimson-pro)' }}>
                      <Star className="w-5 h-5 text-vietnam-gold-500" fill="currentColor" />
                      {item.heading}
                    </h3>
                    <ul className="space-y-2 ml-7">
                      {item.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-2 text-gray-700" style={{ fontFamily: 'var(--font-atkinson)' }}>
                          <span className="w-1.5 h-1.5 bg-vietnam-red-500 rounded-full mt-2 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-vietnam-red-600 to-vietnam-red-700 rounded-2xl p-8 text-white"
        >
          <Quote className="w-12 h-12 text-vietnam-gold-400 mb-4" />
          <blockquote className="text-xl md:text-2xl font-medium mb-4 leading-relaxed">
            "Phát triển tầng lớp trung lưu không chỉ là mục tiêu kinh tế đơn thuần, 
            mà là một nhiệm vụ chính trị - xã hội chiến lược để xây dựng một Việt Nam thịnh vượng."
          </blockquote>
          <p className="text-vietnam-gold-400 font-medium">
            — Kết luận từ bài thuyết trình CNXH Khoa học
          </p>
        </motion.div>

        {/* Key Takeaways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-vietnam-gold-50 border border-vietnam-gold-200 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">📌 Điểm mấu chốt</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Tầng lớp trung lưu là tất yếu khách quan và thành quả của Đổi mới',
              'Họ là đối tác quan trọng trong khối liên minh Công-Nông-Trí thức',
              'Cần định hướng XHCN để phát huy mặt tích cực, hạn chế tiêu cực',
              'Mục tiêu 2045: Tầng lớp trung lưu >50% = Thước đo "Vươn mình"',
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                <span className="w-6 h-6 bg-vietnam-gold-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {index + 1}
                </span>
                <span className="text-gray-700">{point}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowledgePage;
