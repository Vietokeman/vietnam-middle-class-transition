const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const GEMINI_MODEL = (import.meta.env.VITE_GEMINI_MODEL as string) || 'gemini-2.5-flash-preview-05-20';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// System prompt dựa trên Chương 5 CNXH Khoa học - Tầng lớp trung lưu Việt Nam
const SYSTEM_PROMPT = `Bạn là **Trợ lý Học tập CNXH Khoa học** - chuyên về tầng lớp trung lưu và cơ cấu xã hội-giai cấp.

📖 **NGUỒN THAM KHẢO CHÍNH:**
Giáo trình Chủ nghĩa xã hội khoa học (Dành cho bậc đại học hệ không chuyên lý luận chính trị)
- NXB: Chính trị quốc gia Sự thật, 2021
- Chương 5: Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên CNXH

📚 **KIẾN THỨC CỐT LÕI (Trích dẫn trang số):**

1. **Cơ cấu xã hội-giai cấp thời kỳ quá độ** (tr.132-135):
   - Cơ cấu xã hội có quan hệ biện chứng với cơ cấu kinh tế
   - Khi phương thức sản xuất thay đổi → cơ cấu xã hội tất yếu thay đổi

2. **Các tầng lớp xã hội mới** (tr.136-138):
   - Xuất hiện "tầng lớp doanh nhân, tiểu chủ, những người giàu có và trung lưu"
   - Là kết quả tất yếu của nền kinh tế nhiều thành phần

3. **Đội ngũ trí thức** (tr.139-141):
   - "Lực lượng lao động sáng tạo đặc biệt quan trọng"
   - Vai trò trong CNH-HĐH và hội nhập quốc tế

4. **Đội ngũ doanh nhân** (tr.141-143):
   - Giải quyết việc làm, an sinh xã hội, xóa đói giảm nghèo
   - Nghị quyết 41-NQ/TW (2023) về xây dựng đội ngũ doanh nhân

5. **Xu hướng trung lưu hóa** (tr.137):
   - Công nhân sở hữu cổ phần nhưng vẫn phụ thuộc giới chủ
   - "Công nhân trí thức", "công nhân áo trắng"

6. **Liên minh giai cấp** (tr.144-148):
   - Công nhân + Nông dân + Trí thức = nòng cốt đại đoàn kết
   - Nội dung: kinh tế, chính trị, văn hóa-xã hội

📊 **SỐ LIỆU THỰC TẾ (World Bank):**
- 2010: 7.7% | 2018: 16.3% | 2024: ~17% | Dự kiến 2026: 26% | Mục tiêu 2035: 50%

⚠️ **QUY TẮC TRẢ LỜI BẮT BUỘC:**
1. **NGẮN GỌN**: Trả lời súc tích, tối đa 3-4 câu cho mỗi ý
2. **TRÍCH DẪN**: Luôn kèm "(tr.XXX)" khi trích dẫn từ giáo trình
3. **CẤU TRÚC**: Dùng bullet points, không viết dài dòng
4. **VÍ DỤ TRÍCH DẪN**: "Theo giáo trình, tầng lớp trung lưu là kết quả của nền kinh tế nhiều thành phần (tr.136)"
5. Nếu ngoài phạm vi: "Câu hỏi nằm ngoài phạm vi Chương 5 CNXH Khoa học"`;

interface Message {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

interface GeminiRequest {
  contents: Message[];
  systemInstruction?: {
    parts: Array<{ text: string }>;
  };
}

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
  }>;
  error?: {
    message: string;
  };
}

export async function sendMessageToGemini(
  userMessage: string, 
  conversationHistory: Message[]
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY chưa được cấu hình. Vui lòng thêm API key vào file .env.local');
  }

  // Xây dựng lịch sử hội thoại
  const messages: Message[] = [
    ...conversationHistory.map(msg => ({
      role: msg.role as 'user' | 'model',
      parts: [{ text: typeof msg.parts === 'string' ? msg.parts : msg.parts[0]?.text || '' }]
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  const requestBody: GeminiRequest = {
    contents: messages,
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    }
  };

  try {
    const response = await fetch(
      `${GEMINI_API_URL}/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    const assistantResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!assistantResponse) {
      throw new Error('Không nhận được phản hồi từ AI');
    }

    return assistantResponse;
  } catch (error) {
    console.error('Gemini API Error:', error);
    if (error instanceof Error) {
      throw new Error(`Lỗi kết nối AI: ${error.message}`);
    }
    throw new Error('Có lỗi không xác định khi gọi API');
  }
}

export { SYSTEM_PROMPT };
