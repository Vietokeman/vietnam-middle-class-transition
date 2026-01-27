import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, RotateCcw, Trophy, Play, CheckCircle, XCircle, Shuffle, ArrowRight, User } from 'lucide-react';
import HardGameLeaderboard from '@/components/HardGameLeaderboard';
import { submitHardGameScore } from '@/services/hardGameService';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctIndex: number;
}

const questions: Question[] = [
    {
        id: 1,
        question: 'Thêm cụm từ thích hợp vào chỗ trống của câu sau để được câu đúng: "Cơ cấu xã hội là những... cùng toàn bộ những mối quan hệ xã hội do sự tác động lẫn nhau của các cộng đồng ấy tạo nên".',
        options: ['Cộng đồng dân cư', 'Cộng đồng dân tộc', 'Cộng đồng nghề nghiệp', 'Cộng đồng người'],
        correctIndex: 3
    },
    {
        id: 2,
        question: 'Cơ cấu xã hội nào có vị trí quan trọng hàng đầu, chi phối các loại hình cơ cấu xã hội khác?',
        options: ['Cơ cấu xã hội -dân cư', 'Cơ cấu xã hội -nghề nghiệp', 'Cơ cấu xã hội -giai cấp', 'Cơ cấu xã hội -tôn giáo'],
        correctIndex: 2
    },
    {
        id: 3,
        question: 'Sự biến đổi của cơ cấu xã hội - giai cấp trong thời kỳ quá độ lên chủ nghĩa xã hội gắn liền và bị quy định bởi cơ cấu nào sau đây?',
        options: ['Cơ cấu dân số', 'Cơ cấu kinh tế', 'Cơ cấu lãnh thổ', 'Cơ cấu nghề nghiệp'],
        correctIndex: 1
    },
    {
        id: 4,
        question: 'Theo C.Mác và Ph.Ăngghen, nhiều cuộc đấu tranh của giai cấp công nhân ở châu Âu, nhất là ở nước Anh và Pháp từ giữa thế kỷ XIX thất bại là do:',
        options: ['Không tổ chức liên minh với tầng lớp trí thức', 'Không tổ chức liên minh với giai cấp tư sản', 'Không tổ chức liên minh với giai cấp nông dân', 'Không tổ chức liên minh với tầng lớp tiểu chủ'],
        correctIndex: 2
    },
    {
        id: 5,
        question: 'Trong cách mạng xã hội chủ nghĩa, dưới sự lãnh đạo của Đảng Cộng sản, giai cấp công nhân phải liên minh với giai cấp, tầng lớp nào?',
        options: ['Giai cấp nông dân và giai cấp tư sản', 'Tầng lớp trí thức và tầng lớp tiểu chủ', 'Tầng lớp trí thức và tầng lớp doanh nhân', 'Giai cấp nông dân và các tầng lớp nhân dân lao động'],
        correctIndex: 3
    },
    {
        id: 6,
        question: 'Chọn cụm từ thích hợp vào chỗ trống (1) để được luận điểm đúng: Theo V.I.Lênin: "Nếu không liên minh với...(1)...thì không thể có được chính quyền của giai cấp vô sản..."',
        options: ['Trí thức', 'Nông dân', 'Tư sản', 'Tiểu thương'],
        correctIndex: 1
    },
    {
        id: 7,
        question: 'V.I.Lênin đã xem liên minh giữa giai cấp, tầng lớp nào là một hình thức liên minh đặc biệt trong giai đoạn giành chính quyền và xây dựng chủ nghĩa xã hội?',
        options: ['Giai cấp công nhân với giai cấp nông dân và các tầng lớp xã hội khác', 'Giai cấp công nhân với giai cấp nông dân và tầng lớp trí thức', 'Giai cấp công nhân với giai cấp nông dân và tầng lớp tiểu tư sản', 'Giai cấp công nhân với tầng lớp trí thức và doanh nhân'],
        correctIndex: 0
    },
    {
        id: 8,
        question: 'Trong thời kỳ quá độ lên chủ nghĩa xã hội, cơ cấu xã hội -giai cấp biến đổi trong mối quan hệ nào?',
        options: ['Trong mối quan hệ vừa đấu tranh, vừa liên minh, từng bước xóa bỏ bất nghèo đói, bất công dẫn đến sự xích lại gần nhau.', 'Trong mối quan hệ vừa đấu tranh, vừa liên minh, từng bước xóa bỏ bất bình đẳng xã hội dẫn đến sự xích lại gần nhau.', 'Trong mối quan hệ vừa đấu tranh, vừa liên minh, từng bước xóa bỏ sự áp bức bóc lột dẫn đến sự xích lại gần nhau.', 'Không có câu trả lời đúng'],
        correctIndex: 1
    },
    {
        id: 9,
        question: 'Đâu là nội dung cơ bản quyết định nhất, là cơ sở vật chất - kỹ thuật của liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội ở Việt Nam?',
        options: ['Nội dung kinh tế của liên minh', 'Nội dung chính trị của liên minh', 'Nội dung văn hóa xã hội của liên minh', 'Tất cả đều đúng'],
        correctIndex: 0
    },
    {
        id: 10,
        question: 'Theo V.I.Lênin, đâu là vấn đề mang tính nguyên tắc để đảm bảo cho thắng lợi của cuộc cách mạng xã hội chủ nghĩa tháng Mười Nga năm 1917?',
        options: ['Liên minh công, nông', 'Liên minh công, nông và trí thức', 'Liên minh công, tầng lớp lao động', 'Không có câu trả lời đúng'],
        correctIndex: 3
    }
];

