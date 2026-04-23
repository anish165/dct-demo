// theme.jsx — visual direction variants

const THEMES = {
  heritage: {
    id: 'heritage',
    label: 'DCT Official',
    desc: 'DCT Abu Dhabi — coral, indigo, emerald',
    appBg: '#F1ECE3',        // DCT cream/beige
    surface: '#FFFFFF',
    surfaceAlt: '#F7F2E8',
    ink: '#141414',
    inkMuted: '#6B6358',
    accent: '#F15A3A',       // DCT coral/orange (primary)
    accent2: '#3B2B6B',      // DCT indigo/purple
    accent3: '#1F7A4C',      // DCT emerald
    accent4: '#C8253A',      // DCT muted red
    hairline: 'rgba(20,20,20,0.08)',
    chipBg: '#E8E0D2',
    chipInk: '#141414',
    priority: '#C8253A',
    statusDark: false,
    headerFont: '"S\u00F6hne", "Inter", -apple-system, system-ui, sans-serif',
    bodyFont: '-apple-system, "SF Pro Text", Inter, system-ui, sans-serif',
    // decorative
    navIconBg: 'rgba(241,90,58,0.10)',
    showMosaic: true,
  },
  modern: {
    id: 'modern',
    label: 'Modern',
    desc: 'Clean neutral — your product feel',
    appBg: '#F2F2F3',
    surface: '#FFFFFF',
    surfaceAlt: '#F7F7F8',
    ink: '#0E0E11',
    inkMuted: '#6A6A73',
    accent: '#3451b2',       // FRT primary from codebase
    accent2: '#0E0E11',
    hairline: 'rgba(14,14,17,0.08)',
    chipBg: '#EEEEF1',
    chipInk: '#0E0E11',
    priority: '#E5484D',
    statusDark: false,
    headerFont: '-apple-system, "SF Pro Display", Inter, system-ui, sans-serif',
    bodyFont: '-apple-system, "SF Pro Text", Inter, system-ui, sans-serif',
    navIconBg: 'rgba(52,81,178,0.08)',
  },
  editorial: {
    id: 'editorial',
    label: 'Editorial',
    desc: 'Premium hospitality — dark & quiet',
    appBg: '#0E1013',
    surface: '#191C21',
    surfaceAlt: '#14171B',
    ink: '#F2EEE5',
    inkMuted: '#9A9488',
    accent: '#D4B473',       // warm gold
    accent2: '#F2EEE5',
    hairline: 'rgba(242,238,229,0.08)',
    chipBg: '#22262C',
    chipInk: '#F2EEE5',
    priority: '#E08264',
    statusDark: true,
    headerFont: '"Fraunces", "Cormorant Garamond", Georgia, serif',
    bodyFont: '-apple-system, "SF Pro Text", system-ui, sans-serif',
    navIconBg: 'rgba(212,180,115,0.12)',
  },
};

