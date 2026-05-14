import { useEffect, useRef } from 'react';

const GRID_SIZE = 100;
const chars = ['.', ',', ':', ';', '!', '|', '/', '\\', '-', '_'];

interface GridCell {
  charCurrent: string;
  charNext: string;
  charTimer: number;
  posX: number;
  posY: number;
  brightness: number;
  hover: number;
  active: number;
  radius: number;
}

function mathSmoothStep(value: number, min: number, max: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

function getNoise(x: number, y: number, t: number): number {
  return Math.sin(x * 0.05 + t) * Math.cos(y * 0.05 + t * 0.5) * 0.5 + 0.5;
}

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const gridRef = useRef<GridCell[]>([]);
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Init grid
    const grid: GridCell[] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        grid.push({
          charCurrent: '.',
          charNext: '_',
          charTimer: 0,
          posX: x,
          posY: y,
          brightness: 0,
          hover: 0,
          active: 0,
          radius: 0,
        });
      }
    }
    gridRef.current = grid;

    // Mouse handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };
    document.addEventListener('mousemove', handleMouseMove);

    let startTime = performance.now();

    const update = (dt: number) => {
      timeRef.current += dt;
      const time = timeRef.current;
      const mouse = mouseRef.current;

      const cellSize = window.innerWidth / GRID_SIZE;
      const fontSize = cellSize * 1.2;

      for (let i = 0; i < grid.length; i++) {
        const p = grid[i];

        const dx = (p.posX / GRID_SIZE) - mouse.x;
        const dy = (p.posY / GRID_SIZE) - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const hoverVal = mathSmoothStep(dist, 0, 0.15);
        p.hover = 1 - hoverVal;
        p.radius = dist;

        const noiseVal = getNoise(p.posX, p.posY, time * 0.5);
        p.active = noiseVal;

        p.brightness = (p.active * 0.8) + (p.hover * 0.5);
        if (p.brightness > 1) p.brightness = 1;

        const charIdx = Math.floor(p.brightness * (chars.length - 1));
        p.charNext = chars[charIdx];

        if (p.charCurrent !== p.charNext) {
          p.charTimer += dt * 2;
          if (p.charTimer >= 1) {
            p.charCurrent = p.charNext;
            p.charTimer = 0;
          }
        }
      }

      return { cellSize, fontSize };
    };

    const draw = (cellSize: number, fontSize: number) => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let i = 0; i < grid.length; i++) {
        const p = grid[i];
        const xPos = (p.posX + 0.5) * cellSize;
        const yPos = (p.posY + 0.5) * cellSize;

        const brightnessVal = Math.floor(p.brightness * 200 + 50);
        ctx.fillStyle = 'rgb(' + brightnessVal + ',' + brightnessVal + ',' + brightnessVal + ')';
        ctx.fillText(p.charCurrent, xPos, yPos);
      }
    };

    const loop = () => {
      const now = performance.now();
      const dt = (now - startTime) / 1000;
      startTime = now;

      const { cellSize, fontSize } = update(dt);
      draw(cellSize, fontSize);

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: '#050505',
        pointerEvents: 'none',
      }}
    />
  );
}
