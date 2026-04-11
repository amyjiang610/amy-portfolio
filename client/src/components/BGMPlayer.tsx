/**
 * BGM Player Component
 * Design: 复古马里奥游戏背景音乐播放器
 * - 8-bit 像素风格开关按钮
 * - 循环播放马里奥主题音乐
 */

import { useState, useRef, useEffect } from "react";

export default function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 生成马里奥主题的 8-bit 音乐（Web Audio API）
  const generateMarioTheme = () => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // 马里奥主题的音符序列（简化版）
    // 格式: [频率, 时长(秒)]
    const notes = [
      [329.63, 0.15], [329.63, 0.15], [329.63, 0.15], [261.63, 0.1], [329.63, 0.15], [392.0, 0.3],
      [196.0, 0.3], [196.0, 0.15], [196.0, 0.15], [196.0, 0.15], [246.94, 0.1], [293.66, 0.15], [329.63, 0.3],
      [329.63, 0.15], [329.63, 0.15], [329.63, 0.15], [261.63, 0.1], [329.63, 0.15], [392.0, 0.3],
      [196.0, 0.3], [196.0, 0.15], [196.0, 0.15], [196.0, 0.15], [246.94, 0.1], [293.66, 0.15], [329.63, 0.3],
    ];

    let currentTime = audioContext.currentTime;
    
    notes.forEach(([freq, duration]) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.type = "square";
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.1, currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);
      
      osc.start(currentTime);
      osc.stop(currentTime + duration);
      
      currentTime += duration;
    });

    return currentTime - audioContext.currentTime;
  };

  const handleToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      setIsPlaying(true);
      // 播放马里奥主题
      generateMarioTheme();
      // 如果有音频文件，也可以播放
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // 如果自动播放失败，继续使用 Web Audio API
        });
      }
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 1000,
    }}>
      <button
        onClick={handleToggle}
        style={{
          width: "60px",
          height: "60px",
          background: isPlaying ? "#FF4444" : "#FFD700",
          border: "4px solid #000",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "24px",
          fontWeight: "bold",
          boxShadow: "4px 4px 0 #000",
          transition: "all 0.1s",
          fontFamily: "'Press Start 2P', monospace",
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #000";
          (e.currentTarget as HTMLButtonElement).style.transform = "translate(2px, 2px)";
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #000";
          (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "4px 4px 0 #000";
          (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
        }}
        title={isPlaying ? "BGM 开启中" : "点击开启 BGM"}
      >
        {isPlaying ? "♫" : "♪"}
      </button>
      <audio ref={audioRef} loop style={{ display: "none" }} />
    </div>
  );
}
