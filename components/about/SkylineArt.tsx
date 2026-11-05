/**
 * Bengaluru, drawn: Vidhana Soudha at golden hour, with UB City and the World
 * Trade Center in the haze behind it, a gulmohar and a rain tree framing the
 * lawn, the city's black-and-yellow kerbs and an auto going past.
 *
 * Everything is laid out from fixed seeds and numbers, so it renders the same
 * every time and weighs a few kilobytes instead of a photo.
 */

const W = 1200;
const H = 900;

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Hazy towers behind the Soudha. */
const city = (() => {
  const r = rng(9);
  const out: { x: number; w: number; top: number }[] = [];
  for (let x = -20; x < W + 20;) {
    const w = 34 + r() * 60;
    out.push({ x: r1(x), w: r1(w), top: r1(360 + r() * 190) });
    x += w + 4 + r() * 18;
  }
  return out;
})();

/** A tree canopy as overlapping clusters, lit from the upper left. */
function canopy(seed: number, cx: number, cy: number, rad: number) {
  const r = rng(seed);
  const blobs: { x: number; y: number; r: number; tone: number }[] = [];
  for (let i = 0; i < 110; i++) {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * rad;
    const x = cx + Math.cos(a) * d;
    const y = cy + Math.sin(a) * d * 0.7;
    const lit = (cx - x) / rad + (cy - y) / rad;
    blobs.push({
      x: r1(x),
      y: r1(y),
      r: r1(rad * (0.09 + r() * 0.11)),
      tone: lit > 0.5 ? 2 : lit > -0.3 ? 1 : 0,
    });
  }
  return blobs.sort((a, b) => a.tone - b.tone);
}

const gulmohar = canopy(4, 10, 500, 150);
const rainTree = canopy(12, 1195, 500, 150);
const blooms = (() => {
  const r = rng(77);
  return Array.from({ length: 160 }, () => {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * 140;
    return {
      x: r1(10 + Math.cos(a) * d),
      y: r1(490 + Math.sin(a) * d * 0.62),
      r: r1(2.2 + r() * 3.6),
    };
  });
})();

const GREENS = [
  ["#2f4a22", "#476b2c", "#6e9440"],
  ["#2a4422", "#3f6430", "#5f8a46"],
];

/** Small domed pavilion (chhatri) on four columns. */
function Chhatri({
  cx,
  base,
  s = 1,
}: {
  cx: number;
  base: number;
  s?: number;
}) {
  const w = 24 * s;
  const colH = 26 * s;
  return (
    <g>
      {[-1, -0.33, 0.33, 1].map((k) => (
        <rect
          key={k}
          x={cx + k * (w - 3 * s) - 2 * s}
          y={base - colH}
          width={4 * s}
          height={colH}
          fill="url(#vs-stone)"
        />
      ))}
      <rect
        x={cx - w - 3 * s}
        y={base - colH - 6 * s}
        width={(w + 3 * s) * 2}
        height={6 * s}
        fill="#efe3cf"
      />
      <path
        d={`M${cx - w} ${base - colH - 6 * s} C${cx - w} ${base - colH - 28 * s} ${cx - 8 * s} ${base - colH - 38 * s} ${cx} ${base - colH - 40 * s} C${cx + 8 * s} ${base - colH - 38 * s} ${cx + w} ${base - colH - 28 * s} ${cx + w} ${base - colH - 6 * s} Z`}
        fill="url(#vs-dome)"
      />
      <rect
        x={cx - 1.5 * s}
        y={base - colH - 52 * s}
        width={3 * s}
        height={13 * s}
        fill="#b9a988"
      />
    </g>
  );
}

