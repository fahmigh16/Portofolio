"use client";

import React, { useEffect, useRef } from "react";

export interface CardConfig {
  /** Full name shown on the card and used for the back-face signature. */
  name?: string;
  /** Job title / role line under the name. */
  role?: string;
  /** Wordmark shown top-left on the front face. */
  brand?: string;
  /** Small caption under the wordmark. */
  brandTagline?: string;
  /** Three short values stacked top-right (e.g. your working pillars). */
  pillars?: [string, string, string];
  location?: string;
  idNumber?: string;
  validThru?: string;
  /** URL/label shown next to the back-face QR code. */
  site?: string;
  /** Social links shown as small icon buttons on the back face. */
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  /** Optional custom card face image (e.g. real scanned ID card) */
  cardImage?: string;
}

export interface DualIDCardLanyardProps {
  /** Left card configuration (e.g. HMJ TI) */
  cardLeft: CardConfig;
  /** Right card configuration (e.g. HIMA POINTER) */
  cardRight: CardConfig;
  /** Optional custom CSS classes for the root container */
  className?: string;
  /** Optional hint prop for backwards compatibility */
  showHint?: boolean;
}

export interface IDCardLanyardProps extends CardConfig {
  anchorX?: string;
  anchorY?: number;
  zIndex?: number;
  showHint?: boolean;
  className?: string;
  embedded?: boolean;
}

