import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function QuarterCircleOrbit({ className = "" }) {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId;

    // Fixed virtual canvas coordinate space
    const V_WIDTH = 720;
    const V_HEIGHT = 740;

    // Arc geometry constants — wide commanding quarter circle
    const CX = 535;
    const CY = 520;
    const RADIUS = 430;
    const TRACK_WIDTH = 96;

    // Arc spans from ~147° (sweeping right down to the bottom border) to ~294° (upper-right)
    const START_ANGLE = Math.PI * 0.815;
    const END_ANGLE = Math.PI * 1.635;
    const SPAN = END_ANGLE - START_ANGLE;

    // 3 Particles with icons
    const particles = [
      { id: "sigma", offset: 0, type: "sigma" },
      { id: "code",  offset: 0.35, type: "code" },
      { id: "voice", offset: 0.70, type: "voice" },
    ];

    let progress = 0;
    const SPEED = 0.0012;

    // Icon draw helpers scaled to match pucks
    const drawIcon = (ctx, x, y, type) => {
      ctx.save();
      ctx.translate(x, y);

      if (type === "sigma") {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Σ", 0, 1);
      } else if (type === "code") {
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 17px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("</>", 0, 1);
      } else {
        // Voice / sound wave bars
        ctx.fillStyle = "#FFFFFF";
        const heights = [10, 20, 14, 22, 9];
        const barW = 3.6;
        const spacing = 6.2;
        const startX = -((heights.length - 1) * spacing) / 2;
        heights.forEach((h, i) => {
          ctx.beginPath();
          ctx.roundRect(startX + i * spacing - barW / 2, -h / 2, barW, h, 2.5);
          ctx.fill();
        });
      }

      ctx.restore();
    };

    const updateCanvasResolution = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = Math.max(1, Math.round(rect.width));
      const displayH = Math.max(1, Math.round(rect.height));

      if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
        canvas.width = displayW * dpr;
        canvas.height = displayH * dpr;
      }
    };

    updateCanvasResolution();
    window.addEventListener("resize", updateCanvasResolution);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayW = rect.width || V_WIDTH;
      const displayH = rect.height || V_HEIGHT;

      // Ensure bitmap matches element pixel size
      if (canvas.width !== Math.round(displayW * dpr) || canvas.height !== Math.round(displayH * dpr)) {
        canvas.width = Math.round(displayW * dpr);
        canvas.height = Math.round(displayH * dpr);
      }

      // Proportional uniform scaling: NEVER distorts into an oval on mobile or desktop
      const scale = Math.min(displayW / V_WIDTH, displayH / V_HEIGHT);
      const offsetX = displayW - V_WIDTH * scale;
      const offsetY = displayH - V_HEIGHT * scale;

      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.scale(dpr, dpr);
      ctx.translate(offsetX, offsetY);
      ctx.scale(scale, scale);

      // ── 1. The Large Quarter-Circle Track ──
      ctx.save();
      ctx.beginPath();
      ctx.arc(CX, CY, RADIUS, START_ANGLE, END_ANGLE, false);
      ctx.lineWidth = TRACK_WIDTH;
      ctx.lineCap = "round";
      ctx.strokeStyle = isDark ? "#222634" : "#E2DDD3";
      ctx.stroke();
      ctx.restore();

      // ── 2. Animate and Draw Particles with Smooth Curved Smoky Tails ──
      progress = (progress + SPEED) % 1;

      particles.forEach((p) => {
        const pProgress = (progress + p.offset) % 1;
        const angle = START_ANGLE + pProgress * (SPAN + 0.35) - 0.15;

        // Clip visibility to the arc bounds with smooth fade
        let alpha = 1;
        if (angle < START_ANGLE) {
          alpha = Math.max(0, (angle - (START_ANGLE - 0.16)) / 0.16);
        } else if (angle > END_ANGLE) {
          alpha = Math.max(0, (END_ANGLE + 0.18 - angle) / 0.18);
        }

        if (alpha <= 0.01) return;

        ctx.save();
        ctx.globalAlpha = alpha;

        // ── 2A. Seamless Curved Smoky Comet Trail ──
        const TRAIL_STEPS = 24;
        const TRAIL_SPAN_RAD = 0.28;

        for (let i = TRAIL_STEPS; i >= 1; i--) {
          const t = i / TRAIL_STEPS;
          const trailAngle = angle - t * TRAIL_SPAN_RAD;

          if (trailAngle < START_ANGLE - 0.12) continue;

          const tx = CX + RADIUS * Math.cos(trailAngle);
          const ty = CY + RADIUS * Math.sin(trailAngle);

          const trailRadius = 30 + t * 6;
          const trailAlpha = (1 - t) ** 1.9 * 0.35 * alpha;

          ctx.beginPath();
          ctx.arc(tx, ty, trailRadius, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(224, 90, 62, ${trailAlpha * 0.45})`
            : `rgba(26, 33, 49, ${trailAlpha})`;
          ctx.fill();
        }

        // ── 2B. Draw Particle Puck at (px, py) ──
        const px = CX + RADIUS * Math.cos(angle);
        const py = CY + RADIUS * Math.sin(angle);
        const puckRadius = 30;

        // Drop shadow under puck
        ctx.shadowColor = "rgba(0, 0, 0, 0.35)";
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 4;

        // Puck circle body
        ctx.beginPath();
        ctx.arc(px, py, puckRadius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#121622" : "#1E2433";
        ctx.fill();

        // Rim stroke
        ctx.shadowColor = "transparent";
        ctx.lineWidth = 2.4;
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.38)" : "rgba(255, 255, 255, 0.28)";
        ctx.stroke();

        // Icon inside puck
        drawIcon(ctx, px, py, p.type);

        ctx.restore();
      });

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateCanvasResolution);
    };
  }, [isDark]);

  return (
    <div
      className={`relative w-full max-w-[680px] aspect-[720/740] flex items-end justify-center select-none ${className}`}
    >
      {/* High-performance, zero-distortion 2D Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block pointer-events-none"
      />

      {/* ── Key Statistics (Nested cleanly inside the hollow curve) ── */}
      <div className="absolute right-3 xs:right-6 sm:right-10 lg:right-14 bottom-4 xs:bottom-6 sm:bottom-10 lg:bottom-16 space-y-3 xs:space-y-4 sm:space-y-5 lg:space-y-7 text-left z-10 pointer-events-none">
        <div>
          <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-extrabold text-[#141414] dark:text-white tracking-tight block leading-none">
            100%
          </span>
          <span className="text-[10px] xs:text-xs sm:text-sm text-[#141414]/55 dark:text-white/60 font-medium block mt-0.5 sm:mt-1">
            Response rate
          </span>
        </div>

        <div>
          <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-extrabold text-[#141414] dark:text-white tracking-tight block leading-none">
            120x
          </span>
          <span className="text-[10px] xs:text-xs sm:text-sm text-[#141414]/55 dark:text-white/60 font-medium block mt-0.5 sm:mt-1">
            ROI
          </span>
        </div>

        <div>
          <span className="text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-extrabold text-[#141414] dark:text-white tracking-tight block leading-none">
            10x
          </span>
          <span className="text-[10px] xs:text-xs sm:text-sm text-[#141414]/55 dark:text-white/60 font-medium block mt-0.5 sm:mt-1">
            Cost reduction
          </span>
        </div>
      </div>
    </div>
  );
}