/** Corner pavilion: a projecting tower with tall arches and its own dome. */
function Pavilion({ cx }: { cx: number }) {
  return (
    <g>
      <rect
        x={cx - 50}
        y="430"
        width="100"
        height="210"
        fill="url(#vs-stone)"
      />
      <rect
        x={cx + 50}
        y="430"
        width="7"
        height="210"
        fill="#000"
        opacity="0.12"
      />
      {[-24, 0, 24].map((dx) => (
        <path
          key={dx}
          d={`M${cx + dx - 8} 630 V552 a8 8 0 0 1 16 0 V630 Z`}
          fill="#5d5143"
        />
      ))}
      {[-24, 0, 24].map((dx) => (
        <path
          key={`u${dx}`}
          d={`M${cx + dx - 7} 530 V486 a7 7 0 0 1 14 0 V530 Z`}
          fill="#5d5143"
        />
      ))}
      <rect x={cx - 56} y="420" width="112" height="11" fill="#f1e6d3" />
      <rect
        x={cx - 56}
        y="431"
        width="112"
        height="3"
        fill="#000"
        opacity="0.15"
      />
      <rect x={cx - 32} y="380" width="64" height="40" fill="url(#vs-stone)" />
      {[-16, 0, 16].map((dx) => (
        <path
          key={`d${dx}`}
          d={`M${cx + dx - 4} 414 V396 a4 4 0 0 1 8 0 V414 Z`}
          fill="#5d5143"
        />
      ))}
      <rect x={cx - 38} y="374" width="76" height="7" fill="#f1e6d3" />
      <path
        d={`M${cx - 36} 375 C${cx - 38} 335 ${cx - 14} 312 ${cx} 308 C${cx + 14} 312 ${cx + 38} 335 ${cx + 36} 375 Z`}
        fill="url(#vs-dome)"
      />
      <rect x={cx - 2} y="288" width="4" height="22" fill="#b9a988" />
      <circle cx={cx} cy="286" r="4" fill="#b9a988" />
    </g>
  );
}

