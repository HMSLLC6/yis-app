import { useParams, useNavigate } from 'react-router-dom';
import { C, font } from '../theme';
import { MODULES, CONCEPTS } from '../data/concepts';
import useProgress from '../hooks/useProgress';

export default function Learn() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { readConcepts, getModuleProgress } = useProgress();

  // If a module is selected, show its concepts
  const activeModule = MODULES.find(m => m.id === moduleId);
  const moduleConcepts = activeModule
    ? CONCEPTS.filter(c => c.module === activeModule.id)
    : [];

  if (activeModule) {
    return (
      <div style={s.page}>
        <button style={s.back} onClick={() => navigate('/learn')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          All Modules
        </button>

        <div style={s.moduleHeader}>
          <div style={{
            ...s.moduleNum,
            background: activeModule.color + '20',
            color: activeModule.color,
          }}>
            {activeModule.number}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={s.moduleTitle}>{activeModule.title}</h1>
            <p style={s.moduleSub}>{activeModule.subtitle}</p>
          </div>
        </div>

        {/* Module progress */}
        {(() => {
          const mp = getModuleProgress(activeModule.id);
          return (
            <div style={s.moduleProgressWrap}>
              <div style={s.moduleProgressBar}>
                <div style={{
                  height: '100%',
                  borderRadius: 2,
                  width: `${mp.percent}%`,
                  background: activeModule.color,
                  transition: 'width 0.3s ease',
                }} />
              </div>
              <span style={s.moduleProgressText}>
                {mp.read} of {mp.total} read
              </span>
            </div>
          );
        })()}

        <div style={s.conceptList}>
          {moduleConcepts.map((concept, i) => (
            <button
              key={concept.id}
              style={{
                ...s.conceptCard,
                animationDelay: `${i * 0.06}s`,
                borderLeftColor: activeModule.color,
              }}
              className="slide-up"
              onClick={() => navigate(`/concept/${concept.id}`)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <h3 style={{ ...s.conceptTerm, marginBottom: 0 }}>{concept.term}</h3>
                {readConcepts.includes(concept.id) && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <p style={s.conceptDef}>
                {concept.definition.length > 120
                  ? concept.definition.slice(0, 120) + '...'
                  : concept.definition}
              </p>
              <div style={s.conceptFooter}>
                <span style={s.keyPoint}>{concept.keyPoint.length > 60 ? concept.keyPoint.slice(0, 60) + '...' : concept.keyPoint}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Default: show all modules
  return (
    <div style={s.page}>
      <div style={s.header} className="fade-in">
        <h1 style={s.title}>Learn</h1>
        <p style={s.subtitle}>
          5 modules that take you from "what is a stock?" to understanding what moves the entire market.
        </p>
      </div>

      <div style={s.moduleGrid}>
        {MODULES.map((mod, i) => {
          const mp = getModuleProgress(mod.id);
          return (
            <button
              key={mod.id}
              style={{
                ...s.moduleCardLg,
                animationDelay: `${i * 0.08}s`,
              }}
              className="slide-up"
              onClick={() => navigate(`/learn/${mod.id}`)}
            >
              <div style={{
                ...s.moduleNumLg,
                background: mod.color + '15',
                color: mod.color,
                borderColor: mod.color + '30',
              }}>
                {mod.number}
              </div>
              <h2 style={s.modCardTitle}>{mod.title}</h2>
              <p style={s.modCardSub}>{mod.subtitle}</p>
              <div style={s.modCardProgressBar}>
                <div style={{
                  height: '100%',
                  borderRadius: 2,
                  width: `${mp.percent}%`,
                  background: mod.color,
                  transition: 'width 0.3s ease',
                }} />
              </div>
              <div style={s.modCardFooter}>
                <span style={{ color: mod.color, fontSize: 12, fontWeight: 500 }}>
                  {mp.read} of {mp.total} read
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={mod.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      {/* Learning tip */}
      <div style={s.tipCard} className="slide-up">
        <div style={s.tipHeader}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          <span style={s.tipLabel}>How to use this</span>
        </div>
        <p style={s.tipText}>
          Start with Module 1 and work your way through. Each concept builds on the ones before it.
          Tap any concept to see its full explanation, a real-world example, and how it connects to other ideas.
        </p>
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontFamily: font.heading,
    fontSize: 28,
    fontWeight: 700,
    color: C.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: C.textDim,
    lineHeight: 1.5,
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 14,
    color: C.textDim,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 4px',
    minHeight: 44,
    marginBottom: 16,
  },
  moduleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  moduleNum: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: font.mono,
    fontSize: 20,
    fontWeight: 700,
    flexShrink: 0,
  },
  moduleTitle: {
    fontFamily: font.heading,
    fontSize: 19,
    fontWeight: 700,
    color: C.text,
    marginBottom: 2,
  },
  moduleSub: {
    fontSize: 13,
    color: C.textDim,
  },
  conceptList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  conceptCard: {
    display: 'block',
    textAlign: 'left',
    width: '100%',
    padding: '16px',
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderLeft: '3px solid',
    borderRadius: 12,
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  conceptTerm: {
    fontSize: 15,
    fontWeight: 600,
    color: C.text,
    marginBottom: 6,
  },
  conceptDef: {
    fontSize: 13,
    color: C.textDim,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  conceptFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  keyPoint: {
    fontSize: 11,
    color: C.gold,
    fontWeight: 500,
  },
  moduleGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24,
  },
  moduleCardLg: {
    display: 'block',
    textAlign: 'left',
    width: '100%',
    padding: '20px 18px',
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  moduleNumLg: {
    width: 44,
    height: 44,
    borderRadius: 11,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: font.mono,
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 12,
    border: '1px solid',
  },
  modCardTitle: {
    fontFamily: font.heading,
    fontSize: 18,
    fontWeight: 600,
    color: C.text,
    marginBottom: 4,
  },
  modCardSub: {
    fontSize: 13,
    color: C.textDim,
    lineHeight: 1.4,
    marginBottom: 12,
  },
  modCardProgressBar: {
    width: '100%',
    height: 3,
    background: C.border,
    borderRadius: 2,
    marginBottom: 10,
    overflow: 'hidden',
  },
  modCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleProgressWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  moduleProgressBar: {
    flex: 1,
    height: 3,
    background: C.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  moduleProgressText: {
    fontSize: 12,
    fontWeight: 500,
    color: C.textDim,
    whiteSpace: 'nowrap',
  },
  tipCard: {
    background: C.gold + '08',
    border: `1px solid ${C.gold}20`,
    borderRadius: 12,
    padding: '16px',
  },
  tipHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tipLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: C.gold,
  },
  tipText: {
    fontSize: 13,
    color: C.textDim,
    lineHeight: 1.6,
  },
};