const CSS = `
.idcl-root{
  --idcl-ink-faint:#5b6270;
  --idcl-accent:#5b8cff;
  --idcl-accent-dim:#2f4488;
  --idcl-card:#faf7f1;
  --idcl-card-2:#efeadf;
  --idcl-card-ink:#15171d;
  --idcl-card-soft:#666c78;
  --idcl-card-line:#e1dbcb;
  --idcl-font-display:'Archivo','Arial Narrow',sans-serif;
  --idcl-font-mono:'JetBrains Mono','Consolas',monospace;
  --idcl-font-script:'Caveat',cursive;
  font-family:'Work Sans',system-ui,sans-serif;
  position: relative;
  background: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
.idcl-root *{ box-sizing:border-box; }

.idcl-stage{
  position:relative;
  width:100%;
  height:100%;
  pointer-events:none;
  overflow:visible;
}

.idcl-stage.idcl-embedded {
  position:relative;
  width:100%;
  height:100%;
  overflow:visible;
}

.idcl-rope{ position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }

.idcl-rail{
  position:absolute; top:0; width:clamp(44px, 8vw, 64px); height:6px;
  transform:translateX(-50%);
  background:linear-gradient(180deg, #3a4150, #21252f);
  border-radius:0 0 4px 4px;
  box-shadow:0 2px 6px rgba(0,0,0,.4);
  pointer-events:none;
  z-index: 2;
}

.idcl-card{
  position:absolute;
  width:clamp(126px, 25vw, 225px);
  aspect-ratio: 236 / 373;
  -webkit-perspective:1400px;
  perspective:1400px;
  cursor:grab;
  touch-action:none;
  -webkit-touch-callout:none;
  -webkit-user-select:none;
  user-select:none;
  transform-origin:top center;
  pointer-events:auto;
  z-index: 5;
  -webkit-font-smoothing:antialiased;
}
.idcl-card:active{ cursor:grabbing; }
.idcl-card.idcl-active{ z-index: 15; }

.idcl-flipper{
  position:relative;
  width:100%;
  height:100%;
  -webkit-transform-style:preserve-3d;
  transform-style:preserve-3d;
}

.idcl-face{
  position:absolute; inset:0; border-radius:18px;
  padding:clamp(10px, 2vw, 14px);
  display:flex; flex-direction:column;
  -webkit-backface-visibility:hidden;
  backface-visibility:hidden;
  -webkit-transform-style:preserve-3d;
  transform-style:preserve-3d;
  overflow:hidden;
  box-shadow:
    0 24px 48px -12px rgba(0,0,0,.45),
    0 8px 16px -6px rgba(0,0,0,.3),
    inset 0 1px 0 rgba(255,255,255,.65),
    inset 0 0 0 1px rgba(0,0,0,.08);
}
.idcl-face::before{
  content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background:
    linear-gradient(180deg, rgba(255,255,255,.55) 0%, transparent 24%),
    radial-gradient(rgba(0,0,0,.07) 1px, transparent 1.3px) 0 0/3px 3px;
  mix-blend-mode:multiply; opacity:.6;
  z-index: 5;
}
.idcl-face::after{
  content:""; position:absolute; inset:0; border-radius:inherit; pointer-events:none;
  background:radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.6), transparent 40%);
  mix-blend-mode:overlay; opacity:0; transition:opacity .3s ease;
  z-index: 6;
}
.idcl-card.idcl-hovering .idcl-face::after{ opacity:1; }
@media (prefers-reduced-motion: reduce){ .idcl-face::after{ transition:none; } }

.idcl-front{ background:linear-gradient(165deg, var(--idcl-card), var(--idcl-card-2)); align-items:stretch; text-align:left; }
.idcl-back{ background:linear-gradient(165deg, var(--idcl-card-2), var(--idcl-card)); transform:rotateY(180deg); }

.idcl-card-image-wrap {
  position:absolute; inset:0; z-index:1; border-radius:18px; overflow:hidden;
}
.idcl-card-image {
  width:100%; height:100%; object-fit:cover; display:block;
}

.idcl-holo{
  position:absolute; top:12px; bottom:12px; right:5px; width:6px; border-radius:5px;
  background:repeating-linear-gradient(125deg, #eef1f7 0%, #cfd6e4 10%, #b9c2d6 20%, #e7ebf3 30%, #eef1f7 40%);
  background-size:220% 220%;
  animation:idcl-foil 7s linear infinite;
  box-shadow:inset 0 0 0 1px rgba(0,0,0,.1), 0 0 6px rgba(255,255,255,.3);
  z-index: 7;
}
@keyframes idcl-foil{ to{ background-position:220% 0%; } }
@media (prefers-reduced-motion: reduce){ .idcl-holo{ animation:none; } }

.idcl-hole{ width:30px; height:8px; background:var(--idcl-card-ink); border-radius:5px; margin:0 auto 8px; flex-shrink:0; opacity:.85; z-index: 7; position:relative; }

.idcl-header{ display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; position:relative; z-index:2; }
.idcl-brand{ display:flex; align-items:flex-start; gap:6px; }
.idcl-brand-mark{ font-size:12px; color:var(--idcl-accent); line-height:1; margin-top:1px; }
.idcl-brand-text{ display:flex; flex-direction:column; }
.idcl-brand-text b{ font-family:var(--idcl-font-display); font-weight:800; font-size:11px; letter-spacing:.01em; color:var(--idcl-card-ink); line-height:1.2; }
.idcl-brand-text small{ font-family:var(--idcl-font-mono); font-size:6px; letter-spacing:.09em; text-transform:uppercase; color:var(--idcl-card-soft); }
.idcl-pillars{ display:flex; flex-direction:column; align-items:flex-end; gap:1px; }
.idcl-pillars span{ font-family:var(--idcl-font-mono); font-size:6.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--idcl-card-soft); }
.idcl-pillars i{ width:14px; height:2px; background:var(--idcl-card-ink); margin-top:3px; }

.idcl-photo{
  position:relative; width:100%; height:105px; border-radius:10px;
  background:#eae7de; overflow:hidden; margin-bottom:10px; flex-shrink:0;
  box-shadow:inset 0 0 0 1px rgba(0,0,0,.08), inset 0 2px 6px rgba(0,0,0,.12);
  z-index:2;
}
.idcl-photo svg{ width:100%; height:100%; display:block; }
.idcl-verified{
  position:absolute; right:-5px; bottom:-5px; width:20px; height:20px; border-radius:50%;
  background:linear-gradient(160deg, var(--idcl-accent), var(--idcl-accent-dim));
  display:flex; align-items:center; justify-content:center;
  box-shadow:0 2px 6px rgba(0,0,0,.4), 0 0 0 3px var(--idcl-card);
}
.idcl-verified svg{ width:10px; height:10px; }

.idcl-name{ margin:0 0 2px; font-family:var(--idcl-font-display); font-weight:800; font-size:16px; color:var(--idcl-card-ink); letter-spacing:-.01em; position:relative; z-index:2; }
.idcl-role{ margin:0 0 8px; font-size:9.5px; color:var(--idcl-card-soft); font-weight:600; letter-spacing:.09em; text-transform:uppercase; position:relative; z-index:2; }

.idcl-divider{ width:100%; height:1px; background:var(--idcl-card-line); margin-bottom:8px; position:relative; z-index:2; }

.idcl-idrow{ width:100%; display:flex; justify-content:space-between; align-items:flex-start; gap:8px; margin-bottom:12px; position:relative; z-index:2; }
.idcl-idrow-labels{ display:flex; flex-direction:column; gap:4px; font-family:var(--idcl-font-mono); }
.idcl-idrow-labels div{ display:flex; gap:6px; align-items:baseline; }
.idcl-idrow-labels span{ width:50px; flex-shrink:0; font-size:7px; letter-spacing:.06em; text-transform:uppercase; color:var(--idcl-card-soft); }
.idcl-idrow-labels b{ font-size:8.5px; font-weight:600; color:var(--idcl-card-ink); }

.idcl-footer{
  width:100%; margin-top:auto; padding-top:8px; border-top:1px solid var(--idcl-card-line);
  text-align:center; font-family:var(--idcl-font-mono); font-size:8px; letter-spacing:.14em; text-transform:uppercase;
  color:var(--idcl-card-soft); position:relative; z-index:2;
}
.idcl-footer i{ color:var(--idcl-card-line); font-style:normal; margin:0 4px; }

.idcl-stripe{ width:100%; height:24px; background:repeating-linear-gradient(45deg, #1b1d24, #1b1d24 6px, #26282f 6px, #26282f 12px); border-radius:3px; margin-bottom:8px; }
.idcl-barcode{ display:flex; align-items:flex-end; gap:2px; height:26px; width:100%; background:#fff; border-radius:3px; padding:0 3px; margin-bottom:6px; overflow:hidden; }
.idcl-barcode span{ width:2px; background:#1a1c22; }
.idcl-idnum{ margin:0 0 6px; font-family:var(--idcl-font-mono); font-size:9px; font-weight:600; color:var(--idcl-card-ink); letter-spacing:.03em; display:flex; justify-content:space-between; font-variant-numeric: tabular-nums; }
.idcl-idnum em{ font-style:normal; color:var(--idcl-card-soft); }

.idcl-backrow{ display:flex; gap:8px; align-items:flex-start; margin-bottom:6px; }
.idcl-qr{ display:grid; grid-template-columns:repeat(9,1fr); gap:1px; width:48px; height:48px; background:#fff; padding:3px; border-radius:4px; flex-shrink:0; box-shadow:0 0 0 1px var(--idcl-card-line); }
.idcl-qr i{ background:transparent; }
.idcl-qr i.on{ background:#181a20; }
.idcl-qr.idcl-small{ width:38px; height:38px; padding:2px; }

.idcl-scan{ font-family:var(--idcl-font-mono); font-size:7.5px; color:var(--idcl-card-soft); line-height:1.4; padding-top:1px; text-align:left; overflow:hidden; }
.idcl-scan b{ color:var(--idcl-card-ink); display:block; font-size:8px; margin-bottom:2px; letter-spacing:.03em; }

.idcl-connect{ display:flex; align-items:center; justify-content:space-between; margin-top:6px; }
.idcl-connect span{ font-family:var(--idcl-font-mono); font-size:7px; letter-spacing:.1em; text-transform:uppercase; color:var(--idcl-card-soft); }
.idcl-connect-icons{ display:flex; gap:5px; }
.idcl-connect-icons a{
  width:20px; height:20px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  border:1px solid var(--idcl-card-line); color:var(--idcl-card-soft);
  transition:border-color .15s ease, color .15s ease, transform .15s ease;
}
.idcl-connect-icons a:hover{ border-color:var(--idcl-accent); color:var(--idcl-accent); transform:translateY(-1px); }
.idcl-connect-icons svg{ width:10px; height:10px; }

.idcl-sig{ margin-top:auto; }
.idcl-sig .idcl-script{ font-family:var(--idcl-font-script); font-size:22px; color:var(--idcl-card-ink); line-height:1; }
.idcl-sig small{ display:block; font-family:var(--idcl-font-mono); font-size:7px; letter-spacing:.08em; text-transform:uppercase; color:var(--idcl-card-soft); border-top:1px solid var(--idcl-card-line); margin-top:3px; padding-top:3px; }
`;

