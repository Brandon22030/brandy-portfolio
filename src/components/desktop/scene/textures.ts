import * as THREE from "three";

/*
 * Every piece of text in the 3D scene is painted into a <canvas> with the
 * site's own next/font families (read from their CSS variables), then used
 * as a texture. No extra font files, no network.
 */

export const COLORS = {
  ink: "#141416",
  cream: "#f1e9d6",
  paper: "#fbfaf7",
  orange: "#f26b1d",
  lime: "#c6ef3a",
  yellow: "#f6c332",
};

function cssFont(variable: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
  return value || fallback;
}

export const posterFont = () => cssFont("--font-poster-src", "Impact, sans-serif");
export const monoFont = () => cssFont("--font-mono-tech", "ui-monospace, monospace");
export const bodyFont = () => cssFont("--font-body", "system-ui, sans-serif");

let fontsReady: Promise<void> | null = null;

export function loadSceneFonts() {
  fontsReady ??= Promise.all([
    document.fonts.load(`600 120px ${posterFont()}`),
    document.fonts.load(`700 120px ${posterFont()}`),
    document.fonts.load(`500 40px ${monoFont()}`),
    document.fonts.load(`400 40px ${bodyFont()}`),
    document.fonts.load(`500 40px ${bodyFont()}`),
  ])
    .then(() => undefined)
    .catch(() => undefined);
  return fontsReady;
}

export function createCanvasTexture(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return { canvas, ctx: canvas.getContext("2d")!, texture };
}

/** Redraws a canvas texture in place and flags it for re-upload to the GPU. */
export function repaint(target: CanvasTarget, draw: (ctx: CanvasRenderingContext2D) => void) {
  draw(target.ctx);
  target.texture.needsUpdate = true;
}

export type CanvasTarget = ReturnType<typeof createCanvasTexture>;

function paint(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const { ctx, texture } = createCanvasTexture(width, height);
  draw(ctx);
  texture.needsUpdate = true;
  return texture;
}

function halftone(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, step = 24) {
  ctx.fillStyle = "#1a1a1a";
  for (let yy = y + step / 2; yy < y + h; yy += step) {
    for (let xx = x + step / 2; xx < x + w; xx += step) {
      ctx.beginPath();
      ctx.arc(xx, yy, step * 0.18, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/* ------------------------------------------------------------------ */

export function spineTexture(label: string, background: string, color: string) {
  return paint(96, 640, (ctx) => {
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, 96, 640);
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    ctx.fillRect(80, 0, 16, 640);
    ctx.save();
    ctx.translate(58, 604);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = color;
    ctx.font = `600 50px ${posterFont()}`;
    ctx.textBaseline = "middle";
    ctx.fillText(label.toUpperCase(), 0, 0);
    ctx.restore();
  });
}

export function drawPoster(ctx: CanvasRenderingContext2D, day: string, date: string) {
  const W = 1000;
  const H = 1100;
  ctx.fillStyle = COLORS.paper;
  ctx.fillRect(0, 0, W, H);

  // top-left: calendar grid
  ctx.strokeStyle = "#222";
  ctx.lineWidth = 3;
  for (let x = 0; x <= 500; x += 100) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 550);
    ctx.stroke();
  }
  for (let y = 0; y <= 550; y += 110) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(500, y);
    ctx.stroke();
  }
  ctx.fillStyle = COLORS.paper;
  ctx.fillRect(28, 26, 330, 196);
  ctx.fillStyle = "#161616";
  ctx.font = `500 96px ${posterFont()}`;
  ctx.textBaseline = "top";
  ctx.fillText(day.toUpperCase(), 36, 30);
  ctx.fillText(date, 36, 122);

  halftone(ctx, 500, 0, 500, 550);
  halftone(ctx, 0, 550, 500, 550);

  ctx.fillStyle = "#161616";
  ctx.font = `600 104px ${posterFont()}`;
  ctx.fillText("BRANDON", 540, 600);
  ctx.fillText("MEDEHOU", 540, 700);
  ctx.fillStyle = COLORS.orange;
  ctx.fillText("PORTFOLIO", 540, 800);

  ctx.strokeStyle = "#111";
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, W, H);
  ctx.beginPath();
  ctx.moveTo(500, 0);
  ctx.lineTo(500, H);
  ctx.moveTo(0, 550);
  ctx.lineTo(W, 550);
  ctx.stroke();
}

