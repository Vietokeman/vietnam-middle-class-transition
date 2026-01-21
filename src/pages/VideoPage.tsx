import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Youtube } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  category: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Kinh tế thị trường định hướng XHCN',
    description: 'Giải thích về mô hình kinh tế thị trường định hướng xã hội chủ nghĩa tại Việt Nam',
    youtubeId: 'dQw4w9WgXcQ', // Placeholder - thay bằng video thật
    category: 'Lý luận',
  },
  {
    id: '2',
    title: 'Đổi mới 1986 - Bước ngoặt lịch sử',
    description: 'Nhìn lại công cuộc Đổi mới và sự hình thành tầng lớp trung lưu',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Lịch sử',
  },
  {
    id: '3',
    title: 'Tầng lớp trung lưu và phát triển bền vững',
    description: 'Vai trò của tầng lớp trung lưu trong phát triển kinh tế-xã hội',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Phân tích',
  },
  {
    id: '4',
    title: 'Kỷ nguyên vươn mình của dân tộc',
    description: 'Định hướng phát triển theo tinh thần Đại hội XIV của Đảng',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Đương đại',
  },
];

const VideoPage: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', ...new Set(videos.map(v => v.category))];

  const filteredVideos = activeCategory === 'all' 
    ? videos 
    : videos.filter(v => v.category === activeCategory);

  return (
    <div className="min-h-screen pt-20 pb-16 bg-vietnam-page">
      {/* Floating Stars */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="floating-star hidden md:block"
          style={{
            top: `${20 + i * 18}%`,
            right: `${3 + i * 2}%`,
            animationDelay: `${i * 0.6}s`,
            fontSize: `${14 + i * 5}px`
          }}
        >
          ★
        </div>
      ))}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-vietnam-gold-500/20 text-vietnam-gold-400 border border-vietnam-gold-500/30 px-4 py-2 rounded-full mb-4">
            <Youtube size={20} />
            <span className="font-medium">Video giảng dạy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Video học tập
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Xem trực tiếp các video giảng dạy về tầng lớp trung lưu và Chủ nghĩa xã hội khoa học
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full transition-all ${
                activeCategory === cat
                  ? 'bg-vietnam-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : cat}
            </button>
          ))}
        </div>

        {/* Video Player */}
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="youtube-container">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <span className="inline-block px-3 py-1 bg-vietnam-gold-100 text-vietnam-gold-700 rounded-full text-sm mb-2">
                  {selectedVideo.category}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedVideo.title}
                </h2>
                <p className="text-gray-600">{selectedVideo.description}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-vietnam-red-600 hover:text-vietnam-red-700"
                >
                  <ExternalLink size={16} />
                  Xem trên YouTube
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedVideo(video)}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 ${
                selectedVideo?.id === video.id ? 'ring-2 ring-vietnam-red-500' : ''
              }`}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gray-200">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-vietnam-red-600 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
                <span className="absolute top-3 right-3 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {video.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {video.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Placeholder Notice */}
        <div className="mt-12 bg-vietnam-gold-50 border border-vietnam-gold-200 rounded-xl p-6 text-center">
          <p className="text-vietnam-gold-800">
            💡 <strong>Lưu ý:</strong> Đây là các video mẫu. Bạn có thể thay thế bằng các video YouTube thực tế 
            bằng cách cập nhật <code className="bg-vietnam-gold-100 px-2 py-0.5 rounded">youtubeId</code> trong mã nguồn.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