// ─── tiny icon set (stroke) ───────────────────────────────────
const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 1.8 }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'home': return <svg {...common}><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/></svg>;
    case 'feed': return <svg {...common}><rect x="3" y="4" width="18" height="5" rx="1"/><rect x="3" y="11" width="18" height="9" rx="1"/></svg>;
    case 'learn': return <svg {...common}><path d="M3 6l9-3 9 3-9 3-9-3z"/><path d="M6 8v5c0 1.5 3 3 6 3s6-1.5 6-3V8"/></svg>;
    case 'trophy': return <svg {...common}><path d="M7 4h10v5a5 5 0 01-10 0V4z"/><path d="M7 6H4v2a3 3 0 003 3M17 6h3v2a3 3 0 01-3 3"/><path d="M9 18h6M12 14v4"/></svg>;
    case 'wallet': return <svg {...common}><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M16 13h2"/><path d="M3 10h18"/></svg>;
    case 'bell': return <svg {...common}><path d="M6 9a6 6 0 1112 0c0 4 2 5 2 5H4s2-1 2-5z"/><path d="M10 19a2 2 0 004 0"/></svg>;
    case 'search': return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>;
    case 'bookmark': return <svg {...common}><path d="M6 3h12v18l-6-4-6 4V3z"/></svg>;
    case 'bookmark-fill': return <svg {...{...common, fill: color}}><path d="M6 3h12v18l-6-4-6 4V3z"/></svg>;
    case 'play': return <svg {...{...common, fill: color}}><path d="M7 4l13 8-13 8V4z"/></svg>;
    case 'check': return <svg {...common}><path d="M4 12l5 5L20 6"/></svg>;
    case 'chevron-right': return <svg {...common}><path d="M9 6l6 6-6 6"/></svg>;
    case 'chevron-up': return <svg {...common}><path d="M6 15l6-6 6 6"/></svg>;
    case 'qr': return <svg {...common}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3zM20 14v3M14 20h3M20 20v1"/></svg>;
    case 'flame': return <svg {...common}><path d="M12 3s4 4 4 8a4 4 0 01-8 0c0-1 .5-2 1-3 .5 2 2 2 2 2s-2-3 1-7z"/></svg>;
    case 'sparkle': return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>;
    case 'megaphone': return <svg {...common}><path d="M3 11v2a1 1 0 001 1h2l8 5V5L6 10H4a1 1 0 00-1 1z"/><path d="M18 8a5 5 0 010 8"/></svg>;
    case 'alert': return <svg {...common}><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v4M12 18v.01"/></svg>;
    case 'medal': return <svg {...common}><circle cx="12" cy="15" r="5"/><path d="M8 3h8l-3 7h-2L8 3z"/></svg>;
    case 'user': return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>;
    case 'dot-h': return <svg {...common}><circle cx="5" cy="12" r="1.5" fill={color}/><circle cx="12" cy="12" r="1.5" fill={color}/><circle cx="19" cy="12" r="1.5" fill={color}/></svg>;
    case 'heart': return <svg {...common}><path d="M12 20s-7-4.5-7-10a4 4 0 017-2 4 4 0 017 2c0 5.5-7 10-7 10z"/></svg>;
    case 'comment': return <svg {...common}><path d="M4 5h16v11H9l-5 4V5z"/></svg>;
    case 'pin': return <svg {...common}><path d="M12 2v8M8 10h8l-2 4H10l-2-4zM12 14v8"/></svg>;
    case 'globe': return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18"/></svg>;
    case 'arrow-up': return <svg {...common}><path d="M12 19V5M6 11l6-6 6 6"/></svg>;
    default: return null;
  }
};

