"use client";

import { useState, useEffect, useCallback } from "react";

const introQuotes = [
  {
    line1: "Tầng lớp trung lưu…",
    line2: "Động lực phát triển trong kỷ nguyên vươn mình",
  },
  {
    line1: "Từ Đổi Mới 1986 đến Kỷ nguyên số",
    line2: "Sự trỗi dậy của một lực lượng xã hội mới",
  },
  {
    line1: "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh",
    line2: "Mục tiêu định hướng XHCN Việt Nam",
  },
  {
    line1: "2045: Việt Nam – Nước phát triển",
    line2: "Tầng lớp trung lưu chiếm trên 50% dân số",
  },
];

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [phase, setPhase] = useState<
    "loading" | "text1" | "text2" | "fadeOut" | "flag" | "complete"
  >("loading");
  const [currentQuote] = useState(
    () => introQuotes[Math.floor(Math.random() * introQuotes.length)]
  );
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const [flagProgress, setFlagProgress] = useState(0);

  // Typewriter effect for line 1
  const typeText1 = useCallback(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < currentQuote.line1.length) {
        setText1(currentQuote.line1.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setShowCursor1(false);
        setTimeout(() => {
          setPhase("text2");
          setShowCursor2(true);
        }, 300);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [currentQuote.line1]);

  // Typewriter effect for line 2
  const typeText2 = useCallback(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < currentQuote.line2.length) {
        setText2(currentQuote.line2.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setShowCursor2(false);
        setTimeout(() => {
          setPhase("fadeOut");
        }, 1000);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [currentQuote.line2]);

  useEffect(() => {
    // Initial loading phase
    const timer = setTimeout(() => {
      setPhase("text1");
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "text1") {
      return typeText1();
    }
  }, [phase, typeText1]);

  useEffect(() => {
    if (phase === "text2") {
      return typeText2();
    }
  }, [phase, typeText2]);

  useEffect(() => {
    if (phase === "fadeOut") {
      // Fade out text
      const fadeInterval = setInterval(() => {
        setTextOpacity((prev) => {
          if (prev <= 0) {
            clearInterval(fadeInterval);
            setPhase("flag");
            return 0;
          }
          return prev - 0.05;
        });
      }, 30);
      return () => clearInterval(fadeInterval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "flag") {
      // Flag wipe animation
      const flagInterval = setInterval(() => {
        setFlagProgress((prev) => {
          if (prev >= 100) {
            clearInterval(flagInterval);
            setTimeout(() => {
              setPhase("complete");
              onComplete();
            }, 300);
            return 100;
          }
          return prev + 2;
        });
      }, 20);
      return () => clearInterval(flagInterval);
    }
  }, [phase, onComplete]);

  if (phase === "complete") return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Main dark background with grain */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundColor: "#0b0b0b",
          opacity: phase === "flag" ? 1 - flagProgress / 100 : 1,
        }}
      >
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Subtle red gradient spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(178, 34, 34, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-60" />
      </div>

      {/* Vietnam Flag Wipe Effect */}
      {phase === "flag" && (
        <div
          className="absolute inset-0 bg-[#ac0705] z-10"
          style={{
            clipPath: `polygon(0 0, ${flagProgress}% 0, ${flagProgress}% 100%, 0 100%)`,
          }}
        >
          {/* Gold Star */}
          {flagProgress > 50 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-32 h-32 md:w-48 md:h-48 text-[#FFD700]"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                  opacity: (flagProgress - 50) / 50,
                  transform: `scale(${0.5 + (flagProgress - 50) / 100})`,
                }}
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          )}
        </div>
      )}

      {/* Text content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ opacity: textOpacity }}
      >
        {/* Decorative top element */}
        <div className="mb-8 flex items-center gap-4">
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#FFD700]" />
          <div className="w-2 h-2 rotate-45 border border-[#FFD700]" />
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#FFD700]" />
        </div>

        {/* Icon representing Middle Class Growth */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-[#FFD700] blur-xl opacity-40 animate-pulse" />
          <svg
            className="w-16 h-16 md:w-20 md:h-20 text-[#FFD700] relative z-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            {/* Rising arrow with people - symbolizing middle class growth */}
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          {/* Light rays effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-[#FFD700]/30 animate-ping"
              style={{ animationDuration: "2s" }}
            />
          </div>
        </div>

        {/* Line 1 - Vietnamese */}
        <div className="text-center mb-4 min-h-[2rem] md:min-h-[3rem]">
          <h1 className="text-2xl md:text-4xl font-bold text-white tracking-wide">
            {text1}
            {showCursor1 && (
              <span className="animate-pulse text-[#FFD700]">|</span>
            )}
          </h1>
        </div>

        {/* Line 2 - Subtitle */}
        <div className="text-center min-h-[1.5rem] md:min-h-[2rem]">
          <p className="text-lg md:text-xl text-[#FFD700]/90 font-light italic tracking-wide">
            {text2}
            {showCursor2 && (
              <span className="animate-pulse text-white">|</span>
            )}
          </p>
        </div>

        {/* Decorative bottom element */}
        <div className="mt-8 flex items-center gap-4">
          <div className="w-16 md:w-24 h-px bg-gradient-to-r from-transparent to-[#FFD700]" />
          <div className="w-2 h-2 rotate-45 border border-[#FFD700]" />
          <div className="w-16 md:w-24 h-px bg-gradient-to-l from-transparent to-[#FFD700]" />
        </div>

        {/* Loading indicator */}
        {phase === "loading" && (
          <div className="mt-12">
            <div className="w-8 h-8 border-2 border-[#FFD700]/30 border-t-[#FFD700] rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
