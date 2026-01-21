import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader, MessageCircle, X, Minimize2, Maximize2, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '@/services/geminiService';

interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

const FloatingChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'model',
      content: `Xin chào! 👋 Tôi là **Trợ lý Học tập Tầng lớp Trung lưu Việt Nam** - chuyên gia về Chủ nghĩa xã hội khoa học.

📚 Tôi sẽ trả lời dựa trên **Chương 5** - Cơ cấu xã hội giai cấp trong thời kỳ quá độ.

💡 Hãy hỏi tôi về:
- Khái niệm tầng lớp trung lưu theo lý luận Mác-Lênin
- Sự hình thành và phát triển tầng lớp trung lưu Việt Nam
- Vai trò trong kinh tế thị trường định hướng XHCN
- Số liệu thực tế và xu hướng phát triển
- Kỷ nguyên vươn mình và mục tiêu 2045`,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Chuẩn bị lịch sử hội thoại cho Gemini
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.content }]
      }));

      const response = await sendMessageToGemini(input, conversationHistory as any);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Có lỗi xảy ra';
      setError(errorMessage);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple markdown parser
  const parseMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-28 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white shadow-2xl hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Mở trợ lý AI"
          >
            <Sparkles className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-8 right-8 w-96 h-[600px] rounded-2xl shadow-2xl overflow-hidden bg-white z-50 flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircle size={24} />
                <div>
                  <h3 className="font-bold text-lg">Trợ lý CNXH</h3>
                  <p className="text-xs opacity-90">Tầng lớp trung lưu VN</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="hover:bg-white/20 p-2 rounded-lg transition"
                  title={isMinimized ? 'Mở rộng' : 'Thu gọn'}
                >
                  {isMinimized ? <Maximize2 size={20} /> : <Minimize2 size={20} />}
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsMinimized(false);
                  }}
                  className="hover:bg-white/20 p-2 rounded-lg transition"
                  title="Đóng"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 custom-scrollbar">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-vietnam-red-600 to-vietnam-red-500 text-white'
                            : 'bg-white shadow-md text-gray-800 border border-gray-100'
                        }`}
                      >
                        <div
                          className="text-sm leading-relaxed markdown-content"
                          dangerouslySetInnerHTML={{ __html: parseMarkdown(message.content) }}
                        />
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white shadow-md rounded-2xl px-4 py-3 flex items-center gap-2">
                        <Loader className="w-4 h-4 animate-spin text-vietnam-red-600" />
                        <span className="text-sm text-gray-500">Đang suy nghĩ...</span>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 text-red-600 rounded-lg p-3 text-sm">
                      ⚠️ {error}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Hỏi về tầng lớp trung lưu..."
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-vietnam-red-500 focus:ring-2 focus:ring-vietnam-red-500/20 outline-none transition text-sm"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isLoading || !input.trim()}
                      className="px-4 py-3 bg-gradient-to-r from-vietnam-red-600 to-vietnam-gold-500 text-white rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 text-center">
                    Powered by Gemini AI • Chương 5 CNXH Khoa học
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatBot;