// ─── stripe placeholder (stand-in for imagery) ────────────────
const StripePlaceholder = ({ label, tone = 'warm', height = 140, theme }) => {
  const palettes = {
    warm: ['#C9A24B', '#B8894B', '#8A6B3A', '#6B4F2A'],
    cool: ['#0B6E6E', '#145a5a', '#1f4a52', '#2a3a44'],
    sand: ['#E4D4B8', '#D6C29A', '#C2A87C', '#A68B5C'],
    dusk: ['#4A6B8A', '#3E5770', '#2E3F52', '#1F2B38'],
    night: ['#22262C', '#1B1F24', '#14171B', '#0E1013'],
  };
  const p = palettes[tone] || palettes.warm;
  return (
    <div style={{
      height, width: '100%', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(180deg, ${p[0]} 0%, ${p[1]} 35%, ${p[2]} 70%, ${p[3]} 100%)`,
    }}>
      {/* subtle diagonal stripes */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.12,
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 14px)',
      }}/>
      {label && (
        <div style={{
          position: 'absolute', left: 14, bottom: 12,
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 10, letterSpacing: 1, textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.75)',
          background: 'rgba(0,0,0,0.25)', padding: '3px 7px', borderRadius: 3,
          backdropFilter: 'blur(4px)',
        }}>{label}</div>
      )}
    </div>
  );
};

// ─── avatar (initials, themed) ────────────────────────────────
const Avatar = ({ initials, size = 36, theme, tone }) => {
  const bg = tone === 'accent' ? theme.accent : tone === 'accent2' ? theme.accent2 : theme.chipBg;
  const fg = tone === 'accent' || tone === 'accent2' ? '#fff' : theme.ink;
  return (
    <div style={{
      width: size, height: size, borderRadius: size/2,
      background: bg, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 600, fontSize: size * 0.38, letterSpacing: 0.3,
      flexShrink: 0, fontFamily: theme.bodyFont,
    }}>{initials}</div>
  );
};

// ─── pillar chip ─────────────────────────────────────────────
const PILLAR_META = {
  comms:        { label: 'Communication', short: 'Comms', icon: 'megaphone' },
  learning:     { label: 'Learning',      short: 'Learn', icon: 'learn' },
  recognition:  { label: 'Recognition',   short: 'Reco',  icon: 'medal' },
  incentives:   { label: 'Incentives',    short: 'Rewards', icon: 'wallet' },
};

const PillarChip = ({ pillar, theme, priority, active }) => {
  const meta = PILLAR_META[pillar];
  if (!meta) return null;
  const bg = priority ? theme.priority : active ? theme.accent : theme.chipBg;
  const fg = priority || active ? '#fff' : theme.chipInk;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      height: 22, padding: '0 9px', borderRadius: 11,
      background: bg, color: fg,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.2,
      textTransform: 'uppercase', fontFamily: theme.bodyFont,
    }}>
      <Icon name={meta.icon} size={11} color={fg} strokeWidth={2}/>
      <span>{meta.short}</span>
    </div>
  );
};

// ─── DCT Mosaic motif — geometric tessellation from brand ───
// Uses quarter-circles, circles, and diamonds in coral/indigo/emerald/black/cream
const DCTMosaic = ({ size = 120, variant = 'falcon', opacity = 1 }) => {
  const C = {
    coral:   '#F15A3A',
    indigo:  '#3B2B6B',
    emerald: '#1F7A4C',
    red:     '#C8253A',
    black:   '#141414',
    cream:   '#F1ECE3',
  };
  // 4x4 grid, each cell 25x25 in viewBox 100x100
  const QC = ({ x, y, rot, fill }) => (
    // quarter circle filling one cell corner-based
    <path d={`M ${x} ${y} h 25 a 25 25 0 0 1 -25 25 z`} transform={`rotate(${rot} ${x+12.5} ${y+12.5})`} fill={fill}/>
  );
  const Dot = ({ x, y, r = 6, fill }) => <circle cx={x} cy={y} r={r} fill={fill}/>;
  const Dia = ({ x, y, s = 7, fill }) => (
    <rect x={x-s} y={y-s} width={s*2} height={s*2} transform={`rotate(45 ${x} ${y})`} fill={fill}/>
  );

  const variants = {
    // square tessellation — coral petals + black diamonds (from "We protect")
    protect: (
      <g>
        {/* four coral quarter-circles making a plus at center */}
        <QC x={25} y={25} rot={0}   fill={C.coral}/>
        <QC x={50} y={25} rot={90}  fill={C.coral}/>
        <QC x={50} y={50} rot={180} fill={C.coral}/>
        <QC x={25} y={50} rot={270} fill={C.coral}/>
        {/* emerald in outer corners */}
        <QC x={0}  y={0}  rot={0}   fill={C.emerald}/>
        <QC x={75} y={0}  rot={90}  fill={C.emerald}/>
        <QC x={75} y={75} rot={180} fill={C.emerald}/>
        <QC x={0}  y={75} rot={270} fill={C.emerald}/>
        {/* diamonds at key joins */}
        <Dia x={50} y={12.5} fill={C.black}/>
        <Dia x={87.5} y={50} fill={C.black}/>
        <Dia x={50} y={87.5} fill={C.black}/>
        <Dia x={12.5} y={50} fill={C.black}/>
      </g>
    ),
    // asymmetric flourish — coral, indigo, black (from "We progress")
    progress: (
      <g>
        <QC x={10} y={15} rot={0}   fill={C.coral}/>
        <QC x={35} y={15} rot={90}  fill={C.black}/>
        <QC x={60} y={40} rot={180} fill={C.indigo}/>
        <QC x={35} y={65} rot={270} fill={C.coral}/>
        <QC x={10} y={40} rot={0}   fill={C.cream}/>
        <Dia x={70} y={25} s={6} fill={C.coral}/>
        <Dot x={82} y={60} r={5} fill={C.indigo}/>
      </g>
    ),
    // densely packed — "We promote" (coral + red + black + cream)
    promote: (
      <g>
        <QC x={20} y={20} rot={90}  fill={C.red}/>
        <QC x={45} y={20} rot={180} fill={C.black}/>
        <QC x={45} y={45} rot={270} fill={C.coral}/>
        <QC x={20} y={45} rot={0}   fill={C.cream}/>
        <QC x={70} y={35} rot={180} fill={C.red}/>
        <QC x={70} y={60} rot={270} fill={C.coral}/>
        <Dia x={58} y={32} s={5} fill={C.black}/>
        <Dot x={32} y={72} r={6} fill={C.red}/>
        <Dot x={82} y={20} r={5} fill={C.black}/>
      </g>
    ),
    falcon: null, // alias to progress
  };
  const chosen = variants[variant] || variants.progress;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ opacity, display: 'block' }}>
      {chosen}
    </svg>
  );
};

// simple corner ornament strip (cream bg with a row of small motifs)
const MosaicStrip = ({ height = 56, tone = 'coral' }) => {
  const C = { coral: '#F15A3A', indigo: '#3B2B6B', emerald: '#1F7A4C', black: '#141414' };
  const c = C[tone] || C.coral;
  return (
    <svg width="100%" height={height} viewBox="0 0 400 56" preserveAspectRatio="none" style={{ display: 'block' }}>
      {[0,1,2,3,4,5,6,7].map(i => {
        const x = 25 + i * 50;
        return (
          <g key={i}>
            <path d={`M ${x-12} ${16} a 12 12 0 0 1 12 -12 z`} fill={c}/>
            <rect x={x+2} y={22} width={10} height={10} transform={`rotate(45 ${x+7} ${27})`} fill="#141414"/>
            <circle cx={x-5} cy={42} r={5} fill={C.indigo}/>
          </g>
        );
      })}
    </svg>
  );
};

// ─── image with SVG scene / URL / placeholder cascade ─────────
const FeedImage = ({ src, scene, label, tone = 'warm', height = 180, theme, overlay = true }) => {
  const [err, setErr] = React.useState(false);
  // 1. SVG illustration (always works, on-brand)
  if (scene) {
    return (
      <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden' }}>
        <AbuDhabiScene variant={scene} height={height}/>
        {overlay && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.4) 100%)',
          }}/>
        )}
        {label && (
          <div style={{
            position: 'absolute', left: 12, bottom: 10,
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
            fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.95)', fontWeight: 700,
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}>{label}</div>
        )}
      </div>
    );
  }
  // 2. URL image with fallback
  if (err || !src) return <StripePlaceholder label={label} tone={tone} height={height} theme={theme}/>;
  return (
    <div style={{ position: 'relative', width: '100%', height, overflow: 'hidden', background: '#222' }}>
      <img src={src} alt={label || ''} onError={() => setErr(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
      {overlay && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.45) 100%)',
        }}/>
      )}
      {label && (
        <div style={{
          position: 'absolute', left: 12, bottom: 10,
          fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.95)', fontWeight: 600,
        }}>{label}</div>
      )}
    </div>
  );
};

// ─── themed SVG illustrations — stylized Abu Dhabi scenes ─────
// Drawn in DCT palette (coral/indigo/emerald/cream/black), always available
const AbuDhabiScene = ({ variant, height = 200 }) => {
  const C = { coral: '#F15A3A', indigo: '#3B2B6B', emerald: '#1F7A4C', red: '#C8253A',
              black: '#141414', cream: '#F1ECE3', sand: '#E8D5A8', night: '#1a1a3e' };

  const scenes = {
    // Louvre Abu Dhabi — the perforated dome over water
    louvre: (
      <svg viewBox="0 0 400 200" width="100%" height={height} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="louvreSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E8A075"/><stop offset="1" stopColor="#8B4A6B"/>
          </linearGradient>
          <pattern id="louvreDome" patternUnits="userSpaceOnUse" width="10" height="10">
            <rect width="10" height="10" fill="#2a2a35"/>
            <circle cx="5" cy="5" r="1.3" fill={C.sand}/>
          </pattern>
        </defs>
        <rect width="400" height="200" fill="url(#louvreSky)"/>
        {/* sun */}
        <circle cx="310" cy="55" r="28" fill="#F4C99C" opacity="0.7"/>
        {/* dome silhouette */}
        <ellipse cx="200" cy="120" rx="150" ry="38" fill="url(#louvreDome)"/>
        <ellipse cx="200" cy="120" rx="150" ry="38" fill="none" stroke="#141414" strokeWidth="1"/>
        {/* water */}
        <rect y="140" width="400" height="60" fill="#2a4a5a"/>
        {[...Array(7)].map((_,i) => <rect key={i} x={i*60} y={155+i%2*10} width="40" height="1.5" fill="#4a6a7a" opacity="0.6"/>)}
        {/* platform pillars */}
        <rect x="80" y="138" width="4" height="18" fill="#141414"/>
        <rect x="320" y="138" width="4" height="18" fill="#141414"/>
      </svg>
    ),
    // Food festival — tagine, dates, colorful spice market
    foodFestival: (
      <svg viewBox="0 0 400 200" width="100%" height={height} preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="200" fill={C.sand}/>
        {/* striped awning */}
        {[...Array(8)].map((_,i) => <rect key={i} x={i*50} y="0" width="25" height="40" fill={i%2?C.coral:C.cream}/>)}
        <rect y="40" width="400" height="2" fill={C.black}/>
        {/* stall table */}
        <rect y="130" width="400" height="70" fill="#6B3E1F"/>
        <rect y="130" width="400" height="4" fill="#4A2A10"/>
        {/* bowls of spices */}
        <ellipse cx="70" cy="125" rx="32" ry="8" fill={C.red}/>
        <ellipse cx="70" cy="120" rx="30" ry="8" fill={C.coral}/>
        <ellipse cx="150" cy="125" rx="32" ry="8" fill="#C89A3A"/>
        <ellipse cx="150" cy="120" rx="30" ry="8" fill="#E4B84A"/>
        <ellipse cx="230" cy="125" rx="32" ry="8" fill={C.emerald}/>
        <ellipse cx="230" cy="120" rx="30" ry="8" fill="#3A9A6C"/>
        <ellipse cx="310" cy="125" rx="32" ry="8" fill="#4A2A10"/>
        <ellipse cx="310" cy="120" rx="30" ry="8" fill="#6B4A2A"/>
        {/* dangling lanterns */}
        <line x1="50" y1="40" x2="50" y2="60" stroke={C.black} strokeWidth="1"/>
        <rect x="42" y="60" width="16" height="20" rx="3" fill={C.coral} stroke={C.black} strokeWidth="1"/>
        <line x1="200" y1="40" x2="200" y2="52" stroke={C.black} strokeWidth="1"/>
        <rect x="192" y="52" width="16" height="20" rx="3" fill={C.indigo} stroke={C.black} strokeWidth="1"/>
        <line x1="350" y1="40" x2="350" y2="66" stroke={C.black} strokeWidth="1"/>
        <rect x="342" y="66" width="16" height="20" rx="3" fill={C.emerald} stroke={C.black} strokeWidth="1"/>
      </svg>
    ),
    // Ramadan — crescent moon, mosque silhouette, lanterns
    ramadan: (
      <svg viewBox="0 0 400 200" width="100%" height={height} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="ramSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3B2B6B"/><stop offset="1" stopColor="#1a1a3e"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#ramSky)"/>
        {/* stars */}
        {[[40,30],[80,50],[130,25],[360,40],[320,70],[280,20],[200,60]].map(([x,y],i) =>
          <circle key={i} cx={x} cy={y} r="1.5" fill={C.cream}/>
        )}
        {/* crescent moon */}
        <circle cx="310" cy="55" r="26" fill={C.cream}/>
        <circle cx="320" cy="50" r="24" fill="url(#ramSky)"/>
        {/* mosque silhouette */}
        <rect y="130" width="400" height="70" fill={C.black}/>
        <circle cx="200" cy="125" r="32" fill={C.black}/>
        <rect x="168" y="120" width="64" height="20" fill={C.black}/>
        {/* minarets */}
        <rect x="140" y="85" width="6" height="55" fill={C.black}/>
        <circle cx="143" cy="85" r="5" fill={C.black}/>
        <rect x="254" y="85" width="6" height="55" fill={C.black}/>
        <circle cx="257" cy="85" r="5" fill={C.black}/>
        {/* crescent on dome */}
        <path d="M 196 95 a 4 4 0 1 0 0 -6" fill="none" stroke={C.coral} strokeWidth="2"/>
        {/* hanging lanterns */}
        <line x1="60" y1="0" x2="60" y2="70" stroke={C.coral} strokeWidth="1" opacity="0.6"/>
        <path d="M 50 70 L 70 70 L 68 90 L 52 90 Z" fill={C.coral}/>
        <rect x="54" y="90" width="12" height="4" fill={C.coral}/>
        <circle cx="60" cy="80" r="8" fill="#FFD89A" opacity="0.5"/>
        <line x1="350" y1="0" x2="350" y2="90" stroke={C.coral} strokeWidth="1" opacity="0.6"/>
        <path d="M 340 90 L 360 90 L 358 110 L 342 110 Z" fill={C.coral}/>
        <circle cx="350" cy="100" r="8" fill="#FFD89A" opacity="0.5"/>
      </svg>
    ),
    // Corniche — road, palms, city skyline at dusk
    corniche: (
      <svg viewBox="0 0 400 200" width="100%" height={height} preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="cornSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E8A075"/><stop offset="0.6" stopColor="#C8253A"/><stop offset="1" stopColor="#3B2B6B"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#cornSky)"/>
        {/* sun */}
        <circle cx="200" cy="90" r="22" fill="#FFD89A" opacity="0.8"/>
        {/* water */}
        <rect y="100" width="400" height="40" fill="#5A3A5A" opacity="0.7"/>
        {[...Array(10)].map((_,i) => <rect key={i} x={i*42} y={110+i%3*5} width="28" height="1" fill={C.cream} opacity="0.3"/>)}
        {/* skyline buildings */}
        {[[30,60],[70,45],[110,70],[145,40],[185,55],[225,35],[270,50],[315,42],[360,58]].map(([x,h],i) =>
          <g key={i}>
            <rect x={x} y={100-h} width="26" height={h} fill={C.black}/>
            {[...Array(Math.floor(h/10))].map((_,j) =>
              <rect key={j} x={x+4+((j%2)*10)} y={100-h+6+j*8} width="3" height="3" fill="#FFD89A" opacity="0.7"/>
            )}
          </g>
        )}
        {/* road */}
        <rect y="140" width="400" height="60" fill="#2a2a2a"/>
        <rect y="140" width="400" height="2" fill={C.cream} opacity="0.4"/>
        {/* road dashes */}
        {[...Array(8)].map((_,i) => <rect key={i} x={i*55+10} y="168" width="30" height="3" fill={C.cream} opacity="0.7"/>)}
        {/* palms */}
        <rect x="18" y="115" width="4" height="28" fill="#4A2A10"/>
        <path d="M 20 115 C 5 110, 0 100, 8 95 M 20 115 C 35 110, 40 100, 32 95 M 20 115 C 10 108, 5 98, 0 105 M 20 115 C 30 108, 35 98, 40 105" stroke={C.emerald} strokeWidth="2" fill="none"/>
        <rect x="378" y="115" width="4" height="28" fill="#4A2A10"/>
        <path d="M 380 115 C 365 110, 360 100, 368 95 M 380 115 C 395 110, 400 100, 392 95" stroke={C.emerald} strokeWidth="2" fill="none"/>
      </svg>
    ),
  };

  return scenes[variant] || scenes.corniche;
};

Object.assign(window, { THEMES, Icon, StripePlaceholder, FeedImage, AbuDhabiScene, Avatar, PillarChip, PILLAR_META, DCTMosaic, MosaicStrip });
