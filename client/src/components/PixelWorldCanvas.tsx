/**
 * PixelWorldCanvas Component
 * Design: 超级马里奥复古街机风 - 动态像素游戏世界
 * - 全屏 Canvas 2D 动画
 * - 太阳旋转、云朵漂移、小鸟飞行、森林摇摆
 * - Amy 像素小人走动、蝴蝶飞舞、星星闪烁
 */

import { useEffect, useRef } from "react";

interface PixelWorldCanvasProps {
  isScreen?: boolean;
}

export default function PixelWorldCanvas({ isScreen = false }: PixelWorldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const stateRef = useRef({
    time: 0,
    clouds: [
      { x: 100, y: 60, speed: 0.4, size: 1 },
      { x: 350, y: 40, speed: 0.25, size: 0.8 },
      { x: 600, y: 70, speed: 0.35, size: 1.2 },
      { x: 850, y: 50, speed: 0.2, size: 0.9 },
    ],
    birds: [
      { x: 200, y: 80, speed: 1.2, wingUp: true, wingTimer: 0 },
      { x: 500, y: 100, speed: 0.9, wingUp: false, wingTimer: 10 },
    ],
    amyX: 100,
    amyDir: 1,
    amyFrame: 0,
    amyFrameTimer: 0,
    amyBob: 0,
    butterflies: [
      { x: 150, y: 220, angle: 0, speed: 0.8, wingOpen: true, wingTimer: 0 },
      { x: 400, y: 240, angle: Math.PI, speed: 0.6, wingOpen: false, wingTimer: 5 },
    ],
    stars: Array.from({ length: 15 }, (_, i) => ({
      x: (i * 73 + 20) % 900,
      y: (i * 47 + 10) % 120,
      bright: Math.random() > 0.5,
      timer: Math.floor(Math.random() * 60),
    })),
    flowers: [
      { x: 120, y: 270, bob: 0 },
      { x: 200, y: 265, bob: 10 },
      { x: 320, y: 272, bob: 5 },
      { x: 450, y: 268, bob: 15 },
      { x: 580, y: 271, bob: 8 },
      { x: 700, y: 266, bob: 20 },
      { x: 820, y: 270, bob: 3 },
    ],
    mushrooms: [
      { x: 260, y: 270, bounce: 0 },
      { x: 530, y: 268, bounce: 20 },
      { x: 760, y: 272, bounce: 10 },
    ],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function drawPixelCloud(c: CanvasRenderingContext2D, x: number, y: number, scale: number) {
      c.save();
      c.translate(x, y);
      c.scale(scale, scale);
      const blocks: [number, number][] = [
        [0, 0], [8, 0], [16, 0], [24, 0],
        [-8, -8], [0, -8], [8, -8], [16, -8], [24, -8], [32, -8],
        [0, -16], [8, -16], [16, -16], [24, -16],
      ];
      c.fillStyle = "rgba(255,255,255,0.9)";
      blocks.forEach(([bx, by]) => c.fillRect(bx, by, 8, 8));
      c.fillStyle = "rgba(200,200,220,0.4)";
      blocks.forEach(([bx, by]) => c.fillRect(bx + 1, by + 1, 2, 2));
      c.restore();
    }

    function drawSun(c: CanvasRenderingContext2D, x: number, y: number, time: number) {
      c.save();
      c.translate(x, y);
      const rayLen = 16 + Math.sin(time * 0.05) * 4;
      c.fillStyle = "#FFD700";
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + time * 0.02;
        const rx = Math.cos(angle) * rayLen;
        const ry = Math.sin(angle) * rayLen;
        c.fillRect(rx - 2, ry - 2, 4, 4);
      }
      c.fillStyle = "#FFD700";
      for (let dx = -12; dx <= 12; dx += 4) {
        for (let dy = -12; dy <= 12; dy += 4) {
          if (dx * dx + dy * dy <= 144) c.fillRect(dx, dy, 4, 4);
        }
      }
      c.fillStyle = "#FF8C00";
      c.fillRect(-4, -4, 4, 4);
      c.fillRect(4, -4, 4, 4);
      c.fillRect(-4, 4, 12, 4);
      c.restore();
    }

    function drawTree(c: CanvasRenderingContext2D, x: number, y: number, time: number, offset: number) {
      c.save();
      c.translate(x, y);
      const sway = Math.sin(time * 0.03 + offset) * 2;
      c.fillStyle = "#8B4513";
      c.fillRect(-4, 0, 8, 20);
      c.fillRect(-2, 20, 4, 10);
      c.translate(sway, 0);
      const leafColors = ["#2ECC71", "#27AE60", "#1E8449"];
      c.fillStyle = leafColors[Math.floor(time * 0.05 + offset) % 3];
      const leaves: [number, number][] = [
        [0, -8], [-4, -4], [4, -4], [-8, 0], [0, 0], [8, 0],
        [-12, 4], [-4, 4], [4, 4], [12, 4],
        [-8, 8], [0, 8], [8, 8],
        [-4, 12], [4, 12],
      ];
      leaves.forEach(([lx, ly]) => c.fillRect(lx - 4, ly - 20, 8, 8));
      if (Math.floor(time * 0.1 + offset * 10) % 60 < 10) {
        c.fillStyle = "#FFD700";
        c.font = "8px serif";
        c.fillText("♪", 10, -25);
      }
      c.restore();
    }

    function drawBird(c: CanvasRenderingContext2D, x: number, y: number, wingUp: boolean) {
      c.save();
      c.translate(x, y);
      c.fillStyle = "#4A90E2";
      c.fillRect(-4, -2, 8, 4);
      c.fillRect(4, -4, 4, 4);
      c.fillStyle = "#000";
      c.fillRect(6, -3, 2, 2);
      c.fillStyle = "#FFD700";
      c.fillRect(8, -2, 4, 2);
      c.fillStyle = "#2980B9";
      if (wingUp) {
        c.fillRect(-8, -6, 8, 4);
        c.fillRect(-4, -10, 4, 4);
      } else {
        c.fillRect(-8, 2, 8, 4);
        c.fillRect(-4, 4, 4, 4);
      }
      c.restore();
    }

    function drawAmy(c: CanvasRenderingContext2D, x: number, y: number, frame: number, dir: number, bob: number) {
      c.save();
      c.translate(x, y + bob);
      if (dir < 0) c.scale(-1, 1);
      c.fillStyle = "#FFDAB9";
      c.fillRect(-6, -28, 12, 12);
      c.fillStyle = "#8B4513";
      c.fillRect(-6, -32, 12, 6);
      c.fillRect(-8, -28, 4, 4);
      c.fillStyle = "#000";
      c.fillRect(-3, -24, 2, 2);
      c.fillRect(2, -24, 2, 2);
      c.fillRect(-2, -20, 6, 2);
      c.fillStyle = "#FF69B4";
      c.fillRect(-6, -16, 12, 12);
      c.fillStyle = "#FFDAB9";
      if (frame === 0) {
        c.fillRect(-10, -14, 4, 8);
        c.fillRect(6, -14, 4, 8);
      } else {
        c.fillRect(-10, -10, 4, 8);
        c.fillRect(6, -10, 4, 8);
      }
      c.fillStyle = "#4A4A8A";
      if (frame === 0) {
        c.fillRect(-6, -4, 4, 10);
        c.fillRect(2, -4, 4, 10);
      } else {
        c.fillRect(-6, -4, 4, 8);
        c.fillRect(2, -4, 4, 12);
      }
      c.fillStyle = "#8B4513";
      c.fillRect(-8, 6, 6, 4);
      c.fillRect(2, 6, 6, 4);
      c.restore();
    }

    function drawButterfly(c: CanvasRenderingContext2D, x: number, y: number, wingOpen: boolean) {
      c.save();
      c.translate(x, y);
      c.fillStyle = "#FF69B4";
      c.fillRect(-2, -4, 4, 8);
      if (wingOpen) {
        c.fillStyle = "#FF69B4";
        c.fillRect(-14, -8, 12, 10);
        c.fillRect(2, -8, 12, 10);
        c.fillStyle = "#FFD700";
        c.fillRect(-10, -4, 6, 6);
        c.fillRect(4, -4, 6, 6);
      } else {
        c.fillStyle = "#FF69B4";
        c.fillRect(-8, -4, 6, 8);
        c.fillRect(2, -4, 6, 8);
      }
      c.restore();
    }

    function drawGround(c: CanvasRenderingContext2D, w: number, h: number) {
      const grad = c.createLinearGradient(0, 0, 0, h * 0.7);
      grad.addColorStop(0, "#FFB6C1");
      grad.addColorStop(0.5, "#FFD4A0");
      grad.addColorStop(1, "#87CEEB");
      c.fillStyle = grad;
      c.fillRect(0, 0, w, h * 0.7);
      c.fillStyle = "#2ECC71";
      c.fillRect(0, h * 0.7, w, h * 0.08);
      c.fillStyle = "#27AE60";
      for (let gx = 0; gx < w; gx += 8) c.fillRect(gx, h * 0.7, 4, 4);
      c.fillStyle = "#8B6914";
      c.fillRect(0, h * 0.78, w, h * 0.22);
      c.fillStyle = "#7A5C10";
      for (let gx = 0; gx < w; gx += 16) c.fillRect(gx + 4, h * 0.78, 8, 4);
    }

    function tick() {
      const s = stateRef.current;
      s.time++;
      if (!canvas || !ctx) {
        animRef.current = requestAnimationFrame(tick);
        return;
      }
      const w = canvas.width;
      const h = canvas.height;
      if (!w || !h) {
        animRef.current = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, w, h);
      drawGround(ctx, w, h);

      // Stars
      s.stars.forEach(star => {
        star.timer++;
        if (star.timer > 40) { star.bright = !star.bright; star.timer = 0; }
        ctx.fillStyle = star.bright ? "#FFD700" : "#FFF8DC";
        ctx.fillRect(star.x % w, star.y, star.bright ? 4 : 2, star.bright ? 4 : 2);
      });

      drawSun(ctx, w * 0.85, h * 0.12, s.time);

      s.clouds.forEach(cloud => {
        cloud.x += cloud.speed;
        if (cloud.x > w + 100) cloud.x = -100;
        drawPixelCloud(ctx, cloud.x, cloud.y * (h / 300), cloud.size);
      });

      const treePositions = [0.1, 0.25, 0.45, 0.65, 0.8, 0.92];
      treePositions.forEach((tp, i) => drawTree(ctx, tp * w, h * 0.7, s.time, i * 1.5));

      s.birds.forEach(bird => {
        bird.x += bird.speed;
        if (bird.x > w + 50) bird.x = -50;
        bird.wingTimer++;
        if (bird.wingTimer > 15) { bird.wingUp = !bird.wingUp; bird.wingTimer = 0; }
        const waveY = bird.y * (h / 300) + Math.sin(s.time * 0.05 + bird.x * 0.01) * 20;
        drawBird(ctx, bird.x, waveY, bird.wingUp);
      });

      const emojiSize = isScreen ? 12 : 16;
      s.flowers.forEach(flower => {
        flower.bob++;
        const bobY = Math.sin(flower.bob * 0.05) * 3;
        ctx.font = `${emojiSize}px serif`;
        ctx.fillText(flower.bob % 200 < 100 ? "🌸" : "🌼", flower.x * (w / 900), h * 0.72 + bobY);
      });
      s.mushrooms.forEach(mush => {
        mush.bounce++;
        const bounceY = Math.abs(Math.sin(mush.bounce * 0.08)) * 4;
        ctx.font = `${emojiSize}px serif`;
        ctx.fillText("🍄", mush.x * (w / 900), h * 0.71 - bounceY);
      });

      s.butterflies.forEach(bf => {
        bf.angle += 0.02 * bf.speed;
        bf.x = (bf.x + Math.cos(bf.angle) * 1.5 + w) % w;
        const bfy = h * 0.6 + Math.sin(bf.angle * 2) * 30;
        bf.wingTimer++;
        if (bf.wingTimer > 10) { bf.wingOpen = !bf.wingOpen; bf.wingTimer = 0; }
        drawButterfly(ctx, bf.x, bfy, bf.wingOpen);
      });

      s.amyFrameTimer++;
      if (s.amyFrameTimer > 20) { s.amyFrame = s.amyFrame === 0 ? 1 : 0; s.amyFrameTimer = 0; }
      s.amyX += s.amyDir * 0.8;
      if (s.amyX > w * 0.7) s.amyDir = -1;
      if (s.amyX < w * 0.1) s.amyDir = 1;
      s.amyBob = Math.sin(s.time * 0.15) * 3;
      drawAmy(ctx, s.amyX, h * 0.7, s.amyFrame, s.amyDir, s.amyBob);

      animRef.current = requestAnimationFrame(tick);
    }

    animRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [isScreen]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        imageRendering: "pixelated",
      }}
    />
  );
}
