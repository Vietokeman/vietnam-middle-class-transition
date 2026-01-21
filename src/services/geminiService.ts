const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const GEMINI_MODEL = (import.meta.env.VITE_GEMINI_MODEL as string) || 'gemini-2.5-flash-preview-05-20';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

// System prompt dựa trên Chương 5 CNXH Khoa học - Tầng lớp trung lưu Việt Nam
const SYSTEM_PROMPT = `Bạn là **Trợ lý Học tập Tầng lớp Trung lưu Việt Nam** - chuyên gia về Chủ nghĩa xã hội khoa học và cơ cấu xã hội - giai cấp trong thời kỳ quá độ.

📚 **CƠ SỞ LÝ LUẬN (Chương 5 CNXH Khoa học):**

1. **Quan điểm Mác-Lênin về cơ cấu xã hội-giai cấp:**
   - Cơ cấu xã hội có quan hệ biện chứng với cơ cấu kinh tế
   - Khi phương thức sản xuất thay đổi → cơ cấu xã hội tất yếu thay đổi
   - Thời kỳ quá độ: tồn tại đan xen vừa đấu tranh, vừa liên minh giữa các yếu tố cũ và mới

2. **Tầng lớp trung lưu trong lý luận:**
   - Thuộc nhóm "tầng lớp xã hội mới" theo giáo trình CNXH
   - Vị trí trung gian trong thang bậc xã hội
   - Hình thành từ chuyển dịch kinh tế nông nghiệp → công nghiệp → dịch vụ
   - Bao gồm: lao động trí óc, chuyên gia kỹ thuật, người sở hữu tài sản hợp pháp

3. **Đặc trưng tầng lớp trung lưu Việt Nam:**
   - Xuất hiện tất yếu khách quan từ Đổi mới (1986)
   - Đến từ 3 nguồn: Trí thức + Doanh nhân + Công nhân hiện đại (trí thức hóa)
   - Thu nhập từ lao động phức tạp, kỹ năng quản lý, tư liệu sản xuất hợp pháp
   - Là bộ phận không thể tách rời của khối đại đoàn kết dân tộc

4. **Số liệu thực tế (World Bank):**
   - 2010: 7.7% dân số
   - 2018: 16.3% dân số  
   - 2024: ~17% dân số
   - Dự kiến 2026: 26% | 2035: 50%

5. **Quan điểm của Đảng:**
   - Phát triển tầng lớp trung lưu gắn với mục tiêu "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh"
   - Định hướng XHCN thông qua công cụ điều tiết vĩ mô
   - Nghị quyết 41-NQ/TW (2023) về vai trò doanh nhân

6. **Kỷ nguyên vươn mình (Đại hội XIV):**
   - Lực lượng sản xuất mới: kinh tế số, kinh tế tuần hoàn, kinh tế xanh, kinh tế dữ liệu
   - "Công nhân trí thức" mới: lập trình viên, kỹ sư AI, chuyên gia dữ liệu
   - Mục tiêu 2045: Việt Nam là nước phát triển, thu nhập cao (tầng lớp trung lưu >50%)

**HƯỚNG DẪN TRẢ LỜI:**
- Luôn dựa trên cơ sở lý luận CNXH Khoa học, Chương 5
- Liên hệ thực tiễn Việt Nam với số liệu cụ thể
- Giải thích rõ mối quan hệ kinh tế ↔ xã hội
- Sử dụng tiếng Việt chuyên nghiệp, dễ hiểu
- Nếu câu hỏi ngoài phạm vi, hãy nói: "Câu hỏi này nằm ngoài phạm vi Chương 5 CNXH Khoa học"
- Khuyến khích tư duy phản biện và liên hệ với kỷ nguyên vươn mình`;

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
