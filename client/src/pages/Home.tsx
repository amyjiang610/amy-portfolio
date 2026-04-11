/**
 * Home Page
 * Design: 超级马里奥复古街机风
 * - 全屏 Canvas 动态像素游戏世界背景
 * - 中央复古粉色电脑外壳
 * - 屏幕内动态地图 + 关卡路径按钮
 * - 5个横向画卷式内容卡片
 * Color palette: #E8A0BF(粉), #FF4444(红), #FFD700(黄), #4A90E2(蓝), #2ECC71(绿), #8B4513(棕)
 */

import { useState, useCallback } from "react";
import IntroAnimation from "@/components/IntroAnimation";
import PixelWorldCanvas from "@/components/PixelWorldCanvas";
import BGMPlayer from "@/components/BGMPlayer";
import {
  PersonalityCard,
  HobbiesCard,
  ExperienceCard,
  EducationCard,
  FuturePlanCard,
} from "@/components/ContentCards";

type CardType = "personality" | "hobbies" | "experience" | "education" | "future" | null;

// Web Audio beep sound
function playBeep(freq = 440, duration = 0.1) {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "square";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch {}
}

const BUTTONS = [
  { id: "personality" as CardType, label: "性格介绍", emoji: "❓", color: "#FF8C00", shadow: "#8B4513" },
  { id: "hobbies" as CardType, label: "爱好介绍", emoji: "⭐", color: "#FFD700", shadow: "#8B6914" },
  { id: "experience" as CardType, label: "过往经历", emoji: "🍄", color: "#FF4444", shadow: "#8B0000" },
  { id: "education" as CardType, label: "教育背景", emoji: "📚", color: "#4A90E2", shadow: "#1A5276" },
  { id: "future" as CardType, label: "未来计划", emoji: "🌟", color: "#2ECC71", shadow: "#1A6B3A" },
];

