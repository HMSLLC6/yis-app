import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { C, font, fmt } from '../theme';

// Returns a visual component for a concept, or null if none exists
export default function ConceptVisual({ conceptId }) {
  const Visual = VISUALS[conceptId];
  if (!Visual) return null;
  return (
    <div style={s.wrapper}>
      <Visual />
    </div>
  );
}

const VISUALS = {
  'compound-interest': CompoundInterest,
  'risk-return': RiskReturn,
  'diversification': Diversification,
  'expense-ratio': FeeImpact,
  'income-statement': IncomeFlow,
  'balance-sheet': BalanceSheetEq,
  'pe-ratio': PEComparison,
  'sp500': Mag7Concentration,
  'market-cap-weight': WeightingMethods,
  'fed-funds-rate': RateCascade,
  'gross-margin': MarginComparison,
  'active-vs-passive': ActivePassive,
};

// === COMPOUND INTEREST ===
function CompoundInterest() {
  const data = [];
  for (let y = 0; y <= 30; y += 2) {
    data.push({
      year: y,
      invested: 10000,
      growth: Math.round(10000 * Math.pow(1.10, y)),
    });
  }
  return (
    <div>
      <p style={s.label}>$10,000 at 10% annual return</p>
      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="gcg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.green} stopOpacity={0.25} />
              <stop offset="95%" stopColor={C.green} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="year" tick={s.tick} axisLine={false} tickLine={false} tickFormatter={v => `${v}y`} />
          <YAxis tick={s.tick} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
          <Tooltip contentStyle={s.tooltip} formatter={v => fmt.currency(v, 0)} labelFormatter={v => `Year ${v}`} />
          <Area type="monotone" dataKey="invested" stroke={C.muted} strokeWidth={1} strokeDasharray="4 4" fill="none" name="Contributed" />
          <Area type="monotone" dataKey="growth" stroke={C.green} strokeWidth={2} fill="url(#gcg)" name="With growth" />
        </AreaChart>
      </ResponsiveContainer>
      <div style={s.callout}>
        <span style={s.calloutNum}>{fmt.currency(data[data.length - 1].growth, 0)}</span>
        <span style={s.calloutLabel}>after 30 years</span>
      </div>
    </div>
  );
}

// === RISK vs RETURN ===
function RiskReturn() {
  const items = [
    { name: 'Savings', risk: 1, ret: 4, color: C.blue },
    { name: 'Bonds', risk: 2, ret: 5, color: '#6366f1' },
    { name: 'S&P 500', risk: 4, ret: 10, color: C.green },
    { name: 'Growth Stock', risk: 6, ret: 15, color: C.gold },
    { name: 'Startup', risk: 9, ret: 30, color: C.red },
  ];
  return (
    <div>
      <p style={s.label}>Higher risk = higher potential return</p>
      <div style={s.spectrum}>
        {items.map(item => (
          <div key={item.name} style={s.spectrumItem}>
            <div style={{
              ...s.spectrumBar,
              height: item.ret * 3.5,
              background: `linear-gradient(to top, ${item.color}40, ${item.color})`,
            }} />
            <span style={{ ...s.spectrumLabel, color: item.color }}>{item.ret}%</span>
            <span style={s.spectrumName}>{item.name}</span>
          </div>
        ))}
      </div>
      <div style={s.spectrumAxis}>
        <span>Lower risk</span>
        <span>Higher risk</span>
      </div>
    </div>
  );
}

