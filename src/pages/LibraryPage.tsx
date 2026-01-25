import { useState, useEffect } from "react";
import CircularGallery from "../components/CircularGallery/CircularGallery";
import DomeGallery from "../components/DomeGallery/DomeGallery";
import { FaImages, FaCube } from "react-icons/fa";
import { motion } from "framer-motion";
import { Images } from "lucide-react";

export default function LibraryPage() {
  const [mode, setMode] = useState<"dome" | "circular">("dome");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Historical images for the middle class theme
  const domeImages = [
    {
      src: "https://bcp.cdnchinhphu.vn/334894974524682240/2023/1/27/do-thi-2-16748034764601049869198.jpg",
      alt: "Sự phát triển của lực lượng sản xuất: Đô thị hóa và hiện đại hóa tại các thành phố lớn (TP.HCM, Hà Nội) là cơ sở vật chất kỹ thuật cho sự ra đời và phát triển của tầng lớp trung lưu.",
    },
    {
      src: "https://llct.1cdn.vn/2023/02/20/lyluanchinhtri.vn-home-media-k2-items-cache-_826865d7c58185b88ff2463c28ea3d80_l.jpg",
      alt: "Nâng cao chất lượng nguồn nhân lực: Tầng lớp trung lưu Việt Nam chú trọng giáo dục và đào tạo, chuyển dịch từ lao động thủ công sang lao động trí óc.",
    },
    {
      src: "https://file.vnua.edu.vn/data/0/images/2020/12/23/tiengviet/2020-2312-cmcn4-0001.jpg",
      alt: "Cách mạng công nghiệp 4.0: Tầng lớp trung lưu là lực lượng nòng cốt trong việc ứng dụng khoa học công nghệ, thúc đẩy phương thức sản xuất tiên tiến.",
    },
    {
      src: "https://a.tcnnld.vn//Upload/Images/Normal/2025/11/041ac9920c929f241cf51feca2887728-20251118_0803_Kinh-Te-Moi_simple_compose_01kaa7p5yhfz0rtmtpw2n1gnfz.jpg",
      alt: "Quan hệ sản xuất mới: Sự xuất hiện của các doanh nhân, chuyên gia, và nhân viên văn phòng phản ánh sự đa dạng hóa trong cơ cấu xã hội - giai cấp trong thời kỳ quá độ lên CNXH.",
    },
    {
      src: "https://danviet.ex-cdn.com/files/f1/296231569849192448/2024/9/2/khuyen-mai-giam-gia-truc-tiep-mua-2-tang-1-mua-1-tang-1-ap-dung-cho-hon-600-san-pham-tai-winmart-winmart-win-20240830093603-1725271729431-1725271730389578192199.jpg",
      alt: "Tiêu dùng và đời sống: Mức sống được nâng cao thể hiện tính ưu việt của chế độ mới, nhưng cũng đặt ra những vấn đề về văn hóa tiêu dùng và phân hóa giàu nghèo cần giải quyết.",
    },
    {
      src: "https://s-aicmscdn.vietnamhoinhap.vn/vnhn-media/18/7/20/2_hoi-nhap-toan-cau.jpg",
      alt: "Hội nhập quốc tế: Tầng lớp trung lưu Việt Nam trong bối cảnh toàn cầu hóa, vừa tiếp thu tinh hoa nhân loại vừa giữ gìn bản sắc dân tộc theo tư tưởng Triết học Mác - Lênin.",
    },
  ];

  // Transform for CircularGallery (text hidden to avoid overlap)
  const ethnicImages = domeImages.map((img) => ({
    image: img.src,
    text: "",
  }));

  return (
    <div className="min-h-screen bg-vietnam-page">
      {/* Floating Stars */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="floating-star hidden md:block"
          style={{
            top: `${10 + i * 14}%`,
            left: i % 2 === 0 ? `${3 + i}%` : 'auto',
            right: i % 2 === 1 ? `${3 + i}%` : 'auto',
            animationDelay: `${i * 0.4}s`,
            fontSize: `${14 + i * 3}px`
          }}
        >
          ★
        </div>
      ))}

      {/* Header Section */}
      <div className="pt-24 pb-6 px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 bg-vietnam-gold-500/20 text-vietnam-gold-400 border border-vietnam-gold-500/30 px-4 py-2 rounded-full mb-4">
            <Images size={20} />
            <span className="font-medium">Thư viện hình ảnh</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Triết học Mác - Lênin (MLN131)
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
            Khám phá sự phát triển của Tầng lớp trung lưu Việt Nam dưới góc nhìn Triết học Mác - Lênin
          </p>
        </motion.div>
      </div>

      {/* Mode Toggle Bar */}
      <div className="fixed top-24 right-6 z-[60] flex items-center gap-3">
        <span className="text-vietnam-gold-400 text-sm font-semibold hidden md:inline">
          Chế độ xem:
        </span>
        <div className="flex gap-2 bg-vietnam-red-800/90 p-1 rounded-full border-2 border-vietnam-gold-500/40 shadow-lg backdrop-blur-md">
          <button
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
              mode === "dome"
                ? "bg-gradient-to-r from-vietnam-gold-500 to-vietnam-gold-600 text-vietnam-red-900 shadow-lg"
                : "bg-transparent text-vietnam-gold-400 hover:bg-vietnam-gold-500/10"
            }`}
            onClick={() => setMode("dome")}
          >
            <FaCube className="text-sm" />
            <span>Tròn</span>
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 ${
              mode === "circular"
                ? "bg-gradient-to-r from-vietnam-gold-500 to-vietnam-gold-600 text-vietnam-red-900 shadow-lg"
                : "bg-transparent text-vietnam-gold-400 hover:bg-vietnam-gold-500/10"
            }`}
            onClick={() => setMode("circular")}
          >
            <FaImages className="text-sm" />
            <span>Ngang</span>
          </button>
        </div>
      </div>

      {/* Gallery Container */}
      <div className="relative w-full" style={{ height: "calc(100vh - 200px)" }}>
        {mode === "dome" ? (
          <div className="w-full h-full">
            <DomeGallery
              images={domeImages}
              fit={0.55}
              fitBasis="auto"
              minRadius={350}
              maxRadius={800}
              maxVerticalRotationDeg={25}
              dragSensitivity={18}
              enlargeTransitionMs={300}
              segments={24}
              dragDampening={1.5}
              openedImageWidth="500px"
              openedImageHeight="500px"
              imageBorderRadius="12px"
              openedImageBorderRadius="25px"
              grayscale={false}
            />
          </div>
        ) : (
          <div className="w-full h-full">
            <CircularGallery
              items={ethnicImages}
              bend={3}
              textColor="#FFD700"
              borderRadius={0.08}
              font="bold 28px 'Crimson Pro', serif"
              scrollSpeed={1}
              scrollEase={0.08}
            />
          </div>
        )}
      </div>

      {/* Usage Tips */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-black/40 backdrop-blur-sm px-6 py-3 rounded-full text-white/80 text-sm"
        >
          💡 Kéo để xoay • Click vào ảnh để xem chi tiết
        </motion.div>
      </div>
    </div>
  );
}
