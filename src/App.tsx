import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header, Footer, ScrollToTop } from '@/components/layout';
import { IntroLoader, IntroSection } from '@/components/Intro';
import { FloatingChatBot } from '@/components/ChatBot';
import { 
  HomePage, 
  KnowledgePage, 
  VideoPage, 
  ChatPage, 
  GamePage, 
  AIUsagePage, 
  AboutPage 
} from '@/pages';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [showIntroLoader, setShowIntroLoader] = useState(true);
  const [showIntroSection, setShowIntroSection] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Check if intro has been shown in this session
    const introShown = sessionStorage.getItem('introShown');
    if (introShown) {
      setShowIntroLoader(false);
      setShowIntroSection(false);
      setShowContent(true);
    }
  }, []);

  const handleIntroLoaderComplete = () => {
    setShowIntroLoader(false);
    setShowIntroSection(true);
  };

  const handleIntroSectionComplete = () => {
    setShowIntroSection(false);
    setShowContent(true);
    // Mark intro as shown for this session
    sessionStorage.setItem('introShown', 'true');
  };

  useEffect(() => {
    if (!showContent) return;

    // Advanced scroll animations with stagger
    const sections = gsap.utils.toArray<HTMLElement>('.animate-section');
    sections.forEach((section) => {
      const elements = section.querySelectorAll('.animate-item');

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 25%',
            toggleActions: 'play none none reverse',
            markers: false,
          },
        }
      );
    });

    // Parallax backgrounds
    gsap.utils.toArray<HTMLElement>('.parallax-bg').forEach((bg) => {
      gsap.to(bg, {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: bg,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [showContent]);

  return (
    <>
      {/* Intro Loader */}
      {showIntroLoader && <IntroLoader onComplete={handleIntroLoaderComplete} />}

      {/* Intro Section */}
      {showIntroSection && <IntroSection onComplete={handleIntroSectionComplete} />}

      {/* Main Content */}
      <div
        className={`transition-opacity duration-700 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ visibility: showContent ? 'visible' : 'hidden' }}
      >
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-white">
            <Header />

            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/kien-thuc" element={<KnowledgePage />} />
                <Route path="/video" element={<VideoPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/game" element={<GamePage />} />
                <Route path="/ai-usage" element={<AIUsagePage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>

            <Footer />
            <ScrollToTop />
            <FloatingChatBot />
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