// === DIVERSIFICATION ===
function Diversification() {
  const data = [
    { name: 'US Stocks', value: 50, color: C.blue },
    { name: 'Int\'l Stocks', value: 20, color: '#6366f1' },
    { name: 'Bonds', value: 20, color: C.green },
    { name: 'Real Estate', value: 10, color: C.gold },
  ];
  return (
    <div>
      <p style={s.label}>A diversified portfolio</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={30} outerRadius={52} strokeWidth={0}>
              {data.map(d => <Cell key={d.name} fill={d.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {data.map(d => (
            <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: C.textDim }}>{d.name} ({d.value}%)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// === FEE IMPACT ===
function FeeImpact() {
  const data = [];
  for (let y = 0; y <= 30; y += 3) {
    data.push({
      year: y,
      'No fee (0.03%)': Math.round(100000 * Math.pow(1.0997, y)),
      'With 1% fee': Math.round(100000 * Math.pow(1.09, y)),
    });
  }
  const diff = data[data.length - 1]['No fee (0.03%)'] - data[data.length - 1]['With 1% fee'];
  return (
    <div>
      <p style={s.label}>$100K invested — 0.03% fee vs 1% fee over 30 years</p>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
          <XAxis dataKey="year" tick={s.tick} axisLine={false} tickLine={false} tickFormatter={v => `${v}y`} />
          <YAxis tick={s.tick} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000000).toFixed(1)}M`} />
          <Tooltip contentStyle={s.tooltip} formatter={v => fmt.currency(v, 0)} labelFormatter={v => `Year ${v}`} />
          <Area type="monotone" dataKey="No fee (0.03%)" stroke={C.green} strokeWidth={2} fill="none" />
          <Area type="monotone" dataKey="With 1% fee" stroke={C.red} strokeWidth={2} fill="none" strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
      <div style={s.callout}>
        <span style={{ ...s.calloutNum, color: C.red }}>{fmt.currency(diff, 0)}</span>
        <span style={s.calloutLabel}>lost to fees over 30 years</span>
      </div>
    </div>
  );
}

// === INCOME STATEMENT FLOW ===
function IncomeFlow() {
  const steps = [
    { label: 'Revenue', value: 394, color: C.text },
    { label: '- COGS', value: -223, color: C.red },
    { label: 'Gross Profit', value: 171, color: C.green },
    { label: '- Operating Exp', value: -55, color: C.red },
    { label: 'Net Income', value: 100, color: C.green },
  ];
  const maxVal = 394;
  return (
    <div>
      <p style={s.label}>Apple Income Statement ($B)</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {steps.map(step => (
          <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: C.textDim, width: 90, textAlign: 'right', flexShrink: 0 }}>{step.label}</span>
            <div style={{ flex: 1, height: 20, background: C.border, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                width: `${(Math.abs(step.value) / maxVal) * 100}%`,
                height: '100%',
                background: step.color === C.red ? C.red + '50' : step.color === C.green ? C.green + '40' : C.textDim + '30',
                borderRadius: 4,
              }} />
            </div>
            <span style={{ fontSize: 12, fontFamily: font.mono, color: step.color, width: 48, flexShrink: 0 }}>
              ${Math.abs(step.value)}B
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// === BALANCE SHEET EQUATION ===
function BalanceSheetEq() {
  return (
    <div>
      <p style={s.label}>The Accounting Equation</p>
      <div style={s.equation}>
        <div style={{ ...s.eqBox, borderColor: C.blue + '40', background: C.blue + '10' }}>
          <span style={{ ...s.eqTitle, color: C.blue }}>Assets</span>
          <span style={s.eqVal}>$351B</span>
        </div>
        <span style={s.eqSign}>=</span>
        <div style={{ ...s.eqBox, borderColor: C.red + '40', background: C.red + '08' }}>
          <span style={{ ...s.eqTitle, color: C.red }}>Liabilities</span>
          <span style={s.eqVal}>$288B</span>
        </div>
        <span style={s.eqSign}>+</span>
        <div style={{ ...s.eqBox, borderColor: C.green + '40', background: C.green + '08' }}>
          <span style={{ ...s.eqTitle, color: C.green }}>Equity</span>
          <span style={s.eqVal}>$63B</span>
        </div>
      </div>
      <p style={{ fontSize: 10, color: C.muted, textAlign: 'center', marginTop: 6 }}>Apple balance sheet (simplified)</p>
    </div>
  );
}

// === P/E COMPARISON ===
function PEComparison() {
  const data = [
    { name: 'Verizon', pe: 12, color: C.blue },
    { name: 'Apple', pe: 30, color: C.green },
    { name: 'NVIDIA', pe: 46, color: C.gold },
  ];
  return (
    <div>
      <p style={s.label}>P/E Ratios — what investors pay per $1 of profit</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 20, height: 120, marginBottom: 8 }}>
        {data.map(d => (
          <div key={d.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ fontFamily: font.mono, fontSize: 14, fontWeight: 700, color: d.color }}>{d.pe}x</span>
            <div style={{ width: 40, height: d.pe * 2, background: d.color + '30', border: `1px solid ${d.color}50`, borderRadius: 4 }} />
            <span style={{ fontSize: 11, color: C.textDim }}>{d.name}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: C.muted, textAlign: 'center' }}>Higher P/E = investors expect faster growth</p>
    </div>
  );
}

// === MAGNIFICENT 7 CONCENTRATION ===
function Mag7Concentration() {
  const data = [
    { name: 'Magnificent 7', value: 30, color: C.gold },
    { name: 'Other 493', value: 70, color: C.border },
  ];
  return (
    <div>
      <p style={s.label}>S&P 500 weight concentration</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <ResponsiveContainer width={110} height={110}>
          <PieChart>
            <Pie data={data} dataKey="value" cx="50%" cy="50%" innerRadius={28} outerRadius={48} strokeWidth={0}>
              {data.map(d => <Cell key={d.name} fill={d.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.gold }}>Magnificent 7 — 30%</div>
            <div style={{ fontSize: 10, color: C.muted }}>AAPL, MSFT, NVDA, AMZN, GOOGL, META, TSLA</div>
          </div>
          <div>
            <div style={{ fontSize: 12, color: C.textDim }}>Other 493 — 70%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// === INDEX WEIGHTING METHODS ===
function WeightingMethods() {
  const data = [
    { method: 'Market-Cap', result: 8.2, color: C.blue },
    { method: 'Price', result: -1.7, color: C.red },
    { method: 'Equal', result: 3.5, color: C.green },
  ];
  return (
    <div>
      <p style={s.label}>Same 3 stocks, different weighting = different returns</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        {data.map(d => (
          <div key={d.method} style={{ textAlign: 'center' }}>
            <span style={{ fontFamily: font.mono, fontSize: 18, fontWeight: 700, color: d.result >= 0 ? C.green : C.red }}>
              {d.result >= 0 ? '+' : ''}{d.result}%
            </span>
            <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{d.method}</div>
            <div style={{ fontSize: 10, color: C.muted }}>weighted</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// === FED FUNDS RATE CASCADE ===
function RateCascade() {
  const items = [
    { label: 'Fed Funds Rate', value: '5.25%', isSource: true },
    { label: 'Mortgage rates', value: '7.0%' },
    { label: 'Car loans', value: '8.5%' },
    { label: 'Credit cards', value: '24%' },
    { label: 'Savings accounts', value: '4.5%' },
    { label: 'Student loans', value: '6.5%' },
  ];
  return (
    <div>
      <p style={s.label}>How the Fed rate flows through the economy</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {items.map((item, i) => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 10px', borderRadius: 6,
            background: item.isSource ? C.gold + '15' : C.surface,
            borderLeft: `3px solid ${item.isSource ? C.gold : C.border}`,
            marginLeft: item.isSource ? 0 : 12,
          }}>
            {!item.isSource && (
              <span style={{ fontSize: 10, color: C.muted }}>→</span>
            )}
            <span style={{ flex: 1, fontSize: 12, color: item.isSource ? C.gold : C.textDim }}>{item.label}</span>
            <span style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 600, color: item.isSource ? C.gold : C.text }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// === GROSS MARGIN COMPARISON ===
function MarginComparison() {
  const data = [
    { name: 'Grocery Store', margin: 25, color: C.blue },
    { name: 'Apple', margin: 43, color: C.green },
    { name: 'Software Co.', margin: 82, color: C.gold },
  ];
  return (
    <div>
      <p style={s.label}>Gross margin by industry</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {data.map(d => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: C.textDim, width: 80, textAlign: 'right', flexShrink: 0 }}>{d.name}</span>
            <div style={{ flex: 1, height: 16, background: C.border, borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${d.margin}%`, height: '100%', background: d.color + '60', borderRadius: 3 }} />
            </div>
            <span style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 600, color: d.color, width: 36, flexShrink: 0 }}>{d.margin}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// === ACTIVE vs PASSIVE ===
function ActivePassive() {
  const data = [];
  let idx = 10000, hedge = 10000;
  for (let y = 0; y <= 10; y++) {
    data.push({ year: 2007 + y, 'Index Fund': Math.round(idx), 'Hedge Funds': Math.round(hedge) });
    if (y < 10) { idx *= 1.085; hedge *= 1.031; }
  }
  return (
    <div>
      <p style={s.label}>The Buffett Bet: $10K over 10 years</p>
      <ResponsiveContainer width="100%" height={130}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
          <XAxis dataKey="year" tick={s.tick} axisLine={false} tickLine={false} />
          <YAxis tick={s.tick} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
          <Tooltip contentStyle={s.tooltip} formatter={v => fmt.currency(v, 0)} />
          <Area type="monotone" dataKey="Index Fund" stroke={C.green} strokeWidth={2} fill="none" />
          <Area type="monotone" dataKey="Hedge Funds" stroke={C.red} strokeWidth={1.5} fill="none" strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// === STYLES ===
const s = {
  wrapper: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: '14px 16px',
    marginBottom: 14,
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
    color: C.muted,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 12,
  },
  tick: { fontSize: 10, fill: C.muted },
  tooltip: {
    background: C.surfaceAlt,
    border: `1px solid ${C.border}`,
    borderRadius: 6,
    fontSize: 11,
  },
  callout: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
  },
  calloutNum: {
    fontFamily: font.mono,
    fontSize: 20,
    fontWeight: 700,
    color: C.green,
  },
  calloutLabel: {
    fontSize: 12,
    color: C.muted,
  },
  // Risk-return spectrum
  spectrum: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    height: 120,
    padding: '0 4px',
  },
  spectrumItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 3,
  },
  spectrumBar: {
    width: 28,
    borderRadius: 4,
  },
  spectrumLabel: {
    fontFamily: font.mono,
    fontSize: 11,
    fontWeight: 600,
  },
  spectrumName: {
    fontSize: 9,
    color: C.muted,
    textAlign: 'center',
  },
  spectrumAxis: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 10,
    color: C.muted,
    marginTop: 6,
    padding: '0 4px',
  },
  // Balance sheet equation
  equation: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  eqBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid',
    minWidth: 70,
  },
  eqTitle: {
    fontSize: 10,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  eqVal: {
    fontFamily: font.mono,
    fontSize: 14,
    fontWeight: 700,
    color: C.text,
    marginTop: 2,
  },
  eqSign: {
    fontFamily: font.mono,
    fontSize: 18,
    fontWeight: 700,
    color: C.muted,
  },
};
