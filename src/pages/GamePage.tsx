import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, CheckCircle, XCircle, RotateCcw, Trophy, Star } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: 'Theo giáo trình CNXH Khoa học, tầng lớp trung lưu thuộc nhóm nào?',
    options: [
      'Giai cấp công nhân',
      'Giai cấp nông dân',
      'Tầng lớp xã hội mới',
      'Giai cấp tư sản',
    ],
    correctIndex: 2,
    explanation: 'Trong giáo trình CNXH Khoa học, tầng lớp trung lưu được xếp vào nhóm các "tầng lớp xã hội mới" - những người nằm ở vị trí trung gian trong thang bậc xã hội.',
  },
  {
    id: 2,
    question: 'Tỷ lệ tầng lớp trung lưu Việt Nam năm 2018 theo World Bank là bao nhiêu?',
    options: ['7.7%', '16.3%', '26%', '50%'],
    correctIndex: 1,
    explanation: 'Theo báo cáo World Bank, năm 2018 tầng lớp trung lưu Việt Nam chiếm 16.3% dân số, tăng đáng kể so với 7.7% năm 2010.',
  },
  {
    id: 3,
    question: 'Sự kiện nào đánh dấu bước ngoặt cho sự hình thành tầng lớp trung lưu Việt Nam?',
    options: [
      'Thống nhất đất nước 1975',
      'Đổi mới 1986',
      'Gia nhập WTO 2007',
      'Đại hội XIV',
    ],
    correctIndex: 1,
    explanation: 'Đại hội VI (1986) với quyết định Đổi mới, chấp nhận nền kinh tế thị trường định hướng XHCN, đã phá vỡ cơ cấu xã hội "thuần nhất" cũ và tạo điều kiện cho sự xuất hiện của tầng lớp trung lưu.',
  },
  {
    id: 4,
    question: 'Tầng lớp trung lưu Việt Nam được hình thành từ những nguồn nào?',
    options: [
      'Chỉ từ trí thức',
      'Chỉ từ doanh nhân',
      'Trí thức + Doanh nhân + Công nhân hiện đại',
      'Nông dân giàu có',
    ],
    correctIndex: 2,
    explanation: 'Theo Chương 5, tầng lớp trung lưu Việt Nam đến từ 3 nguồn chính: Đội ngũ trí thức, Đội ngũ doanh nhân, và Công nhân hiện đại (trí thức hóa).',
  },
  {
    id: 5,
    question: 'Mục tiêu tầng lớp trung lưu Việt Nam đến năm 2035 là bao nhiêu % dân số?',
    options: ['26%', '35%', '50%', '70%'],
    correctIndex: 2,
    explanation: 'Theo dự báo, đến năm 2035 tầng lớp trung lưu Việt Nam sẽ chiếm khoảng 50% dân số - đây là thước đo quan trọng cho sự thành công của công cuộc xây dựng CNXH.',
  },
  {
    id: 6,
    question: 'Nghị quyết nào của Bộ Chính trị (2023) khẳng định vai trò của đội ngũ doanh nhân?',
    options: [
      'Nghị quyết 36-NQ/TW',
      'Nghị quyết 41-NQ/TW',
      'Nghị quyết 45-NQ/TW',
      'Nghị quyết 52-NQ/TW',
    ],
    correctIndex: 1,
    explanation: 'Nghị quyết 41-NQ/TW (năm 2023) của Bộ Chính trị về xây dựng đội ngũ doanh nhân đã khẳng định vai trò quan trọng của họ trong cơ cấu xã hội và phát triển kinh tế.',
  },
  {
    id: 7,
    question: '"Kỷ nguyên vươn mình" gắn liền với lực lượng sản xuất mới nào?',
    options: [
      'Nông nghiệp hữu cơ',
      'Công nghiệp nặng',
      'Kinh tế số, kinh tế xanh, kinh tế dữ liệu',
      'Thương mại truyền thống',
    ],
    correctIndex: 2,
    explanation: 'Trong dự thảo Báo cáo chính trị trình Đại hội XIV, "Kỷ nguyên vươn mình" gắn liền với phát triển Lực lượng sản xuất mới: kinh tế số, kinh tế tuần hoàn, kinh tế xanh, kinh tế dữ liệu.',
  },
  {
    id: 8,
    question: 'Theo quan điểm Mác-Lênin, khi phương thức sản xuất thay đổi thì điều gì xảy ra?',
    options: [
      'Cơ cấu xã hội không đổi',
      'Cơ cấu xã hội tất yếu thay đổi theo',
      'Chỉ có kinh tế thay đổi',
      'Văn hóa thay đổi trước',
    ],
    correctIndex: 1,
    explanation: 'Theo Chủ nghĩa xã hội khoa học, cơ cấu xã hội có quan hệ biện chứng với cơ cấu kinh tế. Khi phương thức sản xuất thay đổi, cơ cấu xã hội cũng tất yếu thay đổi theo.',
  },
];

const GamePage: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

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
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
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
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      showResult
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
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        showResult
                          ? index === question.correctIndex
                            ? 'bg-green-500 text-white'
                            : selectedAnswer === index
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-200 text-gray-600'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    correct ? 'bg-green-500' : 'bg-red-500'
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

            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white font-bold rounded-full hover:opacity-90 transition"
            >
              <RotateCcw className="w-5 h-5" />
              Chơi lại
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
