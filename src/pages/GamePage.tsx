import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, CheckCircle, XCircle, RotateCcw, Trophy, Star, Award, User, Play } from 'lucide-react';
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
  // Phần 1: Kiến thức cơ bản về tầng lớp trung lưu
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
    explanation: 'Trong thời kỳ quá độ, cơ cấu xã hội - giai cấp biến đổi đa dạng, xuất hiện sự tồn tại và phát triển của các tầng lớp xã hội mới như: "tầng lớp doanh nhân, tiểu chủ, tầng lớp những người giàu có và trung lưu trong xã hội" (tr.136-138).',
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
    explanation: 'Đội ngũ doanh nhân đóng góp tích cực vào việc thực hiện chiến lược phát triển kinh tế - xã hội, "giải quyết việc làm cho người lao động và tham gia giải quyết các vấn đề an sinh xã hội, xóa đói, giảm nghèo" (tr.141-143).',
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
    explanation: 'Một bộ phận công nhân đã tham gia vào sở hữu một lượng tư liệu sản xuất thông qua chế độ cổ phần hóa. Về mặt hình thức, họ có thể được "trung lưu hóa" về mức sống, nhưng về thực chất họ vẫn không chi phối được quá trình sản xuất và vẫn bị bóc lột (tr.137).',
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
    explanation: 'Đội ngũ trí thức là lực lượng lao động sáng tạo đặc biệt quan trọng trong tiến trình đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước và hội nhập quốc tế, xây dựng kinh tế tri thức (tr.139-141).',
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
    explanation: 'Việc tạo sự đồng thuận và phát huy tinh thần đoàn kết thống nhất giữa các lực lượng trong khối liên minh (công nhân, nông dân, trí thức, doanh nhân...) là động lực chủ yếu của sự phát triển đất nước (tr.144-148).',
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
    explanation: 'Cơ cấu xã hội muốn biến đổi theo hướng tích cực phải dựa trên cơ sở tăng trưởng và phát triển kinh tế nhanh, bền vững, gắn liền với đẩy mạnh công nghiệp hóa, hiện đại hóa và phát triển kinh tế tri thức (tr.148-150).',
  },
  // Phần 2: Sự xuất hiện và bản chất của tầng lớp trung lưu
  {
    id: 7,
    question: 'Nguyên nhân cơ bản nào dẫn đến sự biến đổi đa dạng trong cơ cấu xã hội – giai cấp và sự xuất hiện của tầng lớp trung lưu tại Việt Nam trong thời kỳ quá độ?',
    options: [
      'Sự phát triển độc tôn của thành phần kinh tế nhà nước.',
      'Sự chuyển đổi sang nền kinh tế nhiều thành phần.',
      'Sự xóa bỏ hoàn toàn các yếu tố kinh tế cũ.',
      'Sự giảm sút vai trò của giai cấp công nhân và nông dân.',
    ],
    correctIndex: 1,
    explanation: 'Trong thời kỳ quá độ, cơ cấu kinh tế thay đổi sang nền kinh tế nhiều thành phần. Chính kết cấu kinh tế đa dạng này dẫn đến những biến đổi trong cơ cấu xã hội – giai cấp và hình thành các tầng lớp mới (tr.132-135).',
  },
  {
    id: 8,
    question: 'Sự xuất hiện của tầng lớp trung lưu phản ánh tính chất gì của quá trình phát triển xã hội tại Việt Nam?',
    options: [
      'Sự mâu thuẫn gay gắt không thể điều hòa giữa các giai cấp.',
      'Sự vận động đan xen giữa các yếu tố cũ và mới, kết quả của kinh tế thị trường định hướng XHCN.',
      'Sự sao chép hoàn toàn mô hình xã hội của các nước tư bản chủ nghĩa.',
      'Sự phân hóa giàu nghèo tiêu cực cần phải loại bỏ.',
    ],
    correctIndex: 1,
    explanation: 'Sự xuất hiện tầng lớp trung lưu phản ánh "sự vận động đan xen giữa các yếu tố cũ và mới, và là kết quả của việc phát triển kinh tế thị trường định hướng xã hội chủ nghĩa" (tr.136).',
  },
  {
    id: 9,
    question: 'Theo lý luận về xu hướng "trung lưu hóa", biểu hiện về mặt hình thức của một bộ phận công nhân hiện đại là gì?',
    options: [
      'Họ trở thành giai cấp tư sản và nắm quyền lãnh đạo.',
      'Họ không còn là "vô sản" trần trụi mà có thể sở hữu một lượng tư liệu sản xuất nhỏ (cổ phần).',
      'Họ hoàn toàn làm chủ quá trình phân chia lợi nhuận của doanh nghiệp.',
      'Họ tách khỏi quá trình sản xuất trực tiếp để làm quản lý.',
    ],
    correctIndex: 1,
    explanation: 'Bộ phận công nhân hiện đại không còn là "vô sản" trần trụi nữa mà có thể tham gia sở hữu một lượng tư liệu sản xuất nhỏ thông qua chế độ cổ phần hóa (tr.137).',
  },
  {
    id: 10,
    question: 'Về bản chất, tại sao việc sở hữu cổ phần nhỏ hoặc có mức sống trung lưu chưa thể biến người công nhân thành giai cấp thống trị?',
    options: [
      'Vì họ vẫn thiếu trình độ học vấn.',
      'Vì họ không chiếm được tỷ lệ sở hữu tư liệu sản xuất chủ yếu nên vẫn bị chi phối bởi giới chủ.',
      'Vì pháp luật không cho phép công nhân làm chủ.',
      'Vì họ không muốn tham gia vào việc quản lý.',
    ],
    correctIndex: 1,
    explanation: 'Dù mức sống đạt ngưỡng trung lưu, nhưng nếu "không chiếm được tỷ lệ sở hữu tư liệu sản xuất chủ yếu", người lao động vẫn phụ thuộc vào giới chủ trong phân chia lợi nhuận (tr.137).',
  },
  // Phần 3: Nguồn gốc cấu thành & Quan điểm của Đảng
  {
    id: 11,
    question: 'Đâu là một trong những nguồn gốc chủ yếu hình thành nên tầng lớp trung lưu Việt Nam, được mô tả là "nòng cốt về mặt tri thức"?',
    options: [
      'Đội ngũ Nông dân sản xuất giỏi.',
      'Đội ngũ Doanh nhân.',
      'Đội ngũ Trí thức.',
      'Đội ngũ Công nhân kỹ thuật.',
    ],
    correctIndex: 2,
    explanation: 'Đội ngũ Trí thức là lực lượng lao động sáng tạo, góp phần nâng cao dân trí và là "nòng cốt của tầng lớp trung lưu về mặt tri thức" (tr.139-141).',
  },
  {
    id: 12,
    question: 'Quan điểm của Đảng và Nhà nước về chính sách đối với việc làm giàu của các tầng lớp xã hội là gì?',
    options: [
      'Hạn chế làm giàu để đảm bảo bình đẳng tuyệt đối.',
      'Khuyến khích làm giàu hợp pháp đi đôi với xóa đói giảm nghèo.',
      'Chỉ khuyến khích làm giàu đối với khu vực kinh tế nhà nước.',
      'Ưu tiên xóa đói giảm nghèo và kìm hãm sự phát triển của tầng lớp giàu có.',
    ],
    correctIndex: 1,
    explanation: 'Quan điểm của Đảng và Nhà nước là "Khuyến khích làm giàu hợp pháp đi đôi với xóa đói giảm nghèo" (tr.148-150).',
  },
  {
    id: 13,
    question: 'Trong khối đại đoàn kết toàn dân tộc, vị trí của tầng lớp trung lưu và các tầng lớp xã hội mới được xác định như thế nào?',
    options: [
      'Là lực lượng đối lập với giai cấp công nhân.',
      'Đứng ngoài hệ thống chính trị xã hội.',
      'Cùng với công nhân, nông dân, trí thức tạo thành khối thống nhất dưới sự lãnh đạo của Đảng.',
      'Là lực lượng lãnh đạo thay thế cho giai cấp công nhân.',
    ],
    correctIndex: 2,
    explanation: 'Các tầng lớp xã hội mới cùng với công nhân, nông dân, trí thức tạo thành cơ cấu xã hội đa dạng nhưng thống nhất dưới sự lãnh đạo của Đảng (tr.144-148).',
  },
  {
    id: 14,
    question: 'Khái niệm "Công nhân trí thức", "Công nhân áo trắng" phản ánh xu hướng biến đổi nào của giai cấp công nhân hiện đại?',
    options: [
      'Xu hướng bần cùng hóa.',
      'Xu hướng "trí tuệ hóa" (nâng cao trình độ chuyên môn kỹ thuật).',
      'Xu hướng hành chính hóa.',
      'Xu hướng phi chính trị hóa.',
    ],
    correctIndex: 1,
    explanation: 'Bộ phận "công nhân hiện đại", "công nhân trí thức" ngày càng lớn mạnh, đại diện cho phương thức sản xuất tiên tiến và xu hướng trí tuệ hóa (tr.137).',
  },
  {
    id: 15,
    question: 'Trong liên minh giai cấp, đội ngũ trí thức có vai trò đặc biệt gì trong việc hỗ trợ công nhân và nông dân?',
    options: [
      'Cung cấp vốn đầu tư sản xuất.',
      'Truyền bá tri thức, khoa học công nghệ và nâng cao dân trí.',
      'Trực tiếp cày cấy và vận hành máy móc thay cho nông dân.',
      'Quản lý hành chính nhà nước tại địa phương.',
    ],
    correctIndex: 1,
    explanation: 'Đội ngũ trí thức là lực lượng trực tiếp nâng tầm trí tuệ của dân tộc, sức mạnh của đất nước, đưa khoa học công nghệ vào sản xuất nông nghiệp và công nghiệp (tr.139-141).',
  },
  {
    id: 16,
    question: 'Yếu tố nào được xem là nguyên nhân quyết định dẫn đến sự biến đổi của cơ cấu xã hội - giai cấp trong thời kỳ quá độ?',
    options: [
      'Sự thay đổi về văn hóa và lối sống.',
      'Sự biến đổi của cơ cấu kinh tế (phương thức sản xuất, ngành nghề, thành phần kinh tế).',
      'Sự gia tăng dân số cơ học.',
      'Sự thay đổi về địa giới hành chính.',
    ],
    correctIndex: 1,
    explanation: 'Cơ cấu xã hội - giai cấp thường xuyên biến đổi do tác động của nhiều yếu tố, đặc biệt là những thay đổi về cơ cấu kinh tế, phương thức sản xuất (tr.132-135).',
  },
  {
    id: 17,
    question: 'Xu hướng biến đổi chủ đạo của các giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội là gì?',
    options: [
      'Phân hóa sâu sắc và đối kháng gay gắt.',
      'Xích lại gần nhau, từng bước xóa bỏ bất bình đẳng xã hội.',
      'Tách biệt hoàn toàn về lợi ích kinh tế.',
      'Hình thành các đẳng cấp khép kín.',
    ],
    correctIndex: 1,
    explanation: 'Xu hướng tất yếu là sự vận động, phát triển theo hướng "xích lại gần nhau", từng bước xóa bỏ dần tình trạng bóc lột và tiến tới công bằng, bình đẳng (tr.135-136).',
  },
  {
    id: 18,
    question: 'Nhóm xã hội nào được xác định là "lực lượng lao động sáng tạo đặc biệt quan trọng" trong tiến trình đẩy mạnh công nghiệp hóa, hiện đại hóa và hội nhập quốc tế?',
    options: [
      'Giai cấp nông dân.',
      'Đội ngũ doanh nhân.',
      'Đội ngũ trí thức.',
      'Tầng lớp tiểu chủ.',
    ],
    correctIndex: 2,
    explanation: 'Đội ngũ trí thức là lực lượng lao động sáng tạo đặc biệt quan trọng trong tiến trình đẩy mạnh công nghiệp hóa, hiện đại hóa đất nước và hội nhập quốc tế (tr.139-141).',
  },
  {
    id: 19,
    question: 'Vai trò xã hội quan trọng của đội ngũ doanh nhân Việt Nam hiện nay là gì bên cạnh việc phát triển kinh tế?',
    options: [
      'Tham gia giải quyết các vấn đề an sinh xã hội, xóa đói, giảm nghèo.',
      'Thay thế vai trò lãnh đạo của giai cấp công nhân.',
      'Quản lý toàn bộ hệ thống chính trị.',
      'Quyết định đường lối ngoại giao của đất nước.',
    ],
    correctIndex: 0,
    explanation: 'Đội ngũ doanh nhân đóng góp tích cực vào việc giải quyết việc làm cho người lao động và "tham gia giải quyết các vấn đề an sinh xã hội, xóa đói, giảm nghèo" (tr.141-143).',
  },
  {
    id: 20,
    question: 'Mục tiêu xây dựng đội ngũ doanh nhân lớn mạnh của Đảng ta bao gồm những tiêu chí nào?',
    options: [
      'Chỉ cần có vốn đầu tư lớn.',
      'Có năng lực, trình độ quản trị, kinh doanh giỏi, có đạo đức nghề nghiệp và trách nhiệm xã hội cao.',
      'Phải xuất thân từ thành phần kinh tế nhà nước.',
      'Phải hoạt động hoàn toàn trong lĩnh vực xuất khẩu.',
    ],
    correctIndex: 1,
    explanation: 'Xây dựng đội ngũ doanh nhân lớn mạnh, có năng lực, trình độ quản trị, kinh doanh giỏi, phẩm chất đạo đức, văn hóa kinh doanh và trách nhiệm xã hội cao (tr.141-143).',
  },
];

