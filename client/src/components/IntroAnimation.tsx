/**
 * IntroAnimation Component
 * Design: 超级马里奥复古街机风
 * - 3D CSS 旋转粉色笔记本
 * - 点击后打字机效果 "Welcome to Amy's World"
 * - 消失后显示主页面
 */

import { useEffect, useRef, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export default function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState<"notebook" | "typing" | "done">("notebook");
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Welcome to Amy's World";
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursorRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cursor blink
  useEffect(() => {
    cursorRef.current = setInterval(() => {
      setShowCursor(v => !v);
    }, 500);
    return () => {
      if (cursorRef.current) clearInterval(cursorRef.current);
    };
  }, []);

  // Typing effect
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    setTypedText("");
    const type = () => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
        typingRef.current = setTimeout(type, 80);
      } else {
        // After typing done, wait then fade out
        typingRef.current = setTimeout(() => {
          setPhase("done");
          setTimeout(onComplete, 600);
        }, 1200);
      }
    };
    typingRef.current = setTimeout(type, 300);
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [phase]);

  const handleNotebookClick = () => {
    if (phase === "notebook") {
      setPhase("typing");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "linear-gradient(135deg, #FFE4E1 0%, #FFDAB9 50%, #FFB6C1 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "40px",
        transition: "opacity 0.6s ease",
        opacity: phase === "done" ? 0 : 1,
        pointerEvents: phase === "done" ? "none" : "all",
      }}
    >
      {/* Pixel stars background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              fontSize: "12px",
              animation: `starTwinkle ${1 + (i % 3) * 0.5}s ease-in-out infinite`,
              animationDelay: `${(i * 0.3) % 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* 3D Notebook */}
      {phase === "notebook" && (
        <div
          style={{
            perspective: "800px",
            cursor: "pointer",
          }}
          onClick={handleNotebookClick}
        >
          <div
            style={{
              width: "280px",
              height: "200px",
              position: "relative",
              transformStyle: "preserve-3d",
              animation: "notebookRotate 4s ease-in-out infinite",
            }}
          >
            {/* Notebook body */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "#E8A0BF",
                border: "4px solid #000",
                borderRadius: "4px",
                boxShadow: "6px 6px 0 #000",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              {/* Screen area */}
              <div
                style={{
                  width: "220px",
                  height: "130px",
                  background: "#1a0a2e",
                  border: "4px solid #000",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Scanlines */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
                  pointerEvents: "none",
                }} />
                {/* Pixel cursor */}
                <div style={{ fontSize: "20px", animation: "cursorBlink 1s step-end infinite" }}>
                  ▶
                </div>
                <div style={{
                  color: "#E8A0BF",
                  fontSize: "10px",
                  textAlign: "center",
                  lineHeight: "1.8",
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow: "0 0 8px #E8A0BF",
                }}>
                  Click me ✨
                </div>
              </div>
              {/* Keyboard hint */}
              <div style={{
                width: "220px",
                height: "20px",
                background: "#C87090",
                border: "2px solid #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} style={{
                    width: "14px",
                    height: "10px",
                    background: "#FFB6C1",
                    border: "1px solid #000",
                  }} />
                ))}
              </div>
            </div>
            {/* Notebook spine */}
            <div style={{
              position: "absolute",
              left: "-8px",
              top: "0",
              width: "8px",
              height: "100%",
              background: "#C87090",
              border: "2px solid #000",
              transform: "rotateY(-90deg) translateZ(4px)",
            }} />
          </div>
        </div>
      )}

      {/* Typing effect */}
      {phase === "typing" && (
        <div
          style={{
            textAlign: "center",
            animation: "fadeInScale 0.5s ease-out",
          }}
        >
          <div style={{
            fontSize: "16px",
            color: "#8B0000",
            textShadow: "3px 3px 0 #FFD700, -1px -1px 0 #000",
            fontFamily: "'Press Start 2P', monospace",
            lineHeight: "2",
            letterSpacing: "2px",
          }}>
            {typedText}
            <span style={{ opacity: showCursor ? 1 : 0 }}>|</span>
          </div>
          <div style={{
            marginTop: "20px",
            fontSize: "12px",
            color: "#8B4513",
            fontFamily: "'Press Start 2P', monospace",
            animation: "bounce 0.8s ease-in-out infinite",
          }}>
            ▼ Loading... ▼
          </div>
        </div>
      )}

      {/* Pixel decorations */}
      <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", fontSize: "24px" }}>
        🍄 ⭐ 🍄
      </div>

      <style>{`
        @keyframes notebookRotate {
          0%, 100% { transform: rotateY(-15deg) rotateX(5deg); }
          50% { transform: rotateY(15deg) rotateX(-5deg); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
