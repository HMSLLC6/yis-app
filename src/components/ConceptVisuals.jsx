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
  // Module 1 — Foundations
  'stock': StockVsBond,
  'bond': StockVsBond,
  'equity': EquityVisual,
  'dividend': DividendYield,
  'capital-gain': CapitalGain,
  'interest': InterestSimple,
  'compound-interest': CompoundInterest,
  'short-selling': ShortSelling,
  'short-squeeze': ShortSqueeze,
  'risk-return': RiskReturn,
  'diversification': Diversification,
  'portfolio': PortfolioAllocation,
  // Module 2 — Vehicles
  'mutual-fund': FundComparison,
  'etf': FundComparison,
  'index-fund': IndexGrowth,
  'active-vs-passive': ActivePassive,
  'expense-ratio': FeeImpact,
  'sp500': Mag7Concentration,
  'dow-jones': DowVsSP,
  'market-cap-weight': WeightingMethods,
  'options': OptionsPayoff,
  'futures': FuturesVisual,
  // Module 3 — Valuation
  'dcf': TimeValueMoney,
  'time-value-money': TimeValueMoney,
  'pe-ratio': PEComparison,
  'eps': EPSCalc,
  'comps': CompsTable,
  'earnings-surprise': EarningsSurprise,
  // Module 4 — Financials
  'income-statement': IncomeFlow,
  'balance-sheet': BalanceSheetEq,
  'revenue': RevenueComparison,
  'net-income': NetIncomeComparison,
  'gross-margin': MarginComparison,
  'cogs': COGSVisual,
  'operating-expenses': OpExBreakdown,
  'shares-outstanding': BuybackEffect,
  // Module 5 — Macro
  'federal-reserve': FedDualMandate,
  'fed-funds-rate': RateCascade,
  'inflation': InflationTimeline,
  'oil-prices': OilChain,
  'sector': SectorRotation,
  'time-horizon': TimeHorizon,
  'market-bubble': BubbleTimeline,
  'tariffs': TariffImpact,
  'alpha-beta': AlphaBeta,
  'hedge-fund': HedgeFundFees,
  'meme-stock': MemeStockChart,
  // Module 6 — Careers
  'career-paths-overview': CareerMap,
  'investment-banking': IBTimeline,
  'management-consulting': ConsultingSpecialties,
  'mergers-acquisitions': MAProcess,
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
    { name: 'Growth', risk: 6, ret: 15, color: C.gold },
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
            <span style={{ fontSize: 11, color: C.textDim, width: 70, textAlign: 'right', flexShrink: 0 }}>{step.label}</span>
            <div style={{ flex: 1, height: 20, background: C.border, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                width: `${(Math.abs(step.value) / maxVal) * 100}%`,
                height: '100%',
                background: step.color === C.red ? C.red + '50' : step.color === C.green ? C.green + '40' : C.textDim + '30',
                borderRadius: 4,
              }} />
            </div>
            <span style={{ fontSize: 12, fontFamily: font.mono, color: step.color, width: 42, flexShrink: 0 }}>
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

// =====================================================
// NEW VISUALS — FOUNDATIONS
// =====================================================

