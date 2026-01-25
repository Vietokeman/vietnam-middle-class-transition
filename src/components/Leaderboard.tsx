import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Clock, X, Loader2 } from 'lucide-react';
import { getTopScores, getRecentScores, QuizScore } from '@/services/quizService';

interface LeaderboardProps {
    isOpen: boolean;
    onClose: () => void;
    currentScore?: number;
}

type TabType = 'top' | 'recent';

const Leaderboard: React.FC<LeaderboardProps> = ({ isOpen, onClose, currentScore }) => {
    const [activeTab, setActiveTab] = useState<TabType>('top');
    const [topScores, setTopScores] = useState<QuizScore[]>([]);
    const [recentScores, setRecentScores] = useState<QuizScore[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            loadScores();
        }
    }, [isOpen]);

    const loadScores = async () => {
        setLoading(true);
        setError('');

        try {
            const [top, recent] = await Promise.all([
                getTopScores(10),
                getRecentScores(10),
            ]);

            setTopScores(top);
            setRecentScores(recent);
        } catch (err) {
            console.error('Error loading scores:', err);
            setError('Không thể tải bảng xếp hạng. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const getMedalIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return '🥇';
            case 2:
                return '🥈';
            case 3:
                return '🥉';
            default:
                return null;
        }
    };

    const formatDate = (timestamp: any) => {
        try {
            const date = timestamp.toDate();
            return new Intl.DateTimeFormat('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }).format(date);
        } catch {
            return 'N/A';
        }
    };

    const displayScores = activeTab === 'top' ? topScores : recentScores;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 p-6 text-white">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/80 hover:text-white transition"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex items-center gap-3 mb-4">
                                <Trophy size={32} />
                                <h2 className="text-2xl md:text-3xl font-bold">Bảng Xếp Hạng</h2>
                            </div>

                            {/* Tabs */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setActiveTab('top')}
                                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${activeTab === 'top'
                                            ? 'bg-white text-vietnam-red-600'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                        }`}
                                >
                                    <Trophy className="inline w-4 h-4 mr-2" />
                                    Top Scores
                                </button>
                                <button
                                    onClick={() => setActiveTab('recent')}
                                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${activeTab === 'recent'
                                            ? 'bg-white text-vietnam-red-600'
                                            : 'bg-white/20 text-white hover:bg-white/30'
                                        }`}
                                >
                                    <Clock className="inline w-4 h-4 mr-2" />
                                    Recent Scores
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Loader2 className="w-12 h-12 text-vietnam-gold-500 animate-spin mb-4" />
                                    <p className="text-gray-600">Đang tải...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-12">
                                    <p className="text-red-600 mb-4">{error}</p>
                                    <button
                                        onClick={loadScores}
                                        className="px-6 py-2 bg-vietnam-red-600 text-white rounded-lg hover:bg-vietnam-red-700 transition"
                                    >
                                        Thử lại
                                    </button>
                                </div>
                            ) : displayScores.length === 0 ? (
                                <div className="text-center py-12">
                                    <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-600">Chưa có điểm số nào</p>
                                    <p className="text-sm text-gray-500 mt-2">Hãy là người đầu tiên!</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {displayScores.map((scoreData, index) => {
                                        const rank = index + 1;
                                        const medal = getMedalIcon(rank);
                                        const isCurrentScore = currentScore !== undefined && scoreData.score === currentScore;

                                        return (
                                            <motion.div
                                                key={scoreData.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition ${isCurrentScore
                                                        ? 'border-vietnam-gold-500 bg-vietnam-gold-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                    }`}
                                            >
                                                {/* Rank */}
                                                <div className="flex-shrink-0 w-12 text-center">
                                                    {medal ? (
                                                        <span className="text-3xl">{medal}</span>
                                                    ) : (
                                                        <span className="text-xl font-bold text-gray-400">#{rank}</span>
                                                    )}
                                                </div>

                                                {/* Player Info */}
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-gray-900 truncate">
                                                        {scoreData.playerName}
                                                        {isCurrentScore && (
                                                            <span className="ml-2 text-xs bg-vietnam-gold-500 text-white px-2 py-1 rounded-full">
                                                                Bạn
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {formatDate(scoreData.timestamp)}
                                                    </p>
                                                </div>

                                                {/* Score */}
                                                <div className="flex-shrink-0 text-right">
                                                    <p className="text-2xl font-bold text-vietnam-gold-600">
                                                        {scoreData.score}/{scoreData.totalQuestions}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{scoreData.percentage}%</p>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 bg-gray-50 border-t border-gray-200 text-center">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
                            >
                                Đóng
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Leaderboard;
