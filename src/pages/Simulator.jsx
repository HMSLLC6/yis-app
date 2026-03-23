import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { C, font, fmt } from '../theme';
import { calculateGrowth, HISTORICAL_AVG_RETURN, BUFFETT_QUOTES } from '../data/sp500';

const TABS = [
  { id: 'birthday', label: 'Birthday Investor' },
  { id: 'future', label: 'Future Builder' },
  { id: 'buffett', label: 'The Buffett Bet' },
];

export default function Simulator() {
  const [tab, setTab] = useState('birthday');

  return (
    <div style={s.page}>
      <div className="fade-in">
        <h1 style={s.title}>Investment Simulator</h1>
        <p style={s.subtitle}>
          See the power of investing with real historical data
        </p>
      </div>

      {/* Tab selector */}
      <div style={s.tabs}>
        {TABS.map(t => (
          <button
            key={t.id}
            style={{
              ...s.tab,
              background: tab === t.id ? C.gold + '20' : 'transparent',
              color: tab === t.id ? C.gold : C.muted,
              borderColor: tab === t.id ? C.gold + '40' : C.border,
            }}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'birthday' && <BirthdayInvestor />}
      {tab === 'future' && <FutureBuilder />}
      {tab === 'buffett' && <BuffettBet />}
    </div>
  );
}

// ===================== BIRTHDAY INVESTOR =====================
function BirthdayInvestor() {
  const [birthday, setBirthday] = useState('');
  const [amount, setAmount] = useState('1000');
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!birthday || !amount) return;
    const r = calculateGrowth(birthday, parseFloat(amount));
    setResult(r);
  };

  // Sample every Nth year for chart readability on long spans
  const chartData = useMemo(() => {
    if (!result?.dataPoints) return [];
    const pts = result.dataPoints;
    if (pts.length <= 30) return pts;
    // For 30+ year spans, sample roughly every 2-3 years + always include first & last
    const step = Math.ceil(pts.length / 25);
    const sampled = pts.filter((_, i) => i === 0 || i === pts.length - 1 || i % step === 0);
    return sampled;
  }, [result]);

  return (
    <div className="slide-up">
      <div style={s.card}>
        <h2 style={s.cardTitle}>What if you invested on your birthday?</h2>
        <p style={s.cardDesc}>
          Enter any date from 1950 to today and an amount. We'll compound it through
          every year of actual S&P 500 total returns (with dividends reinvested).
        </p>

        <div style={s.inputGroup}>
          <label style={s.label}>Your Birthday</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            style={s.input}
            max={new Date().toISOString().split('T')[0]}
            min="1950-01-01"
          />
        </div>

        <div style={s.inputGroup}>
          <label style={s.label}>Amount Invested</label>
          <div style={s.dollarInput}>
            <span style={s.dollarSign}>$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={s.inputNoBorder}
              placeholder="1000"
              min="1"
            />
          </div>
        </div>

        <button style={s.calcBtn} onClick={handleCalculate}>
          Calculate
        </button>
      </div>

      {result && (
        <div style={s.resultCard} className="slide-up">
          <div style={s.resultHeader}>
            <span style={s.resultLabel}>Your investment today</span>
            <span style={s.resultValue}>{fmt.currency(result.finalValue)}</span>
          </div>

          <div style={s.statRow}>
            <StatBox label="Invested" value={fmt.currency(result.invested)} />
            <StatBox label="Gain" value={fmt.currency(result.finalValue - result.invested)} color={C.green} />
            <StatBox label="Return" value={fmt.pct(result.totalReturn * 100)} color={C.green} />
          </div>
          <div style={s.statRow}>
            <StatBox label="Years" value={result.years.toString()} />
            <StatBox label="Annual Return" value={fmt.pct(result.annualizedReturn * 100)} />
          </div>

          {/* Growth chart */}
          {chartData.length > 2 && (
            <div style={{ marginTop: 16 }}>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gradBday" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={C.green} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={C.green} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 11, fill: C.muted }}
                    axisLine={{ stroke: C.border }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: C.muted }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: C.surface,
                      border: `1px solid ${C.border}`,
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    formatter={(v) => fmt.currency(v, 0)}
                    labelFormatter={(v) => v}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={C.green}
                    strokeWidth={2}
                    fill="url(#gradBday)"
                    name="Portfolio Value"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}

          <div style={s.insightBox}>
            <p style={s.insightText}>
              {result.years >= 40
                ? `${result.years} years of patience turned ${fmt.currency(result.invested)} into ${fmt.currency(result.finalValue, 0)}. This is the power of compound growth through actual bull markets, bear markets, crashes, and recoveries — all of them.`
                : result.finalValue > result.invested * 2
                ? `Your money more than doubled! This is compound growth in action — the S&P 500 averaged about 10% per year, but your gains earned their own gains.`
                : result.years < 3
                ? `Over shorter periods, the market can be unpredictable. But Buffett's advice holds: think in decades, not days.`
                : `Patience pays. Even through market crashes and recessions, staying invested in the S&P 500 has rewarded long-term holders.`
              }
            </p>
          </div>
        </div>
      )}

      {!result && (
        <div style={s.hintCard}>
          <p style={s.hintText}>
            Try your parents' or grandparents' birthdays to see decades of compounding.
            Or try dates around 2008-2009 to see how even investing right before a crash
            turned out fine with patience.
          </p>
        </div>
      )}
    </div>
  );
}

// ===================== FUTURE BUILDER =====================
function FutureBuilder() {
  const [amount, setAmount] = useState('5000');
  const [monthly, setMonthly] = useState('100');
  const [years, setYears] = useState('30');

  const scenarios = useMemo(() => {
    const principal = parseFloat(amount) || 0;
    const monthlyAdd = parseFloat(monthly) || 0;
    const yr = parseInt(years) || 30;

    const rates = [
      { label: 'Conservative (6%)', rate: 0.06, color: C.blue },
      { label: 'Moderate (8%)', rate: 0.08, color: C.gold },
      { label: 'Aggressive (10%)', rate: HISTORICAL_AVG_RETURN, color: C.green },
    ];

    // Build yearly data for chart using proper monthly compounding
    const chartData = [];
    for (let y = 0; y <= yr; y++) {
      const point = { year: y };
      const months = y * 12;
      rates.forEach(r => {
        const monthlyRate = r.rate / 12;
        // Principal compounded monthly
        const compoundedPrincipal = principal * Math.pow(1 + monthlyRate, months);
        // Future value of monthly contributions (annuity)
        const annuityFV = monthlyRate > 0
          ? monthlyAdd * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
          : monthlyAdd * months;
        point[r.label] = Math.round(compoundedPrincipal + annuityFV);
      });
      // Total contributed (no growth)
      point.contributed = principal + (monthlyAdd * 12 * y);
      chartData.push(point);
    }

    return { rates, chartData, years: yr };
  }, [amount, monthly, years]);

  const finalValues = scenarios.chartData[scenarios.chartData.length - 1];
  const totalContributed = finalValues?.contributed || 0;

  return (
    <div className="slide-up">
      <div style={s.card}>
        <h2 style={s.cardTitle}>Build Your Future</h2>
        <p style={s.cardDesc}>
          See how starting early and investing consistently can grow your wealth
          over time. Even small monthly amounts add up to life-changing money.
        </p>

        <div style={s.inputRow}>
          <div style={s.inputGroup}>
            <label style={s.label}>Starting Amount</label>
            <div style={s.dollarInput}>
              <span style={s.dollarSign}>$</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={s.inputNoBorder}
                placeholder="5000"
              />
            </div>
          </div>
          <div style={s.inputGroup}>
            <label style={s.label}>Monthly Addition</label>
            <div style={s.dollarInput}>
              <span style={s.dollarSign}>$</span>
              <input
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(e.target.value)}
                style={s.inputNoBorder}
                placeholder="100"
              />
            </div>
          </div>
        </div>

        <div style={s.inputGroup}>
          <label style={s.label}>Time Horizon: {years} years</label>
          <input
            type="range"
            min="5"
            max="50"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            style={s.slider}
          />
          <div style={s.sliderLabels}>
            <span>5 yrs</span>
            <span>50 yrs</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={s.chartCard}>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={scenarios.chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              {scenarios.rates.map(r => (
                <linearGradient key={r.label} id={`grad-${r.rate}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={r.color} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={r.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: C.muted }}
              axisLine={{ stroke: C.border }}
              tickLine={false}
              tickFormatter={(v) => `${v}y`}
            />
            <YAxis
              tick={{ fontSize: 11, fill: C.muted }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`}
            />
            <Tooltip
              contentStyle={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v) => fmt.currency(v, 0)}
              labelFormatter={(v) => `Year ${v}`}
            />
            {/* Contributed baseline */}
            <Area
              type="monotone"
              dataKey="contributed"
              stroke={C.muted}
              strokeWidth={1}
              strokeDasharray="4 4"
              fill="none"
              name="Contributed"
            />
            {scenarios.rates.map(r => (
              <Area
                key={r.label}
                type="monotone"
                dataKey={r.label}
                stroke={r.color}
                strokeWidth={2}
                fill={`url(#grad-${r.rate})`}
                name={r.label}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Results */}
      <div style={s.resultGrid}>
        <div style={s.resultMini}>
          <span style={s.resultMiniLabel}>Total Contributed</span>
          <span style={{ ...s.resultMiniVal, color: C.textDim }}>{fmt.currency(totalContributed, 0)}</span>
        </div>
        {scenarios.rates.map(r => (
          <div key={r.label} style={s.resultMini}>
            <span style={s.resultMiniLabel}>{r.label}</span>
            <span style={{ ...s.resultMiniVal, color: r.color }}>
              {fmt.currency(finalValues?.[r.label], 0)}
            </span>
          </div>
        ))}
      </div>

      <div style={s.insightBox}>
        <p style={s.insightText}>
          {parseInt(years) >= 20
            ? `Notice how the lines curve upward more steeply over time? That's compound growth — your money grows faster the longer it's invested. This is why starting at 16 instead of 30 can double your retirement wealth.`
            : `Try sliding the time horizon to 30+ years to really see compound growth in action. The longer your money works, the more dramatically it grows.`
          }
        </p>
      </div>
    </div>
  );
}

// ===================== THE BUFFETT BET =====================
function BuffettBet() {
  const [amount, setAmount] = useState('10000');

  const data = useMemo(() => {
    const invested = parseFloat(amount) || 10000;
    // Buffett's actual bet: S&P 500 index vs hedge funds (2007-2017)
    // S&P 500: ~125.8% total return (~8.5% annualized)
    // Hedge funds (Protégé Partners avg): ~36% total return (~3.1% annualized, net of fees)
    // The hedge fund 2-and-20 fee structure ate the returns
    const indexReturn = 0.085;  // annualized net return for S&P 500 index fund
    const hedgeReturn = 0.031;  // annualized net return for hedge fund basket (after fees)

    const points = [];
    let indexVal = invested;
    let hedgeVal = invested;

    for (let y = 0; y <= 10; y++) {
      points.push({
        year: y,
        'S&P 500 Index Fund': Math.round(indexVal),
        'Hedge Funds (avg)': Math.round(hedgeVal),
      });
      if (y < 10) {
        indexVal *= (1 + indexReturn);
        hedgeVal *= (1 + hedgeReturn);
      }
    }

    return { points, invested, indexFinal: Math.round(indexVal), hedgeFinal: Math.round(hedgeVal) };
  }, [amount]);

  return (
    <div className="slide-up">
      <div style={s.card}>
        <h2 style={s.cardTitle}>The Buffett Bet</h2>
        <p style={s.cardDesc}>
          In 2007, Warren Buffett bet $1 million that a simple S&P 500 index fund would
          beat a collection of hedge funds over 10 years. The hedge funds charged high fees
          and employed Wall Street's "best" stock-pickers. Buffett won decisively.
        </p>

        <div style={s.inputGroup}>
          <label style={s.label}>Starting Investment</label>
          <div style={s.dollarInput}>
            <span style={s.dollarSign}>$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={s.inputNoBorder}
              placeholder="10000"
            />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={s.chartCard}>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data.points} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="gradIndex" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.green} stopOpacity={0.2} />
                <stop offset="95%" stopColor={C.green} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradHedge" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.red} stopOpacity={0.15} />
                <stop offset="95%" stopColor={C.red} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: C.muted }}
              axisLine={{ stroke: C.border }}
              tickLine={false}
              tickFormatter={(v) => `${2007 + v}`}
            />
            <YAxis
              tick={{ fontSize: 11, fill: C.muted }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : `$${v}`}
            />
            <Tooltip
              contentStyle={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                fontSize: 12,
              }}
              formatter={(v) => fmt.currency(v, 0)}
              labelFormatter={(v) => `Year ${2007 + v}`}
            />
            <Area
              type="monotone"
              dataKey="S&P 500 Index Fund"
              stroke={C.green}
              strokeWidth={2.5}
              fill="url(#gradIndex)"
            />
            <Area
              type="monotone"
              dataKey="Hedge Funds (avg)"
              stroke={C.red}
              strokeWidth={2}
              fill="url(#gradHedge)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Results */}
      <div style={s.betResults}>
        <div style={s.betCol}>
          <div style={{ ...s.betLabel, color: C.green }}>S&P 500 Index Fund</div>
          <div style={{ ...s.betVal, color: C.green }}>{fmt.currency(data.indexFinal, 0)}</div>
          <div style={s.betReturn}>+{fmt.pct(((data.indexFinal / data.invested) - 1) * 100)}</div>
          <div style={s.betFee}>Fees: ~0.03%/year</div>
        </div>
        <div style={s.betVs}>vs</div>
        <div style={s.betCol}>
          <div style={{ ...s.betLabel, color: C.red }}>Hedge Funds (avg)</div>
          <div style={{ ...s.betVal, color: C.red }}>{fmt.currency(data.hedgeFinal, 0)}</div>
          <div style={s.betReturn}>+{fmt.pct(((data.hedgeFinal / data.invested) - 1) * 100)}</div>
          <div style={s.betFee}>Fees: 2% + 20% of gains</div>
        </div>
      </div>

      <div style={s.buffettQuoteCard}>
        <div style={s.quoteMarks}>"</div>
        <p style={s.quoteText}>
          Both large and small investors should stick with low-cost index funds.
        </p>
        <p style={s.quoteSource}>— Warren Buffett, 2017 Berkshire Hathaway Letter</p>
      </div>

      <div style={s.insightBox}>
        <p style={s.insightText}>
          The lesson: fees matter enormously. The hedge funds' 2-and-20 fee structure
          (2% of assets + 20% of profits) devoured returns. Meanwhile, a simple index fund
          with virtually no fees captured the full market return. Simplicity won.
        </p>
      </div>
    </div>
  );
}

