import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speed: number;
  twinkleFactor: number;
}

interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
}

interface BackgroundStarsProps {
  enableStars?: boolean;
  enableHearts?: boolean;
}

export const BackgroundStars: React.FC<BackgroundStarsProps> = ({
  enableStars = true,
  enableHearts = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.min(120, Math.floor((width * height) / 8000));
    const stars: Star[] = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.02 + 0.005,
      twinkleFactor: Math.random() * Math.PI * 2,
    }));

    // Floating hearts
    const heartColors = [
      'rgba(244, 63, 94, 0.45)',
      'rgba(236, 72, 153, 0.4)',
      'rgba(217, 70, 239, 0.35)',
      'rgba(251, 113, 133, 0.3)',
      'rgba(244, 114, 182, 0.4)',
    ];

    const hearts: HeartParticle[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 14 + 8,
      speedY: Math.random() * 0.5 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
    }));

    const drawHeart = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      rotation: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.beginPath();
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      context.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      context.bezierCurveTo(
        -size / 2,
        (size + topCurveHeight) / 2,
        0,
        size * 0.85,
        0,
        size
      );
      context.bezierCurveTo(
        0,
        size * 0.85,
        size / 2,
        (size + topCurveHeight) / 2,
        size / 2,
        topCurveHeight
      );
      context.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      context.fillStyle = color;
      context.fill();
      context.restore();
    };

    let tick = 0;

    const render = () => {
      tick += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Deep space ambient romantic gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.4,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#1d0a25');
      bgGrad.addColorStop(0.4, '#13061c');
      bgGrad.addColorStop(1, '#07020d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle warm rose glow corner
      const cornerGrad = ctx.createRadialGradient(width * 0.85, height * 0.15, 20, width * 0.85, height * 0.15, 450);
      cornerGrad.addColorStop(0, 'rgba(219, 39, 119, 0.12)');
      cornerGrad.addColorStop(1, 'rgba(219, 39, 119, 0)');
      ctx.fillStyle = cornerGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw Stars
      if (enableStars) {
        for (const star of stars) {
          star.twinkleFactor += star.speed;
          const currentAlpha = Math.max(0.1, Math.min(1, star.alpha + Math.sin(star.twinkleFactor) * 0.35));
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 245, 250, ${currentAlpha})`;
          ctx.shadowBlur = star.radius * 3;
          ctx.shadowColor = 'rgba(253, 224, 71, 0.6)';
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }

      // Draw Floating Hearts
      if (enableHearts) {
        for (const heart of hearts) {
          heart.y -= heart.speedY;
          heart.x += Math.sin(tick + heart.y * 0.01) * 0.4 + heart.speedX;
          heart.rotation += heart.rotationSpeed;

          if (heart.y < -30) {
            heart.y = height + 20;
            heart.x = Math.random() * width;
          }
          if (heart.x < -30) heart.x = width + 20;
          if (heart.x > width + 30) heart.x = -20;

          drawHeart(ctx, heart.x, heart.y, heart.size, heart.color, heart.rotation);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enableStars, enableHearts]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ width: '100%', height: '100%' }}
    />
  );
};