export function SkylineArt({ className = "" }: { className?: string }) {
  const colX = Array.from({ length: 12 }, (_, i) => r1(452 + (i * 296) / 11));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="Illustration of Vidhana Soudha in Bengaluru at golden hour, with the UB City and World Trade Center towers behind it and an auto passing on the road in front."
    >
      <defs>
        <linearGradient id="vs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6f8db8" />
          <stop offset="0.38" stopColor="#c9b4a6" />
          <stop offset="0.62" stopColor="#f6cfa2" />
          <stop offset="0.78" stopColor="#ffdcae" />
        </linearGradient>
        <radialGradient id="vs-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff4dc" />
          <stop offset="0.25" stopColor="#ffd59a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ff9a4d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vs-haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3d6b4" stopOpacity="0" />
          <stop offset="1" stopColor="#f6d8b2" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="vs-tower" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a9b2c2" />
          <stop offset="1" stopColor="#8a95a8" />
        </linearGradient>
        <pattern
          id="vs-glass"
          width="9"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <rect x="2" y="2" width="4" height="6" fill="#fff" opacity="0.22" />
        </pattern>
        <pattern
          id="vs-curtain"
          width="6"
          height="200"
          patternUnits="userSpaceOnUse"
        >
          <rect width="1" height="200" fill="#fff" opacity="0.25" />
        </pattern>

        {/* Granite, warm on the sunlit left and a touch cooler to the right. */}
        <linearGradient
          id="vs-stone"
          x1="90"
          y1="0"
          x2="1110"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f2e5cf" />
          <stop offset="0.55" stopColor="#e2d2b8" />
          <stop offset="1" stopColor="#c9b89c" />
        </linearGradient>
        <radialGradient id="vs-dome" cx="0.32" cy="0.3" r="0.85">
          <stop offset="0" stopColor="#fbf1de" />
          <stop offset="0.55" stopColor="#dccaab" />
          <stop offset="1" stopColor="#a8977a" />
        </radialGradient>
        <linearGradient id="vs-col" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fbf2e1" />
          <stop offset="0.5" stopColor="#e4d4b9" />
          <stop offset="1" stopColor="#ad9c80" />
        </linearGradient>
        <linearGradient id="vs-recess" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4b4236" />
          <stop offset="1" stopColor="#6b5f4e" />
        </linearGradient>
        <pattern
          id="vs-bays"
          x="120"
          y="500"
          width="38"
          height="88"
          patternUnits="userSpaceOnUse"
        >
          <rect x="8" y="8" width="9" height="28" fill="#5d5143" />
          <rect x="21" y="8" width="9" height="28" fill="#5d5143" />
          <rect x="7" y="36" width="24" height="3" fill="#fbf2e1" />
          <rect x="8" y="50" width="9" height="28" fill="#5d5143" />
          <rect x="21" y="50" width="9" height="28" fill="#5d5143" />
          <rect x="7" y="78" width="24" height="3" fill="#fbf2e1" />
          <rect x="35" y="0" width="3" height="88" fill="#000" opacity="0.08" />
        </pattern>
        <pattern
          id="vs-arcade"
          x="120"
          y="588"
          width="38"
          height="52"
          patternUnits="userSpaceOnUse"
        >
          <path d="M8 52 V22 a11 11 0 0 1 22 0 V52 Z" fill="#5d5143" />
          <rect x="35" y="0" width="3" height="52" fill="#000" opacity="0.08" />
        </pattern>
        <pattern
          id="vs-baluster"
          x="0"
          y="448"
          width="8"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <rect x="2" y="3" width="3" height="11" fill="#cdbd9f" />
        </pattern>

        <filter id="vs-soft" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <linearGradient id="vs-lawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8aa851" />
          <stop offset="1" stopColor="#5b7d33" />
        </linearGradient>
        <linearGradient id="vs-road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6c6d70" />
          <stop offset="1" stopColor="#4b4c50" />
        </linearGradient>
      </defs>

      {/* Sky and sun */}
      <rect width={W} height={H} fill="url(#vs-sky)" />
      <circle cx="250" cy="330" r="300" fill="url(#vs-sun)" />
      <g fill="#fff" opacity="0.45" filter="url(#vs-soft)">
        <ellipse cx="820" cy="150" rx="170" ry="16" />
        <ellipse cx="930" cy="132" rx="110" ry="11" />
        <ellipse cx="380" cy="110" rx="140" ry="12" />
      </g>

      {/* The city behind, in the haze */}
      <g fill="url(#vs-tower)" opacity="0.8">
        {city.map((b, i) => (
          <rect key={i} x={b.x} y={b.top} width={b.w} height={640 - b.top} />
        ))}
      </g>
      <g fill="url(#vs-glass)" opacity="0.8">
        {city.map((b, i) => (
          <rect key={i} x={b.x} y={b.top} width={b.w} height={640 - b.top} />
        ))}
      </g>

      {/* World Trade Center, Brigade Gateway: a tall glass slab with a raked top */}
      <g>
        <polygon points="232,640 232,150 300,118 300,640" fill="#8796ad" />
        <polygon
          points="232,640 232,150 300,118 300,640"
          fill="url(#vs-curtain)"
        />
        <polygon points="300,118 318,128 318,640 300,640" fill="#74839b" />
        <rect x="264" y="84" width="3" height="52" fill="#74839b" />
      </g>

      {/* UB City: the crowned towers, the tallest with its spire */}
      <g>
        <rect x="868" y="200" width="62" height="440" fill="#8f9ab0" />
        <rect x="868" y="200" width="62" height="440" fill="url(#vs-glass)" />
        <rect x="930" y="200" width="12" height="440" fill="#77839a" />
        <polygon points="862,204 948,204 934,170 876,170" fill="#7d899f" />
        <polygon points="876,170 934,170 922,140 888,140" fill="#8f9ab0" />
        <polygon points="888,140 922,140 905,112" fill="#7d899f" />
        <rect x="903" y="66" width="4" height="50" fill="#7d899f" />
        <rect x="956" y="270" width="48" height="370" fill="#97a2b6" />
        <rect x="956" y="270" width="48" height="370" fill="url(#vs-glass)" />
        <polygon points="951,274 1009,274 998,246 962,246" fill="#7d899f" />
        <polygon points="962,246 998,246 980,222" fill="#8f9ab0" />
      </g>
      <rect y="300" width={W} height="340" fill="url(#vs-haze)" />

      {/* Vidhana Soudha */}
      <g>
        {/* Plinth */}
        <rect x="90" y="636" width="1020" height="64" fill="url(#vs-stone)" />
        <rect x="90" y="636" width="1020" height="5" fill="#fbf2e1" />
        {[656, 676].map((y) => (
          <rect
            key={y}
            x="90"
            y={y}
            width="1020"
            height="1.5"
            fill="#000"
            opacity="0.1"
          />
        ))}

        {/* Wings: arcade below, two floors of paired windows, cornice and balustrade */}
        <rect x="120" y="462" width="960" height="176" fill="url(#vs-stone)" />
        <rect x="120" y="500" width="960" height="88" fill="url(#vs-bays)" />
        <rect x="120" y="588" width="960" height="50" fill="url(#vs-arcade)" />
        <rect x="114" y="454" width="972" height="10" fill="#f4e9d6" />
        <rect
          x="114"
          y="464"
          width="972"
          height="4"
          fill="#000"
          opacity="0.15"
        />
        <rect x="120" y="440" width="960" height="14" fill="#efe3cf" />
        <rect
          x="120"
          y="440"
          width="960"
          height="14"
          fill="url(#vs-baluster)"
          opacity="0.6"
        />
        <rect x="116" y="436" width="968" height="4" fill="#f6ecdb" />

        <Chhatri cx={321} base={436} />
        <Chhatri cx={879} base={436} />
        <Pavilion cx={162} />
        <Pavilion cx={1038} />

        {/* Central block: the twelve-column portico */}
        <rect x="425" y="436" width="350" height="204" fill="url(#vs-stone)" />
        <rect
          x="775"
          y="436"
          width="9"
          height="204"
          fill="#000"
          opacity="0.14"
        />
        <rect x="445" y="474" width="310" height="162" fill="url(#vs-recess)" />
        {[480, 540, 600, 660, 720].map((x) => (
          <path
            key={x}
            d={`M${x - 10} 636 V560 a10 10 0 0 1 20 0 V636 Z`}
            fill="#3d352b"
            opacity="0.7"
          />
        ))}
        {colX.map((x) => (
          <g key={x}>
            <rect
              x={x - 7}
              y="476"
              width="14"
              height="154"
              fill="url(#vs-col)"
            />
            <rect x={x - 10} y="468" width="20" height="8" fill="#f4e9d6" />
            <rect x={x - 10} y="628" width="20" height="8" fill="#e6d7bd" />
          </g>
        ))}
        <rect x="425" y="440" width="350" height="30" fill="url(#vs-stone)" />
        <rect
          x="470"
          y="451"
          width="260"
          height="7"
          fill="#8f826d"
          opacity="0.55"
        />
        <rect x="418" y="430" width="364" height="10" fill="#f6ecdb" />
        <rect
          x="418"
          y="440"
          width="364"
          height="3"
          fill="#000"
          opacity="0.16"
        />

        {/* Attic, its corner chhatris, the drum and the great dome */}
        <rect x="470" y="384" width="260" height="46" fill="url(#vs-stone)" />
        {Array.from({ length: 9 }, (_, i) => (
          <rect
            key={i}
            x={494 + i * 24}
            y="396"
            width="9"
            height="22"
            fill="#5d5143"
          />
        ))}
        <rect x="464" y="378" width="272" height="7" fill="#f4e9d6" />
        <Chhatri cx={486} base={378} s={0.75} />
        <Chhatri cx={714} base={378} s={0.75} />

        <rect x="532" y="326" width="136" height="54" fill="url(#vs-stone)" />
        {[548, 572, 596, 620, 644].map((x) => (
          <path
            key={x}
            d={`M${x} 372 V346 a6 6 0 0 1 12 0 V372 Z`}
            fill="#5d5143"
          />
        ))}
        <rect x="524" y="318" width="152" height="9" fill="#f4e9d6" />
        <rect
          x="524"
          y="327"
          width="152"
          height="3"
          fill="#000"
          opacity="0.15"
        />

        <path
          d="M514 320 C504 258 556 206 600 197 C644 206 696 258 686 320 Z"
          fill="url(#vs-dome)"
        />
        <g fill="none" stroke="#7d6e57" strokeOpacity="0.25" strokeWidth="1.5">
          <path d="M600 197 C580 230 566 280 562 320" />
          <path d="M600 197 C620 230 634 280 638 320" />
          <path d="M600 197 V320" />
        </g>
        <g fill="#efe2cb" stroke="#a8977a" strokeWidth="1">
          {Array.from({ length: 10 }, (_, i) => (
            <path key={i} d={`M${516 + i * 17} 322 q8.5 -15 17 0 Z`} />
          ))}
        </g>
        <rect x="591" y="184" width="18" height="15" fill="#d8c7a7" />
        <rect x="596" y="160" width="8" height="25" fill="#bfae8d" />
        <circle cx="600" cy="154" r="8" fill="#bfae8d" />
        <rect x="597" y="136" width="6" height="12" fill="#bfae8d" />

        {/* The grand staircase */}
        {Array.from({ length: 10 }, (_, i) => (
          <g key={i}>
            <rect
              x={438 - i * 5}
              y={640 + i * 8}
              width={324 + i * 10}
              height="8"
              fill={i % 2 ? "#e5d6bd" : "#efe3cf"}
            />
            <rect
              x={438 - i * 5}
              y={640 + i * 8}
              width={324 + i * 10}
              height="1.5"
              fill="#000"
              opacity="0.1"
            />
          </g>
        ))}
        <rect x="404" y="628" width="30" height="94" fill="url(#vs-stone)" />
        <rect x="766" y="628" width="30" height="94" fill="#cdbd9f" />
      </g>

      {/* Lawn, hedge and the drive down to the road */}
      <rect y="700" width={W} height="92" fill="url(#vs-lawn)" />
      <polygon points="404,720 796,720 880,792 320,792" fill="#ddd0b8" />
      <g fill="#3f5e26">
        {Array.from({ length: 30 }, (_, i) => i * 42 - 10)
          .filter((x) => x < 380 || x > 800)
          .map((x) => (
            <ellipse key={x} cx={x + 21} cy="708" rx="24" ry="10" />
          ))}
      </g>

      {/* Black-and-yellow kerb, the road and a passing auto */}
      <rect y="792" width={W} height="78" fill="url(#vs-road)" />
      {Array.from({ length: 31 }, (_, i) => (
        <rect
          key={i}
          x={i * 40}
          y="788"
          width="40"
          height="8"
          fill={i % 2 ? "#1d1d1f" : "#f2c230"}
        />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <rect
          key={`l${i}`}
          x={i * 130 + 20}
          y="830"
          width="64"
          height="4"
          fill="#f4f1ea"
          opacity="0.8"
        />
      ))}
      <g className="skyline-auto">
        <g transform="translate(0 772)">
          <ellipse cx="46" cy="62" rx="50" ry="5" fill="#000" opacity="0.25" />
          <path d="M8 20 Q12 2 46 0 Q80 2 86 22 Z" fill="#1d1d1f" />
          <path d="M6 22 H88 V50 H6 Z" fill="#2f8f4e" />
          <path d="M60 22 H88 V36 H60 Z" fill="#f2c230" />
          <path d="M66 24 H84 V34 H66 Z" fill="#cfe3ef" />
          <rect
            x="16"
            y="26"
            width="34"
            height="14"
            rx="2"
            fill="#1d1d1f"
            opacity="0.55"
          />
          <rect x="4" y="48" width="88" height="6" rx="2" fill="#1d1d1f" />
          <circle cx="22" cy="56" r="9" fill="#1d1d1f" />
          <circle cx="22" cy="56" r="3.5" fill="#9a9a9a" />
          <circle cx="76" cy="56" r="9" fill="#1d1d1f" />
          <circle cx="76" cy="56" r="3.5" fill="#9a9a9a" />
        </g>
      </g>
      <rect y="866" width={W} height="34" fill="#4d6c2c" />

      {/* Trees framing the view: a gulmohar in bloom and a rain tree */}
      <g fill="#3b2a1d">
        <path d="M-6 900 C8 820 26 740 34 640 C20 600 -6 570 -30 556 L-24 548 C2 560 26 580 40 604 C46 570 52 540 70 512 L78 518 C64 548 60 590 62 640 C64 740 58 820 64 900 Z" />
        <path d="M1206 900 C1192 820 1178 740 1172 640 C1186 602 1210 576 1236 562 L1230 554 C1204 566 1180 586 1166 608 C1160 572 1150 540 1132 514 L1124 520 C1140 550 1146 592 1146 640 C1146 740 1150 820 1142 900 Z" />
      </g>
      {gulmohar.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={GREENS[0][b.tone]} />
      ))}
      <g fill="#ff5a1f">
        {blooms.map((b, i) => (
          <circle
            key={i}
            cx={b.x}
            cy={b.y}
            r={b.r}
            opacity={0.75 + (i % 3) * 0.08}
          />
        ))}
      </g>
      {rainTree.map((b, i) => (
        <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={GREENS[1][b.tone]} />
      ))}
    </svg>
  );
}
