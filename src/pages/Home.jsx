import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, font } from '../theme';
import { BUFFETT_QUOTES } from '../data/sp500';
import { MODULES } from '../data/concepts';

export default function Home() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState(null);

  useEffect(() => {
    // Pick a random quote on mount
    const idx = Math.floor(Math.random() * BUFFETT_QUOTES.length);
    setQuote(BUFFETT_QUOTES[idx]);
  }, []);

  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={s.hero} className="fade-in">
        <div style={s.badge}>WEST POINT HIGH SCHOOL</div>
        <h1 style={s.title}>Young Investors Society</h1>
        <p style={s.subtitle}>
          Learn the language of investing. Build the habits that create wealth.
        </p>
      </div>

      {/* Buffett Quote */}
      {quote && (
        <div style={s.quoteCard} className="slide-up">
          <div style={s.quoteMarks}>"</div>
          <p style={s.quoteText}>{quote.quote}</p>
          <p style={s.quoteSource}>— {quote.source}</p>
        </div>
      )}

      {/* Quick Actions */}
      <div style={s.actions}>
        <button
          style={s.primaryBtn}
          onClick={() => navigate('/simulator')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          Investment Simulator
        </button>
        <button
          style={s.secondaryBtn}
          onClick={() => navigate('/learn')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
          </svg>
          Start Learning
        </button>
      </div>

      {/* Module Preview */}
      <div style={s.sectionHeader}>
        <h2 style={s.sectionTitle}>Your Learning Path</h2>
        <p style={s.sectionSub}>5 modules from foundations to the big picture</p>
      </div>

      <div style={s.moduleList}>
        {MODULES.map((mod, i) => (
          <button
            key={mod.id}
            style={{
              ...s.moduleCard,
              animationDelay: `${i * 0.08}s`,
            }}
            className="slide-up"
            onClick={() => navigate(`/learn/${mod.id}`)}
          >
            <div style={{
              ...s.moduleNum,
              background: mod.color + '20',
              color: mod.color,
            }}>
              {mod.number}
            </div>
            <div style={s.moduleInfo}>
              <h3 style={s.moduleTitle}>{mod.title}</h3>
              <p style={s.moduleSub}>{mod.subtitle}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>

      {/* Buffett Philosophy */}
      <div style={s.philosophy}>
        <h2 style={s.sectionTitle}>The Buffett Approach</h2>
        <div style={s.principleGrid}>
          {[
            { title: 'Start Early', desc: 'Time is your greatest asset. Compound interest turns small amounts into fortunes.' },
            { title: 'Keep It Simple', desc: 'Index funds beat most professional investors. Don\'t overcomplicate it.' },
            { title: 'Think Long-Term', desc: 'The market rewards patience. Ignore the daily noise.' },
            { title: 'Never Stop Learning', desc: 'Buffett reads 500 pages a day. Knowledge compounds too.' },
          ].map((p, i) => (
            <div key={i} style={s.principleCard} className="slide-up">
              <h3 style={s.principleTitle}>{p.title}</h3>
              <p style={s.principleDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '20px 16px',
  },
  hero: {
    textAlign: 'center',
    padding: '32px 0 24px',
  },
  badge: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.12em',
    color: C.gold,
    background: C.gold + '15',
    padding: '5px 14px',
    borderRadius: 20,
    marginBottom: 16,
    fontFamily: font.body,
  },
  title: {
    fontFamily: font.heading,
    fontSize: 28,
    fontWeight: 700,
    color: C.text,
    lineHeight: 1.15,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: C.textDim,
    lineHeight: 1.5,
    maxWidth: 340,
    margin: '0 auto',
  },
  quoteCard: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: '24px 20px',
    marginBottom: 24,
    position: 'relative',
  },
  quoteMarks: {
    fontFamily: font.heading,
    fontSize: 48,
    color: C.gold + '40',
    lineHeight: 1,
    marginBottom: -8,
  },
  quoteText: {
    fontFamily: font.heading,
    fontSize: 16,
    fontStyle: 'italic',
    color: C.text,
    lineHeight: 1.6,
    marginBottom: 8,
  },
  quoteSource: {
    fontSize: 13,
    color: C.gold,
    fontWeight: 500,
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginBottom: 32,
  },
  primaryBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '14px 16px',
    background: C.gold,
    color: '#0a1628',
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 12,
    cursor: 'pointer',
    border: 'none',
    transition: 'transform 0.15s, opacity 0.15s',
  },
  secondaryBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '14px 16px',
    background: 'transparent',
    color: C.gold,
    fontWeight: 600,
    fontSize: 14,
    borderRadius: 12,
    cursor: 'pointer',
    border: `1px solid ${C.gold}40`,
    transition: 'transform 0.15s, opacity 0.15s',
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: font.heading,
    fontSize: 20,
    fontWeight: 600,
    color: C.text,
    marginBottom: 4,
  },
  sectionSub: {
    fontSize: 13,
    color: C.textDim,
  },
  moduleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginBottom: 32,
  },
  moduleCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 16px',
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'border-color 0.2s',
    width: '100%',
  },
  moduleNum: {
    width: 40,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: font.mono,
    fontSize: 16,
    fontWeight: 700,
    flexShrink: 0,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: C.text,
    marginBottom: 2,
  },
  moduleSub: {
    fontSize: 12,
    color: C.textDim,
    lineHeight: 1.4,
  },
  philosophy: {
    marginBottom: 24,
  },
  principleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
    gap: 10,
    marginTop: 16,
  },
  principleCard: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: '16px 14px',
  },
  principleTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: C.gold,
    marginBottom: 6,
  },
  principleDesc: {
    fontSize: 12,
    color: C.textDim,
    lineHeight: 1.5,
  },
};