// Function to randomly select 15 questions from the 20 available
const getRandomQuestions = (count: number = 15): Question[] => {
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const GamePage: React.FC = () => {
  // Player name and quiz start state
  const [playerName, setPlayerName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [nameError, setNameError] = useState('');

  // Initialize with 15 random questions from the pool of 20
  const [quizQuestions, setQuizQuestions] = useState<Question[]>(() => getRandomQuestions(15));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  // Firebase-related state
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Auto-submit score when quiz is completed
  useEffect(() => {
    const submitScore = async () => {
      if (quizCompleted && playerName && !scoreSubmitted) {
        try {
          await submitQuizScore(playerName, score, quizQuestions.length, answers);
          setScoreSubmitted(true);
          setSubmitError('');
          console.log('✅ Điểm đã được lưu thành công!');
        } catch (error) {
          console.error('Error submitting score:', error);
          setSubmitError('Không thể lưu điểm tự động. Vui lòng kiểm tra kết nối.');
        }
      }
    };
    submitScore();
  }, [quizCompleted, playerName, score, quizQuestions.length, answers, scoreSubmitted]);

  const handleStartQuiz = () => {
    if (playerName.trim().length < 2) {
      setNameError('Tên phải có ít nhất 2 ký tự');
      return;
    }
    setNameError('');
    setQuizStarted(true);
  };

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
    setQuizStarted(false); // Go back to name input screen
    setPlayerName(''); // Reset player name
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
          {quizStarted && playerName && (
            <p className="text-md text-vietnam-gold-400 mt-2">
              Người chơi: <span className="font-bold">{playerName}</span>
            </p>
          )}
        </motion.div>

        {/* Name Input Screen - Before Quiz Start */}
        {!quizStarted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-lg mx-auto"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-vietnam-red-500 to-vietnam-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Chào mừng đến với Quiz!
            </h2>
            <p className="text-gray-600 mb-6">
              Nhập tên của bạn để bắt đầu. Điểm số sẽ được tự động lưu khi hoàn thành.
            </p>

            <div className="mb-6">
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Tên người chơi
              </label>
              <input
                id="playerName"
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleStartQuiz()}
                placeholder="Ví dụ: Nguyễn Văn A"
                maxLength={50}
                autoFocus
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-vietnam-gold-500 transition text-gray-900 ${nameError ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {nameError && (
                <p className="mt-2 text-sm text-red-600 text-left">{nameError}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleViewLeaderboard}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-vietnam-gold-500 text-vietnam-gold-600 font-bold rounded-full hover:bg-vietnam-gold-50 transition"
              >
                <Award className="w-5 h-5" />
                Xem bảng xếp hạng
              </button>
              <button
                onClick={handleStartQuiz}
                disabled={playerName.trim().length < 2}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white font-bold rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-5 h-5" />
                Bắt đầu Quiz
              </button>
            </div>
          </motion.div>
        ) : !quizCompleted ? (
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

              {scoreSubmitted && (
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
      <Leaderboard
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        currentScore={scoreSubmitted ? score : undefined}
      />
    </div>
  );
};

export default GamePage;
