import { useLocation, useNavigate } from 'react-router-dom';
import { C, font } from '../theme';

const tabs = [
  { path: '/', label: 'Home', icon: 'H' },
  { path: '/news', label: 'News', icon: 'N' },
  { path: '/simulator', label: 'Simulator', icon: 'S' },
  { path: '/game', label: 'Play', icon: 'P' },
  { path: '/glossary', label: 'Search', icon: 'G' },
];

// Simple SVG icons
function TabIcon({ tab, active }) {
  const color = active ? C.gold : C.muted;
  const size = 22;

  switch (tab.icon) {
    case 'H':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case 'N':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
          <line x1="10" y1="6" x2="18" y2="6" />
          <line x1="10" y1="10" x2="18" y2="10" />
          <line x1="10" y1="14" x2="14" y2="14" />
        </svg>
      );
    case 'P':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'S':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case 'G':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      );
    default:
      return null;
  }
}

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav style={s.nav}>
      {tabs.map(tab => {
        const active = isActive(tab.path);
        return (
          <button
            key={tab.path}
            onClick={() => {
              navigate(tab.path);
            }}
            style={{
              ...s.tab,
              color: active ? C.gold : C.muted,
            }}
          >
            <TabIcon tab={tab} active={active} />
            <span style={{
              ...s.label,
              color: active ? C.gold : C.muted,
              fontWeight: active ? 600 : 400,
            }}>
              {tab.label}
            </span>
            {active && <div style={s.indicator} />}
          </button>
        );
      })}
    </nav>
  );
}

const s = {
  nav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    minHeight: 64,
    height: 'auto',
    background: C.surface,
    borderTop: `1px solid ${C.border}`,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 100,
    paddingBottom: 'env(safe-area-inset-bottom, 0)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
  tab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    padding: '8px 10px',
    cursor: 'pointer',
    position: 'relative',
    transition: 'color 0.2s',
    background: 'none',
    border: 'none',
  },
  label: {
    fontSize: 10,
    fontFamily: font.body,
    letterSpacing: '0.02em',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 24,
    height: 2,
    background: C.gold,
    borderRadius: 1,
  },
};
