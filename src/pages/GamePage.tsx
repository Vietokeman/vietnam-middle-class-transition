import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, CheckCircle, XCircle, RotateCcw, Trophy, Star, Save, Award } from 'lucide-react';
import NameInputModal from '@/components/NameInputModal';
import Leaderboard from '@/components/Leaderboard';
import { submitQuizScore } from '@/services/quizService';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// All 20 questions - 15 will be randomly selected for each quiz
const allQuestions: Question[] = [
  {
    id: 1,
    question: 'Theo giáo trình, bên cạnh các giai cấp cơ bản, sự biến đổi cơ cấu xã hội ở Việt Nam trong thời kỳ quá độ đã làm xuất hiện những tầng lớp xã hội mới nào?',
    options: [
      'Tầng lớp địa chủ và tư sản mại bản.',
      'Tầng lớp doanh nhân, tiểu chủ, tầng lớp những người giàu có và trung lưu.',
      'Tầng lớp quý tộc mới và thương nhân.',
      'Tầng lớp công nhân kỹ thuật cao và nông dân tập thể.',
    ],
    correctIndex: 1,
    explanation: 'Trong thời kỳ quá độ, cơ cấu xã hội - giai cấp biến đổi đa dạng, xuất hiện sự tồn tại và phát triển của các tầng lớp xã hội mới như: "tầng lớp doanh nhân, tiểu chủ, tầng lớp những người giàu có và trung lưu trong xã hội".',
  },
  {
    id: 2,
    question: 'Đội ngũ Doanh nhân (một bộ phận nòng cốt của tầng lớp trung lưu) có vai trò gì trong sự nghiệp phát triển kinh tế - xã hội?',
    options: [
      'Chỉ tập trung vào việc làm giàu cho cá nhân và gia đình.',
      'Là lực lượng chính trị duy nhất lãnh đạo đất nước.',
      'Phát triển kinh tế, giải quyết việc làm, tham gia giải quyết các vấn đề an sinh xã hội, xóa đói, giảm nghèo.',
      'Thay thế hoàn toàn vai trò của nhà nước trong quản lý kinh tế.',
    ],
    correctIndex: 2,
    explanation: 'Đội ngũ doanh nhân đóng góp tích cực vào việc thực hiện chiến lược phát triển kinh tế - xã hội, "giải quyết việc làm cho người lao động và tham gia giải quyết các vấn đề an sinh xã hội, xóa đói, giảm nghèo".',
  },
  {
    id: 3,
    question: 'Xu hướng "trung lưu hóa" về mức sống của giai cấp công nhân hiện đại ở các nước tư bản phát triển được biểu hiện như thế nào?',
    options: [
      'Công nhân nắm toàn bộ tư liệu sản xuất và làm chủ nhà máy.',
      'Công nhân không còn bị bóc lột giá trị thặng dư.',
      'Công nhân chuyển hoàn toàn thành giai cấp tư sản.',
      'Một bộ phận công nhân sở hữu cổ phần, tư liệu sản xuất và có mức sống được cải thiện, nhưng vẫn bị phụ thuộc vào giới chủ.',
    ],
    correctIndex: 3,
    explanation: 'Một bộ phận công nhân đã tham gia vào sở hữu một lượng tư liệu sản xuất thông qua chế độ cổ phần hóa. Về mặt hình thức, họ có thể được "trung lưu hóa" về mức sống, nhưng về thực chất họ vẫn không chi phối được quá trình sản xuất và vẫn bị bóc lột.',
  },
  {
    id: 4,
    question: 'Đội ngũ Trí thức (nhóm xã hội thường được xếp vào tầng lớp trung lưu) giữ vị trí chiến lược như thế nào trong bối cảnh Cách mạng công nghiệp lần thứ tư?',
    options: [
      'Là lực lượng lao động sáng tạo đặc biệt quan trọng để đẩy mạnh công nghiệp hóa, hiện đại hóa và kinh tế tri thức.',
      'Là lực lượng trực tiếp sản xuất lương thực, thực phẩm nuôi sống xã hội.',
      'Là lực lượng trung gian, không có vai trò quan trọng trong liên minh giai cấp.',
      'Là lực lượng thay thế hoàn toàn giai cấp công nhân trong sản xuất.',
    ],
    correctIndex: 0,
    explanation: 'Đội ngũ trí thức là lực lượng lao động sáng tạo đặc biệt quan trọng trong tiến trình đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước và hội nhập quốc tế, xây dựng kinh tế tri thức.',
  },
  {
    id: 5,
    question: 'Trong khối liên minh giai cấp, tầng lớp ở Việt Nam, yếu tố nào được xác định là động lực quan trọng cho sự phát triển nhanh và bền vững của đất nước?',
    options: [
      'Sự đấu tranh gay gắt giữa các tầng lớp xã hội mới.',
      'Sự đồng thuận xã hội và khối đại đoàn kết toàn dân tộc (bao gồm cả doanh nhân, trí thức, v.v.).',
      'Sự tách biệt quyền lợi giữa các nhóm người giàu và nghèo.',
      'Sự phát triển độc lập của tầng lớp doanh nhân tách rời khỏi công nhân và nông dân.',
    ],
    correctIndex: 1,
    explanation: 'Việc tạo sự đồng thuận và phát huy tinh thần đoàn kết thống nhất giữa các lực lượng trong khối liên minh (công nhân, nông dân, trí thức, doanh nhân...) là động lực chủ yếu của sự phát triển đất nước.',
  },
  {
    id: 6,
    question: 'Để phát huy vai trò của các tầng lớp xã hội mới (như doanh nhân, trí thức) nhằm biến đổi cơ cấu xã hội theo hướng tích cực, giải pháp kinh tế căn bản là gì?',
    options: [
      'Ngăn cản sự phát triển của kinh tế tư nhân.',
      'Đẩy mạnh công nghiệp hóa, hiện đại hóa, phát triển kinh tế tri thức và kinh tế thị trường định hướng XHCN.',
      'Quay lại nền kinh tế bao cấp hoàn toàn.',
      'Chỉ tập trung phát triển nông nghiệp truyền thống.',
    ],
    correctIndex: 1,
    explanation: 'Cơ cấu xã hội muốn biến đổi theo hướng tích cực phải dựa trên cơ sở tăng trưởng và phát triển kinh tế nhanh, bền vững, gắn liền với đẩy mạnh công nghiệp hóa, hiện đại hóa và phát triển kinh tế tri thức.',
  },
  {
    id: 7,
    question: 'Trong thời kỳ quá độ lên chủ nghĩa xã hội, bên cạnh các giai cấp cơ bản, cơ cấu xã hội Việt Nam xuất hiện thêm những nhóm xã hội mới nào?',
    options: [
      'Tầng lớp quý tộc và tăng lữ.',
      'Tầng lớp doanh nhân, tiểu chủ, những người giàu có và trung lưu.',
      'Tầng lớp tư sản mại bản và địa chủ.',
      'Tầng lớp nô lệ và chủ nô mới.',
    ],
    correctIndex: 1,
    explanation: 'Giáo trình ghi nhận sự xuất hiện của "tầng lớp doanh nhân, tiểu chủ, tầng lớp những người giàu có và trung lưu trong xã hội".',
  },
  {
    id: 8,
    question: 'Yếu tố nào được xem là nguyên nhân quyết định dẫn đến sự biến đổi của cơ cấu xã hội - giai cấp trong thời kỳ quá độ?',
    options: [
      'Sự thay đổi về văn hóa và lối sống.',
      'Sự biến đổi của cơ cấu kinh tế (phương thức sản xuất, ngành nghề, thành phần kinh tế).',
      'Sự gia tăng dân số cơ học.',
      'Sự thay đổi về địa giới hành chính.',
    ],
    correctIndex: 1,
    explanation: 'Cơ cấu xã hội - giai cấp thường xuyên biến đổi do tác động của nhiều yếu tố, đặc biệt là những thay đổi về cơ cấu kinh tế, phương thức sản xuất.',
  },
  {
    id: 9,
    question: 'Xu hướng biến đổi chủ đạo của các giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội là gì?',
    options: [
      'Phân hóa sâu sắc và đối kháng gay gắt.',
      'Xích lại gần nhau, từng bước xóa bỏ bất bình đẳng xã hội.',
      'Tách biệt hoàn toàn về lợi ích kinh tế.',
      'Hình thành các đẳng cấp khép kín.',
    ],
    correctIndex: 1,
    explanation: 'Xu hướng tất yếu là sự vận động, phát triển theo hướng "xích lại gần nhau", từng bước xóa bỏ dần tình trạng bóc lột và tiến tới công bằng, bình đẳng.',
  },
  {
    id: 10,
    question: 'Nhóm xã hội nào được xác định là "lực lượng lao động sáng tạo đặc biệt quan trọng" trong tiến trình đẩy mạnh công nghiệp hóa, hiện đại hóa và hội nhập quốc tế?',
    options: [
      'Giai cấp nông dân.',
      'Đội ngũ doanh nhân.',
      'Đội ngũ trí thức.',
      'Tầng lớp tiểu chủ.',
    ],
    correctIndex: 2,
    explanation: 'Đội ngũ trí thức là lực lượng lao động sáng tạo đặc biệt quan trọng trong tiến trình đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước và hội nhập quốc tế.',
  },
  {
    id: 11,
    question: 'Giáo trình xác định vai trò xã hội quan trọng của đội ngũ doanh nhân Việt Nam hiện nay là gì bên cạnh việc phát triển kinh tế?',
    options: [
      'Tham gia giải quyết các vấn đề an sinh xã hội, xóa đói, giảm nghèo.',
      'Thay thế vai trò lãnh đạo của giai cấp công nhân.',
      'Quản lý toàn bộ hệ thống chính trị.',
      'Quyết định đường lối ngoại giao của đất nước.',
    ],
    correctIndex: 0,
    explanation: 'Đội ngũ doanh nhân đóng góp tích cực vào việc giải quyết việc làm cho người lao động và "tham gia giải quyết các vấn đề an sinh xã hội, xóa đói, giảm nghèo".',
  },
  {
    id: 12,
    question: 'Mục tiêu xây dựng đội ngũ doanh nhân lớn mạnh của Đảng ta bao gồm những tiêu chí nào?',
    options: [
      'Chỉ cần có vốn đầu tư lớn.',
      'Có năng lực, trình độ quản trị, kinh doanh giỏi, có đạo đức nghề nghiệp và trách nhiệm xã hội cao.',
      'Phải xuất thân từ thành phần kinh tế nhà nước.',
      'Phải hoạt động hoàn toàn trong lĩnh vực xuất khẩu.',
    ],
    correctIndex: 1,
    explanation: 'Xây dựng đội ngũ doanh nhân lớn mạnh, có năng lực, trình độ quản trị, kinh doanh giỏi, phẩm chất đạo đức, văn hóa kinh doanh và trách nhiệm xã hội cao.',
  },
  {
    id: 13,
    question: 'Khái niệm "Công nhân trí thức", "Công nhân áo trắng" phản ánh xu hướng biến đổi nào của giai cấp công nhân hiện đại?',
    options: [
      'Xu hướng bần cùng hóa.',
      'Xu hướng "trí tuệ hóa" (nâng cao trình độ chuyên môn kỹ thuật).',
      'Xu hướng hành chính hóa.',
      'Xu hướng phi chính trị hóa.',
    ],
    correctIndex: 1,
    explanation: 'Bộ phận "công nhân hiện đại", "công nhân trí thức" ngày càng lớn mạnh, đại diện cho phương thức sản xuất tiên tiến và xu hướng trí tuệ hóa.',
  },
  {
    id: 14,
    question: 'Trong liên minh giai cấp, đội ngũ trí thức có vai trò đặc biệt gì trong việc hỗ trợ công nhân và nông dân?',
    options: [
      'Cung cấp vốn đầu tư sản xuất.',
      'Truyền bá tri thức, khoa học công nghệ và nâng cao dân trí.',
      'Trực tiếp cày cấy và vận hành máy móc thay cho nông dân.',
      'Quản lý hành chính nhà nước tại địa phương.',
    ],
    correctIndex: 1,
    explanation: 'Đội ngũ trí thức là lực lượng trực tiếp nâng tầm trí tuệ của dân tộc, sức mạnh của đất nước, đưa khoa học công nghệ vào sản xuất nông nghiệp và công nghiệp.',
  },
  {
    id: 15,
    question: 'Nội dung kinh tế của liên minh giữa công nhân, nông dân và trí thức nhằm mục đích chính là gì?',
    options: [
      'Chia đều tài sản cho mọi thành viên trong xã hội.',
      'Thỏa mãn các nhu cầu, lợi ích kinh tế thiết thân của các chủ thể, tạo cơ sở vật chất - kỹ thuật cho CNXH.',
      'Loại bỏ hoàn toàn kinh tế tư nhân.',
      'Tập trung toàn bộ nguồn lực cho công nghiệp nặng.',
    ],
    correctIndex: 1,
    explanation: 'Nội dung kinh tế là thực hiện các nhu cầu, lợi ích kinh tế của các chủ thể, xây dựng nền kinh tế mới và tạo cơ sở vật chất - kỹ thuật cần thiết cho chủ nghĩa xã hội.',
  },
  {
    id: 16,
    question: 'Một trong những giải pháp để "xây dựng cơ cấu xã hội - giai cấp" theo hướng tích cực là gì?',
    options: [
      'Đẩy mạnh công nghiệp hóa, hiện đại hóa gắn với phát triển kinh tế tri thức.',
      'Duy trì nền kinh tế nông nghiệp thuần túy.',
      'Hạn chế sự phát triển của các đô thị.',
      'Giảm bớt số lượng sinh viên đại học.',
    ],
    correctIndex: 0,
    explanation: 'Đẩy mạnh công nghiệp hóa, hiện đại hóa; giải quyết tốt mối quan hệ giữa tăng trưởng kinh tế với đảm bảo tiến bộ, công bằng xã hội là giải pháp để thúc đẩy biến đổi cơ cấu xã hội tích cực.',
  },
  {
    id: 17,
    question: 'Trong khối đại đoàn kết toàn dân tộc, lực lượng nào được xác định là "nòng cốt"?',
    options: [
      'Chỉ riêng giai cấp công nhân.',
      'Liên minh giữa giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức.',
      'Tầng lớp doanh nhân và tiểu chủ.',
      'Các lực lượng vũ trang nhân dân.',
    ],
    correctIndex: 1,
    explanation: 'Liên minh giai cấp công nhân với giai cấp nông dân và đội ngũ trí thức là "nòng cốt" trong khối đại đoàn kết toàn dân tộc.',
  },
  {
    id: 18,
    question: 'Sự biến đổi của giai cấp nông dân trong thời kỳ quá độ diễn ra theo xu hướng nào?',
    options: [
      'Tăng nhanh về số lượng và tỷ trọng trong cơ cấu xã hội.',
      'Giảm dần về số lượng và tỷ lệ, một bộ phận chuyển sang làm công nhân hoặc dịch vụ.',
      'Giữ nguyên trạng thái sản xuất nhỏ lẻ, manh mún.',
      'Chuyển toàn bộ thành công nhân nông nghiệp trong các nông trường quốc doanh.',
    ],
    correctIndex: 1,
    explanation: 'Giai cấp nông dân có xu hướng giảm dần về số lượng và tỷ lệ; một bộ phận chuyển sang lao động trong các khu công nghiệp hoặc dịch vụ.',
  },
  {
    id: 19,
    question: 'Vai trò của Thế hệ trẻ (Thanh niên) trong cơ cấu xã hội và sự nghiệp xây dựng đất nước được mô tả như thế nào?',
    options: [
      'Là lực lượng phụ trợ, chưa cần quan tâm nhiều.',
      'Là rường cột của nước nhà, chủ nhân tương lai của đất nước.',
      'Chỉ tập trung vào việc học tập lý thuyết.',
      'Là lực lượng lao động thủ công chủ yếu.',
    ],
    correctIndex: 1,
    explanation: 'Thế hệ trẻ là "rường cột của nước nhà, chủ nhân tương lai của đất nước", là lực lượng xung kích trong xây dựng và bảo vệ Tổ quốc.',
  },
  {
    id: 20,
    question: 'Để phát huy vai trò của tầng lớp trung lưu và các tầng lớp nhân dân khác, "Nội dung Chính trị" của liên minh yêu cầu điều gì?',
    options: [
      'Giữ vững lập trường chính trị - tư tưởng của giai cấp công nhân và vai trò lãnh đạo của Đảng.',
      'Cho phép đa đảng và đa nguyên chính trị tự do.',
      'Tách rời chính trị khỏi các hoạt động kinh tế.',
      'Các tầng lớp tự phát triển không cần sự định hướng.',
    ],
    correctIndex: 0,
    explanation: 'Nội dung chính trị của liên minh là giữ vững lập trường chính trị - tư tưởng của giai cấp công nhân, đồng thời giữ vững vai trò lãnh đạo của Đảng Cộng sản Việt Nam.',
  },
];

