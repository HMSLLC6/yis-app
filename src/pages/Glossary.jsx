import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, font } from '../theme';
import { CONCEPTS, MODULES } from '../data/concepts';

export default function Glossary() {
  const [search, setSearch] = useState('');
  const [activeModule, setActiveModule] = useState(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let list = [...CONCEPTS];

    if (activeModule) {
      list = list.filter(c => c.module === activeModule);
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      list = list.filter(c =>
        c.term.toLowerCase().includes(q) ||
        c.definition.toLowerCase().includes(q) ||
        c.keyPoint.toLowerCase().includes(q)
      );
    }

    // Sort alphabetically by term
    list.sort((a, b) => a.term.localeCompare(b.term));
    return list;
  }, [search, activeModule]);

  // Group by first letter
  const grouped = useMemo(() => {
    const groups = {};
    filtered.forEach(c => {
      const letter = c.term[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(c);
    });
    return groups;
  }, [filtered]);

  return (
    <div style={s.page}>
      <div className="fade-in">
        <h1 style={s.title}>Glossary</h1>
        <p style={s.subtitle}>
          {CONCEPTS.length} investment terms, all in plain English
        </p>
      </div>

      {/* Search */}
      <div style={s.searchBox}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terms..."
          style={s.searchInput}
        />
        {search && (
          <button style={s.clearBtn} onClick={() => setSearch('')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {/* Module filter */}
      <div style={s.filters}>
        <button
          style={{
            ...s.filterChip,
            background: !activeModule ? C.gold + '20' : 'transparent',
            color: !activeModule ? C.gold : C.muted,
            borderColor: !activeModule ? C.gold + '40' : C.border,
          }}
          onClick={() => setActiveModule(null)}
        >
          All
        </button>
        {MODULES.map(m => (
          <button
            key={m.id}
            style={{
              ...s.filterChip,
              background: activeModule === m.id ? m.color + '20' : 'transparent',
              color: activeModule === m.id ? m.color : C.muted,
              borderColor: activeModule === m.id ? m.color + '40' : C.border,
            }}
            onClick={() => setActiveModule(activeModule === m.id ? null : m.id)}
          >
            {m.number}. {m.title}
          </button>
        ))}
      </div>

      {/* Results */}
      <div style={s.count}>
        {filtered.length} term{filtered.length !== 1 ? 's' : ''}
      </div>

      {Object.keys(grouped).sort().map(letter => (
        <div key={letter} style={s.letterGroup}>
          <div style={s.letterHeader}>{letter}</div>
          {grouped[letter].map(concept => {
            const mod = MODULES.find(m => m.id === concept.module);
            return (
              <button
                key={concept.id}
                style={s.glossaryItem}
                onClick={() => navigate(`/concept/${concept.id}`)}
              >
                <div style={s.itemLeft}>
                  <h3 style={s.itemTerm}>{concept.term}</h3>
                  <p style={s.itemDef}>
                    {concept.definition.length > 100
                      ? concept.definition.slice(0, 100) + '...'
                      : concept.definition}
                  </p>
                </div>
                <div style={{
                  ...s.moduleDot,
                  background: mod?.color || C.blue,
                }} title={mod?.title}>
                  {mod?.number}
                </div>
              </button>
            );
          })}
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={s.empty}>
          <p style={s.emptyText}>No terms match "{search}"</p>
          <button style={s.clearSearch} onClick={() => { setSearch(''); setActiveModule(null); }}>
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}

const s = {
  page: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '20px 16px',
  },
  title: {
    fontFamily: font.heading,
    fontSize: 28,
    fontWeight: 700,
    color: C.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: C.textDim,
    marginBottom: 18,
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    padding: '10px 14px',
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    background: 'transparent',
    color: C.text,
    fontSize: 15,
    border: 'none',
    outline: 'none',
  },
  clearBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 4,
    display: 'flex',
    alignItems: 'center',
  },
  filters: {
    display: 'flex',
    gap: 6,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  filterChip: {
    padding: '5px 10px',
    fontSize: 11,
    fontWeight: 500,
    borderRadius: 6,
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
  count: {
    fontSize: 12,
    color: C.muted,
    marginBottom: 12,
  },
  letterGroup: {
    marginBottom: 16,
  },
  letterHeader: {
    fontSize: 13,
    fontWeight: 700,
    color: C.gold,
    fontFamily: font.heading,
    padding: '4px 0',
    borderBottom: `1px solid ${C.border}`,
    marginBottom: 6,
  },
  glossaryItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    textAlign: 'left',
    padding: '12px 0',
    borderBottom: `1px solid ${C.border}20`,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: C.border + '30',
  },
  itemLeft: {
    flex: 1,
  },
  itemTerm: {
    fontSize: 14,
    fontWeight: 600,
    color: C.text,
    marginBottom: 3,
  },
  itemDef: {
    fontSize: 12,
    color: C.textDim,
    lineHeight: 1.4,
  },
  moduleDot: {
    width: 24,
    height: 24,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 700,
    color: '#fff',
    flexShrink: 0,
  },
  empty: {
    textAlign: 'center',
    padding: '40px 0',
  },
  emptyText: {
    fontSize: 14,
    color: C.textDim,
    marginBottom: 12,
  },
  clearSearch: {
    fontSize: 13,
    color: C.gold,
    background: 'none',
    border: `1px solid ${C.gold}40`,
    borderRadius: 8,
    padding: '8px 16px',
    cursor: 'pointer',
  },
};
