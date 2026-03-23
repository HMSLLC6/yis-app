import { useParams, useNavigate } from 'react-router-dom';
import { C, font } from '../theme';
import { CONCEPT_MAP, MODULES } from '../data/concepts';

export default function ConceptDetail() {
  const { conceptId } = useParams();
  const navigate = useNavigate();
  const concept = CONCEPT_MAP[conceptId];

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

  return (
    <div style={s.page}>
      <button style={s.back} onClick={() => navigate(`/learn/${concept.module}`)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        {module?.title || 'Back'}
      </button>

      <div className="fade-in">
        {/* Module badge */}
        {module && (
          <div style={{
            ...s.moduleBadge,
            color: module.color,
            background: module.color + '15',
          }}>
            Module {module.number}: {module.title}
          </div>
        )}

        {/* Term */}
        <h1 style={s.term}>{concept.term}</h1>

        {/* Definition */}
        <div style={s.section}>
          <h2 style={s.sectionLabel}>What it means</h2>
          <p style={s.body}>{concept.definition}</p>
        </div>

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
                    onClick={() => navigate(`/concept/${rc.id}`)}
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
  back: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 14,
    color: C.textDim,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 0',
    marginBottom: 16,
  },
  moduleBadge: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.04em',
    padding: '4px 10px',
    borderRadius: 6,
    marginBottom: 12,
  },
  term: {
    fontFamily: font.heading,
    fontSize: 28,
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
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: '16px',
    marginBottom: 14,
  },
  exampleHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
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
    background: C.green + '08',
    border: `1px solid ${C.green}20`,
    borderRadius: 12,
    padding: '16px',
    marginBottom: 24,
  },
  keyHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
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
    gap: 8,
  },
  relatedCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 14px',
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'border-color 0.2s',
  },
  relatedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    flexShrink: 0,
  },
  relatedTerm: {
    fontSize: 13,
    fontWeight: 500,
    color: C.text,
    display: 'block',
  },
  relatedModule: {
    fontSize: 10,
    color: C.muted,
  },
};
