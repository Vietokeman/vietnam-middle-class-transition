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
      src: "https://media.vietnamplus.vn/images/ed1918d4cf848798286fdbd286ae25b49193a1c5d1fb33e969ef22f27d52ae3d4fa848ce7d2b15dcfa2646bd42731b69a74f6b1bfe70b3203772c7979020cefa/ttxvn-nguyen-ai-quoc.jpg",
      alt: "Nguyễn Ái Quốc với nhân dân Moskva (Nga) trên đồi Chim Sẻ, trong thời gian tham dự Đại hội lần thứ V Quốc tế cộng sản (17-6/8-7-1924). Ảnh: Tư liệu/TTXVN - Thể hiện tinh thần quốc tế vô sản.",
    },
    {
      src: "https://file.qdnd.vn/data/images/0/2021/05/29/phucthang/06-hcm01.jpg?dpi=150&quality=100&w=575",
      alt: "Hình ảnh trong chuyến hành trình tìm đường cứu nước của Bác từ ngày 25 đến 30-12-1920, chàng thanh niên yêu nước Nguyễn Ái Quốc tham dự Đại hội lần thứ 18 Đảng Xã hội Pháp ở thành phố Tours với tư cách đại biểu Đông Dương.",
    },
    {
      src: "https://media-cdn-v2.laodong.vn/storage/newsportal/2024/3/24/1318919/002.jpg",
      alt: "Chiến thắng Điện Biên Phủ năm 1954 - Biểu tượng cho sức mạnh của ý chí và tinh thần đoàn kết toàn dân tộc.",
    },
    {
      src: "https://inkythuatso.com/uploads/thumbnails/800/2023/03/2-hinh-anh-bac-ho-o-chien-khu-inkythuatso-06-09-42-16.jpg",
      alt: "Hồ Chí Minh với cán bộ, chiến sĩ tại chiến khu Việt Bắc năm 1947 - Thể hiện sự gần gũi với bộ đội và nhân dân.",
    },
    {
      src: "https://tapchigiaothong.qltns.mediacdn.vn/tapchigiaothong.vn/files/Tapchigiay/2021/01/26/bac-ho-0957.jpg",
      alt: "Đại hội Đại biểu toàn quốc lần thứ III của Đảng (1960) - Đánh dấu bước chuyển sang thời kỳ xây dựng chủ nghĩa xã hội.",
    },
    {
      src: "https://imgnvsk.vnanet.vn/MediaUpload/Medium/2023/07/21/capture21-15-55-29.png",
      alt: "Đại hội Đại biểu toàn quốc lần thứ V của Đảng Cộng sản Việt Nam năm 1982 – Đề ra nhiệm vụ ổn định kinh tế - xã hội và mở ra các bước đột phá cải cách 1982–1986.",
    },
    {
      src: "https://th.bing.com/th/id/R.c89bc199a377256fe56dcaf53874b742?rik=XtuJd6brDcL4mA&pid=ImgRaw&r=0",
      alt: "Tiền Việt Nam năm 1985 – Hình ảnh gắn liền với cải cách giá - lương - tiền, nguyên nhân trực tiếp dẫn tới quyết định đổi mới toàn diện tại Đại hội VI năm 1986.",
    },
    {
      src: "https://file3.qdnd.vn/data/images/0/2022/07/20/tranhuyen/01botruongngoaigiaonguyenmanhcam.jpg?dpi=150&quality=100&w=870",
      alt: "Việt Nam gia nhập ASEAN năm 1995 – Thành tựu quan trọng của tiến trình đổi mới, mở rộng quan hệ đối ngoại và hội nhập khu vực.",
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
            Thư viện 3D
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
            Khám phá các hình ảnh lịch sử về tiến trình phát triển của Việt Nam qua các thời kỳ
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
              fit={0.65}
              fitBasis="auto"
              minRadius={400}
              maxRadius={900}
              dragSensitivity={20}
              enlargeTransitionMs={300}
              segments={20}
              dragDampening={1.5}
              openedImageWidth="500px"
              openedImageHeight="500px"
              imageBorderRadius="15px"
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
              font="bold 28px 'Playfair Display', serif"
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
