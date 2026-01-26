import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, BookOpen, Globe, TrendingUp, Building2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from '../components/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

interface Reference {
  id: number;
  title: string;
  source: string;
  url: string;
  description: string;
  icon: React.ReactNode;
  category: string;
}

const ReferencesPage: React.FC = () => {
  useEffect(() => {
    const refCards = document.querySelectorAll('.ref-card');
    refCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          delay: index * 0.1,
        }
      );
    });
  }, []);

  const references: Reference[] = [
    {
      id: 1,
      title: 'Dự thảo Báo cáo chính trị của Ban Chấp hành Trung ương Đảng khóa XIII tại Đại hội XIV',
      source: 'Cổng thông tin điện tử Chính phủ - Xây dựng Chính sách',
      url: 'https://xaydungchinhsach.chinhphu.vn/toan-van-du-thao-bao-cao-chinh-tri-cua-ban-chap-hanh-trung-uong-dang-khoa-xiii-tai-dai-hoi-xiv-cua-dang-119251015171703632.htm',
      description: 'Toàn văn dự thảo Báo cáo chính trị trình Đại hội XIV của Đảng, đề cập đến "Kỷ nguyên mới - Kỷ nguyên vươn mình của dân tộc" và phát triển Lực lượng sản xuất mới.',
      icon: <BookOpen className="w-6 h-6" />,
      category: 'Văn kiện Đảng',
    },
    {
      id: 2,
      title: 'Một trong năm quốc gia có tầng lớp trung lưu trỗi dậy mạnh mẽ',
      source: 'Ban Kinh tế Trung ương',
      url: 'https://kinhtetrunguong.vn/web/guest/kinh-te-xa-hoi/mot-trong-nam-quoc-gia-co-tang-lop-trung-luu-troi-day-manh-m.html',
      description: 'Phân tích về sự phát triển của tầng lớp trung lưu tại Việt Nam, nhóm trung lưu chiếm khoảng 13% dân số và tỷ lệ hộ nghèo giảm qua từng năm.',
      icon: <TrendingUp className="w-6 h-6" />,
      category: 'Kinh tế - Xã hội',
    },
    {
      id: 3,
      title: 'World Data Lab: Tầng lớp trung lưu tại Việt Nam chiếm 17% dân số',
      source: 'MarketingTrips',
      url: 'https://marketingtrips.com/market-insights/world-data-lab-tang-lop-trung-luu-tai-viet-nam-hien-chiem-17-dan-so-va-du-kien-tang-len-26-vao-nam-2026/',
      description: 'Theo World Data Lab, tầng lớp trung lưu tại Việt Nam hiện chiếm 17% dân số và dự kiến tăng lên 26% vào năm 2026.',
      icon: <Globe className="w-6 h-6" />,
      category: 'Nghiên cứu quốc tế',
    },
    {
      id: 4,
      title: 'Bùng nổ tầng lớp trung lưu - "Mỏ vàng" ngay sân nhà',
      source: 'Vietnam Finance',
      url: 'https://vietnamfinance.vn/bung-no-tang-lop-trung-luu-mo-vang-ngay-san-nha-loi-the-cho-dn-viet-khai-d133528.html',
      description: 'Phân tích cơ hội và lợi thế cho doanh nghiệp Việt Nam trong bối cảnh tầng lớp trung lưu bùng nổ.',
      icon: <Building2 className="w-6 h-6" />,
      category: 'Kinh doanh',
    },
    {
      id: 5,
      title: 'Tăng trưởng cao, bền vững giai đoạn 2026-2030',
      source: 'Cổng thông tin điện tử Chính phủ - Xây dựng Chính sách',
      url: 'https://xaydungchinhsach.chinhphu.vn/tang-truong-cao-ben-vung-giai-doan-2026-2030-khat-vong-va-nhung-giai-phap-trong-tam-trong-diem-kha-thi-11926011917133721.htm',
      description: 'Khát vọng và những giải pháp trọng tâm, trọng điểm, khả thi cho giai đoạn 2026-2030 để đạt mục tiêu tăng trưởng cao và bền vững.',
      icon: <TrendingUp className="w-6 h-6" />,
      category: 'Chính sách',
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
            <FileText size={20} />
            <span className="font-medium" style={{ fontFamily: 'var(--font-atkinson)' }}>Nguồn tham khảo</span>
          </div>
          <AnimatedTitle title="T<b>À</b>I L<b>I</b>Ệ<b>U</b> TH<b>A</b>M C<b>H</b>IẾ<b>U</b>" />
          <p className="text-lg text-white/80 max-w-2xl mx-auto mt-6" style={{ fontFamily: 'var(--font-atkinson)' }}>
            Các nguồn tài liệu chính thống được sử dụng trong dự án nghiên cứu về tầng lớp trung lưu Việt Nam
          </p>
        </motion.div>

        {/* References List */}
        <div className="space-y-6">
          {references.map((ref, index) => (
            <motion.div
              key={ref.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="ref-card bg-white rounded-2xl shadow-xl p-6 md:p-8 border-l-4 border-vietnam-gold-500 hover:shadow-2xl transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Icon */}
                <div className="w-14 h-14 bg-gradient-to-r from-vietnam-red-100 to-vietnam-gold-100 rounded-xl flex items-center justify-center text-vietnam-red-600 flex-shrink-0">
                  {ref.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-medium bg-vietnam-gold-100 text-vietnam-gold-700 px-3 py-1 rounded-full">
                      {ref.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      Nguồn {ref.id}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-crimson-pro)' }}>
                    {ref.title}
                  </h3>

                  <p className="text-sm text-vietnam-red-600 font-medium mb-3">
                    {ref.source}
                  </p>

                  <p className="text-gray-600 mb-4" style={{ fontFamily: 'var(--font-atkinson)' }}>
                    {ref.description}
                  </p>

                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-vietnam-red-600 hover:text-vietnam-red-700 font-medium transition-colors group"
                  >
                    <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
                    <span>Xem nguồn gốc</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Lưu ý về nguồn tài liệu</h2>
          <p className="text-white/90 max-w-2xl mx-auto">
            Tất cả các nguồn tài liệu được sử dụng trong dự án đều là nguồn chính thống từ các cơ quan nhà nước, 
            tổ chức nghiên cứu uy tín và các văn kiện của Đảng. Việc trích dẫn tuân thủ nguyên tắc trung thực 
            và khách quan trong nghiên cứu khoa học.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ReferencesPage;
