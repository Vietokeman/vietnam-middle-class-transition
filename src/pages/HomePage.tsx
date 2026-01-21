import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TrendingUp, Users, BookOpen, Target, Youtube, MessageCircle, Gamepad2, ArrowRight, Star } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedTitle from '../components/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  // GSAP scroll-triggered animations from Project-1848
  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
    cards.forEach((card) => {
      gsap.fromTo(card, {
        opacity: 0,
        y: 60,
        scale: 0.95,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Tóm tắt kiến thức',
      description: 'Lý luận CNXH Khoa học về tầng lớp trung lưu theo Chương 5',
      link: '/kien-thuc',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <Youtube className="w-8 h-8" />,
      title: 'Video giảng dạy',
      description: 'Xem video trực tiếp trên web về các chủ đề liên quan',
      link: '/video',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: 'Chatbot AI',
      description: 'Trợ lý học tập AI giải đáp mọi thắc mắc về CNXH',
      link: '/chat',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: 'Trò chơi tương tác',
      description: 'Học qua trò chơi quiz và các hoạt động tương tác',
      link: '/game',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  const stats = [
    { value: 7.7, suffix: '%', label: '2010', description: 'Tầng lớp trung lưu' },
    { value: 16.3, suffix: '%', label: '2018', description: 'Tăng trưởng mạnh' },
    { value: 26, suffix: '%', label: '2026', description: 'Dự kiến' },
    { value: 50, suffix: '%', label: '2035', description: 'Mục tiêu' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-vietnam overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Gold Star */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="opacity-20"
          >
            <Star className="w-96 h-96 text-vietnam-gold-500" fill="currentColor" />
          </motion.div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Star className="w-16 h-16 mx-auto text-vietnam-gold-500" fill="currentColor" />
              </motion.div>
            </div>
            
            <AnimatedTitle
              title="T<b>Ầ</b>NG LỚ<b>P</b> TRUNG L<b>Ư</b>U <br /> VI<b>Ệ</b>T N<b>A</b>M"
              containerClass="mb-6"
            />
            
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-light" style={{ fontFamily: 'var(--font-atkinson)' }}>
              Trong Kỷ Nguyên Vươn Mình của Dân Tộc
            </p>
            
            <p className="text-lg text-white/70 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'var(--font-atkinson)' }}>
              Nghiên cứu vai trò của tầng lớp trung lưu trong bối cảnh phát triển 
              kinh tế thị trường định hướng XHCN - Dựa trên Chương 5: Cơ cấu xã hội giai cấp 
              trong thời kỳ quá độ lên Chủ nghĩa xã hội.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/kien-thuc"
                className="px-8 py-4 bg-vietnam-gold-500 text-gray-900 font-bold rounded-full hover:bg-vietnam-gold-400 transition-all hover:scale-105 shadow-gold-lg"
              >
                Bắt đầu học tập
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-vietnam-red-700 transition-all"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sự trỗi dậy của Tầng lớp Trung lưu
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Số liệu từ World Bank cho thấy sự tăng trưởng ấn tượng của tầng lớp trung lưu Việt Nam
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg text-center border border-vietnam-gold-200"
              >
                <div className="text-4xl md:text-5xl font-bold text-vietnam-red-600 mb-2">
                  {statsInView && (
                    <CountUp end={stat.value} duration={2} decimals={stat.value % 1 !== 0 ? 1 : 0} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-vietnam-gold-600 font-semibold">{stat.label}</div>
                <div className="text-gray-500 text-sm">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Khám phá Nội dung
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Các tab chính của website giúp bạn học tập hiệu quả về chủ đề tầng lớp trung lưu
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <Link
                  to={feature.link}
                  className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 border border-gray-100 group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} text-white flex items-center justify-center mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-vietnam-red-600 transition-colors" style={{ fontFamily: 'var(--font-crimson-pro)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4" style={{ fontFamily: 'var(--font-atkinson)' }}>{feature.description}</p>
                  <div className="flex items-center text-vietnam-red-600 font-medium">
                    Khám phá
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-vietnam">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TrendingUp className="w-16 h-16 mx-auto mb-6 text-vietnam-gold-400" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hướng tới Mục tiêu 2045
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Việt Nam trở thành nước phát triển, thu nhập cao với tầng lớp trung lưu 
              chiếm trên 50% dân số - Thước đo thành công của công cuộc xây dựng CNXH.
            </p>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 px-8 py-4 bg-vietnam-gold-500 text-gray-900 font-bold rounded-full hover:bg-vietnam-gold-400 transition-all hover:scale-105 shadow-gold-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Hỏi AI trợ lý ngay
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
