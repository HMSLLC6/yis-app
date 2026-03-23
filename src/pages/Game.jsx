import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { C, font } from '../theme';
import { shuffleQuestions } from '../data/questions';
import { CONCEPT_MAP, MODULES } from '../data/concepts';

const ROUND_SIZE = 10;

export default function Game() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('start'); // start | playing | result | gameover
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [picked, setPicked] = useState(null); // 'bull' | 'bear' | null
  const [timeLeft, setTimeLeft] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('yis_bull_bear_high') || '0'); } catch { return 0; }
  });

  const current = questions[qIndex];

  const startGame = useCallback(() => {
    const shuffled = shuffleQuestions().slice(0, ROUND_SIZE);
    setQuestions(shuffled);
    setQIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setPicked(null);
    setTimeLeft(15);
    setPhase('playing');
  }, []);

  // Countdown timer
  useEffect(() => {
    if (phase !== 'playing' || picked) return;
    if (timeLeft <= 0) {
      // Time's up — count as wrong
      setPicked('timeout');
      setStreak(0);
      setTimeout(() => {
        setPhase('result');
      }, 300);
      return;
    }
    const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, timeLeft, picked]);

  const handlePick = (choice) => {
    if (picked || phase !== 'playing') return;
    setPicked(choice);

    const correct = choice === current.answer;
    if (correct) {
      const newStreak = streak + 1;
      // Bonus points for streaks
      const points = newStreak >= 5 ? 3 : newStreak >= 3 ? 2 : 1;
      setScore(prev => prev + points);
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreak(0);
    }

    // Show result after brief pause
    setTimeout(() => {
      setPhase('result');
    }, 400);
  };

  const nextQuestion = () => {
    if (qIndex + 1 >= questions.length) {
      // Game over
      const finalScore = score;
      if (finalScore > highScore) {
        setHighScore(finalScore);
        try { localStorage.setItem('yis_bull_bear_high', finalScore.toString()); } catch {}
      }
      setPhase('gameover');
    } else {
      setQIndex(prev => prev + 1);
      setPicked(null);
      setTimeLeft(15);
      setPhase('playing');
    }
  };

  const concept = current ? CONCEPT_MAP[current.conceptId] : null;
  const conceptModule = concept ? MODULES.find(m => m.id === concept.module) : null;
  const isCorrect = picked === current?.answer;

  // ============ START SCREEN ============
  if (phase === 'start') {
    return (
      <div style={s.page}>
        <div style={s.startScreen} className="fade-in">
          <div style={s.gameIcon}>
            <span style={s.bull}>Bull</span>
            <span style={s.or}>or</span>
            <span style={s.bear}>Bear</span>
          </div>
          <p style={s.startDesc}>
            A headline flashes. You decide: does the market go up or down?
          </p>
          <div style={s.rulesCard}>
            <div style={s.rule}>
              <span style={s.ruleIcon}>+1</span>
              <span style={s.ruleText}>point per correct answer</span>
            </div>
            <div style={s.rule}>
              <span style={{ ...s.ruleIcon, color: C.gold }}>+2</span>
              <span style={s.ruleText}>points at 3 streak</span>
            </div>
            <div style={s.rule}>
              <span style={{ ...s.ruleIcon, color: '#e8762a' }}>+3</span>
              <span style={s.ruleText}>points at 5+ streak</span>
            </div>
            <div style={s.rule}>
              <span style={s.ruleIcon}>15s</span>
              <span style={s.ruleText}>to answer each question</span>
            </div>
          </div>
          {highScore > 0 && (
            <p style={s.highScoreStart}>Your best: {highScore} pts</p>
          )}
          <button style={s.startBtn} onClick={startGame}>
            Start Round ({ROUND_SIZE} questions)
          </button>
        </div>
      </div>
    );
  }

  // ============ GAME OVER ============
  if (phase === 'gameover') {
    const pct = Math.round((score / (ROUND_SIZE * 3)) * 100);
    return (
      <div style={s.page}>
        <div style={s.startScreen} className="fade-in">
          <h2 style={s.gameOverTitle}>Round Complete</h2>
          <div style={s.scoreBig}>{score}</div>
          <p style={s.scoreLabel}>points</p>

          <div style={s.gameOverStats}>
            <div style={s.goStat}>
              <span style={s.goStatVal}>{bestStreak}</span>
              <span style={s.goStatLabel}>Best Streak</span>
            </div>
            <div style={s.goStat}>
              <span style={s.goStatVal}>{highScore}</span>
              <span style={s.goStatLabel}>All-Time Best</span>
            </div>
          </div>

          <p style={s.encouragement}>
            {pct >= 80 ? 'Excellent — you think like an investor.'
              : pct >= 50 ? 'Solid instincts. Keep learning and your reads will sharpen.'
              : 'Markets are tricky. Review the concepts and try again.'}
          </p>

          <button style={s.startBtn} onClick={startGame}>
            Play Again
          </button>
          <button style={s.learnBtn} onClick={() => navigate('/learn')}>
            Review Concepts
          </button>
        </div>
      </div>
    );
  }

  // ============ PLAYING / RESULT ============
  return (
    <div style={s.page}>
      {/* Header: score + streak + progress */}
      <div style={s.header}>
        <div style={s.scorePill}>
          <span style={s.scoreNum}>{score}</span>
          <span style={s.scorePts}>pts</span>
        </div>
        {streak >= 2 && (
          <div style={s.streakPill}>
            {streak} streak{streak >= 5 ? ' (3x)' : streak >= 3 ? ' (2x)' : ''}
          </div>
        )}
        <span style={s.progress}>{qIndex + 1} / {ROUND_SIZE}</span>
      </div>

      {/* Timer bar */}
      <div style={s.timerTrack}>
        <div style={{
          ...s.timerFill,
          width: `${(timeLeft / 15) * 100}%`,
          background: timeLeft <= 5 ? C.red : timeLeft <= 10 ? C.gold : C.green,
        }} />
      </div>

      {/* Question card */}
      <div style={s.questionCard} className="slide-up" key={qIndex}>
        <p style={s.headline}>{current?.headline}</p>
      </div>

      {/* Bull / Bear buttons */}
      {phase === 'playing' && (
        <div style={s.choiceRow}>
          <button
            style={{
              ...s.choiceBtn,
              ...s.bullBtn,
              opacity: picked && picked !== 'bull' ? 0.4 : 1,
              transform: picked === 'bull' ? 'scale(1.05)' : 'scale(1)',
            }}
            onClick={() => handlePick('bull')}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
            <span style={s.choiceLabel}>Bull</span>
            <span style={s.choiceSub}>Market goes up</span>
          </button>
          <button
            style={{
              ...s.choiceBtn,
              ...s.bearBtn,
              opacity: picked && picked !== 'bear' ? 0.4 : 1,
              transform: picked === 'bear' ? 'scale(1.05)' : 'scale(1)',
            }}
            onClick={() => handlePick('bear')}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <span style={s.choiceLabel}>Bear</span>
            <span style={s.choiceSub}>Market goes down</span>
          </button>
        </div>
      )}

      {/* Result */}
      {phase === 'result' && (
        <div className="slide-up">
          {/* Correct / Incorrect banner */}
          <div style={{
            ...s.resultBanner,
            background: picked === 'timeout' ? C.red + '15' : isCorrect ? C.green + '15' : C.red + '15',
            borderColor: picked === 'timeout' ? C.red + '30' : isCorrect ? C.green + '30' : C.red + '30',
          }}>
            <span style={{
              ...s.resultLabel,
              color: picked === 'timeout' ? C.red : isCorrect ? C.green : C.red,
            }}>
              {picked === 'timeout' ? "Time's up!" : isCorrect ? 'Correct!' : 'Not quite.'}
            </span>
            <span style={s.resultAnswer}>
              Answer: {current?.answer === 'bull' ? 'Bull (up)' : 'Bear (down)'}
            </span>
          </div>

          {/* Explanation */}
          <div style={s.explanationCard}>
            <p style={s.explanationText}>{current?.explanation}</p>
          </div>

          {/* Link to concept */}
          {concept && (
            <button
              style={s.conceptLink}
              onClick={() => navigate(`/concept/${concept.id}`)}
            >
              <div style={{
                ...s.conceptDot,
                background: conceptModule?.color || C.blue,
              }} />
              <div style={s.conceptInfo}>
                <span style={s.conceptName}>{concept.term}</span>
                <span style={s.conceptMod}>Module {conceptModule?.number}: {conceptModule?.title}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Next button */}
          <button style={s.nextBtn} onClick={nextQuestion}>
            {qIndex + 1 >= ROUND_SIZE ? 'See Results' : 'Next Question'}
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
  // === START SCREEN ===
  startScreen: {
    textAlign: 'center',
    paddingTop: 40,
  },
  gameIcon: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
  },
  bull: {
    fontFamily: font.heading,
    fontSize: 36,
    fontWeight: 700,
    color: C.green,
  },
  or: {
    fontFamily: font.heading,
    fontSize: 20,
    fontStyle: 'italic',
    color: C.muted,
  },
  bear: {
    fontFamily: font.heading,
    fontSize: 36,
    fontWeight: 700,
    color: C.red,
  },
  startDesc: {
    fontSize: 15,
    color: C.textDim,
    lineHeight: 1.5,
    maxWidth: 320,
    margin: '0 auto 24px',
  },
  rulesCard: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: '16px 20px',
    marginBottom: 20,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  rule: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  ruleIcon: {
    fontFamily: font.mono,
    fontSize: 14,
    fontWeight: 700,
    color: C.green,
    width: 32,
    textAlign: 'center',
    flexShrink: 0,
  },
  ruleText: {
    fontSize: 13,
    color: C.textDim,
  },
  highScoreStart: {
    fontSize: 13,
    color: C.muted,
    marginBottom: 16,
  },
  startBtn: {
    width: '100%',
    padding: '14px',
    background: C.gold,
    color: '#080e1e',
    fontWeight: 600,
    fontSize: 15,
    borderRadius: 10,
    cursor: 'pointer',
    border: 'none',
    marginBottom: 10,
  },
  learnBtn: {
    width: '100%',
    padding: '12px',
    background: 'transparent',
    color: C.textDim,
    fontWeight: 500,
    fontSize: 14,
    borderRadius: 10,
    cursor: 'pointer',
    border: `1px solid ${C.border}`,
  },
  // === PLAYING ===
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  scorePill: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 3,
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: '5px 10px',
  },
  scoreNum: {
    fontFamily: font.mono,
    fontSize: 16,
    fontWeight: 700,
    color: C.text,
  },
  scorePts: {
    fontSize: 10,
    color: C.muted,
  },
  streakPill: {
    fontSize: 11,
    fontWeight: 600,
    color: C.gold,
    background: C.gold + '15',
    padding: '4px 10px',
    borderRadius: 6,
  },
  progress: {
    marginLeft: 'auto',
    fontSize: 12,
    fontFamily: font.mono,
    color: C.muted,
  },
  timerTrack: {
    width: '100%',
    height: 4,
    background: C.border,
    borderRadius: 2,
    marginBottom: 20,
    overflow: 'hidden',
  },
  timerFill: {
    height: '100%',
    borderRadius: 2,
    transition: 'width 1s linear, background 0.3s',
  },
  questionCard: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: '28px 22px',
    marginBottom: 20,
    minHeight: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    fontFamily: font.heading,
    fontSize: 18,
    fontWeight: 600,
    color: C.text,
    lineHeight: 1.5,
    textAlign: 'center',
  },
  choiceRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },
  choiceBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    padding: '24px 16px',
    borderRadius: 14,
    border: '2px solid',
    cursor: 'pointer',
    transition: 'transform 0.15s, opacity 0.15s',
  },
  bullBtn: {
    background: C.green + '10',
    borderColor: C.green + '40',
    color: C.green,
  },
  bearBtn: {
    background: C.red + '10',
    borderColor: C.red + '40',
    color: C.red,
  },
  choiceLabel: {
    fontSize: 18,
    fontWeight: 700,
    fontFamily: font.heading,
  },
  choiceSub: {
    fontSize: 11,
    opacity: 0.7,
  },
  // === RESULT ===
  resultBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: 10,
    border: '1px solid',
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: 700,
    fontFamily: font.heading,
  },
  resultAnswer: {
    fontSize: 12,
    color: C.textDim,
    fontWeight: 500,
  },
  explanationCard: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: '14px 16px',
    marginBottom: 12,
  },
  explanationText: {
    fontSize: 14,
    color: C.textDim,
    lineHeight: 1.6,
  },
  conceptLink: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    padding: '12px 14px',
    background: C.surfaceAlt,
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    cursor: 'pointer',
    marginBottom: 14,
    textAlign: 'left',
  },
  conceptDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    flexShrink: 0,
  },
  conceptInfo: {
    flex: 1,
  },
  conceptName: {
    fontSize: 13,
    fontWeight: 600,
    color: C.text,
    display: 'block',
  },
  conceptMod: {
    fontSize: 10,
    color: C.muted,
  },
  nextBtn: {
    width: '100%',
    padding: '14px',
    background: C.gold,
    color: '#080e1e',
    fontWeight: 600,
    fontSize: 15,
    borderRadius: 10,
    cursor: 'pointer',
    border: 'none',
  },
  // === GAME OVER ===
  gameOverTitle: {
    fontFamily: font.heading,
    fontSize: 24,
    fontWeight: 600,
    color: C.text,
    marginBottom: 12,
  },
  scoreBig: {
    fontFamily: font.mono,
    fontSize: 56,
    fontWeight: 700,
    color: C.gold,
    lineHeight: 1,
  },
  scoreLabel: {
    fontSize: 14,
    color: C.textDim,
    marginBottom: 20,
  },
  gameOverStats: {
    display: 'flex',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },
  goStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  goStatVal: {
    fontFamily: font.mono,
    fontSize: 22,
    fontWeight: 700,
    color: C.text,
  },
  goStatLabel: {
    fontSize: 11,
    color: C.muted,
  },
  encouragement: {
    fontSize: 14,
    color: C.textDim,
    lineHeight: 1.5,
    marginBottom: 24,
    maxWidth: 340,
    margin: '0 auto 24px',
  },
};