function StockVsBond() {
  const rows = [
    { label: 'You are a...', stock: 'Owner', bond: 'Lender' },
    { label: 'Returns via', stock: 'Divs + Price', bond: 'Interest' },
    { label: 'Risk level', stock: 'Higher', bond: 'Lower' },
    { label: 'Upside', stock: 'Unlimited', bond: 'Capped' },
    { label: 'Bankruptcy', stock: 'Paid last', bond: 'Paid first' },
  ];
  return (
    <div>
      <p style={s.label}>Stock vs Bond at a glance</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr>
            <th style={{ ...s.th, width: '30%' }}></th>
            <th style={{ ...s.th, color: C.green }}>Stock</th>
            <th style={{ ...s.th, color: C.blue }}>Bond</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.label}>
              <td style={s.td}>{r.label}</td>
              <td style={{ ...s.td, color: C.textDim }}>{r.stock}</td>
              <td style={{ ...s.td, color: C.textDim }}>{r.bond}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EquityVisual() {
  return (
    <div>
      <p style={s.label}>Your home equity — same concept</p>
      <div style={s.equation}>
        <div style={{ ...s.eqBox, borderColor: C.blue + '40', background: C.blue + '10' }}>
          <span style={{ ...s.eqTitle, color: C.blue }}>Home Value</span>
          <span style={s.eqVal}>$300K</span>
        </div>
        <span style={s.eqSign}>-</span>
        <div style={{ ...s.eqBox, borderColor: C.red + '40', background: C.red + '08' }}>
          <span style={{ ...s.eqTitle, color: C.red }}>Mortgage</span>
          <span style={s.eqVal}>$200K</span>
        </div>
        <span style={s.eqSign}>=</span>
        <div style={{ ...s.eqBox, borderColor: C.green + '40', background: C.green + '08' }}>
          <span style={{ ...s.eqTitle, color: C.green }}>Your Equity</span>
          <span style={s.eqVal}>$100K</span>
        </div>
      </div>
    </div>
  );
}

function DividendYield() {
  const data = [
    { name: 'Coca-Cola', yield: 3.1, color: C.red },
    { name: 'Apple', yield: 0.5, color: C.blue },
    { name: 'Verizon', yield: 6.4, color: C.green },
    { name: 'NVIDIA', yield: 0.03, color: C.gold },
  ];
  return (
    <div>
      <p style={s.label}>Dividend yield — annual cash you earn per share</p>
      {data.map(d => (
        <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: C.textDim, width: 64, textAlign: 'right', flexShrink: 0 }}>{d.name}</span>
          <div style={{ flex: 1, height: 14, background: C.border, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${(d.yield / 7) * 100}%`, height: '100%', background: d.color + '60', borderRadius: 3 }} />
          </div>
          <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: d.color, width: 36 }}>{d.yield}%</span>
        </div>
      ))}
    </div>
  );
}

function CapitalGain() {
  return (
    <div>
      <p style={s.label}>Capital gain example</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
        <div style={{ ...s.eqBox, borderColor: C.blue + '40', background: C.blue + '10' }}>
          <span style={{ ...s.eqTitle, color: C.blue }}>Buy at</span>
          <span style={s.eqVal}>$120</span>
        </div>
        <span style={s.eqSign}>→</span>
        <div style={{ ...s.eqBox, borderColor: C.green + '40', background: C.green + '08' }}>
          <span style={{ ...s.eqTitle, color: C.green }}>Sell at</span>
          <span style={s.eqVal}>$180</span>
        </div>
        <span style={s.eqSign}>=</span>
        <div style={{ ...s.eqBox, borderColor: C.gold + '40', background: C.gold + '10' }}>
          <span style={{ ...s.eqTitle, color: C.gold }}>Gain</span>
          <span style={s.eqVal}>+$60 (+50%)</span>
        </div>
      </div>
    </div>
  );
}

function InterestSimple() {
  return (
    <div>
      <p style={s.label}>Interest — earning vs. paying</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.green + '10', border: `1px solid ${C.green}30` }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.green, marginBottom: 4 }}>You earn</div>
          <div style={{ fontSize: 13, color: C.textDim }}>Savings account</div>
          <div style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: C.green }}>+4.5%</div>
          <div style={{ fontSize: 10, color: C.muted }}>$1,000 → $45/yr</div>
        </div>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.red + '08', border: `1px solid ${C.red}30` }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: C.red, marginBottom: 4 }}>You pay</div>
          <div style={{ fontSize: 13, color: C.textDim }}>Credit card</div>
          <div style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: C.red }}>-24%</div>
          <div style={{ fontSize: 10, color: C.muted }}>$1,000 → $240/yr</div>
        </div>
      </div>
    </div>
  );
}

function ShortSelling() {
  return (
    <div>
      <p style={s.label}>Short selling — profit when price drops</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
        <div style={{ ...s.eqBox, borderColor: C.textDim + '40' }}>
          <span style={{ ...s.eqTitle, color: C.textDim }}>Borrow & sell</span>
          <span style={s.eqVal}>$40</span>
        </div>
        <span style={s.eqSign}>→</span>
        <div style={{ ...s.eqBox, borderColor: C.green + '40', background: C.green + '08' }}>
          <span style={{ ...s.eqTitle, color: C.green }}>Buy back</span>
          <span style={s.eqVal}>$20</span>
        </div>
        <span style={s.eqSign}>=</span>
        <div style={{ ...s.eqBox, borderColor: C.green + '40', background: C.green + '10' }}>
          <span style={{ ...s.eqTitle, color: C.green }}>Profit</span>
          <span style={s.eqVal}>+$20</span>
        </div>
      </div>
      <p style={{ fontSize: 10, color: C.red, textAlign: 'center', marginTop: 8 }}>But if price rises to $400... you lose $360 per share</p>
    </div>
  );
}

function ShortSqueeze() {
  const data = [
    { day: 'Jan 4', price: 19 }, { day: 'Jan 11', price: 20 }, { day: 'Jan 19', price: 39 },
    { day: 'Jan 22', price: 65 }, { day: 'Jan 25', price: 77 }, { day: 'Jan 26', price: 148 },
    { day: 'Jan 27', price: 347 }, { day: 'Jan 28', price: 483 }, { day: 'Jan 29', price: 193 },
    { day: 'Feb 1', price: 225 }, { day: 'Feb 2', price: 90 }, { day: 'Feb 4', price: 53 },
  ];
  return (
    <div>
      <p style={s.label}>GameStop — January 2021</p>
      <ResponsiveContainer width="100%" height={130}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
          <defs>
            <linearGradient id="gmeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.gold} stopOpacity={0.2} />
              <stop offset="95%" stopColor={C.gold} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" tick={{ fontSize: 9, fill: C.muted }} axisLine={false} tickLine={false} />
          <YAxis tick={s.tick} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
          <Tooltip contentStyle={s.tooltip} formatter={v => `$${v}`} />
          <Area type="monotone" dataKey="price" stroke={C.gold} strokeWidth={2} fill="url(#gmeGrad)" name="GME" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function PortfolioAllocation() {
  return (
    <div>
      <p style={s.label}>Asset allocation matters more than stock picking</p>
      <div style={{ display: 'flex', height: 24, borderRadius: 6, overflow: 'hidden', marginBottom: 8 }}>
        <div style={{ width: '60%', background: C.blue, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#fff' }}>Stocks 60%</div>
        <div style={{ width: '25%', background: C.green + 'cc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: '#fff' }}>Bonds 25%</div>
        <div style={{ width: '15%', background: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, color: '#000' }}>15%</div>
      </div>
      <p style={{ fontSize: 10, color: C.muted, textAlign: 'center' }}>A typical moderate portfolio: stocks for growth, bonds for stability, alternatives for diversification</p>
    </div>
  );
}

// =====================================================
// NEW VISUALS — VEHICLES
// =====================================================

function FundComparison() {
  const rows = [
    { label: 'Trades during day?', stock: 'Yes', mf: 'No', etf: 'Yes' },
    { label: 'Managed by person?', stock: '—', mf: 'Yes', etf: 'Rarely' },
    { label: 'Diversified?', stock: 'No (1 stock)', mf: 'Yes', etf: 'Yes' },
    { label: 'Typical fees', stock: '$0', mf: '0.5-1.5%', etf: '0.03-0.2%' },
  ];
  return (
    <div>
      <p style={s.label}>Stock vs Mutual Fund vs ETF</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
        <thead>
          <tr>
            <th style={{ ...s.th, width: '30%' }}></th>
            <th style={s.th}>Stock</th>
            <th style={s.th}>MF</th>
            <th style={s.th}>ETF</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.label}>
              <td style={s.td}>{r.label}</td>
              <td style={{ ...s.td, color: C.textDim }}>{r.stock}</td>
              <td style={{ ...s.td, color: C.textDim }}>{r.mf}</td>
              <td style={{ ...s.td, color: C.textDim }}>{r.etf}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function IndexGrowth() {
  const data = [
    { year: 1980, value: 10000 }, { year: 1985, value: 18000 }, { year: 1990, value: 28000 },
    { year: 1995, value: 50000 }, { year: 2000, value: 140000 }, { year: 2005, value: 120000 },
    { year: 2010, value: 160000 }, { year: 2015, value: 340000 }, { year: 2020, value: 520000 },
    { year: 2024, value: 1100000 },
  ];
  return (
    <div>
      <p style={s.label}>$10K in S&P 500 index fund since 1980</p>
      <ResponsiveContainer width="100%" height={130}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="idxGr" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={C.green} stopOpacity={0.2} />
              <stop offset="95%" stopColor={C.green} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="year" tick={s.tick} axisLine={false} tickLine={false} />
          <YAxis tick={s.tick} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`} />
          <Tooltip contentStyle={s.tooltip} formatter={v => fmt.currency(v, 0)} />
          <Area type="monotone" dataKey="value" stroke={C.green} strokeWidth={2} fill="url(#idxGr)" />
        </AreaChart>
      </ResponsiveContainer>
      <div style={s.callout}>
        <span style={s.calloutNum}>$1.1M</span>
        <span style={s.calloutLabel}>from $10K — no stock picking needed</span>
      </div>
    </div>
  );
}

function DowVsSP() {
  return (
    <div>
      <p style={s.label}>Dow Jones vs S&P 500</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.surface, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.gold, marginBottom: 4 }}>Dow Jones</div>
          <div style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: C.text }}>30</div>
          <div style={{ fontSize: 10, color: C.muted }}>companies</div>
          <div style={{ fontSize: 10, color: C.textDim, marginTop: 4 }}>Price-weighted</div>
        </div>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.green + '08', border: `1px solid ${C.green}20` }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.green, marginBottom: 4 }}>S&P 500</div>
          <div style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: C.text }}>500</div>
          <div style={{ fontSize: 10, color: C.muted }}>companies</div>
          <div style={{ fontSize: 10, color: C.textDim, marginTop: 4 }}>Market-cap weighted</div>
        </div>
      </div>
    </div>
  );
}

