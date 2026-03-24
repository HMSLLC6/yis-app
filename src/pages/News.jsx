import { useState, useEffect } from 'react';
import { C, font } from '../theme';

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        if (!cancelled) setArticles(data.articles || []);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={s.page}>
      <div className="fade-in">
        <h1 style={s.title}>Market News</h1>
        <p style={s.subtitle}>
          Latest financial headlines from free sources
        </p>
      </div>

      {loading && (
        <div style={s.loadingWrap}>
          <div style={s.spinner} />
          <span style={s.loadingText}>Loading headlines...</span>
        </div>
      )}

      {error && (
        <div style={s.errorCard}>
          <p style={s.errorText}>Couldn't load news right now. Pull down to try again.</p>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div style={s.emptyCard}>
          <p style={s.emptyText}>No articles available right now.</p>
        </div>
      )}

      <div style={s.grid}>
        {articles.map((article, i) => (
          <a
            key={i}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={s.card}
            className="slide-up"
          >
            {article.image ? (
              <div style={s.imageWrap}>
                <img
                  src={article.image}
                  alt=""
                  style={s.image}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            ) : (
              <div style={s.imagePlaceholder}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
            )}
            <div style={s.cardBody}>
              <h3 style={s.cardTitle}>{article.title}</h3>
              <div style={s.cardMeta}>
                <span style={s.source}>{article.source}</span>
                {article.date && (
                  <span style={s.date}>
                    {timeAgo(article.date)}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function timeAgo(dateStr) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
    marginBottom: 20,
  },
  loadingWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    padding: '60px 0',
  },
  spinner: {
    width: 28,
    height: 28,
    border: `3px solid ${C.border}`,
    borderTop: `3px solid ${C.gold}`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    fontSize: 13,
    color: C.muted,
  },
  errorCard: {
    padding: '40px 20px',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: C.textDim,
  },
  emptyCard: {
    padding: '40px 20px',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: C.textDim,
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  card: {
    display: 'flex',
    gap: 12,
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    overflow: 'hidden',
    textDecoration: 'none',
    transition: 'border-color 0.2s',
  },
  imageWrap: {
    width: 110,
    minHeight: 80,
    flexShrink: 0,
    overflow: 'hidden',
    background: C.surfaceAlt,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  imagePlaceholder: {
    width: 110,
    minHeight: 80,
    flexShrink: 0,
    background: C.surfaceAlt,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
    padding: '10px 12px 10px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: 0,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: C.text,
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    marginBottom: 6,
  },
  cardMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 11,
    fontWeight: 600,
    color: C.gold,
  },
  date: {
    fontSize: 10,
    color: C.muted,
  },
};
