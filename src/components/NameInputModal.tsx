import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

interface NameInputModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (name: string) => Promise<void>;
    score: number;
    totalQuestions: number;
}

const NameInputModal: React.FC<NameInputModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    score,
    totalQuestions,
}) => {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (name.trim().length < 2) {
            setError('Tên phải có ít nhất 2 ký tự');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            await onSubmit(name.trim());
            setName('');
            onClose();
        } catch (err) {
            setError('Không thể lưu điểm. Vui lòng thử lại.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        if (!isSubmitting) {
            setName('');
            setError('');
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8"
                    >
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition disabled:opacity-50"
                        >
                            <X size={24} />
                        </button>

                        {/* Header */}
                        <div className="text-center mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                🎉 Chúc mừng!
                            </h2>
                            <p className="text-gray-600">
                                Bạn đạt được <span className="font-bold text-vietnam-gold-600">{score}/{totalQuestions}</span> điểm
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nhập tên của bạn để lưu điểm
                                </label>
                                <input
                                    id="playerName"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Ví dụ: Nguyễn Văn A"
                                    maxLength={50}
                                    autoFocus
                                    disabled={isSubmitting}
                                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-vietnam-gold-500 transition ${error ? 'border-red-500' : 'border-gray-300'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                                />
                                {error && (
                                    <p className="mt-2 text-sm text-red-600">{error}</p>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || name.trim().length < 2}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white font-bold rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Đang lưu...
                                        </>
                                    ) : (
                                        'Lưu điểm'
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default NameInputModal;