function OptionsPayoff() {
  return (
    <div>
      <p style={s.label}>Call option — small bet, big leverage</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.green + '08', border: `1px solid ${C.green}20`, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: C.green, fontWeight: 600, marginBottom: 4 }}>IF STOCK RISES</div>
          <div style={{ fontSize: 11, color: C.textDim }}>Buy at $200, stock hits $230</div>
          <div style={{ fontFamily: font.mono, fontSize: 18, fontWeight: 700, color: C.green }}>+500%</div>
          <div style={{ fontSize: 10, color: C.muted }}>$5 → $30</div>
        </div>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.red + '08', border: `1px solid ${C.red}20`, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: C.red, fontWeight: 600, marginBottom: 4 }}>IF STOCK STAYS FLAT</div>
          <div style={{ fontSize: 11, color: C.textDim }}>Stays below $200</div>
          <div style={{ fontFamily: font.mono, fontSize: 18, fontWeight: 700, color: C.red }}>-100%</div>
          <div style={{ fontSize: 10, color: C.muted }}>$5 → $0</div>
        </div>
      </div>
    </div>
  );
}

function FuturesVisual() {
  return (
    <div>
      <p style={s.label}>How futures protect against price swings</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[
          { label: 'Today: Airline locks in oil at', value: '$80/bbl', icon: '✓', color: C.blue },
          { label: 'Scenario A: Oil spikes to', value: '$120/bbl', result: 'Airline protected — still pays $80', color: C.green },
          { label: 'Scenario B: Oil drops to', value: '$60/bbl', result: 'Airline overpays — but had certainty', color: C.gold },
        ].map((item, i) => (
          <div key={i} style={{ padding: '8px 10px', borderRadius: 6, background: item.result ? C.surface : C.blue + '10', borderLeft: `3px solid ${item.color}` }}>
            <div style={{ fontSize: 12, color: C.textDim }}>{item.label} <span style={{ fontFamily: font.mono, fontWeight: 600, color: item.color }}>{item.value}</span></div>
            {item.result && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{item.result}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// NEW VISUALS — VALUATION
// =====================================================

function TimeValueMoney() {
  return (
    <div>
      <p style={s.label}>$1,000 today vs $1,000 in the future</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 16, height: 100 }}>
        {[
          { label: 'Today', value: 1000, height: 90, color: C.green },
          { label: 'In 5 yrs', value: 621, height: 56, color: C.gold },
          { label: 'In 10 yrs', value: 386, height: 35, color: C.red },
        ].map(d => (
          <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontFamily: font.mono, fontSize: 12, fontWeight: 600, color: d.color }}>${d.value}</span>
            <div style={{ width: 44, height: d.height, background: d.color + '30', border: `1px solid ${d.color}50`, borderRadius: 4 }} />
            <span style={{ fontSize: 10, color: C.muted }}>{d.label}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 10, color: C.muted, textAlign: 'center', marginTop: 6 }}>Present value of $1,000 at 10% discount rate</p>
    </div>
  );
}

function EPSCalc() {
  return (
    <div>
      <p style={s.label}>Earnings Per Share calculation</p>
      <div style={s.equation}>
        <div style={{ ...s.eqBox, borderColor: C.green + '40', background: C.green + '08' }}>
          <span style={{ ...s.eqTitle, color: C.green }}>Net Income</span>
          <span style={s.eqVal}>$100B</span>
        </div>
        <span style={s.eqSign}>÷</span>
        <div style={{ ...s.eqBox, borderColor: C.blue + '40', background: C.blue + '10' }}>
          <span style={{ ...s.eqTitle, color: C.blue }}>Shares</span>
          <span style={s.eqVal}>15.2B</span>
        </div>
        <span style={s.eqSign}>=</span>
        <div style={{ ...s.eqBox, borderColor: C.gold + '40', background: C.gold + '10' }}>
          <span style={{ ...s.eqTitle, color: C.gold }}>EPS</span>
          <span style={s.eqVal}>$6.58</span>
        </div>
      </div>
      <p style={{ fontSize: 10, color: C.muted, textAlign: 'center', marginTop: 6 }}>Apple — fiscal year 2024</p>
    </div>
  );
}

function CompsTable() {
  const data = [
    { name: 'Company A', pe: 22, growth: '12%', verdict: '' },
    { name: 'Company B', pe: 20, growth: '11%', verdict: '' },
    { name: 'Company C', pe: 15, growth: '11%', verdict: 'Undervalued?' },
  ];
  return (
    <div>
      <p style={s.label}>Comparable companies — spot the value</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr>
            <th style={s.th}>Company</th>
            <th style={s.th}>P/E</th>
            <th style={s.th}>Growth</th>
            <th style={s.th}></th>
          </tr>
        </thead>
        <tbody>
          {data.map(d => (
            <tr key={d.name}>
              <td style={s.td}>{d.name}</td>
              <td style={{ ...s.td, fontFamily: font.mono, fontWeight: 600 }}>{d.pe}x</td>
              <td style={{ ...s.td, color: C.textDim }}>{d.growth}</td>
              <td style={{ ...s.td, color: C.green, fontWeight: 600, fontSize: 11 }}>{d.verdict}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EarningsSurprise() {
  const data = [
    { name: 'NVIDIA', expected: 4.60, actual: 5.16, color: C.green },
    { name: 'Netflix', expected: 0.70, actual: 0.59, color: C.red },
  ];
  return (
    <div>
      <p style={s.label}>Beat or miss — expectations are everything</p>
      {data.map(d => (
        <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, padding: '8px 10px', borderRadius: 8, background: d.color + '08', border: `1px solid ${d.color}20` }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.text, width: 56 }}>{d.name}</span>
          <div style={{ flex: 1, fontSize: 11, color: C.textDim }}>
            Est: <span style={{ fontFamily: font.mono }}>${d.expected.toFixed(2)}</span>
          </div>
          <div style={{ fontSize: 11 }}>
            Actual: <span style={{ fontFamily: font.mono, fontWeight: 700, color: d.color }}>${d.actual.toFixed(2)}</span>
          </div>
          <span style={{ fontSize: 14 }}>{d.actual > d.expected ? '↑' : '↓'}</span>
        </div>
      ))}
    </div>
  );
}

// =====================================================
// NEW VISUALS — FINANCIALS
// =====================================================

function RevenueComparison() {
  const data = [
    { name: 'Amazon', value: 600, color: C.gold },
    { name: 'Apple', value: 394, color: C.blue },
    { name: 'Facebook', value: 117, color: C.green },
  ];
  const max = 600;
  return (
    <div>
      <p style={s.label}>Revenue ($B) — top line, not bottom line</p>
      {data.map(d => (
        <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: C.textDim, width: 60, textAlign: 'right', flexShrink: 0 }}>{d.name}</span>
          <div style={{ flex: 1, height: 16, background: C.border, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${(d.value / max) * 100}%`, height: '100%', background: d.color + '50', borderRadius: 3 }} />
          </div>
          <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: d.color, width: 44 }}>${d.value}B</span>
        </div>
      ))}
    </div>
  );
}

function NetIncomeComparison() {
  const data = [
    { name: 'Ford', revenue: 135, income: 8.7 },
    { name: 'Home Depot', revenue: 147, income: 22.3 },
    { name: 'Facebook', revenue: 117, income: 46.7 },
  ];
  return (
    <div>
      <p style={s.label}>Revenue vs net income — margins matter</p>
      {data.map(d => (
        <div key={d.name} style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 11, color: C.textDim, marginBottom: 3 }}>{d.name}</div>
          <div style={{ display: 'flex', height: 14, borderRadius: 3, overflow: 'hidden', background: C.border }}>
            <div style={{ width: `${(d.income / d.revenue) * 100}%`, background: C.green + '60', borderRadius: 3 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginTop: 2 }}>
            <span style={{ color: C.muted }}>Rev: ${d.revenue}B</span>
            <span style={{ color: C.green, fontWeight: 600 }}>Profit: ${d.income}B ({((d.income / d.revenue) * 100).toFixed(0)}%)</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function COGSVisual() {
  return (
    <div>
      <p style={s.label}>Every dollar of revenue — where does it go?</p>
      <div style={{ display: 'flex', height: 32, borderRadius: 6, overflow: 'hidden', marginBottom: 6 }}>
        <div style={{ width: '57%', background: C.red + '50', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: C.text }}>COGS (57¢)</div>
        <div style={{ width: '43%', background: C.green + '40', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: C.text }}>Gross Profit (43¢)</div>
      </div>
      <p style={{ fontSize: 10, color: C.muted, textAlign: 'center' }}>Apple keeps 43¢ of every dollar after production costs</p>
    </div>
  );
}

function OpExBreakdown() {
  const items = [
    { label: 'R&D', value: 30, color: C.blue },
    { label: 'Sales & Admin', value: 25, color: C.gold },
  ];
  return (
    <div>
      <p style={s.label}>Apple operating expenses ($B)</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {items.map(d => (
          <div key={d.label} style={{ flex: 1, padding: '10px', borderRadius: 8, background: d.color + '10', border: `1px solid ${d.color}25`, textAlign: 'center' }}>
            <div style={{ fontFamily: font.mono, fontSize: 20, fontWeight: 700, color: d.color }}>${d.value}B</div>
            <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>{d.label}</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 10, color: C.muted, textAlign: 'center', marginTop: 6 }}>These come after gross profit, before net income</p>
    </div>
  );
}

function BuybackEffect() {
  return (
    <div>
      <p style={s.label}>How buybacks increase EPS</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.surface, border: `1px solid ${C.border}`, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: C.muted, marginBottom: 4 }}>Before buyback</div>
          <div style={{ fontSize: 11, color: C.textDim }}>$100B ÷ 16B shares</div>
          <div style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: C.text }}>$6.25</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 16, color: C.muted }}>→</div>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.green + '08', border: `1px solid ${C.green}20`, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: C.green, marginBottom: 4 }}>After buyback</div>
          <div style={{ fontSize: 11, color: C.textDim }}>$100B ÷ 15B shares</div>
          <div style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: C.green }}>$6.67</div>
        </div>
      </div>
      <p style={{ fontSize: 10, color: C.muted, textAlign: 'center', marginTop: 6 }}>Same profit, fewer shares = higher EPS</p>
    </div>
  );
}

// =====================================================
// NEW VISUALS — MACRO
// =====================================================

function FedDualMandate() {
  return (
    <div>
      <p style={s.label}>The Fed's dual mandate — a balancing act</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.blue + '10', border: `1px solid ${C.blue}25`, textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>↓</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.blue }}>Low inflation</div>
          <div style={{ fontSize: 10, color: C.muted }}>Target: 2%</div>
        </div>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.green + '08', border: `1px solid ${C.green}25`, textAlign: 'center' }}>
          <div style={{ fontSize: 22 }}>↓</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.green }}>Low unemployment</div>
          <div style={{ fontSize: 10, color: C.muted }}>Target: ~4%</div>
        </div>
      </div>
      <p style={{ fontSize: 10, color: C.muted, textAlign: 'center', marginTop: 6 }}>Fixing one often makes the other worse — raising rates kills inflation but can cause job losses</p>
    </div>
  );
}

function InflationTimeline() {
  const data = [
    { year: '2019', rate: 1.8 }, { year: '2020', rate: 1.2 }, { year: '2021', rate: 4.7 },
    { year: '2022', rate: 8.0 }, { year: '2023', rate: 4.1 }, { year: '2024', rate: 2.9 },
  ];
  return (
    <div>
      <p style={s.label}>US inflation rate — the 2022 spike</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 90, marginBottom: 4 }}>
        {data.map(d => (
          <div key={d.year} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, fontWeight: 600, color: d.rate > 4 ? C.red : C.green }}>{d.rate}%</span>
            <div style={{ width: 28, height: d.rate * 9, background: d.rate > 4 ? C.red + '50' : C.green + '40', borderRadius: 3 }} />
            <span style={{ fontSize: 9, color: C.muted }}>{d.year}</span>
          </div>
        ))}
      </div>
      <div style={{ borderTop: `1px dashed ${C.gold}40`, position: 'relative', marginTop: 4 }}>
        <span style={{ position: 'absolute', right: 0, top: -8, fontSize: 9, color: C.gold }}>2% target</span>
      </div>
    </div>
  );
}

function OilChain() {
  const chain = ['Oil price rises', 'Gas & fuel up', 'Shipping costs up', 'Food prices up', 'Inflation rises', 'Fed raises rates', 'Stocks fall'];
  return (
    <div>
      <p style={s.label}>The oil price domino effect</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {chain.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: i * 6 }}>
            <span style={{ fontSize: 10, color: i === 0 ? C.gold : i === chain.length - 1 ? C.red : C.muted }}>
              {i === 0 ? '●' : '→'}
            </span>
            <span style={{ fontSize: 12, color: i === 0 ? C.gold : i === chain.length - 1 ? C.red : C.textDim }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectorRotation() {
  const sectors = [
    { name: 'Energy', change: 20, color: C.green },
    { name: 'Utilities', change: 8, color: C.green },
    { name: 'Healthcare', change: 2, color: C.green },
    { name: 'Financials', change: -3, color: C.red },
    { name: 'Consumer', change: -8, color: C.red },
    { name: 'Tech', change: -12, color: C.red },
  ];
  return (
    <div>
      <p style={s.label}>Same market, different sectors — early 2026</p>
      {sectors.map(s2 => (
        <div key={s2.name} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, color: C.textDim, width: 64, textAlign: 'right', flexShrink: 0 }}>{s2.name}</span>
          <div style={{ flex: 1, display: 'flex', justifyContent: s2.change >= 0 ? 'flex-start' : 'flex-end' }}>
            <div style={{ width: `${Math.abs(s2.change) * 3}%`, minWidth: 4, height: 12, background: s2.color + '50', borderRadius: 2 }} />
          </div>
          <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: s2.color, width: 40 }}>
            {s2.change > 0 ? '+' : ''}{s2.change}%
          </span>
        </div>
      ))}
    </div>
  );
}

function TimeHorizon() {
  const data = [
    { start: 16, years: 49, final: 730000, color: C.green },
    { start: 25, years: 40, final: 280000, color: C.gold },
    { start: 35, years: 30, final: 105000, color: C.red },
  ];
  return (
    <div>
      <p style={s.label}>$5,000 invested once — starting age matters</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {data.map(d => (
          <div key={d.start} style={{ flex: 1, padding: '10px 6px', borderRadius: 8, background: d.color + '08', border: `1px solid ${d.color}20`, textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: d.color, fontWeight: 600 }}>Start at {d.start}</div>
            <div style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: d.color, margin: '4px 0' }}>
              {d.final >= 1000000 ? `$${(d.final/1000000).toFixed(1)}M` : `$${(d.final/1000).toFixed(0)}K`}
            </div>
            <div style={{ fontSize: 9, color: C.muted }}>{d.years} years to grow</div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 10, color: C.muted, textAlign: 'center', marginTop: 6 }}>At 10% avg return, retiring at 65</p>
    </div>
  );
}

function BubbleTimeline() {
  const bubbles = [
    { year: '2000', name: 'Dot-com', drop: '-78%' },
    { year: '2008', name: 'Housing', drop: '-57%' },
    { year: '2021', name: 'Meme/Crypto', drop: '-70%+' },
  ];
  return (
    <div>
      <p style={s.label}>Major bubbles — they all pop</p>
      <div style={{ display: 'flex', gap: 8 }}>
        {bubbles.map(b => (
          <div key={b.year} style={{ flex: 1, padding: '10px 6px', borderRadius: 8, background: C.red + '08', border: `1px solid ${C.red}20`, textAlign: 'center' }}>
            <div style={{ fontFamily: font.mono, fontSize: 12, color: C.muted }}>{b.year}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: C.text, margin: '4px 0' }}>{b.name}</div>
            <div style={{ fontFamily: font.mono, fontSize: 16, fontWeight: 700, color: C.red }}>{b.drop}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TariffImpact() {
  return (
    <div>
      <p style={s.label}>25% tariff on a $100 component</p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
        <div style={{ ...s.eqBox, borderColor: C.blue + '40', background: C.blue + '10' }}>
          <span style={{ ...s.eqTitle, color: C.blue }}>Import cost</span>
          <span style={s.eqVal}>$100</span>
        </div>
        <span style={s.eqSign}>+</span>
        <div style={{ ...s.eqBox, borderColor: C.red + '40', background: C.red + '08' }}>
          <span style={{ ...s.eqTitle, color: C.red }}>Tariff (25%)</span>
          <span style={s.eqVal}>$25</span>
        </div>
        <span style={s.eqSign}>=</span>
        <div style={{ ...s.eqBox, borderColor: C.gold + '40', background: C.gold + '10' }}>
          <span style={{ ...s.eqTitle, color: C.gold }}>New cost</span>
          <span style={s.eqVal}>$125</span>
        </div>
      </div>
    </div>
  );
}

function AlphaBeta() {
  const data = [
    { name: 'Utility Co.', beta: 0.5, color: C.blue },
    { name: 'S&P 500', beta: 1.0, color: C.textDim },
    { name: 'Tesla', beta: 2.0, color: C.red },
  ];
  return (
    <div>
      <p style={s.label}>Beta — volatility relative to the market</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 20, height: 90, marginBottom: 4 }}>
        {data.map(d => (
          <div key={d.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontFamily: font.mono, fontSize: 13, fontWeight: 700, color: d.color }}>{d.beta}x</span>
            <div style={{ width: 36, height: d.beta * 36, background: d.color + '30', border: `1px solid ${d.color}50`, borderRadius: 4 }} />
            <span style={{ fontSize: 10, color: C.muted }}>{d.name}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 10, color: C.muted, textAlign: 'center' }}>Market drops 5%: Utility -2.5%, Tesla -10%</p>
    </div>
  );
}

function HedgeFundFees() {
  return (
    <div>
      <p style={s.label}>The "2 and 20" fee structure</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.red + '08', border: `1px solid ${C.red}20`, textAlign: 'center' }}>
          <div style={{ fontFamily: font.mono, fontSize: 24, fontWeight: 700, color: C.red }}>2%</div>
          <div style={{ fontSize: 11, color: C.textDim }}>of your assets/year</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>$100K → $2K/yr fee</div>
        </div>
        <div style={{ flex: 1, padding: '10px', borderRadius: 8, background: C.red + '08', border: `1px solid ${C.red}20`, textAlign: 'center' }}>
          <div style={{ fontFamily: font.mono, fontSize: 24, fontWeight: 700, color: C.red }}>20%</div>
          <div style={{ fontSize: 11, color: C.textDim }}>of any profits</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>$10K gain → $2K fee</div>
        </div>
      </div>
      <p style={{ fontSize: 10, color: C.muted, textAlign: 'center', marginTop: 6 }}>vs. index fund: 0.03% (~$30/yr on $100K)</p>
    </div>
  );
}

function MemeStockChart() {
  const data = [
    { label: 'Fundamentals', value: 20, color: C.blue },
    { label: 'Reddit hype peak', value: 483, color: C.red },
    { label: 'Reality returns', value: 25, color: C.muted },
  ];
  return (
    <div>
      <p style={s.label}>GameStop: hype vs reality</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 20, height: 100 }}>
        {data.map(d => (
          <div key={d.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontFamily: font.mono, fontSize: 11, fontWeight: 600, color: d.color }}>${d.value}</span>
            <div style={{ width: 40, height: Math.max((d.value / 483) * 88, 6), background: d.color + '40', border: `1px solid ${d.color}60`, borderRadius: 4 }} />
            <span style={{ fontSize: 9, color: C.muted, textAlign: 'center', maxWidth: 60 }}>{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// NEW VISUALS — CAREERS
// =====================================================

function CareerMap() {
  const paths = [
    { name: 'Wall Street', roles: ['Investment Banking', 'Sales & Trading', 'Equity Research'], color: C.gold },
    { name: 'Buy Side', roles: ['Asset Management', 'Private Equity', 'Venture Capital'], color: C.green },
    { name: 'Advisory', roles: ['Management Consulting', 'Financial Advising'], color: C.blue },
    { name: 'Corporate', roles: ['Corporate Finance', 'Commercial Banking', 'Fintech'], color: '#8b5cf6' },
  ];
  return (
    <div>
      <p style={s.label}>Finance career ecosystem</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {paths.map(p => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', borderRadius: 6, borderLeft: `3px solid ${p.color}` }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: p.color, width: 56, flexShrink: 0 }}>{p.name}</span>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {p.roles.map(r => (
                <span key={r} style={{ fontSize: 10, color: C.textDim, background: C.surfaceAlt, padding: '2px 6px', borderRadius: 4 }}>{r}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function IBTimeline() {
  const steps = [
    { year: 'Year 1-2', role: 'Analyst', desc: '80-100 hr weeks, Excel models', color: C.blue },
    { year: 'Year 3-4', role: 'Associate', desc: 'Manage analysts, client interaction', color: C.green },
    { year: 'Year 5+', role: 'VP → MD', desc: 'Win deals, build relationships', color: C.gold },
    { year: 'Exit', role: 'PE / Hedge Fund / MBA', desc: 'Most leave after 2-3 years', color: '#8b5cf6' },
  ];
  return (
    <div>
      <p style={s.label}>Investment banking career ladder</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {steps.map((st, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, borderLeft: `3px solid ${st.color}`, background: st.color + '08' }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: st.color, width: 40, flexShrink: 0 }}>{st.year}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: C.text, width: 70, flexShrink: 0 }}>{st.role}</span>
            <span style={{ fontSize: 10, color: C.muted }}>{st.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsultingSpecialties() {
  const specs = [
    { name: 'Risk Consulting', desc: 'What could go wrong?', color: C.red },
    { name: 'Compliance', desc: 'Following the rules', color: C.blue },
    { name: 'M&A Due Diligence', desc: 'Is this deal safe?', color: C.gold },
    { name: 'Strategy', desc: 'Where should we go?', color: C.green },
  ];
  return (
    <div>
      <p style={s.label}>One hat, many specialties</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        {specs.map(sp => (
          <div key={sp.name} style={{ padding: '8px', borderRadius: 8, background: sp.color + '08', border: `1px solid ${sp.color}20`, textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: sp.color }}>{sp.name}</div>
            <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{sp.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MAProcess() {
  const steps = ['Target identified', 'Due diligence', 'Deal negotiation', 'Regulatory review', 'Shareholder vote', 'Deal closes'];
  return (
    <div>
      <p style={s.label}>M&A process — from idea to close</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 10px', borderRadius: 6, background: i === steps.length - 1 ? C.green + '10' : C.surface, borderLeft: `3px solid ${i === steps.length - 1 ? C.green : C.border}` }}>
            <span style={{ fontFamily: font.mono, fontSize: 10, color: C.muted, width: 14 }}>{i + 1}</span>
            <span style={{ fontSize: 12, color: i === steps.length - 1 ? C.green : C.textDim }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// === STYLES ===
const s = {
  wrapper: {
    background: 'transparent',
    border: 'none',
    borderTop: `1px solid ${C.border}50`,
    borderBottom: `1px solid ${C.border}50`,
    borderRadius: 0,
    padding: '16px 0',
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
    padding: '6px 8px',
    borderRadius: 8,
    border: '1px solid',
    minWidth: 56,
  },
  eqTitle: {
    fontSize: 10,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  eqVal: {
    fontFamily: font.mono,
    fontSize: 12,
    fontWeight: 700,
    color: C.text,
    marginTop: 2,
  },
  eqSign: {
    fontFamily: font.mono,
    fontSize: 14,
    fontWeight: 700,
    color: C.muted,
  },
  // Table styles
  th: {
    fontSize: 10,
    fontWeight: 600,
    color: C.muted,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    padding: '6px 8px',
    textAlign: 'left',
    borderBottom: `1px solid ${C.border}`,
  },
  td: {
    fontSize: 12,
    color: C.text,
    padding: '6px 8px',
    borderBottom: `1px solid ${C.border}20`,
  },
};
