import { useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { C, font } from '../theme';
import { CONCEPTS, CONCEPT_MAP, MODULES } from '../data/concepts';
import ConceptVisual from '../components/ConceptVisuals';

export default function ConceptDetail() {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const concept = CONCEPT_MAP[conceptId];

  // Track where the user came from (passed via navigate state)
  const cameFrom = location.state?.from ? CONCEPT_MAP[location.state.from] : null;
  const cameFromModule = cameFrom ? MODULES.find(m => m.id === cameFrom.module) : null;
  // Only show the "return" banner if they jumped to a different module
  const showReturn = cameFrom && concept && cameFrom.module !== concept.module;
  const fromGlossary = location.state?.fromGlossary;

  // Get all concepts in this module, in order
  const moduleConcepts = useMemo(() => {
    if (!concept) return [];
    return CONCEPTS.filter(c => c.module === concept.module);
  }, [concept]);

  const currentIndex = moduleConcepts.findIndex(c => c.id === conceptId);
  const total = moduleConcepts.length;
  const prev = currentIndex > 0 ? moduleConcepts[currentIndex - 1] : null;
  const next = currentIndex < total - 1 ? moduleConcepts[currentIndex + 1] : null;

  if (!concept) {
    return (
      <div style={s.page}>
        <p style={{ color: C.textDim, textAlign: 'center', paddingTop: 60 }}>
          Concept not found.
        </p>
      </div>
    );
  }

  const module = MODULES.find(m => m.id === concept.module);
  const relatedConcepts = (concept.related || [])
    .map(id => CONCEPT_MAP[id])
    .filter(Boolean);

  // Pass current concept as "from" so the destination knows where we came from
  const goTo = (id) => {
    navigate(`/concept/${id}`, { state: { from: conceptId } });
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    navigate(`/concept/${cameFrom.id}`, { state: location.state?.parentFrom ? { from: location.state.parentFrom } : undefined });
    window.scrollTo(0, 0);
  };

  return (
    <div style={s.page}>
      {/* Top bar: back + progress */}
      <div style={s.topBar}>
        {fromGlossary ? (
          <button style={s.back} onClick={() => navigate('/glossary')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Glossary
          </button>
        ) : (
          <button style={s.back} onClick={() => navigate(`/learn/${concept.module}`)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {module?.title || 'Back'}
          </button>
        )}
        <span style={{ ...s.pageNum, color: module?.color || C.muted }}>
          {currentIndex + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div style={s.progressTrack}>
        <div style={{
          ...s.progressFill,
          width: `${((currentIndex + 1) / total) * 100}%`,
          background: module?.color || C.gold,
        }} />
      </div>

      <div className="fade-in">
        {/* Module badge */}
        {module && (
          <div style={{
            ...s.moduleBadge,
            color: module.color,
            background: module.color + '15',
          }}>
            Module {module.number}
          </div>
        )}

        {/* Term */}
        <h1 style={s.term}>{concept.term}</h1>

        {/* Definition */}
        <div style={s.section}>
          <h2 style={s.sectionLabel}>What it means</h2>
          <p style={s.body}>{concept.definition}</p>
        </div>

        {/* Visual — renders chart/graphic if one exists for this concept */}
        <ConceptVisual conceptId={concept.id} />

        {/* Real-world example */}
        <div style={s.exampleCard}>
          <div style={s.exampleHeader}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span style={s.exampleLabel}>Real-World Example</span>
          </div>
          <p style={s.exampleText}>{concept.example}</p>
        </div>

        {/* Key takeaway */}
        <div style={s.keyCard}>
          <div style={s.keyHeader}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span style={s.keyLabel}>Key Takeaway</span>
          </div>
          <p style={s.keyText}>{concept.keyPoint}</p>
        </div>

        {/* Related concepts */}
        {relatedConcepts.length > 0 && (
          <div style={s.relatedSection}>
            <h2 style={s.sectionLabel}>Connected Concepts</h2>
            <p style={s.connectedHint}>
              Tap to explore how these ideas link together
            </p>
            <div style={s.relatedGrid}>
              {relatedConcepts.map(rc => {
                const rcMod = MODULES.find(m => m.id === rc.module);
                return (
                  <button
                    key={rc.id}
                    style={s.relatedCard}
                    onClick={() => goTo(rc.id)}
                  >
                    <div style={{
                      ...s.relatedDot,
                      background: rcMod?.color || C.blue,
                    }} />
                    <div>
                      <span style={s.relatedTerm}>{rc.term}</span>
                      <span style={s.relatedModule}>
                        {rcMod ? `Module ${rcMod.number}` : ''}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Prev / Next navigation */}
        <div style={s.navRow}>
          {prev ? (
            <button style={s.navBtn} onClick={() => goTo(prev.id)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <div style={s.navBtnText}>
                <span style={s.navBtnLabel}>Previous</span>
                <span style={s.navBtnTitle}>{prev.term}</span>
              </div>
            </button>
          ) : <div />}

          {next ? (
            <button style={{ ...s.navBtn, ...s.navBtnRight }} onClick={() => goTo(next.id)}>
              <div style={{ ...s.navBtnText, textAlign: 'right' }}>
                <span style={s.navBtnLabel}>Next</span>
                <span style={s.navBtnTitle}>{next.term}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ) : (
            <button
              style={{ ...s.navBtn, ...s.navBtnRight, ...s.navBtnDone }}
              onClick={() => navigate(`/learn/${concept.module}`)}
            >
              <div style={{ ...s.navBtnText, textAlign: 'right' }}>
                <span style={{ ...s.navBtnLabel, color: C.green }}>Complete</span>
                <span style={s.navBtnTitle}>Back to module</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Return to origin — shown when you jumped here from another module */}
        {showReturn && (
          <button style={{
            ...s.returnBanner,
            borderColor: cameFromModule?.color + '40',
            background: cameFromModule?.color + '10',
          }} onClick={goBack}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={cameFromModule?.color || C.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="19 12 5 12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span style={{ color: cameFromModule?.color || C.textDim }}>
              Return to {cameFrom.term}
            </span>
            <span style={s.returnModuleTag}>
              Module {cameFromModule?.number}
            </span>
          </button>
        )}
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
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  },
  pageNum: {
    fontSize: 12,
    fontWeight: 600,
    fontFamily: font.mono,
  },
  progressTrack: {
    width: '100%',
    height: 3,
    background: C.border,
    borderRadius: 2,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 0.3s ease',
  },
  returnBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    padding: '10px 14px',
    border: 'none',
    borderLeft: '3px solid',
    borderRadius: 0,
    marginTop: 12,
    marginBottom: 16,
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    background: 'transparent',
    textAlign: 'left',
  },
  returnModuleTag: {
    marginLeft: 'auto',
    fontSize: 10,
    fontWeight: 600,
    color: C.muted,
    whiteSpace: 'nowrap',
  },
  moduleBadge: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.04em',
    padding: '0',
    borderRadius: 0,
    marginBottom: 10,
    background: 'none !important',
  },
  term: {
    fontFamily: font.heading,
    fontSize: 24,
    fontWeight: 700,
    color: C.text,
    lineHeight: 1.2,
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: C.muted,
    marginBottom: 8,
  },
  body: {
    fontSize: 15,
    color: C.text,
    lineHeight: 1.7,
  },
  exampleCard: {
    background: 'transparent',
    borderLeft: `3px solid ${C.gold}60`,
    borderRadius: 0,
    padding: '12px 16px',
    marginBottom: 14,
  },
  exampleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  exampleLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: C.gold,
  },
  exampleText: {
    fontSize: 14,
    color: C.textDim,
    lineHeight: 1.6,
  },
  keyCard: {
    background: 'transparent',
    borderLeft: `3px solid ${C.green}`,
    borderRadius: 0,
    padding: '12px 16px',
    marginBottom: 24,
  },
  keyHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  keyLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: C.green,
  },
  keyText: {
    fontSize: 14,
    color: C.text,
    lineHeight: 1.6,
  },
  relatedSection: {
    marginBottom: 24,
  },
  connectedHint: {
    fontSize: 12,
    color: C.textDim,
    marginBottom: 12,
  },
  relatedGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
  },
  relatedCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '8px 12px',
    background: 'transparent',
    border: `1px solid ${C.border}`,
    borderRadius: 20,
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  relatedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    flexShrink: 0,
  },
  relatedTerm: {
    fontSize: 12,
    fontWeight: 500,
    color: C.textDim,
    display: 'block',
  },
  relatedModule: {
    fontSize: 10,
    color: C.muted,
  },
  // Prev / Next
  navRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    paddingTop: 12,
    borderTop: `1px solid ${C.border}`,
    marginBottom: 16,
  },
  navBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '10px 12px',
    background: 'transparent',
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    cursor: 'pointer',
    flex: '0 1 48%',
    minWidth: 0,
    overflow: 'hidden',
    transition: 'border-color 0.2s',
  },
  navBtnRight: {
    marginLeft: 'auto',
  },
  navBtnDone: {
    borderColor: C.green + '40',
  },
  navBtnText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
    overflow: 'hidden',
  },
  navBtnLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: C.muted,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
  },
  navBtnTitle: {
    fontSize: 11,
    fontWeight: 500,
    color: C.text,
    lineHeight: 1.3,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
};