// Function to randomly select 15 questions from the 20 available
const getRandomQuestions = (count: number = 15): Question[] => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const GamePage: React.FC = () => {
  // Initialize with 15 random questions from the pool of 20
  const [quizQuestions, setQuizQuestions] = useState<Question[]>(() => getRandomQuestions(15));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  // Firebase-related state
  const [showNameModal, setShowNameModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === quizQuestions[currentQuestion].correctIndex;
    if (isCorrect) {
      setScore(score + 1);
    }
    setAnswers([...answers, isCorrect]);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setQuizQuestions(getRandomQuestions(15)); // Get new random questions
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
    setScoreSubmitted(false);
    setSubmitError('');
  };

  const handleSaveScore = () => {
    setShowNameModal(true);
  };

  const handleSubmitScore = async (playerName: string) => {
    try {
      await submitQuizScore(playerName, score, quizQuestions.length, answers);
      setScoreSubmitted(true);
      setSubmitError('');
      // Show success message
      console.log('✅ Điểm đã được lưu thành công!');
    } catch (error) {
      console.error('Error submitting score:', error);
      setSubmitError('Không thể lưu điểm. Vui lòng kiểm tra kết nối.');
      throw error; // Re-throw to let modal handle it
    }
  };

  const handleViewLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen pt-20 pb-16 bg-vietnam-page relative">
      {/* Floating Stars */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="floating-star hidden md:block"
          style={{
            top: `${10 + i * 12}%`,
            left: i % 2 === 0 ? `${4 + i}%` : 'auto',
            right: i % 2 === 1 ? `${4 + i}%` : 'auto',
            animationDelay: `${i * 0.4}s`,
            fontSize: `${12 + i * 3}px`
          }}
        >
          ★
        </div>
      ))}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-vietnam-gold-500/20 text-vietnam-gold-400 border border-vietnam-gold-500/30 px-4 py-2 rounded-full mb-4">
            <Gamepad2 size={20} />
            <span className="font-medium">Trò chơi tương tác</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Quiz: Tầng lớp Trung lưu
          </h1>
          <p className="text-lg text-white/80">
            Kiểm tra kiến thức của bạn về Chương 5 CNXH Khoa học
          </p>
        </motion.div>

        {!quizCompleted ? (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-white/80 mb-2">
                <span>Câu {currentQuestion + 1}/{quizQuestions.length}</span>
                <span>Điểm: {score}/{currentQuestion + (showResult ? 1 : 0)}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-vietnam-gold-400 to-vietnam-gold-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <motion.div
              key={question.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-6"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                {question.question}
              </h2>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${showResult
                      ? index === question.correctIndex
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === index
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                      : selectedAnswer === index
                        ? 'border-vietnam-red-500 bg-vietnam-red-50'
                        : 'border-gray-200 hover:border-vietnam-red-300 hover:bg-vietnam-red-50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${showResult
                        ? index === question.correctIndex
                          ? 'bg-green-500 text-white'
                          : selectedAnswer === index
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                        : 'bg-gray-200 text-gray-600'
                        }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 text-gray-900">{option}</span>
                      {showResult && index === question.correctIndex && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                      {showResult && selectedAnswer === index && index !== question.correctIndex && (
                        <XCircle className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 bg-vietnam-gold-50 border border-vietnam-gold-200 rounded-xl"
                  >
                    <p className="text-sm text-gray-700">
                      <strong>Giải thích:</strong> {question.explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Next Button */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white font-bold rounded-full hover:opacity-90 transition"
                >
                  {currentQuestion < quizQuestions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả'}
                </button>
              </motion.div>
            )}
          </>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
          >
            <Trophy className="w-20 h-20 mx-auto text-vietnam-gold-500 mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Hoàn thành!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              Bạn đạt được {score}/{quizQuestions.length} điểm
            </p>

            {/* Score visualization */}
            <div className="flex justify-center gap-2 mb-8">
              {answers.map((correct, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${correct ? 'bg-green-500' : 'bg-red-500'
                    } text-white text-sm font-bold`}
                >
                  {index + 1}
                </div>
              ))}
            </div>

            {/* Feedback */}
            <div className="mb-8 p-4 rounded-xl bg-gray-50">
              {score === quizQuestions.length ? (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Star className="w-6 h-6" fill="currentColor" />
                  <span className="font-bold">Xuất sắc! Bạn nắm vững kiến thức về tầng lớp trung lưu!</span>
                </div>
              ) : score >= quizQuestions.length * 0.7 ? (
                <span className="text-green-600 font-medium">Rất tốt! Bạn hiểu khá rõ về chủ đề này.</span>
              ) : score >= quizQuestions.length * 0.5 ? (
                <span className="text-yellow-600 font-medium">Khá ổn! Hãy ôn tập thêm để nắm vững hơn.</span>
              ) : (
                <span className="text-red-600 font-medium">Cần cố gắng hơn! Hãy đọc lại Chương 5 nhé.</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleViewLeaderboard}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-vietnam-gold-500 text-vietnam-gold-600 font-bold rounded-full hover:bg-vietnam-gold-50 transition"
              >
                <Award className="w-5 h-5" />
                Xem bảng xếp hạng
              </button>

              {!scoreSubmitted ? (
                <button
                  onClick={handleSaveScore}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-full hover:opacity-90 transition"
                >
                  <Save className="w-5 h-5" />
                  Lưu điểm
                </button>
              ) : (
                <div className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-100 text-green-700 font-bold rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  Đã lưu điểm
                </div>
              )}

              <button
                onClick={handleRestart}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white font-bold rounded-full hover:opacity-90 transition"
              >
                <RotateCcw className="w-5 h-5" />
                Chơi lại
              </button>
            </div>

            {/* Error Message */}
            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center"
              >
                {submitError}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <NameInputModal
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onSubmit={handleSubmitScore}
        score={score}
        totalQuestions={quizQuestions.length}
      />

      <Leaderboard
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        currentScore={scoreSubmitted ? score : undefined}
      />
    </div>
  );
};

export default GamePage;
