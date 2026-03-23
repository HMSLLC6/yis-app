// Bull or Bear — scenario-based quiz questions
// Each question maps to a concept from the learning modules
// answer: 'bull' = market/stock goes UP, 'bear' = market/stock goes DOWN

export const QUESTIONS = [
  // === MODULE 1: FOUNDATIONS ===
  {
    headline: 'Apple announces a $100 billion stock buyback program.',
    answer: 'bull',
    explanation: 'Buybacks reduce shares outstanding, which increases EPS and signals the company believes its stock is undervalued. Investors love it.',
    conceptId: 'shares-outstanding',
  },
  {
    headline: 'A pharmaceutical company\'s CEO is arrested for fraud.',
    answer: 'bear',
    explanation: 'Leadership scandal is a major micro factor — it destroys investor confidence and raises questions about the company\'s reported financials.',
    conceptId: 'investor-bias',
  },
  {
    headline: 'Tesla announces a 5-for-1 stock split.',
    answer: 'bull',
    explanation: 'Stock splits don\'t change the company\'s value, but they make shares more accessible to retail investors. Historically, stocks tend to rise after split announcements.',
    conceptId: 'stock',
  },
  {
    headline: 'A company cuts its quarterly dividend by 50%.',
    answer: 'bear',
    explanation: 'Dividend cuts signal that management is worried about cash flow. Income-focused investors sell, and it raises red flags about the company\'s health.',
    conceptId: 'dividend',
  },
  {
    headline: 'You hear about a "can\'t miss" stock tip from a stranger at a party.',
    answer: 'bear',
    explanation: 'By the time investment tips reach casual conversation, the smart money has already acted. This is the efficient market at work — and a classic investor bias trap.',
    conceptId: 'investor-bias',
  },
  {
    headline: 'GameStop is trending on Reddit with rocket emojis.',
    answer: 'bull',
    explanation: 'Short-term, social media hype can drive meme stocks sharply higher through coordinated buying and short squeezes. But it rarely lasts — this is speculation, not investing.',
    conceptId: 'meme-stock',
  },
  {
    headline: 'A company reports that short interest in its stock has reached 40% of float.',
    answer: 'bull',
    explanation: 'Extremely high short interest sets up potential for a short squeeze — if the stock starts rising, short sellers are forced to buy back shares, pushing the price even higher.',
    conceptId: 'short-squeeze',
  },

  // === MODULE 2: VEHICLES ===
  {
    headline: 'Vanguard announces it\'s lowering ETF fees from 0.04% to 0.03%.',
    answer: 'bull',
    explanation: 'Lower fees mean more of your returns stay in your pocket. Even tiny fee reductions compound into significant savings over decades.',
    conceptId: 'expense-ratio',
  },
  {
    headline: 'A popular hedge fund charges 2% management fees and 20% of profits.',
    answer: 'bear',
    explanation: 'The "2-and-20" fee structure is a massive drag on returns. Buffett proved that most hedge funds underperform a simple index fund after fees.',
    conceptId: 'hedge-fund',
  },
  {
    headline: 'Warren Buffett recommends putting 90% of your money in an S&P 500 index fund.',
    answer: 'bull',
    explanation: 'Buffett\'s endorsement of passive investing reflects decades of evidence that low-cost index funds beat most active managers over time.',
    conceptId: 'index-fund',
  },
  {
    headline: 'The Magnificent 7 tech stocks drop 10% in a single week.',
    answer: 'bear',
    explanation: 'Because the S&P 500 is market-cap weighted, the Magnificent 7 (Apple, Microsoft, NVIDIA, Amazon, Alphabet, Meta, Tesla) make up ~30% of the index. When they fall, the whole market feels it.',
    conceptId: 'sp500',
  },

  // === MODULE 3: VALUATION ===
  {
    headline: 'NVIDIA reports earnings of $5.16 per share vs. the expected $4.60.',
    answer: 'bull',
    explanation: 'Beating consensus estimates by 12% is a strong positive earnings surprise. The stock typically jumps because investors reprice their expectations upward.',
    conceptId: 'earnings-surprise',
  },
  {
    headline: 'Netflix reports earnings of $0.59 vs. the expected $0.70.',
    answer: 'bear',
    explanation: 'Missing estimates — even while still profitable — is a negative earnings surprise. Markets care about expectations, not just absolute numbers.',
    conceptId: 'earnings-surprise',
  },
  {
    headline: 'A tech company is trading at 15x P/E while its competitors trade at 22x.',
    answer: 'bull',
    explanation: 'If the company has similar growth to its comps, a lower P/E ratio suggests it might be undervalued. Value investors look for exactly this kind of discount.',
    conceptId: 'pe-ratio',
  },
  {
    headline: 'A company\'s stock is trading at 80x earnings with slowing revenue growth.',
    answer: 'bear',
    explanation: 'A high P/E ratio is justified by high growth expectations. When growth slows, the stock often drops sharply as investors realize the premium isn\'t deserved.',
    conceptId: 'pe-ratio',
  },
  {
    headline: 'Goldman Sachs upgrades a stock from "Hold" to "Buy" with a 40% price target increase.',
    answer: 'bull',
    explanation: 'Analyst upgrades from major firms move stock prices, especially when accompanied by a big price target increase. Institutional investors pay attention to these calls.',
    conceptId: 'equity-research',
  },

  // === MODULE 4: FINANCIALS ===
  {
    headline: 'A company reports record revenue but its net income dropped 30%.',
    answer: 'bear',
    explanation: 'Revenue is the top line, but net income is what matters. Rising revenue with falling profit means costs are growing faster than sales — a red flag.',
    conceptId: 'net-income',
  },
  {
    headline: 'A company\'s gross margins expand from 35% to 42% year-over-year.',
    answer: 'bull',
    explanation: 'Improving gross margins mean the company is earning more on each dollar of sales — either through pricing power or cost efficiency. Investors love margin expansion.',
    conceptId: 'gross-margin',
  },
  {
    headline: 'A retailer reports that accounts receivable doubled while revenue stayed flat.',
    answer: 'bear',
    explanation: 'Rising accounts receivable without revenue growth means customers are paying slower. This can signal financial stress among the company\'s clients and future cash flow problems.',
    conceptId: 'accounts-receivable',
  },
  {
    headline: 'Apple reports $100 billion in free cash flow for the year.',
    answer: 'bull',
    explanation: 'Massive free cash flow means Apple can buy back shares, pay dividends, make acquisitions, or invest in growth — all good for shareholders. Cash flow is king.',
    conceptId: 'cash-flow-statement',
  },
  {
    headline: 'A company takes on $5 billion in new long-term debt to fund operations.',
    answer: 'bear',
    explanation: 'Taking on significant debt to fund day-to-day operations (not growth investments) suggests the company can\'t sustain itself from earnings. More liabilities, more risk.',
    conceptId: 'liabilities',
  },

  // === MODULE 5: MACRO ===
  {
    headline: 'The Federal Reserve cuts interest rates by 0.50%.',
    answer: 'bull',
    explanation: 'Rate cuts make borrowing cheaper, encouraging spending and investment. Stocks typically rally on rate cuts because future earnings are worth more when discount rates fall.',
    conceptId: 'fed-funds-rate',
  },
  {
    headline: 'The Fed signals it will raise rates three more times this year.',
    answer: 'bear',
    explanation: 'Forward guidance about more rate hikes means borrowing gets more expensive, corporate profits face pressure, and future cash flows are worth less today.',
    conceptId: 'federal-reserve',
  },
  {
    headline: 'Inflation comes in at 8.5%, well above the Fed\'s 2% target.',
    answer: 'bear',
    explanation: 'High inflation erodes purchasing power and almost guarantees the Fed will raise interest rates to cool the economy — a double negative for stocks.',
    conceptId: 'inflation',
  },
  {
    headline: 'Oil prices surge 25% after conflict erupts in the Middle East.',
    answer: 'bear',
    explanation: 'Oil spikes raise costs across the entire economy — transportation, manufacturing, food production. Higher costs mean lower profit margins and higher inflation. Bad for most stocks (except energy companies).',
    conceptId: 'oil-prices',
  },
  {
    headline: 'The US announces new 25% tariffs on $300 billion of imported goods.',
    answer: 'bear',
    explanation: 'Tariffs raise costs for companies that import materials or products, create uncertainty for business planning, and often trigger retaliatory tariffs from other countries.',
    conceptId: 'tariffs',
  },
  {
    headline: 'A ceasefire is announced in a major international conflict.',
    answer: 'bull',
    explanation: 'Reduced geopolitical risk removes uncertainty from markets. Oil prices typically drop, defense spending concerns ease, and investors move back into riskier assets.',
    conceptId: 'geopolitical-risk',
  },
  {
    headline: 'The unemployment rate drops to 3.4%, a 50-year low.',
    answer: 'bull',
    explanation: 'Low unemployment means consumers have jobs and money to spend, which drives corporate revenue. However, if it\'s too low, the Fed may worry about inflation — a nuance worth understanding.',
    conceptId: 'federal-reserve',
  },
  {
    headline: 'Inflation falls to 2.1%, right at the Fed\'s target.',
    answer: 'bull',
    explanation: 'Inflation at target means the Fed is less likely to raise rates — and might even cut them. This "goldilocks" scenario is ideal for stocks.',
    conceptId: 'inflation',
  },
  {
    headline: 'Energy stocks surge while tech stocks plummet on the same day.',
    answer: 'bull',
    explanation: 'Trick question — this is sector rotation, not a broad market move. Different sectors respond differently to the same macro events. Diversification across sectors protects you.',
    conceptId: 'sector',
  },
  {
    headline: 'A market bubble in AI stocks pops after companies report disappointing revenue.',
    answer: 'bear',
    explanation: 'When reality fails to meet the hype, overvalued stocks can crash hard. Bubbles inflate slowly and pop quickly — exactly what happened with dot-com stocks in 2000.',
    conceptId: 'market-bubble',
  },

  // === MODULE 6: CAREERS ===
  {
    headline: 'Two major banks announce a $50 billion merger.',
    answer: 'bull',
    explanation: 'M&A announcements typically push the target company\'s stock up (the acquirer pays a premium) and generate massive fees for investment bankers, consultants, and lawyers.',
    conceptId: 'mergers-acquisitions',
  },
  {
    headline: 'Regulators block a proposed merger citing anti-competitive concerns.',
    answer: 'bear',
    explanation: 'When regulators kill a deal, the target stock drops (it loses the acquisition premium) and the acquirer\'s stock often rises (investors thought the deal was overpriced).',
    conceptId: 'mergers-acquisitions',
  },
  {
    headline: 'A bank fails its annual compliance audit and faces a $3 billion fine.',
    answer: 'bear',
    explanation: 'Compliance failures destroy shareholder value through fines, legal costs, and reputational damage. This is exactly the kind of risk that management consultants help banks prevent.',
    conceptId: 'management-consulting',
  },
];

// Shuffle helper
export function shuffleQuestions() {
  const shuffled = [...QUESTIONS];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