function buildQR(el: HTMLDivElement | null, seed: number) {
  if (!el) return;
  el.innerHTML = "";
  const N = 9;
  const seedOn = new Set([
    0, 1, 2, 9, 10, 11, 18, 19, 20,
    6, 7, 8, 15, 16, 17, 24, 25, 26,
    54, 55, 56, 63, 64, 65, 72, 73, 74,
  ]);
  for (let i = 0; i < N * N; i++) {
    const cell = document.createElement("i");
    const pseudoRandom = (i * seed) % 97 < 46;
    if (seedOn.has(i) || pseudoRandom) cell.classList.add("on");
    el.appendChild(cell);
  }
}

function initBarcode(el: HTMLDivElement | null) {
  if (!el) return;
  el.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const bar = document.createElement("span");
    bar.style.height = ((i * 37) % 100 > 40 ? 100 : 55) + "%";
    el.appendChild(bar);
  }
}

type Pt = { x: number; y: number; oldx: number; oldy: number; pinned: boolean };

interface CardInstance {
  config: CardConfig;
  anchor: { x: number; y: number };
  points: Pt[];
  dragging: boolean;
  flipped: boolean;
  downPos: { x: number; y: number };
  pointer: { x: number; y: number };
  lastPointer: { x: number; y: number };
  velocity: { x: number; y: number };
  flipTarget: number;
  flipCurrent: number;
  tiltTarget: { x: number; y: number };
  tiltCurrent: { x: number; y: number };
  mouse: { x: number; y: number };
  activePointerId: number | null;
  cardEl: HTMLDivElement;
  flipperEl: HTMLDivElement;
  railEl: HTMLDivElement;
}

