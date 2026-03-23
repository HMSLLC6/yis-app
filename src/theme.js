// West Point High School: Navy & Gold
// Clean, professional, Buffett-disciplined aesthetic

export const C = {
  // Backgrounds
  bg: '#0a1628',
  surface: '#0f1d32',
  surfaceAlt: '#142440',
  card: '#162a4a',

  // Borders
  border: '#1e3a5f',
  borderHi: '#2a4f7a',

  // Text
  text: '#e8edf5',
  textDim: '#8896aa',
  muted: '#5a6a80',

  // Brand — West Point Navy & Gold
  navy: '#1a3a6b',
  gold: '#d4a843',
  goldLight: '#e8c96a',
  goldDim: '#a08030',

  // Functional
  green: '#22c55e',
  red: '#ef4444',
  blue: '#3b82f6',
  amber: '#f59e0b',

  // Accent
  accent: '#d4a843',
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