// ===================== SHARED COMPONENTS =====================
function StatBox({ label, value, color }) {
  return (
    <div style={s.statBox}>
      <span style={s.statLabel}>{label}</span>
      <span style={{ ...s.statValue, color: color || C.text }}>{value}</span>
    </div>
  );
}

// ===================== STYLES =====================
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
  tabs: {
    display: 'flex',
    gap: 8,
    marginBottom: 20,
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch',
    paddingBottom: 4,
  },
  tab: {
    padding: '8px 14px',
    fontSize: 13,
    fontWeight: 500,
    borderRadius: 8,
    border: '1px solid',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
    flexShrink: 0,
  },
  card: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: '20px 18px',
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: font.heading,
    fontSize: 18,
    fontWeight: 600,
    color: C.text,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: C.textDim,
    lineHeight: 1.6,
    marginBottom: 18,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  label: {
    display: 'block',
    fontSize: 12,
    fontWeight: 500,
    color: C.textDim,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    background: C.surfaceAlt,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    color: C.text,
    fontSize: 15,
    fontFamily: font.mono,
  },
  dollarInput: {
    display: 'flex',
    alignItems: 'center',
    background: C.surfaceAlt,
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    padding: '0 12px',
  },
  dollarSign: {
    color: C.muted,
    fontFamily: font.mono,
    fontSize: 15,
    marginRight: 4,
  },
  inputNoBorder: {
    width: '100%',
    padding: '10px 0',
    background: 'transparent',
    color: C.text,
    fontSize: 15,
    fontFamily: font.mono,
  },
  slider: {
    width: '100%',
    accentColor: C.gold,
    cursor: 'pointer',
  },
  sliderLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 11,
    color: C.muted,
    marginTop: 4,
  },
  calcBtn: {
    width: '100%',
    padding: '13px',
    background: C.gold,
    color: '#0a1628',
    fontWeight: 600,
    fontSize: 15,
    borderRadius: 10,
    cursor: 'pointer',
    border: 'none',
    marginTop: 4,
  },
  resultCard: {
    background: C.surface,
    border: `1px solid ${C.green}30`,
    borderRadius: 16,
    padding: '20px 18px',
    marginBottom: 16,
  },
  resultHeader: {
    textAlign: 'center',
    marginBottom: 18,
  },
  resultLabel: {
    display: 'block',
    fontSize: 12,
    color: C.textDim,
    marginBottom: 6,
  },
  resultValue: {
    fontFamily: font.heading,
    fontSize: 36,
    fontWeight: 700,
    color: C.green,
  },
  statRow: {
    display: 'flex',
    gap: 8,
    marginBottom: 8,
  },
  statBox: {
    flex: 1,
    background: C.surfaceAlt,
    borderRadius: 8,
    padding: '10px 12px',
    textAlign: 'center',
  },
  statLabel: {
    display: 'block',
    fontSize: 10,
    color: C.muted,
    marginBottom: 4,
    fontWeight: 500,
  },
  statValue: {
    fontFamily: font.mono,
    fontSize: 14,
    fontWeight: 600,
  },
  chartCard: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: '16px 8px',
    marginBottom: 16,
  },
  resultGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
    marginBottom: 16,
  },
  resultMini: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 10,
    padding: '12px',
    textAlign: 'center',
  },
  resultMiniLabel: {
    display: 'block',
    fontSize: 10,
    color: C.muted,
    marginBottom: 4,
  },
  resultMiniVal: {
    fontFamily: font.mono,
    fontSize: 15,
    fontWeight: 600,
  },
  betResults: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  betCol: {
    flex: 1,
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: '16px 12px',
    textAlign: 'center',
  },
  betLabel: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 6,
    display: 'block',
  },
  betVal: {
    fontFamily: font.mono,
    fontSize: 20,
    fontWeight: 700,
    display: 'block',
    marginBottom: 4,
  },
  betReturn: {
    fontSize: 12,
    color: C.textDim,
    marginBottom: 4,
  },
  betFee: {
    fontSize: 10,
    color: C.muted,
  },
  betVs: {
    fontSize: 14,
    fontWeight: 600,
    color: C.muted,
    fontFamily: font.heading,
    fontStyle: 'italic',
  },
  buffettQuoteCard: {
    background: C.gold + '08',
    border: `1px solid ${C.gold}20`,
    borderRadius: 12,
    padding: '16px',
    marginBottom: 16,
  },
  quoteMarks: {
    fontFamily: font.heading,
    fontSize: 36,
    color: C.gold + '40',
    lineHeight: 1,
    marginBottom: -4,
  },
  quoteText: {
    fontFamily: font.heading,
    fontSize: 15,
    fontStyle: 'italic',
    color: C.text,
    lineHeight: 1.6,
    marginBottom: 6,
  },
  quoteSource: {
    fontSize: 12,
    color: C.gold,
    fontWeight: 500,
  },
  insightBox: {
    background: C.surfaceAlt,
    borderRadius: 10,
    padding: '14px',
    marginTop: 4,
    marginBottom: 16,
  },
  insightText: {
    fontSize: 13,
    color: C.textDim,
    lineHeight: 1.6,
  },
  hintCard: {
    background: C.gold + '08',
    border: `1px solid ${C.gold}15`,
    borderRadius: 10,
    padding: '14px',
  },
  hintText: {
    fontSize: 13,
    color: C.textDim,
    lineHeight: 1.5,
  },
};