function SingleCardMarkup({
  card,
  cardRef,
  flipperRef,
  barcodeRef,
  qrBackRef,
  qrFrontRef,
}: {
  card: CardConfig;
  cardRef: React.RefObject<HTMLDivElement | null>;
  flipperRef: React.RefObject<HTMLDivElement | null>;
  barcodeRef: React.RefObject<HTMLDivElement | null>;
  qrBackRef: React.RefObject<HTMLDivElement | null>;
  qrFrontRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="idcl-card" ref={cardRef}>
      <div className="idcl-flipper" ref={flipperRef}>
        {/* Front Face */}
        <div className="idcl-face idcl-front">
          <div className="idcl-hole" />
          <div className="idcl-holo" />

          {card.cardImage ? (
            <div className="idcl-card-image-wrap">
              <img
                src={card.cardImage}
                alt={`${card.name || "ID"} Card`}
                className="idcl-card-image"
              />
            </div>
          ) : (
            <>
              <div className="idcl-header">
                <div className="idcl-brand">
                  <span className="idcl-brand-mark">▲</span>
                  <div className="idcl-brand-text">
                    <b>{card.brand || "ORGANISASI"}</b>
                    <small>{card.brandTagline || "Kabinet"}</small>
                  </div>
                </div>
                {card.pillars && (
                  <div className="idcl-pillars">
                    {card.pillars.map((p) => (
                      <span key={p}>{p}</span>
                    ))}
                    <i />
                  </div>
                )}
              </div>

              <div className="idcl-photo">
                <svg viewBox="0 0 182 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <linearGradient id={`idcl-faceGrad-${card.name}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#8fb0ff" />
                      <stop offset="1" stopColor="#3f5fd8" />
                    </linearGradient>
                    <pattern id="idcl-dots-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
                      <circle cx="3" cy="3" r="0.8" fill="#ffffff" opacity="0.35" />
                    </pattern>
                  </defs>
                  <rect width="182" height="100" fill="#12151c" />
                  <circle cx="91" cy="62" r="46" fill={`url(#idcl-faceGrad-${card.name})`} />
                  <path d="M42,46 Q91,-18 140,46 L140,66 Q91,38 42,66 Z" fill="#1c2029" />
                  <circle cx="72" cy="62" r="3.6" fill="#12151c" />
                  <circle cx="110" cy="62" r="3.6" fill="#12151c" />
                  <path d="M75,78 Q91,86 107,78" stroke="#12151c" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                  <rect width="182" height="100" fill="url(#idcl-dots-pattern)" />
                </svg>
                <span className="idcl-verified">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                </span>
              </div>

              <h2 className="idcl-name">{card.name || "Member"}</h2>
              <p className="idcl-role">{card.role || "Role"}</p>
              <div className="idcl-divider" />

              <div className="idcl-idrow">
                <div className="idcl-idrow-labels">
                  <div>
                    <span>ID</span>
                    <b>{card.idNumber || "000000"}</b>
                  </div>
                  <div>
                    <span>Location</span>
                    <b>{card.location || "Polinela"}</b>
                  </div>
                  <div>
                    <span>Valid</span>
                    <b>{card.validThru || "2024-2026"}</b>
                  </div>
                </div>
                <div className="idcl-qr idcl-small" ref={qrFrontRef} />
              </div>

              <div className="idcl-footer">
                Build<i>·</i>Ship<i>·</i>Iterate
              </div>
            </>
          )}
        </div>

        {/* Back Face */}
        <div className="idcl-face idcl-back">
          <div className="idcl-hole" />
          <div className="idcl-holo" />
          <div className="idcl-stripe" />

          <div className="idcl-idnum">
            <span>NO. {card.idNumber || "24781009"}</span>
            <em>VALID {card.validThru || "ACTIVE"}</em>
          </div>
          <div className="idcl-barcode" ref={barcodeRef} />

          <div className="idcl-backrow">
            <div className="idcl-qr" ref={qrBackRef} />
            <div className="idcl-scan">
              <b>Scan for portfolio</b>
              {card.site || "fahmighozali.dev"}
              <br />
              {card.name || "Fahmi Ghozali"}
              <br />
              {card.role || "Medinfo"}
            </div>
          </div>

          {(card.githubUrl || card.linkedinUrl || card.instagramUrl) && (
            <div className="idcl-connect">
              <span>Connect</span>
              <div className="idcl-connect-icons">
                {card.githubUrl && (
                  <a href={card.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                )}
                {card.linkedinUrl && (
                  <a href={card.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                )}
                {card.instagramUrl && (
                  <a href={card.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="idcl-sig">
            <div className="idcl-script">{card.name || "Fahmi Ghozali"}</div>
            <small>Authorized Signature</small>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * DualIDCardLanyard - Renders two 3D lanyard cards side-by-side in one shared scene.
 * Both cards swing, drag, and 3D flip independently with generous spacing.
 */
export function DualIDCardLanyard({
  cardLeft,
  cardRight,
  className = "",
}: DualIDCardLanyardProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const railLeftRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const flipperLeftRef = useRef<HTMLDivElement>(null);
  const barcodeLeftRef = useRef<HTMLDivElement>(null);
  const qrBackLeftRef = useRef<HTMLDivElement>(null);
  const qrFrontLeftRef = useRef<HTMLDivElement>(null);

  const railRightRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);
  const flipperRightRef = useRef<HTMLDivElement>(null);
  const barcodeRightRef = useRef<HTMLDivElement>(null);
  const qrBackRightRef = useRef<HTMLDivElement>(null);
  const qrFrontRightRef = useRef<HTMLDivElement>(null);

  // Load fonts once
  useEffect(() => {
    const id = "idcl-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=Caveat:wght@600;700&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    const canvas = canvasRef.current;
    const railL = railLeftRef.current;
    const cardL = cardLeftRef.current;
    const flipperL = flipperLeftRef.current;
    const railR = railRightRef.current;
    const cardR = cardRightRef.current;
    const flipperR = flipperRightRef.current;

    if (!scene || !canvas || !railL || !cardL || !flipperL || !railR || !cardR || !flipperR) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize decorative barcodes and QR codes
    initBarcode(barcodeLeftRef.current);
    initBarcode(barcodeRightRef.current);
    buildQR(qrBackLeftRef.current, 928371);
    buildQR(qrBackRightRef.current, 618492);
    buildQR(qrFrontLeftRef.current, 574123);
    buildQR(qrFrontRightRef.current, 839201);

    const ANCHOR_Y = 6;
    const NUM_POINTS = 13;
    const REST_LENGTH = 94;
    const SEGMENT_LENGTH = REST_LENGTH / (NUM_POINTS - 1);
    const GRAVITY = 0.55;
    const FRICTION = 0.98;
    const CONSTRAINT_ITERATIONS = 6;
    const TAP_THRESHOLD = 6;
    const MAX_TILT = 9;

    function resolveAnchors(width: number) {
      if (width < 380) {
        // Narrow mobile (320px - 380px)
        return {
          leftX: width * 0.27,
          rightX: width * 0.73,
        };
      } else if (width < 540) {
        // Standard mobile (380px - 540px)
        return {
          leftX: width * 0.28,
          rightX: width * 0.72,
        };
      } else if (width < 768) {
        // Small tablet
        return {
          leftX: width * 0.30,
          rightX: width * 0.70,
        };
      } else {
        // Desktop: nicely centered with comfortable separation
        const halfGap = Math.min(185, Math.max(145, width * 0.19));
        return {
          leftX: width / 2 - halfGap,
          rightX: width / 2 + halfGap,
        };
      }
    }

    function createPoints(anchorX: number, anchorY: number) {
      const pts: Pt[] = [];
      for (let i = 0; i < NUM_POINTS; i++) {
        const y = anchorY + i * SEGMENT_LENGTH;
        pts.push({ x: anchorX, y, oldx: anchorX, oldy: y, pinned: i === 0 });
      }
      return pts;
    }

    const rectInit = scene.getBoundingClientRect();
    const anchorsInit = resolveAnchors(rectInit.width);

    const cardInstances: CardInstance[] = [
      {
        config: cardLeft,
        anchor: { x: anchorsInit.leftX, y: ANCHOR_Y },
        points: createPoints(anchorsInit.leftX, ANCHOR_Y),
        dragging: false,
        flipped: false,
        downPos: { x: anchorsInit.leftX, y: ANCHOR_Y },
        pointer: { x: anchorsInit.leftX, y: ANCHOR_Y + REST_LENGTH },
        lastPointer: { x: anchorsInit.leftX, y: ANCHOR_Y + REST_LENGTH },
        velocity: { x: 0, y: 0 },
        flipTarget: 0,
        flipCurrent: 0,
        tiltTarget: { x: 0, y: 0 },
        tiltCurrent: { x: 0, y: 0 },
        mouse: { x: -9999, y: -9999 },
        activePointerId: null,
        cardEl: cardL,
        flipperEl: flipperL,
        railEl: railL,
      },
      {
        config: cardRight,
        anchor: { x: anchorsInit.rightX, y: ANCHOR_Y },
        points: createPoints(anchorsInit.rightX, ANCHOR_Y),
        dragging: false,
        flipped: false,
        downPos: { x: anchorsInit.rightX, y: ANCHOR_Y },
        pointer: { x: anchorsInit.rightX, y: ANCHOR_Y + REST_LENGTH },
        lastPointer: { x: anchorsInit.rightX, y: ANCHOR_Y + REST_LENGTH },
        velocity: { x: 0, y: 0 },
        flipTarget: 0,
        flipCurrent: 0,
        tiltTarget: { x: 0, y: 0 },
        tiltCurrent: { x: 0, y: 0 },
        mouse: { x: -9999, y: -9999 },
        activePointerId: null,
        cardEl: cardR,
        flipperEl: flipperR,
        railEl: railR,
      },
    ];

    function resize() {
      const rect = scene!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = rect.height;

      const anchors = resolveAnchors(rect.width);
      const newX = [anchors.leftX, anchors.rightX];

      cardInstances.forEach((inst, i) => {
        const dx = newX[i] - inst.anchor.x;
        inst.anchor.x = newX[i];
        inst.anchor.y = ANCHOR_Y;
        inst.points.forEach((p) => {
          p.x += dx;
          p.oldx += dx;
        });
        inst.railEl.style.left = inst.anchor.x + "px";
        inst.railEl.style.top = inst.anchor.y - 3 + "px";
      });
    }

    resize();

    function getScenePos(e: PointerEvent) {
      const rect = scene!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    function clampToScene(p: { x: number; y: number }, inst?: CardInstance) {
      const cardEl = inst?.cardEl;
      const hw = (cardEl?.offsetWidth || 210) / 2;
      const ch = cardEl?.offsetHeight || 335;
      const pad = 12;

      // 1. Physical tether limit: lanyard cannot stretch unnaturally far from its anchor
      if (inst) {
        const dx = p.x - inst.anchor.x;
        const dy = p.y - inst.anchor.y;
        const dist = Math.hypot(dx, dy);
        const maxTether = Math.min(220, (canvas?.height || 580) * 0.44);
        if (dist > maxTether) {
          p.x = inst.anchor.x + (dx / dist) * maxTether;
          p.y = inst.anchor.y + (dy / dist) * maxTether;
        }
      }

      // 2. Viewport / Frustum boundary: keep the full card inside visible bounds
      const minX = hw + pad;
      const maxX = Math.max(minX, (canvas?.width || 800) - hw - pad);
      const minY = ANCHOR_Y + 16;
      const maxY = Math.max(minY + 40, (canvas?.height || 580) - ch - pad);

      p.x = Math.max(minX, Math.min(maxX, p.x));
      p.y = Math.max(minY, Math.min(maxY, p.y));
      return p;
    }

    function updatePoints(inst: CardInstance) {
      for (let i = 1; i < inst.points.length; i++) {
        if (inst.dragging && i === inst.points.length - 1) continue;
        const p = inst.points[i];
        const vx = (p.x - p.oldx) * FRICTION;
        const vy = (p.y - p.oldy) * FRICTION;
        p.oldx = p.x;
        p.oldy = p.y;
        p.x += vx;
        p.y += vy + GRAVITY;
      }
    }

    function applyConstraints(inst: CardInstance) {
      inst.points[0].x = inst.anchor.x;
      inst.points[0].y = inst.anchor.y;
      if (inst.dragging) {
        const last = inst.points[inst.points.length - 1];
        last.x = inst.pointer.x;
        last.y = inst.pointer.y;
      }
      for (let iter = 0; iter < CONSTRAINT_ITERATIONS; iter++) {
        for (let i = 0; i < inst.points.length - 1; i++) {
          const p1 = inst.points[i];
          const p2 = inst.points[i + 1];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const diff = (SEGMENT_LENGTH - dist) / dist;
          const offX = dx * diff * 0.5;
          const offY = dy * diff * 0.5;
          const p1Locked = p1.pinned;
          const p2Locked = inst.dragging && i + 1 === inst.points.length - 1;
          if (!p1Locked) {
            p1.x -= offX;
            p1.y -= offY;
          }
          if (!p2Locked) {
            p2.x += offX;
            p2.y += offY;
          }
        }
      }
      for (let i = 1; i < inst.points.length; i++) {
        clampToScene(inst.points[i], inst);
      }
    }

    function drawRope(inst: CardInstance) {
      const pts = inst.points;
      const path: { x: number; y: number; cx?: number; cy?: number }[] = [];
      path.push({ x: pts[0].x, y: pts[0].y });
      for (let i = 1; i < pts.length - 1; i++) {
        const midX = (pts[i].x + pts[i + 1].x) / 2;
        const midY = (pts[i].y + pts[i + 1].y) / 2;
        path.push({ x: pts[i].x, y: pts[i].y, cx: midX, cy: midY });
      }
      path.push({ x: pts[pts.length - 1].x, y: pts[pts.length - 1].y });

      function strokeRibbon(style: string | CanvasGradient, width: number) {
        ctx!.beginPath();
        ctx!.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          const p = path[i];
          if (p.cx !== undefined) ctx!.quadraticCurveTo(p.x, p.y, p.cx, p.cy as number);
          else ctx!.lineTo(p.x, p.y);
        }
        ctx!.strokeStyle = style;
        ctx!.lineWidth = width;
        ctx!.lineCap = "round";
        ctx!.lineJoin = "round";
        ctx!.stroke();
      }

      // Soft drop shadow
      ctx!.save();
      ctx!.translate(2, 4);
      ctx!.globalAlpha = 0.22;
      strokeRibbon("#000000", 15);
      ctx!.restore();

      // Realistic fabric lanyard ribbon
      strokeRibbon("#1c1e23", 15);
      strokeRibbon("rgba(0,0,0,0.35)", 15.5);
      strokeRibbon("#1c1e23", 12.5);
      strokeRibbon("rgba(255,255,255,0.08)", 3);

      // Chevron accent mark on ribbon
      const markIdx = Math.floor(pts.length * 0.32);
      const m = pts[markIdx];
      const mPrev = pts[markIdx - 1];
      const mNext = pts[markIdx + 1];
      const angle = Math.atan2(mNext.y - mPrev.y, mNext.x - mPrev.x) + Math.PI / 2;
      ctx!.save();
      ctx!.translate(m.x, m.y);
      ctx!.rotate(angle);
      ctx!.strokeStyle = "rgba(255,255,255,0.55)";
      ctx!.lineWidth = 1.3;
      ctx!.lineCap = "round";
      ctx!.lineJoin = "round";
      ctx!.beginPath();
      ctx!.moveTo(-4, 3.5);
      ctx!.lineTo(0, -3.5);
      ctx!.lineTo(4, 3.5);
      ctx!.stroke();
      ctx!.restore();
    }

    function drawClip(inst: CardInstance) {
      ctx!.save();
      ctx!.translate(inst.anchor.x, inst.anchor.y - 2);
      const g = ctx!.createLinearGradient(-11, -9, 11, 9);
      g.addColorStop(0, "#e7e9ec");
      g.addColorStop(0.35, "#aeb2b8");
      g.addColorStop(0.65, "#7c8087");
      g.addColorStop(1, "#4d5157");
      ctx!.fillStyle = g;
      ctx!.beginPath();
      ctx!.roundRect(-11, -9, 22, 16, 4);
      ctx!.fill();
      ctx!.strokeStyle = "rgba(0,0,0,.25)";
      ctx!.lineWidth = 1;
      ctx!.stroke();
      ctx!.strokeStyle = "rgba(255,255,255,.55)";
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      ctx!.moveTo(-8, -6);
      ctx!.lineTo(8, -6);
      ctx!.stroke();
      ctx!.fillStyle = "#3a3d42";
      ctx!.beginPath();
      ctx!.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.restore();
    }

    function positionCard(inst: CardInstance) {
      const pts = inst.points;
      const last = pts[pts.length - 1];
      const prev = pts[pts.length - 2];
      const angle = Math.atan2(last.y - prev.y, last.x - prev.x) - Math.PI / 2;
      inst.cardEl.style.left = last.x - inst.cardEl.offsetWidth / 2 + "px";
      inst.cardEl.style.top = last.y + "px";
      inst.cardEl.style.transform = `rotate(${angle}rad)`;
    }

    function updateTiltAndSheen(inst: CardInstance) {
      inst.flipCurrent += (inst.flipTarget - inst.flipCurrent) * 0.16;

      const hovering = !inst.dragging && inst.mouse.x > -1000;
      if (hovering) {
        const cx = inst.cardEl.offsetLeft + inst.cardEl.offsetWidth / 2;
        const cy = inst.cardEl.offsetTop + inst.cardEl.offsetHeight / 2;
        const dx = Math.max(-1, Math.min(1, (inst.mouse.x - cx) / (inst.cardEl.offsetWidth / 2)));
        const dy = Math.max(-1, Math.min(1, (inst.mouse.y - cy) / (inst.cardEl.offsetHeight / 2)));
        inst.tiltTarget.y = dx * MAX_TILT;
        inst.tiltTarget.x = -dy * MAX_TILT;

        const mx = Math.max(0, Math.min(100, ((inst.mouse.x - inst.cardEl.offsetLeft) / inst.cardEl.offsetWidth) * 100));
        const my = Math.max(0, Math.min(100, ((inst.mouse.y - inst.cardEl.offsetTop) / inst.cardEl.offsetHeight) * 100));
        inst.cardEl.style.setProperty("--mx", mx + "%");
        inst.cardEl.style.setProperty("--my", my + "%");
        inst.cardEl.classList.add("idcl-hovering");
      } else {
        inst.tiltTarget.x = 0;
        inst.tiltTarget.y = 0;
        inst.cardEl.classList.remove("idcl-hovering");
      }

      inst.tiltCurrent.x += (inst.tiltTarget.x - inst.tiltCurrent.x) * 0.12;
      inst.tiltCurrent.y += (inst.tiltTarget.y - inst.tiltCurrent.y) * 0.12;

      inst.flipperEl.style.transform = `rotateY(${inst.flipCurrent + inst.tiltCurrent.y}deg) rotateX(${inst.tiltCurrent.x}deg)`;
    }

    let raf = 0;
    function loop() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Physics update & constraints for both cards
      for (const inst of cardInstances) {
        updatePoints(inst);
        applyConstraints(inst);
      }

      // Draw lanyards & clips onto shared canvas
      for (const inst of cardInstances) {
        drawRope(inst);
        drawClip(inst);
      }

      // Position cards & update 3D tilt
      for (const inst of cardInstances) {
        positionCard(inst);
        updateTiltAndSheen(inst);
      }

      raf = requestAnimationFrame(loop);
    }

    // Attach pointer event listeners for each card
    const cardCleanups: (() => void)[] = [];

    cardInstances.forEach((inst) => {
      const onCardDown = (e: PointerEvent) => {
        if ((e.target as HTMLElement).closest("a")) return;
        e.preventDefault();
        inst.dragging = true;
        inst.activePointerId = e.pointerId;
        inst.cardEl.setPointerCapture(e.pointerId);

        // Bring active card to the front
        inst.cardEl.classList.add("idcl-active");
        cardInstances.forEach((other) => {
          if (other !== inst) other.cardEl.classList.remove("idcl-active");
        });

        const pos = clampToScene(getScenePos(e), inst);
        inst.pointer = pos;
        inst.lastPointer = pos;
        inst.downPos = pos;
      };

      inst.cardEl.addEventListener("pointerdown", onCardDown);
      cardCleanups.push(() => inst.cardEl.removeEventListener("pointerdown", onCardDown));
    });

    const onWindowMove = (e: PointerEvent) => {
      const scenePos = getScenePos(e);

      cardInstances.forEach((inst) => {
        // Track hover state for subtle 3D tilt and sheen
        const cardRect = inst.cardEl.getBoundingClientRect();
        const sRect = scene!.getBoundingClientRect();
        const left = cardRect.left - sRect.left;
        const top = cardRect.top - sRect.top;

        if (
          scenePos.x >= left &&
          scenePos.x <= left + cardRect.width &&
          scenePos.y >= top &&
          scenePos.y <= top + cardRect.height
        ) {
          inst.mouse = scenePos;
        } else {
          inst.mouse = { x: -9999, y: -9999 };
        }

        // Handle dragging with proper bounds & tether
        if (inst.dragging && inst.activePointerId === e.pointerId) {
          const clamped = clampToScene(scenePos, inst);
          inst.velocity.x = clamped.x - inst.lastPointer.x;
          inst.velocity.y = clamped.y - inst.lastPointer.y;
          inst.lastPointer = clamped;
          inst.pointer = clamped;
        }
      });
    };

    const onWindowUp = (e: PointerEvent) => {
      cardInstances.forEach((inst) => {
        if (!inst.dragging || inst.activePointerId !== e.pointerId) return;
        inst.dragging = false;
        inst.activePointerId = null;

        const pos = getScenePos(e);
        const dist = Math.hypot(pos.x - inst.downPos.x, pos.y - inst.downPos.y);

        if (dist < TAP_THRESHOLD) {
          // Tap detected -> flip 3D
          inst.flipped = !inst.flipped;
          inst.flipTarget = inst.flipped ? 180 : 0;
          const last = inst.points[inst.points.length - 1];
          last.oldx = last.x;
          last.oldy = last.y;
          return;
        }

        // Drag release -> swing with velocity
        const last = inst.points[inst.points.length - 1];
        last.oldx = last.x - inst.velocity.x;
        last.oldy = last.y - inst.velocity.y;
      });
    };

    const onPointerOut = (e: PointerEvent) => {
      if (e.relatedTarget === null) {
        cardInstances.forEach((inst) => {
          inst.mouse = { x: -9999, y: -9999 };
        });
      }
    };

    const onResize = () => resize();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(() => resize()) : null;
    ro?.observe(scene);

    window.addEventListener("pointermove", onWindowMove);
    window.addEventListener("pointerup", onWindowUp);
    window.addEventListener("pointercancel", onWindowUp);
    window.addEventListener("resize", onResize);
    document.addEventListener("pointerout", onPointerOut);

    loop();

    return () => {
      cancelAnimationFrame(raf);
      cardCleanups.forEach((c) => c());
      ro?.disconnect();
      window.removeEventListener("pointermove", onWindowMove);
      window.removeEventListener("pointerup", onWindowUp);
      window.removeEventListener("pointercancel", onWindowUp);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, [cardLeft, cardRight]);

  return (
    <div className={`idcl-root relative w-full h-[460px] sm:h-[530px] lg:h-[590px] overflow-visible select-none ${className}`}>
      <style>{CSS}</style>

      <div className="idcl-stage" ref={sceneRef}>
        <canvas className="idcl-rope" ref={canvasRef} />

        {/* Left Card: HMJ TI */}
        <div className="idcl-rail" ref={railLeftRef} />
        <SingleCardMarkup
          card={cardLeft}
          cardRef={cardLeftRef}
          flipperRef={flipperLeftRef}
          barcodeRef={barcodeLeftRef}
          qrBackRef={qrBackLeftRef}
          qrFrontRef={qrFrontLeftRef}
        />

        {/* Right Card: HIMA POINTER */}
        <div className="idcl-rail" ref={railRightRef} />
        <SingleCardMarkup
          card={cardRight}
          cardRef={cardRightRef}
          flipperRef={flipperRightRef}
          barcodeRef={barcodeRightRef}
          qrBackRef={qrBackRightRef}
          qrFrontRef={qrFrontRightRef}
        />
      </div>
    </div>
  );
}

/**
 * Single card lanyard backwards-compatibility fallback
 */
export function IDCardLanyard({
  anchorX = "50%",
  anchorY = 6,
  zIndex = 60,
  className = "",
  embedded = false,
  ...cardProps
}: IDCardLanyardProps) {
  return (
    <DualIDCardLanyard
      cardLeft={cardProps}
      cardRight={cardProps}
      className={className}
    />
  );
}

export default DualIDCardLanyard;