export function receiptTexture() {
  return paint(320, 460, (ctx) => {
    ctx.fillStyle = COLORS.paper;
    ctx.fillRect(0, 0, 320, 460);
    let x = 26;
    ctx.fillStyle = "#1a1a1a";
    const bars = [4, 2, 6, 2, 3, 8, 2, 4, 2, 5, 3, 2, 7, 2, 3, 4, 2, 6, 3, 2, 4, 2, 5, 2, 3, 6, 2, 4];
    bars.forEach((w, i) => {
      if (i % 2 === 0) ctx.fillRect(x, 28, w * 1.6, 120);
      x += w * 1.6 + 2;
    });
    ctx.font = `500 22px ${monoFont()}`;
    ctx.textBaseline = "top";
    ["DEV FULLSTACK", "REACT · NEXT.JS", "PYTHON · AWS", "", "— COTONOU, BJ"].forEach((line, i) => {
      ctx.fillStyle = i === 4 ? "#888" : "#222";
      ctx.fillText(line, 26, 176 + i * 34);
    });
  });
}

export function drawDigits(ctx: CanvasRenderingContext2D, value: string) {
  ctx.fillStyle = "#141414";
  ctx.fillRect(0, 0, 256, 224);
  ctx.fillStyle = "#f3f1ec";
  ctx.font = `700 190px ${posterFont()}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(value, 128, 122);
  ctx.fillStyle = "#050505";
  ctx.fillRect(0, 108, 256, 7);
}

export function drawStickyNote(ctx: CanvasRenderingContext2D, night: boolean) {
  const W = 512;
  const H = 512;
  ctx.clearRect(0, 0, W, H);
  const paper = ctx.createLinearGradient(0, 0, 0, H);
  paper.addColorStop(0, "#ffe27a");
  paper.addColorStop(1, "#f6c332");
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, W, H);
  // adhesive strip, slightly darker
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, W, 70);
  ctx.fillStyle = "#1a1a1a";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.font = `800 104px ${posterFont()}`;
  ctx.fillText("TOUCHE-MOI", W / 2, 180, W - 50);
  ctx.font = `700 84px ${posterFont()}`;
  const [line1, line2] = night ? ["POUR RALLUMER", "LE JOUR"] : ["SI T'AS PAS", "PEUR DU NOIR"];
  ctx.fillText(line1, W / 2, 290, W - 60);
  ctx.fillText(line2, W / 2, 380, W - 60);
  ctx.strokeStyle = "#f26b1d";
  ctx.lineWidth = 9;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(110, 430);
  ctx.quadraticCurveTo(W / 2, 462, W - 110, 424);
  ctx.stroke();
}

export function noteTexture() {
  return paint(1200, 380, (ctx) => {
    ctx.fillStyle = COLORS.paper;
    ctx.fillRect(0, 0, 1200, 380);
    const gradient = ctx.createRadialGradient(150, 170, 20, 180, 190, 110);
    gradient.addColorStop(0, "#dcff6a");
    gradient.addColorStop(1, "#a9d61c");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(180, 190, 108, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#141414";
    ctx.font = `700 124px ${posterFont()}`;
    ctx.textBaseline = "alphabetic";
    ctx.fillText("CLIQUE SUR", 340, 175);
    ctx.fillText("L'ÉCRAN", 340, 290);
    ctx.fillStyle = "#777";
    ctx.font = `500 30px ${monoFont()}`;
    ctx.fillText("POUR DÉMARRER BRANDY OS", 344, 340);
  });
}

/* ------------------------------------------------------------------ */

export type ScreenMode = "title" | "boot" | "preview";

export const SCREEN_W = 1280;
export const SCREEN_H = 800;

function folderGlyph(ctx: CanvasRenderingContext2D, x: number, y: number, w: number) {
  const s = w / 64;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.rotate(-0.08);
  ctx.fillStyle = "#c99a1c";
  ctx.beginPath();
  ctx.roundRect(2, 2, 26, 14, 4);
  ctx.fill();
  const g = ctx.createLinearGradient(0, 10, 0, 50);
  g.addColorStop(0, "#ffd65a");
  g.addColorStop(1, "#e7a91c");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.roundRect(0, 10, 64, 40, 5);
  ctx.fill();
  ctx.restore();
}

function disc(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  const g = ctx.createConicGradient(0.4, cx, cy);
  ["#e3e7ec", "#f6d9f1", "#d1e9ff", "#e8f7cb", "#f7e4c6", "#e3e7ec"].forEach((c, i, all) => g.addColorStop(i / (all.length - 1), c));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#bbb";
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#151515";
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.07, 0, Math.PI * 2);
  ctx.fill();
}

export function drawScreen(
  ctx: CanvasRenderingContext2D,
  mode: ScreenMode,
  progress: number,
  brightness: number,
  mascot?: CanvasImageSource & { width: number; height: number },
) {
  const W = SCREEN_W;
  const H = SCREEN_H;
  ctx.save();
  ctx.textAlign = "left";

  if (mode === "title") {
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#1a1a1d");
    bg.addColorStop(1, "#0f0f11");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    const glow = ctx.createRadialGradient(W * 0.85, 0, 10, W * 0.85, 0, W * 0.7);
    glow.addColorStop(0, "rgba(242,107,29,0.16)");
    glow.addColorStop(1, "rgba(242,107,29,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = COLORS.cream;
    ctx.font = `600 230px ${posterFont()}`;
    ctx.textBaseline = "alphabetic";
    const line1 = "BRANDY";
    const line2 = "THE DEV";
    const w1 = ctx.measureText(line1).width;
    const w2 = ctx.measureText(line2).width;
    ctx.fillText(line1, (W - w1) / 2, 330);
    ctx.fillText(line2, (W - w2) / 2, 530);
    folderGlyph(ctx, (W - w2) / 2 - 160, 420, 150);
    disc(ctx, (W - w2) / 2 - 40, 478, 58);

    ctx.font = `500 30px ${monoFont()}`;
    ctx.fillStyle = COLORS.cream;
    ctx.fillText("2023 — 2026", 80, 680);
    ctx.fillText("DEV FULLSTACK", 80, 718);
    ctx.textAlign = "center";
    ctx.fillText("COTONOU", W / 2, 680);
    ctx.fillText("BÉNIN", W / 2, 718);
    ctx.strokeStyle = COLORS.cream;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(1130, 650);
    ctx.lineTo(1196, 716);
    ctx.moveTo(1196, 666);
    ctx.lineTo(1196, 716);
    ctx.lineTo(1146, 716);
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.025)";
    for (let y = 0; y < H; y += 4) ctx.fillRect(0, y, W, 1);
  } else if (mode === "boot") {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    const halo = ctx.createRadialGradient(W / 2, 330, 10, W / 2, 330, 260);
    halo.addColorStop(0, "rgba(242,107,29,0.22)");
    halo.addColorStop(1, "rgba(242,107,29,0)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, W, H);
    if (mascot) {
      const h = 330;
      const w = (mascot.width / mascot.height) * h;
      ctx.drawImage(mascot, W / 2 - w / 2, 165, w, h);
    }
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    roundRect(ctx, W / 2 - 200, 560, 400, 10, 5);
    ctx.fill();
    ctx.fillStyle = COLORS.cream;
    roundRect(ctx, W / 2 - 200, 560, Math.max(10, 400 * progress), 10, 5);
    ctx.fill();
    ctx.fillStyle = "rgba(241,233,214,0.55)";
    ctx.font = `500 26px ${monoFont()}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("BRANDY OS", W / 2, 630);
  } else {
    ctx.fillStyle = "#0e0e10";
    ctx.fillRect(0, 0, W, H);
    const glow = ctx.createRadialGradient(W * 0.82, H * 0.18, 10, W * 0.82, H * 0.18, W * 0.5);
    glow.addColorStop(0, "rgba(242,107,29,0.28)");
    glow.addColorStop(1, "rgba(242,107,29,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(241,233,214,0.05)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, W, 22);
    ctx.fillStyle = "#18181b";
    roundRect(ctx, 90, 55, 1010, 600, 10);
    ctx.fill();
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    roundRect(ctx, 90, 55, 1010, 36, 10);
    ctx.fill();
    ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(112 + i * 18, 73, 5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "rgba(255,255,255,0.12)";
    roundRect(ctx, W / 2 - 220, H - 62, 440, 50, 16);
    ctx.fill();
  }

  if (brightness < 1) {
    ctx.fillStyle = `rgba(0,0,0,${1 - brightness})`;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.restore();
}
