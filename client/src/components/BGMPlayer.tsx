/**
 * BGM Player Component
 * Design: 复古游戏背景音乐播放器
 * - 8-bit 像素风格开关按钮
 * - 音量控制滑块
 * - 多首游戏主题音乐（马里奥、塞尔达、吃豆人）
 */

import { useState, useRef, useEffect } from "react";

type GameMusic = "mario" | "zelda" | "pacman";

export default function BGMPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentMusic, setCurrentMusic] = useState<GameMusic>("mario");
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  // 停止所有当前的音符
  const stopAllNotes = () => {
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch {}
    });
    oscillatorsRef.current = [];
  };

  // 生成马里奥主题
  const generateMarioTheme = () => {
    stopAllNotes();
    const ctx = audioContextRef.current || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    audioContextRef.current = ctx;

    const notes = [
      [329.63, 0.15], [329.63, 0.15], [329.63, 0.15], [261.63, 0.1], [329.63, 0.15], [392.0, 0.3],
      [196.0, 0.3], [196.0, 0.15], [196.0, 0.15], [196.0, 0.15], [246.94, 0.1], [293.66, 0.15], [329.63, 0.3],
      [329.63, 0.15], [329.63, 0.15], [329.63, 0.15], [261.63, 0.1], [329.63, 0.15], [392.0, 0.3],
      [196.0, 0.3], [196.0, 0.15], [196.0, 0.15], [196.0, 0.15], [246.94, 0.1], [293.66, 0.15], [329.63, 0.3],
    ];

    let currentTime = ctx.currentTime;
    notes.forEach(([freq, duration]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "square";
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(volume * 0.1, currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);

      osc.start(currentTime);
      osc.stop(currentTime + duration);
      oscillatorsRef.current.push(osc);

      currentTime += duration;
    });
  };

  // 生成塞尔达传说主题
  const generateZeldaTheme = () => {
    stopAllNotes();
    const ctx = audioContextRef.current || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    audioContextRef.current = ctx;

    const notes = [
      [392.0, 0.2], [392.0, 0.2], [392.0, 0.2], [329.63, 0.2], [392.0, 0.2], [493.88, 0.4],
      [246.94, 0.4], [246.94, 0.2], [246.94, 0.2], [246.94, 0.2], [293.66, 0.2], [349.23, 0.2], [392.0, 0.4],
      [392.0, 0.2], [392.0, 0.2], [392.0, 0.2], [329.63, 0.2], [392.0, 0.2], [493.88, 0.4],
      [246.94, 0.4], [246.94, 0.2], [246.94, 0.2], [246.94, 0.2], [293.66, 0.2], [349.23, 0.2], [392.0, 0.4],
    ];

    let currentTime = ctx.currentTime;
    notes.forEach(([freq, duration]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(volume * 0.08, currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);

      osc.start(currentTime);
      osc.stop(currentTime + duration);
      oscillatorsRef.current.push(osc);

      currentTime += duration;
    });
  };

  // 生成吃豆人主题
  const generatePacmanTheme = () => {
    stopAllNotes();
    const ctx = audioContextRef.current || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    audioContextRef.current = ctx;

    const notes = [
      [329.63, 0.1], [329.63, 0.1], [329.63, 0.1], [329.63, 0.1], [329.63, 0.1], [329.63, 0.1],
      [392.0, 0.1], [349.23, 0.1], [329.63, 0.2], [293.66, 0.2], [261.63, 0.2], [246.94, 0.2],
      [329.63, 0.1], [329.63, 0.1], [329.63, 0.1], [329.63, 0.1], [329.63, 0.1], [329.63, 0.1],
      [392.0, 0.1], [349.23, 0.1], [329.63, 0.2], [293.66, 0.2], [261.63, 0.2], [246.94, 0.2],
    ];

    let currentTime = ctx.currentTime;
    notes.forEach(([freq, duration]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "triangle";
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(volume * 0.12, currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, currentTime + duration);

      osc.start(currentTime);
      osc.stop(currentTime + duration);
      oscillatorsRef.current.push(osc);

      currentTime += duration;
    });
  };

  const playMusic = (music: GameMusic) => {
    switch (music) {
      case "mario":
        generateMarioTheme();
        break;
      case "zelda":
        generateZeldaTheme();
        break;
      case "pacman":
        generatePacmanTheme();
        break;
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopAllNotes();
    } else {
      setIsPlaying(true);
      playMusic(currentMusic);
    }
  };

  const handleMusicChange = (music: GameMusic) => {
    setCurrentMusic(music);
    if (isPlaying) {
      playMusic(music);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      alignItems: "flex-end",
    }}>
      {/* Music selector */}
      {isPlaying && (
        <div style={{
          background: "#FFD700",
          border: "4px solid #000",
          borderRadius: "4px",
          padding: "8px",
          boxShadow: "4px 4px 0 #000",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          fontFamily: "'Press Start 2P', monospace",
          fontSize: "8px",
        }}>
          <div style={{ color: "#000", fontWeight: "bold" }}>🎵 BGM</div>
          {(["mario", "zelda", "pacman"] as GameMusic[]).map(music => (
            <button
              key={music}
              onClick={() => handleMusicChange(music)}
              style={{
                background: currentMusic === music ? "#FF4444" : "#FFF",
                border: "2px solid #000",
                borderRadius: "2px",
                padding: "4px 8px",
                cursor: "pointer",
                fontFamily: "'Press Start 2P', monospace",
                fontSize: "7px",
                fontWeight: "bold",
                color: "#000",
                transition: "all 0.1s",
                textTransform: "uppercase",
              }}
              onMouseDown={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "1px 1px 0 #000";
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(1px, 1px)";
              }}
              onMouseUp={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #000";
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "2px 2px 0 #000";
                (e.currentTarget as HTMLButtonElement).style.transform = "translate(0, 0)";
              }}
            >
              {music === "mario" && "🍄 Mario"}
              {music === "zelda" && "🗡️ Zelda"}
              {music === "pacman" && "👾 Pacman"}
            </button>
          ))}
        </div>
      )}

      {/* Volume control */}
      {isPlaying && (
        <div style={{
          background: "#FFD700",
          border: "4px solid #000",
          borderRadius: "4px",
          padding: "8px",
          boxShadow: "4px 4px 0 #000",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          width: "120px",
        }}>
          <div style={{
            fontFamily: "'Press Start 2P', monospace",
            fontSize: "8px",
            color: "#000",
            fontWeight: "bold",
          }}>
            🔊 {Math.round(volume * 100)}%
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              width: "100%",
              cursor: "pointer",
              accentColor: "#FF4444",
            }}
          />
        </div>
      )}

      {/* Main BGM button */}
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