// Shuffle array helper
const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Convert string to array of characters (including spaces)
const stringToChars = (str: string): string[] => {
    return str.split('');
};

const HardGamePage: React.FC = () => {
    const [playerName, setPlayerName] = useState('');
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [shuffledChars, setShuffledChars] = useState<string[]>([]);
    const [selectedChars, setSelectedChars] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [scoreSaved, setScoreSaved] = useState(false);
    const [saving, setSaving] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.options[currentQuestion.correctIndex];

    // Initialize shuffled characters when question changes
    useEffect(() => {
        if (!gameStarted) return;

        const chars = stringToChars(correctAnswer);
        setShuffledChars(shuffleArray(chars));
        setSelectedChars([]);
        setIsCorrect(null);
    }, [currentQuestionIndex, gameStarted, correctAnswer]);

    // Timer
    useEffect(() => {
        if (!gameStarted || showResult) return;

        const interval = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [gameStarted, showResult]);

    // Auto-save score when game ends
    useEffect(() => {
        if (showResult && !scoreSaved && playerName.trim()) {
            handleSaveScore();
        }
    }, [showResult]);

    const handleCharClick = (char: string, index: number) => {
        setSelectedChars([...selectedChars, char]);
        setShuffledChars(shuffledChars.filter((_, i) => i !== index));
    };

    const handleSelectedCharClick = (index: number) => {
        const char = selectedChars[index];
        setShuffledChars([...shuffledChars, char]);
        setSelectedChars(selectedChars.filter((_, i) => i !== index));
    };

    const handleCheck = () => {
        const userAnswer = selectedChars.join('');
        const correct = userAnswer === correctAnswer;

        setIsCorrect(correct);
        setAnswers([...answers, correct]);

        if (correct) {
            setScore(score + 10);
        } else {
            setScore(Math.max(0, score - 2));
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsCorrect(null);
        } else {
            setShowResult(true);
        }
    };

    const handleShuffle = () => {
        setShuffledChars(shuffleArray(shuffledChars));
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimer(0);
        setGameStarted(false);
        setShowResult(false);
        setAnswers([]);
        setIsCorrect(null);
        setScoreSaved(false);
    };

    const handleSaveScore = async () => {
        if (scoreSaved || !playerName.trim()) return;

        setSaving(true);
        try {
            await submitHardGameScore(
                playerName,
                answers.filter(a => a).length,
                questions.length,
                timer,
                answers
            );
            setScoreSaved(true);
            console.log('✅ Score saved successfully!');
        } catch (error) {
            console.error('❌ Error saving score:', error);
            alert('Không thể lưu điểm. Vui lòng thử lại.');
        } finally {
            setSaving(false);
        }
    };

    const handleNameSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (playerName.trim().length >= 2) {
            setNameSubmitted(true);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    if (!nameSubmitted) {
        return (
            <div className="min-h-screen pt-20 pb-16 bg-vietnam-page relative">
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 bg-vietnam-gold-500/20 text-vietnam-gold-400 border border-vietnam-gold-500/30 px-4 py-2 rounded-full mb-4">
                            <Crown size={20} />
                            <span className="font-medium">Game thử thách</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                            👑 VUA MẬT MÃ 👑
                        </h1>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl shadow-xl p-8"
                        >
                            <div className="w-20 h-20 bg-gradient-to-r from-vietnam-red-500 to-vietnam-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <User className="w-10 h-10 text-white" />
                            </div>

                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Nhập tên của bạn
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Để lưu điểm vào bảng xếp hạng
                            </p>

                            <form onSubmit={handleNameSubmit}>
                                <input
                                    type="text"
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    placeholder="Tên của bạn"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-vietnam-gold-500 focus:outline-none text-center text-lg mb-4"
                                    maxLength={30}
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    disabled={playerName.trim().length < 2}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white font-bold rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Tiếp tục
                                </button>
                            </form>

                            <p className="text-sm text-gray-500 mt-4">
                                Tên phải có ít nhất 2 ký tự
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (!gameStarted) {
        return (
            <div className="min-h-screen pt-20 pb-16 bg-vietnam-page relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-vietnam-gold-500/20 text-vietnam-gold-400 border border-vietnam-gold-500/30 px-4 py-2 rounded-full mb-4">
                            <Crown size={20} />
                            <span className="font-medium">Game thử thách</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                            👑 VUA MẬT MÃ 👑
                        </h1>
                        <p className="text-lg text-white/80 mb-2">
                            Sắp xếp lại các chữ cái để tìm đáp án đúng!
                        </p>
                        <p className="text-md text-white/60 mb-8">
                            Chào mừng, <strong>{playerName}</strong>!
                        </p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-2xl shadow-xl p-8 max-w-lg mx-auto"
                        >
                            <div className="w-20 h-20 bg-gradient-to-r from-vietnam-red-500 to-vietnam-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Crown className="w-10 h-10 text-white" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                                Cách chơi
                            </h2>

                            <div className="text-left space-y-3 mb-6 text-gray-700">
                                <p>❓ <strong>Đọc câu hỏi</strong></p>
                                <p>🔤 <strong>Các chữ cái của đáp án đúng bị xáo trộn</strong></p>
                                <p>👆 <strong>Click vào các chữ cái để sắp xếp lại đúng thứ tự</strong></p>
                                <p>✅ <strong>Kiểm tra đáp án và chuyển câu tiếp theo</strong></p>
                                <p>⚡ <strong>+10 điểm cho mỗi câu đúng, -2 điểm cho mỗi câu sai</strong></p>
                            </div>

                            <div className="bg-vietnam-gold-50 border-2 border-vietnam-gold-200 rounded-xl p-4 mb-6">
                                <p className="text-sm text-gray-700">
                                    <strong>Tổng số câu hỏi:</strong> {questions.length} câu
                                </p>
                            </div>

                            <button
                                onClick={() => setGameStarted(true)}
                                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white font-bold rounded-full hover:opacity-90 transition text-lg"
                            >
                                <Play className="w-6 h-6" />
                                Bắt đầu chơi
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        );
    }

    if (showResult) {
        return (
            <div className="min-h-screen pt-20 pb-16 bg-vietnam-page relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                            Bạn đạt được {score} điểm ({answers.filter(a => a).length}/{questions.length} câu đúng)
                        </p>

                        {/* Score visualization */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {answers.map((correct, index) => (
                                <div
                                    key={index}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${correct ? 'bg-green-500' : 'bg-red-500'
                                        } text-white text-sm font-bold`}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gradient-to-r from-vietnam-gold-50 to-purple-50 p-4 rounded-xl">
                                <div className="text-sm text-gray-600 mb-1">Thời gian</div>
                                <div className="text-2xl font-bold text-vietnam-gold-600">{formatTime(timer)}</div>
                            </div>
                            <div className="bg-gradient-to-r from-vietnam-gold-50 to-purple-50 p-4 rounded-xl">
                                <div className="text-sm text-gray-600 mb-1">Điểm số</div>
                                <div className="text-2xl font-bold text-vietnam-gold-600">{score}</div>
                            </div>
                        </div>

                        {/* Feedback */}
                        <div className="mb-8 p-4 rounded-xl bg-gray-50">
                            {score >= questions.length * 8 ? (
                                <span className="text-green-600 font-medium">🎉 Xuất sắc! Bạn làm rất tốt!</span>
                            ) : score >= questions.length * 5 ? (
                                <span className="text-yellow-600 font-medium">👍 Khá tốt! Hãy cố gắng hơn nữa!</span>
                            ) : (
                                <span className="text-red-600 font-medium">💪 Hãy thử lại nhé!</span>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            {!scoreSaved ? (
                                <button
                                    onClick={handleSaveScore}
                                    disabled={saving}
                                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white font-bold rounded-full hover:opacity-90 transition disabled:opacity-50"
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Đang lưu...
                                        </>
                                    ) : (
                                        <>
                                            <Trophy className="w-5 h-5" />
                                            Lưu điểm
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="w-full px-6 py-3 bg-green-100 border-2 border-green-500 text-green-700 font-bold rounded-full text-center">
                                    ✅ Đã lưu điểm thành công!
                                </div>
                            )}

                            <button
                                onClick={() => setShowLeaderboard(true)}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-vietnam-gold-600 to-vietnam-gold-500 text-white font-bold rounded-full hover:opacity-90 transition"
                            >
                                <Trophy className="w-5 h-5" />
                                Xem bảng xếp hạng
                            </button>

                            <button
                                onClick={handleRestart}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white font-bold rounded-full hover:opacity-90 transition"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Chơi lại
                            </button>
                        </div>
                    </motion.div>

                    {/* Leaderboard Modal */}
                    <HardGameLeaderboard
                        isOpen={showLeaderboard}
                        onClose={() => setShowLeaderboard(false)}
                        currentScore={answers.filter(a => a).length}
                    />
                </div>
            </div>
        );
    }

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

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 bg-vietnam-gold-500/20 text-vietnam-gold-400 border border-vietnam-gold-500/30 px-4 py-2 rounded-full mb-4">
                        <Crown size={20} />
                        <span className="font-medium">Vua Mật Mã</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                        Sắp xếp chữ cái
                    </h1>
                </motion.div>

                {/* Game Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-vietnam-red-500 to-vietnam-gold-500 rounded-xl p-4 text-center shadow-lg"
                    >
                        <div className="text-white/80 text-sm mb-1">Câu hỏi</div>
                        <div className="text-white text-2xl font-bold">{currentQuestionIndex + 1}/{questions.length}</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-r from-vietnam-red-500 to-vietnam-gold-500 rounded-xl p-4 text-center shadow-lg"
                    >
                        <div className="text-white/80 text-sm mb-1">Thời gian</div>
                        <div className="text-white text-2xl font-bold">{formatTime(timer)}</div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-r from-vietnam-red-500 to-vietnam-gold-500 rounded-xl p-4 text-center shadow-lg"
                    >
                        <div className="text-white/80 text-sm mb-1">Điểm</div>
                        <div className="text-white text-2xl font-bold">{score}</div>
                    </motion.div>
                </div>

                {/* Question Card */}
                <motion.div
                    key={currentQuestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6"
                >
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                        {currentQuestion.question}
                    </h2>

                    {/* Selected Answer Display */}
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-vietnam-gold-600 mb-3">
                            Đáp án của bạn:
                        </h3>
                        <div className="bg-gradient-to-r from-vietnam-gold-50 to-purple-50 p-4 rounded-xl min-h-[80px] flex flex-wrap gap-2 items-center justify-center">
                            {selectedChars.length === 0 ? (
                                <span className="text-gray-400 italic">Click vào các chữ cái bên dưới để sắp xếp...</span>
                            ) : (
                                selectedChars.map((char, index) => (
                                    <motion.button
                                        key={index}
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        onClick={() => handleSelectedCharClick(index)}
                                        disabled={isCorrect !== null}
                                        className={`w-12 h-12 md:w-14 md:h-14 rounded-xl font-bold transition-all ${char === ' '
                                            ? 'bg-gray-400 border-2 border-gray-600 text-gray-800 text-3xl cursor-default'
                                            : isCorrect !== null
                                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed text-xl'
                                                : 'bg-vietnam-gold-500 text-white hover:bg-vietnam-gold-600 cursor-pointer text-xl'
                                            }`}
                                    >
                                        {char === ' ' ? '␣' : char}
                                    </motion.button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Shuffled Characters */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-bold text-gray-700">
                                Chọn chữ cái:
                            </h3>
                            <button
                                onClick={handleShuffle}
                                disabled={isCorrect !== null || shuffledChars.length === 0}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                            >
                                <Shuffle className="w-4 h-4" />
                                Xáo trộn
                            </button>
                        </div>
                        <div className="bg-white border-2 border-gray-200 p-4 rounded-xl flex flex-wrap gap-2 justify-center min-h-[80px]">
                            {shuffledChars.length === 0 ? (
                                <span className="text-gray-400 italic">Tất cả chữ cái đã được chọn</span>
                            ) : (
                                shuffledChars.map((char, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleCharClick(char, index)}
                                        disabled={isCorrect !== null}
                                        className={`w-12 h-12 md:w-14 md:h-14 rounded-xl font-bold transition-all ${char === ' '
                                            ? 'bg-gray-400 border-2 border-gray-600 text-gray-800 text-3xl cursor-pointer hover:bg-gray-500'
                                            : isCorrect !== null
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed text-xl'
                                                : 'bg-white border-2 border-vietnam-red-500 text-vietnam-red-600 hover:bg-vietnam-red-50 cursor-pointer text-xl'
                                            }`}
                                    >
                                        {char === ' ' ? '␣' : char}
                                    </motion.button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Result Message */}
                    <AnimatePresence>
                        {isCorrect !== null && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`mb-6 p-4 rounded-xl border-2 ${isCorrect
                                    ? 'bg-green-50 border-green-500'
                                    : 'bg-red-50 border-red-500'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {isCorrect ? (
                                        <>
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                            <div>
                                                <p className="font-bold text-green-800">Chính xác! 🎉</p>
                                                <p className="text-sm text-green-700">Đáp án đúng: {correctAnswer}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-6 h-6 text-red-600" />
                                            <div>
                                                <p className="font-bold text-red-800">Chưa đúng! 😢</p>
                                                <p className="text-sm text-red-700">Đáp án đúng: {correctAnswer}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {isCorrect === null ? (
                            <button
                                onClick={handleCheck}
                                disabled={selectedChars.join('').length === 0}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white font-bold rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <CheckCircle className="w-5 h-5" />
                                Kiểm tra
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white font-bold rounded-full hover:opacity-90 transition"
                            >
                                {currentQuestionIndex < questions.length - 1 ? (
                                    <>
                                        Câu tiếp theo
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                ) : (
                                    <>
                                        Xem kết quả
                                        <Trophy className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Restart Button */}
                <div className="text-center">
                    <button
                        onClick={handleRestart}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 font-semibold rounded-full hover:bg-white/20 transition"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Chơi lại từ đầu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HardGamePage;
