# Tầng lớp Trung lưu Việt Nam

## Trong Kỷ Nguyên Vươn Mình của Dân Tộc

🌟 **Nền tảng học tập AI** về vai trò tầng lớp trung lưu trong xây dựng Chủ nghĩa xã hội

---

## 📋 Giới thiệu

Dự án này được xây dựng như một sản phẩm sáng tạo cho môn học **Chủ nghĩa xã hội khoa học (MLN131)**, tập trung vào chủ đề:

> "Tầng lớp trung lưu Việt Nam trong bối cảnh phát triển kinh tế thị trường định hướng XHCN"

### Mục tiêu dự án

- ✅ **Chiều sâu học thuật** - Phân tích dựa trên Chương 5 CNXH Khoa học
- ✅ **Sáng tạo hình thức** - Website tương tác với animations và 3D effects
- ✅ **Tính tương tác** - Quiz, Chatbot AI, Video nhúng
- ✅ **Ứng dụng AI có trách nhiệm** - Sử dụng Gemini AI minh bạch
- ✅ **Cập nhật thực tiễn** - Liên hệ Đại hội XIV và kỷ nguyên vươn mình

---

## 🚀 Tính năng

| Tab | Mô tả |
|-----|-------|
| 📚 **Kiến thức** | Tóm tắt lý luận Chương 5 CNXH Khoa học |
| 🎬 **Video** | Xem video YouTube trực tiếp trên web |
| 🤖 **Chatbot** | Trợ lý AI hỏi đáp về tầng lớp trung lưu |
| 🎮 **Game** | Quiz kiểm tra kiến thức tương tác |
| 📊 **Báo cáo AI** | Minh bạch việc sử dụng AI |
| ℹ️ **Giới thiệu** | Thông tin về dự án và nhóm |

---

## 🛠️ Công nghệ sử dụng

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS 3.4
- **Animation:** Framer Motion + GSAP
- **AI Chatbot:** Google Gemini 2.5
- **Backend:** Firebase (Firestore, Analytics)
- **Deployment:** Vercel

---

## 📦 Cài đặt

### Yêu cầu

- Node.js 18+
- npm hoặc yarn

### Bước 1: Clone và cài đặt dependencies

```bash
cd VietNamMiddleClassTransition
npm install
```

### Bước 2: Cấu hình môi trường

Copy file `.env.example` thành `.env.local` và điền thông tin:

```bash
cp .env.example .env.local
```

Cập nhật các biến môi trường:

```env
# Gemini API Key (lấy từ Google AI Studio)
VITE_GEMINI_API_KEY=your_gemini_api_key

# Firebase Config (lấy từ Firebase Console)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Bước 3: Chạy development server

```bash
npm run dev
```

Mở trình duyệt: [http://localhost:5173](http://localhost:5173)

### Bước 4: Build production

```bash
npm run build
```

---

## 📁 Cấu trúc dự án

```
VietNamMiddleClassTransition/
├── src/
│   ├── components/
│   │   ├── ChatBot/          # Floating AI Chatbot
│   │   ├── Intro/            # IntroLoader + IntroSection
│   │   └── layout/           # Header, Footer, ScrollToTop
│   ├── config/
│   │   └── firebase.ts       # Firebase configuration
│   ├── lib/
│   │   └── gsap/             # GSAP 3D animation library
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── KnowledgePage.tsx
│   │   ├── VideoPage.tsx
│   │   ├── ChatPage.tsx
│   │   ├── GamePage.tsx
│   │   ├── AIUsagePage.tsx
│   │   └── AboutPage.tsx
│   ├── services/
│   │   └── geminiService.ts  # Gemini AI integration
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 📊 Nội dung học thuật

### Phần 1: Cơ sở lý luận
- Quan điểm Mác-Lênin về cơ cấu xã hội-giai cấp
- Khái niệm tầng lớp trung lưu theo CNXH Khoa học

### Phần 2: Thực trạng Việt Nam
- Bối cảnh hình thành từ Đổi mới 1986
- Số liệu World Bank: 7.7% (2010) → 50% (2035)

### Phần 3: Vai trò và Giải pháp
- Vai trò trong CNH-HĐH và an sinh xã hội
- Giải pháp định hướng XHCN

### Phần 4: Kết luận
- Mục tiêu 2045: Việt Nam là nước phát triển

---

## 👥 Nhóm thực hiện

Sinh viên môn **Chủ nghĩa xã hội khoa học (MLN131)**

---

## 🙏 Credits

Dự án kế thừa cấu trúc và cảm hứng từ:
- [Light of the Party](https://github.com/) - HCM Ideology Platform
- [VietInnov-Spark](https://github.com/) - Vietnam Reform History Platform

---

## 📄 License

Dự án này được thực hiện cho mục đích học tập. Mọi nội dung tuân thủ quan điểm chính thống của Đảng và Nhà nước Việt Nam.

---

⭐ **Tầng lớp trung lưu Việt Nam - Trong kỷ nguyên vươn mình của dân tộc** ⭐
