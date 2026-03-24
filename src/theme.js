// West Point High School: Royal Blue & Orange
// Clean, professional, Buffett-disciplined aesthetic

export const C = {
  // Backgrounds — deep blue-black with subtle school blue undertone
  bg: '#080e1e',
  surface: '#0d1529',
  surfaceAlt: '#121c34',
  card: '#162240',

  // Borders
  border: '#1c2d52',
  borderHi: '#263d6a',

  // Text — white throughout for readability on dark bg
  text: '#ffffff',
  textDim: '#dce1ea',
  muted: '#8896aa',

  // Brand — West Point Royal Blue & Orange
  navy: '#1b2a7d',
  gold: '#e8762a',       // school orange as primary accent
  goldLight: '#f09040',
  goldDim: '#c05e18',

  // Functional
  green: '#22c55e',
  red: '#ef4444',
  blue: '#3b6fe8',       // shifted toward school blue
  amber: '#f59e0b',

  // Accent
  accent: '#e8762a',
};

export const font = {
  heading: "'Georgia', 'Times New Roman', serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', monospace",
};

export const fmt = {
  currency: (n, decimals = 2) => {
    if (n == null || isNaN(n)) return '—';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n);
  },
  pct: (n) => {
    if (n == null || isNaN(n)) return '—';
    return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
  },
  number: (n, decimals = 0) => {
    if (n == null || isNaN(n)) return '—';
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n);
  },
  shortDate: (d) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },
};
