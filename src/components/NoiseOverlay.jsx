import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let mounted = true;
    let pattern = null;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makePattern = () => {
      const size = 220;
      const off = document.createElement("canvas");
      off.width = size;
      off.height = size;
      const octx = off.getContext("2d", { alpha: true });
      if (!octx) return null;
      const imageData = octx.createImageData(size, size);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 22;
      }
      octx.putImageData(imageData, 0, 0);
      return ctx.createPattern(off, "repeat");
    };

    const draw = () => {
      if (!mounted) return;
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (!pattern) pattern = makePattern();
      if (pattern) {
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = pattern;
        ctx.save();
        ctx.translate((Math.random() * 64) | 0, (Math.random() * 64) | 0);
        ctx.fillRect(-64, -64, w + 128, h + 128);
        ctx.restore();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    pattern = makePattern();
    window.addEventListener("resize", resize, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      mounted = false;
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-overlay opacity-[0.22]"
    />
  );
}