export default function Home() {
  const [showMain, setShowMain] = useState(false);
  const [activeCard, setActiveCard] = useState<CardType>(null);
  const [hoveredBtn, setHoveredBtn] = useState<CardType>(null);

  const handleIntroComplete = useCallback(() => {
    setShowMain(true);
  }, []);

  const handleButtonClick = (id: CardType) => {
    playBeep(id === activeCard ? 220 : 440, 0.12);
    setActiveCard(prev => prev === id ? null : id);
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      position: "relative",
      background: "#1a0a2e",
    }}>
      {/* BGM Player */}
      <BGMPlayer />

      {/* Full-screen background pixel world */}
      <div style={{ position: "absolute", inset: 0 }}>
        <PixelWorldCanvas isScreen={false} />
      </div>

      {/* Intro animation overlay */}
      {!showMain && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Main content */}
      {showMain && (
        <div style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "mainFadeIn 0.8s ease-out both",
        }}>
          {/* Retro Computer Shell */}
          <div style={{
            width: "min(860px, 96vw)",
            background: "#E8A0BF",
            border: "6px solid #000",
            boxShadow: "12px 12px 0 #000, inset 0 0 0 3px #C87090",
            borderRadius: "8px 8px 4px 4px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}>
            {/* Computer top bar */}
            <div style={{
              background: "#C87090",
              borderBottom: "4px solid #000",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {/* Indicator lights */}
                <div style={{ width: "10px", height: "10px", background: "#FF4444", border: "2px solid #000", borderRadius: "50%" }} />
                <div style={{ width: "10px", height: "10px", background: "#FFD700", border: "2px solid #000", borderRadius: "50%", animation: "blink 1.5s ease-in-out infinite" }} />
                <div style={{ width: "10px", height: "10px", background: "#2ECC71", border: "2px solid #000", borderRadius: "50%" }} />
              </div>
              <div style={{ fontSize: "9px", color: "#fff", textShadow: "1px 1px 0 #000" }}>
                AMY-OS v1.0 ✨
              </div>
              <div style={{ display: "flex", gap: "6px" }}>
                {/* Knobs */}
                <div style={{ width: "14px", height: "14px", background: "#A0607A", border: "2px solid #000", borderRadius: "50%" }} />
                <div style={{ width: "14px", height: "14px", background: "#A0607A", border: "2px solid #000", borderRadius: "50%" }} />
              </div>
            </div>

            {/* Screen bezel */}
            <div id="screen-container" style={{
              background: "#1a0a2e",
              margin: "12px",
              border: "4px solid #000",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.8), 0 0 0 2px #C87090",
              position: "relative",
              height: "calc(100vh - 280px)",
              maxHeight: "600px",
              overflow: "hidden",
            }}>
              {/* Screen inner canvas world */}
              <div style={{ position: "absolute", inset: 0 }}>
                <PixelWorldCanvas isScreen={true} />
              </div>

              {/* Scanlines overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
                pointerEvents: "none",
                zIndex: 5,
              }} />

              {/* Screen content overlay */}
              <div style={{
                position: "relative",
                zIndex: 10,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
              }}>
                {/* Title */}
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontSize: "clamp(14px, 2.5vw, 20px)",
                    color: "#FF4444",
                    textShadow: "3px 3px 0 #FFD700, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                    letterSpacing: "2px",
                    lineHeight: "1.4",
                    animation: "titlePulse 2s ease-in-out infinite",
                  }}>
                    Amy's Portfolio
                  </div>
                  <div style={{
                    fontSize: "clamp(7px, 1.2vw, 9px)",
                    color: "#FFD700",
                    marginTop: "6px",
                    textShadow: "1px 1px 0 #000",
                    lineHeight: "1.8",
                    maxWidth: "500px",
                    textAlign: "center",
                  }}>
                    Hi, I'm Amy — 地球online24年玩家，<br />热爱舞蹈、旅行、摄影与写作。
                  </div>
                </div>

                {/* Level path with buttons */}
                <div style={{
                  width: "100%",
                  maxWidth: "600px",
                  position: "relative",
                  padding: "8px 0",
                }}>
                  {/* Path decoration */}
                  <svg
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                    viewBox="0 0 600 200"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M 30 180 L 130 180 L 130 130 L 230 130 L 230 80 L 330 80 L 330 130 L 430 130 L 430 80 L 530 80"
                      fill="none"
                      stroke="#8B4513"
                      strokeWidth="8"
                      strokeDasharray="12,4"
                    />
                    <path
                      d="M 30 180 L 130 180 L 130 130 L 230 130 L 230 80 L 330 80 L 330 130 L 430 130 L 430 80 L 530 80"
                      fill="none"
                      stroke="#D2691E"
                      strokeWidth="4"
                      strokeDasharray="12,4"
                      strokeDashoffset="2"
                    />
                  </svg>

                  {/* Buttons in S-path layout */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "8px",
                    padding: "8px",
                  }}>
                    {BUTTONS.map((btn, i) => (
                      <button
                        key={btn.id}
                        onClick={() => handleButtonClick(btn.id)}
                        onMouseEnter={() => { setHoveredBtn(btn.id); playBeep(600, 0.05); }}
                        onMouseLeave={() => setHoveredBtn(null)}
                        style={{
                          width: "100px",
                          height: "100px",
                          background: activeCard === btn.id ? btn.color : "#F5DEB3",
                          border: "4px solid #000",
                          boxShadow: activeCard === btn.id
                            ? `4px 4px 0 ${btn.shadow}`
                            : `6px 6px 0 ${btn.shadow}`,
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                          transform: hoveredBtn === btn.id ? "scale(1.15) translateY(-4px)" : "scale(1)",
                          transition: "transform 0.15s ease, box-shadow 0.15s ease",
                          fontFamily: "'Press Start 2P', monospace",
                          position: "relative",
                          animation: `btnBounce ${1.5 + i * 0.2}s ease-in-out infinite`,
                        }}
                      >
                        {/* Question mark or star decoration */}
                        <div style={{
                          position: "absolute",
                          top: "-8px", right: "-8px",
                          width: "20px", height: "20px",
                          background: btn.color,
                          border: "2px solid #000",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "10px",
                        }}>
                          {btn.emoji}
                        </div>
                        <div style={{ fontSize: "20px" }}>{btn.emoji}</div>
                        <div style={{
                          fontSize: "7px",
                          color: activeCard === btn.id ? "#fff" : "#333",
                          textShadow: activeCard === btn.id ? "1px 1px 0 #000" : "none",
                          textAlign: "center",
                          lineHeight: "1.4",
                        }}>
                          {btn.label}
                        </div>
                        {/* Level number */}
                        <div style={{
                          position: "absolute",
                          bottom: "-8px", left: "-8px",
                          width: "18px", height: "18px",
                          background: "#1a0a2e",
                          border: "2px solid #FFD700",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "7px",
                          color: "#FFD700",
                        }}>
                          {i + 1}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom decoration */}
                <div style={{
                  fontSize: "10px",
                  color: "#E8A0BF",
                  textShadow: "1px 1px 0 #000",
                  animation: "bounce 1s ease-in-out infinite",
                }}>
                  ↑ 点击按钮探索 Amy 的世界 ↑
                </div>
              </div>

              {/* Content Cards - rendered inside screen */}
              <PersonalityCard onClose={() => setActiveCard(null)} visible={activeCard === "personality"} />
              <HobbiesCard onClose={() => setActiveCard(null)} visible={activeCard === "hobbies"} />
              <ExperienceCard onClose={() => setActiveCard(null)} visible={activeCard === "experience"} />
              <EducationCard onClose={() => setActiveCard(null)} visible={activeCard === "education"} />
              <FuturePlanCard onClose={() => setActiveCard(null)} visible={activeCard === "future"} />
            </div>

            {/* Computer bottom / base */}
            <div style={{
              background: "#C87090",
              borderTop: "4px solid #000",
              padding: "8px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              {/* Floppy/disk slots */}
              <div style={{ display: "flex", gap: "8px" }}>
                <div style={{ width: "40px", height: "8px", background: "#8B4513", border: "2px solid #000" }} />
                <div style={{ width: "20px", height: "8px", background: "#8B4513", border: "2px solid #000" }} />
              </div>
              {/* Speaker grille */}
              <div style={{ display: "flex", gap: "3px" }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} style={{ width: "3px", height: "12px", background: "#8B4513", border: "1px solid #000" }} />
                ))}
              </div>
              {/* Power button */}
              <div style={{
                width: "20px", height: "20px",
                background: "#FF4444",
                border: "3px solid #000",
                borderRadius: "50%",
                boxShadow: "2px 2px 0 #000",
                animation: "blink 2s ease-in-out infinite",
              }} />
            </div>

            {/* Monitor stand */}
            <div style={{
              width: "60px",
              height: "20px",
              background: "#C87090",
              border: "3px solid #000",
              borderTop: "none",
              margin: "0 auto",
            }} />
            <div style={{
              width: "120px",
              height: "10px",
              background: "#A0607A",
              border: "3px solid #000",
              borderTop: "none",
              margin: "0 auto",
              borderRadius: "0 0 4px 4px",
            }} />
          </div>

          {/* Bottom pixel decoration */}
          <div style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "16px",
            display: "flex",
            gap: "8px",
            animation: "bounce 1.5s ease-in-out infinite",
          }}>
            🍄 ⭐ 🍄
          </div>
        </div>
      )}



      <style>{`
        @keyframes mainFadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes titlePulse {
          0%, 100% { text-shadow: 3px 3px 0 #FFD700, -1px -1px 0 #000; }
          50% { text-shadow: 3px 3px 0 #FF8C00, -1px -1px 0 #000, 0 0 20px #FF4444; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-6px); }
        }
        @keyframes btnBounce {
          0%, 100% { margin-top: 0; }
          50% { margin-top: -3px; }
        }
      `}</style>
    </div>
  );
}
