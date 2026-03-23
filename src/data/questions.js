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

  // ============================================================
  // REAL-WORLD EVENTS (2008–2025) — things that happened while
  // these students have been alive
  // ============================================================

  // --- 2008 FINANCIAL CRISIS ---
  {
    headline: 'September 2008: Lehman Brothers files for bankruptcy — the largest in US history.',
    answer: 'bear',
    explanation: 'Lehman\'s collapse triggered a global panic. The S&P 500 fell 57% from peak to trough. Banks stopped lending to each other, and the entire financial system nearly froze.',
    conceptId: 'risk-return',
  },
  {
    headline: 'October 2008: The US government announces a $700 billion bank bailout (TARP).',
    answer: 'bull',
    explanation: 'Government intervention restored some confidence in the banking system. Markets initially rallied on the news, though the full recovery took years. TARP was eventually repaid with interest.',
    conceptId: 'federal-reserve',
  },
  {
    headline: 'March 2009: The Fed drops interest rates to near 0% and begins "quantitative easing."',
    answer: 'bull',
    explanation: 'Near-zero rates and QE (the Fed buying bonds to inject money into the economy) flooded markets with cheap capital. The S&P 500 bottomed on March 9, 2009 and began a decade-long bull run.',
    conceptId: 'fed-funds-rate',
  },
  {
    headline: 'Warren Buffett invests $5 billion in Goldman Sachs during the 2008 panic.',
    answer: 'bull',
    explanation: '"Be greedy when others are fearful." While everyone was selling, Buffett got a sweetheart deal — preferred stock paying 10% dividends plus warrants. By 2013, he\'d more than doubled his money.',
    conceptId: 'value-investing',
  },

  // --- 2010s RECOVERY & GROWTH ---
  {
    headline: 'May 2010: The "Flash Crash" — the Dow drops 1,000 points in 10 minutes, then recovers.',
    answer: 'bear',
    explanation: 'Algorithmic trading caused a cascading sell-off that erased $1 trillion in market value in minutes. It recovered quickly, but exposed how automated trading can amplify volatility.',
    conceptId: 'efficient-market',
  },
  {
    headline: 'August 2011: Standard & Poor\'s downgrades US debt from AAA for the first time ever.',
    answer: 'bear',
    explanation: 'The downgrade shook global confidence in US Treasuries — the "safest" asset in the world. Stocks dropped sharply on the unprecedented move, though ironically investors still fled TO Treasuries for safety.',
    conceptId: 'bond',
  },
  {
    headline: 'May 2012: Facebook goes public at $38 per share in the most anticipated IPO in years.',
    answer: 'bear',
    explanation: 'Facebook\'s IPO was hyped but flopped — technical glitches, overpricing, and questions about mobile revenue sent the stock below $20 within months. It took over a year to recover. Lesson: IPO hype doesn\'t equal returns.',
    conceptId: 'valuation',
  },
  {
    headline: 'September 2014: Alibaba\'s IPO raises $25 billion — the largest IPO in history.',
    answer: 'bull',
    explanation: 'Alibaba opened at $92.70 vs. its $68 IPO price, a 36% pop on day one. Investors were eager to own a piece of China\'s e-commerce giant. The massive demand reflected global appetite for growth.',
    conceptId: 'stock',
  },
  {
    headline: 'June 2015: Apple is added to the Dow Jones Industrial Average.',
    answer: 'bull',
    explanation: 'Inclusion in a major index means index funds must buy the stock, creating automatic demand. It also signals that the company has reached "blue chip" status.',
    conceptId: 'dow-jones',
  },

  // --- 2015-2019 ---
  {
    headline: 'June 2016: Britain votes to leave the European Union (Brexit).',
    answer: 'bear',
    explanation: 'Brexit shocked markets — the British pound fell 8% overnight (its biggest drop ever), and global stocks sold off on fears of economic disruption. The S&P 500 dropped 3.6% before recovering.',
    conceptId: 'geopolitical-risk',
  },
  {
    headline: 'November 2016: Donald Trump wins the presidential election.',
    answer: 'bull',
    explanation: 'Despite pre-election fears, stocks rallied sharply on expectations of tax cuts, deregulation, and infrastructure spending. The "Trump bump" added 5% to the S&P 500 in weeks.',
    conceptId: 'macro-vs-micro',
  },
  {
    headline: 'December 2017: Congress passes the Tax Cuts and Jobs Act, cutting corporate tax rates from 35% to 21%.',
    answer: 'bull',
    explanation: 'Lower corporate taxes directly increase net income (the bottom line). If a company earning $100M suddenly pays 21% instead of 35%, that\'s $14M more profit — flowing straight to EPS.',
    conceptId: 'net-income',
  },
  {
    headline: 'December 2018: The Fed raises rates for the 4th time that year. Trump tweets "the Fed has gone crazy."',
    answer: 'bear',
    explanation: 'The S&P 500 fell nearly 20% in Q4 2018 as investors feared the Fed was raising rates too aggressively. It was the worst December since the Great Depression. The Fed paused hikes in 2019.',
    conceptId: 'fed-funds-rate',
  },
  {
    headline: 'March 2019: Lyft goes public, the first major ride-sharing IPO.',
    answer: 'bear',
    explanation: 'Lyft priced at $72 but fell below $60 within days. The company was losing billions annually with no clear path to profitability. Investors started questioning whether "growth at all costs" companies deserved premium valuations.',
    conceptId: 'pe-ratio',
  },
  {
    headline: 'August 2019: The yield curve inverts — short-term bonds pay more than long-term bonds.',
    answer: 'bear',
    explanation: 'An inverted yield curve has preceded every US recession in the last 50 years. When short-term rates exceed long-term rates, it signals that investors expect economic trouble ahead.',
    conceptId: 'bond',
  },

  // --- 2020 COVID ---
  {
    headline: 'March 2020: The WHO declares COVID-19 a global pandemic.',
    answer: 'bear',
    explanation: 'The S&P 500 crashed 34% in just 23 trading days — the fastest bear market in history. Businesses shut down, unemployment spiked to 14.7%, and fear was everywhere.',
    conceptId: 'geopolitical-risk',
  },
  {
    headline: 'March 2020: The Fed slashes rates to zero and launches unlimited QE.',
    answer: 'bull',
    explanation: 'The Fed went all-in — zero rates, unlimited bond buying, corporate credit facilities. This massive intervention stopped the bleeding and markets began recovering almost immediately.',
    conceptId: 'federal-reserve',
  },
  {
    headline: 'April 2020: Oil futures briefly go NEGATIVE — sellers pay buyers to take oil off their hands.',
    answer: 'bear',
    explanation: 'With the economy locked down, oil demand collapsed. Storage facilities were full. WTI crude futures hit -$37.63/barrel — meaning producers literally paid people to take their oil. An unprecedented event.',
    conceptId: 'futures',
  },
  {
    headline: 'Zoom Video reports revenue growth of 355% as the world shifts to remote work.',
    answer: 'bull',
    explanation: 'COVID created instant massive demand for video conferencing. Zoom became a verb. The stock went from $70 to $560 in 2020 as investors bet on the permanent shift to remote work.',
    conceptId: 'revenue',
  },
  {
    headline: 'August 2020: Apple becomes the first US company worth $2 trillion.',
    answer: 'bull',
    explanation: 'Hitting $2 trillion signaled extraordinary investor confidence. Apple\'s combination of massive revenue, high margins, and a loyal ecosystem made it the definition of a "wonderful company at a fair price."',
    conceptId: 'market-cap-weight',
  },
  {
    headline: 'Congress passes a $2.2 trillion COVID stimulus bill with $1,200 checks for most Americans.',
    answer: 'bull',
    explanation: 'Massive fiscal stimulus puts money directly in consumers\' pockets, boosting spending and corporate revenue. Much of the stimulus money also flowed into the stock market, especially from younger investors on Robinhood.',
    conceptId: 'macro-vs-micro',
  },

  // --- 2021 MEME STOCKS & EXCESS ---
  {
    headline: 'January 2021: Reddit\'s WallStreetBets drives GameStop from $20 to $483 in two weeks.',
    answer: 'bull',
    explanation: 'The GameStop short squeeze became the defining market event of 2021. Retail investors coordinated on Reddit to squeeze hedge funds with massive short positions. Melvin Capital lost 53% in January alone.',
    conceptId: 'short-squeeze',
  },
  {
    headline: 'January 2021: Robinhood restricts buying of GameStop and AMC.',
    answer: 'bear',
    explanation: 'When Robinhood halted buy orders (but allowed selling), GameStop crashed from $483 to $90 in days. Retail investors were furious, and Congress held hearings. The episode raised major questions about market fairness.',
    conceptId: 'meme-stock',
  },
  {
    headline: 'Coinbase goes public via direct listing, valued at $86 billion.',
    answer: 'bull',
    explanation: 'The first major crypto exchange to go public, Coinbase\'s listing was seen as legitimizing cryptocurrency as an asset class. The stock opened 52% above its reference price on massive demand.',
    conceptId: 'fintech',
  },
  {
    headline: 'November 2021: Rivian goes public and briefly reaches a $150 billion market cap — while selling fewer than 200 vehicles.',
    answer: 'bear',
    explanation: 'A company worth more than Ford while selling almost no cars? This was peak 2021 speculation. Rivian\'s stock dropped over 80% in the following year as reality caught up with the hype.',
    conceptId: 'market-bubble',
  },
  {
    headline: 'Tesla joins the S&P 500 in December 2020, forcing index funds to buy $80 billion of stock.',
    answer: 'bull',
    explanation: 'S&P 500 inclusion means every index fund tracking the S&P must buy the stock. With Tesla\'s massive market cap, this created enormous forced demand — the stock rose 70% in the two months around inclusion.',
    conceptId: 'index-fund',
  },

  // --- 2022 CRASH & INFLATION ---
  {
    headline: 'January 2022: The Fed signals it will raise rates aggressively to fight 7% inflation.',
    answer: 'bear',
    explanation: 'The pivot from "transitory inflation" to aggressive rate hikes crushed growth stocks. The Nasdaq fell 33% in 2022 as investors repriced every company dependent on cheap capital.',
    conceptId: 'inflation',
  },
  {
    headline: 'February 2022: Russia invades Ukraine.',
    answer: 'bear',
    explanation: 'The invasion triggered a global commodity shock — oil, wheat, and natural gas prices spiked. European stocks crashed. The S&P 500 fell on fears of broader conflict and energy disruption.',
    conceptId: 'geopolitical-risk',
  },
  {
    headline: 'May 2022: Netflix loses subscribers for the first time in a decade.',
    answer: 'bear',
    explanation: 'Netflix lost 200,000 subscribers and the stock dropped 35% in one day. Growth companies live and die by their growth metrics — when the growth story breaks, the premium evaporates instantly.',
    conceptId: 'earnings-surprise',
  },
  {
    headline: 'June 2022: Inflation hits 9.1% — a 40-year high.',
    answer: 'bear',
    explanation: 'The highest inflation since 1981 guaranteed the Fed would keep raising rates. Stocks, bonds, and crypto all fell together — one of the worst first halves of a year in market history.',
    conceptId: 'inflation',
  },
  {
    headline: 'November 2022: FTX, the third-largest crypto exchange, collapses in days.',
    answer: 'bear',
    explanation: 'FTX\'s $32 billion valuation went to zero when it was revealed that customer funds had been used to cover losses at a sister company. CEO Sam Bankman-Fried was later convicted of fraud. It crushed confidence in the entire crypto industry.',
    conceptId: 'operational-risk',
  },
  {
    headline: 'Meta (Facebook) lays off 11,000 employees — 13% of its workforce.',
    answer: 'bull',
    explanation: 'Counterintuitively, layoff announcements often boost stock prices. Wall Street sees cost-cutting as improving future profitability. Meta\'s stock had already dropped 75% — the layoffs signaled a return to financial discipline.',
    conceptId: 'operating-expenses',
  },

  // --- 2023 RECOVERY ---
  {
    headline: 'March 2023: Silicon Valley Bank collapses in 48 hours after a bank run.',
    answer: 'bear',
    explanation: 'SVB was the second-largest bank failure in US history. Depositors withdrew $42 billion in one day after learning the bank had massive unrealized losses on its bond portfolio. It triggered fears of a broader banking crisis.',
    conceptId: 'risk-return',
  },
  {
    headline: 'The FDIC guarantees all deposits at Silicon Valley Bank, even above the $250K limit.',
    answer: 'bull',
    explanation: 'The government\'s decision to backstop all deposits calmed panic and prevented bank runs at other institutions. Markets stabilized once it was clear the government wouldn\'t let the crisis spread.',
    conceptId: 'federal-reserve',
  },
  {
    headline: 'May 2023: NVIDIA reports quarterly revenue of $7.2 billion vs. expected $6.5 billion, driven by AI chip demand.',
    answer: 'bull',
    explanation: 'This earnings report launched the AI investment mania. NVIDIA\'s stock jumped 24% in one day, adding $184 billion in market value — the largest single-day gain for any company in history at that time.',
    conceptId: 'earnings-surprise',
  },
  {
    headline: 'The "Magnificent 7" stocks account for essentially all of the S&P 500\'s gains in 2023.',
    answer: 'bull',
    explanation: 'The S&P 500 rose 24% in 2023, but strip out the Magnificent 7 and the rest of the index barely moved. This extreme concentration highlighted the risk of market-cap weighted indexes.',
    conceptId: 'sp500',
  },
  {
    headline: 'October 2023: The 10-year Treasury yield hits 5% for the first time since 2007.',
    answer: 'bear',
    explanation: 'High bond yields compete with stocks for investor capital. When you can earn 5% risk-free in Treasuries, the "risk premium" needed to justify owning stocks goes up, pushing stock prices down.',
    conceptId: 'bond',
  },

  // --- 2024-2025 ---
  {
    headline: 'January 2024: The SEC approves Bitcoin ETFs for the first time.',
    answer: 'bull',
    explanation: 'Bitcoin ETF approval brought cryptocurrency into the mainstream financial system. Billions flowed in from institutional investors who previously couldn\'t hold crypto directly. Bitcoin surged past $70,000.',
    conceptId: 'etf',
  },
  {
    headline: 'NVIDIA\'s market cap passes $3 trillion, briefly making it the most valuable company in the world.',
    answer: 'bull',
    explanation: 'NVIDIA\'s dominance in AI chips made it the poster child of the AI boom. Revenue was doubling every quarter. Whether this pace is sustainable is the $3 trillion question.',
    conceptId: 'market-bubble',
  },
  {
    headline: 'September 2024: The Fed cuts rates for the first time in 4 years.',
    answer: 'bull',
    explanation: 'The first rate cut after a hiking cycle signals the Fed believes inflation is under control. Markets rally because cheaper borrowing supports growth, housing, and corporate investment.',
    conceptId: 'fed-funds-rate',
  },
  {
    headline: 'Boeing\'s stock drops after a door panel blows off a 737 MAX mid-flight.',
    answer: 'bear',
    explanation: 'A dramatic safety failure in a company\'s core product is a textbook micro factor. Boeing faced groundings, investigations, and massive reputational damage — operational risk in the most literal sense.',
    conceptId: 'macro-vs-micro',
  },
  {
    headline: 'Disney+ reaches 150 million subscribers but still isn\'t profitable.',
    answer: 'bear',
    explanation: 'Subscriber growth means nothing if you\'re losing money on every subscriber. Investors learned this lesson with Netflix: eventually, you need to show a path to profitability. Revenue without profit is a red flag.',
    conceptId: 'net-income',
  },
  {
    headline: 'Costco reports same-store sales growth of 9% and raises its membership fee for the first time in 7 years.',
    answer: 'bull',
    explanation: 'Strong same-store sales prove organic demand, and Costco\'s ability to raise membership fees without losing customers demonstrates extraordinary pricing power — a quality Buffett prizes above all.',
    conceptId: 'revenue',
  },
  {
    headline: 'Nike\'s stock drops 20% after the company warns of slowing demand in China and North America.',
    answer: 'bear',
    explanation: 'Forward guidance matters as much as current results. When a company warns about future weakness, investors reprice the stock immediately — stock prices reflect expected future performance, not past results.',
    conceptId: 'valuation',
  },

  // --- TIMELESS SCENARIOS ---
  {
    headline: 'A 16-year-old invests $1,000 in an S&P 500 index fund and doesn\'t touch it for 45 years.',
    answer: 'bull',
    explanation: 'At the historical average return of ~10% per year, $1,000 becomes roughly $73,000 in 45 years through compound growth alone. Time is the most powerful force in investing, and starting young is an enormous advantage.',
    conceptId: 'compound-interest',
  },
  {
    headline: 'An investor panics during a market crash and sells everything at the bottom.',
    answer: 'bear',
    explanation: 'Selling during a crash locks in your losses permanently. The S&P 500 has recovered from every crash in history — but only for investors who stayed invested. This is why Buffett says: "The stock market transfers money from the impatient to the patient."',
    conceptId: 'time-horizon',
  },
  {
    headline: 'An investor puts 100% of their portfolio into a single stock they "believe in."',
    answer: 'bear',
    explanation: 'Even great companies can collapse. Enron, Lehman Brothers, and FTX were all "sure things" until they weren\'t. Diversification is the only free lunch in investing.',
    conceptId: 'diversification',
  },
  {
    headline: 'A company announces it will start paying its first-ever quarterly dividend.',
    answer: 'bull',
    explanation: 'Initiating a dividend signals that management is confident in stable future cash flows. It also attracts a new class of income-focused investors, broadening demand for the stock.',
    conceptId: 'dividend',
  },
  {
    headline: 'Amazon reports $580 billion in revenue but only $21 billion in net income.',
    answer: 'bull',
    explanation: 'Amazon intentionally runs thin margins, reinvesting everything into growth (AWS, logistics, new markets). Investors accept low margins because revenue growth is massive and the reinvestment expands Amazon\'s competitive moat.',
    conceptId: 'gross-margin',
  },
  {
    headline: 'A company\'s operating expenses grow 30% while revenue grows only 5%.',
    answer: 'bear',
    explanation: 'When costs grow 6x faster than revenue, profit margins are getting crushed. Unless the spending is a short-term investment that will pay off later, this trend is unsustainable.',
    conceptId: 'operating-expenses',
  },
  {
    headline: 'A company\'s beta is 2.0 and the market drops 5% today.',
    answer: 'bear',
    explanation: 'Beta measures how much a stock moves relative to the market. A beta of 2.0 means if the market drops 5%, this stock is expected to drop about 10%. High beta = high volatility in both directions.',
    conceptId: 'alpha-beta',
  },
  {
    headline: 'A biotech company announces its cancer drug passed Phase 3 FDA trials.',
    answer: 'bull',
    explanation: 'Phase 3 success is the final major hurdle before FDA approval. Biotech stocks can double or triple on positive Phase 3 data because it means billions in future revenue are now much more likely.',
    conceptId: 'macro-vs-micro',
  },
  {
    headline: 'China announces new export restrictions on rare earth minerals.',
    answer: 'bear',
    explanation: 'Rare earth minerals are essential for electronics, EVs, and defense technology. Export restrictions create supply chain fears and raise costs for manufacturers worldwide — a macro factor that ripples through multiple sectors.',
    conceptId: 'tariffs',
  },
  {
    headline: 'A company you own announces a secondary stock offering, issuing 50 million new shares.',
    answer: 'bear',
    explanation: 'Issuing new shares dilutes existing shareholders — their percentage ownership decreases. More shares outstanding means lower EPS, even if profits stay the same. It\'s the opposite of a buyback.',
    conceptId: 'shares-outstanding',
  },
  {
    headline: 'The VIX (market "fear index") spikes to 40, up from 15 last week.',
    answer: 'bear',
    explanation: 'The VIX measures expected market volatility. A spike from 15 to 40 means traders are pricing in extreme uncertainty. High VIX readings historically coincide with sharp market declines.',
    conceptId: 'options',
  },
  {
    headline: 'Walmart reports strong earnings and raises its full-year guidance.',
    answer: 'bull',
    explanation: 'Beating earnings AND raising future guidance is the best possible combination. It means the company is doing well now AND expects to keep doing well. Double dose of good news.',
    conceptId: 'earnings-surprise',
  },
  {
    headline: 'The dollar strengthens 10% against foreign currencies.',
    answer: 'bear',
    explanation: 'A strong dollar hurts US companies that sell abroad — their foreign revenue converts to fewer dollars. Companies like Apple, Nike, and Coca-Cola that earn heavily overseas see earnings shrink when the dollar rises.',
    conceptId: 'macro-vs-micro',
  },
  {
    headline: 'The housing market shows a 15% drop in existing home sales.',
    answer: 'bear',
    explanation: 'Falling home sales signal that consumers can\'t afford homes (likely due to high rates) or are losing confidence. Since housing is the largest asset for most Americans, a housing slowdown ripples through the entire economy.',
    conceptId: 'fed-funds-rate',
  },
  {
    headline: 'An activist investor takes a 10% stake in an underperforming company and demands board seats.',
    answer: 'bull',
    explanation: 'Activist investors push for changes that unlock shareholder value — cost cuts, strategy shifts, asset sales, or new management. The stock usually rises on the announcement because investors expect improvements.',
    conceptId: 'stock',
  },
  {
    headline: 'A major company is caught inflating its revenue numbers for three years.',
    answer: 'bear',
    explanation: 'Accounting fraud is one of the most devastating things that can happen to a stock. Once investors can\'t trust the numbers, the stock collapses. See: Enron, WorldCom, Wirecard — all went to zero.',
    conceptId: 'income-statement',
  },
  {
    headline: 'Consumer confidence hits a 2-year high as holiday shopping season begins.',
    answer: 'bull',
    explanation: 'High consumer confidence means people feel secure about their jobs and finances, so they spend more. Consumer spending drives roughly 70% of US GDP — when consumers are confident, the economy and stocks benefit.',
    conceptId: 'macro-vs-micro',
  },
  {
    headline: 'A company announces it will restate its earnings for the past two years.',
    answer: 'bear',
    explanation: 'Earnings restatements mean the previously reported numbers were wrong. Investors lose trust in management and the company\'s financial controls. It often triggers SEC investigations and lawsuits.',
    conceptId: 'income-statement',
  },
  {
    headline: 'Oil drops to $40/barrel from $80 as global demand weakens.',
    answer: 'bull',
    explanation: 'Falling oil prices act like a tax cut for consumers and businesses — cheaper gas, cheaper shipping, lower input costs. It\'s generally bullish for the broad market (though bearish for energy stocks specifically).',
    conceptId: 'oil-prices',
  },

  // ============================================================
  // HISTORIC EVENTS — the moments that shaped modern finance
  // ============================================================

  // --- GREAT DEPRESSION & EARLY MARKETS ---
  {
    headline: 'October 1929: The stock market crashes on "Black Tuesday" — the Dow falls 12% in one day.',
    answer: 'bear',
    explanation: 'The 1929 crash marked the beginning of the Great Depression. The market lost 89% of its value over the next 3 years and didn\'t recover to its 1929 peak until 1954 — 25 years later.',
    conceptId: 'risk-return',
  },
  {
    headline: '1933: The Glass-Steagall Act separates commercial banking from investment banking.',
    answer: 'bull',
    explanation: 'By separating risky investment banking from everyday deposits, Glass-Steagall restored public trust in the banking system. People felt safe putting money back in banks, which stabilized the economy.',
    conceptId: 'commercial-banking',
  },
  {
    headline: '1934: The SEC (Securities and Exchange Commission) is created to regulate markets.',
    answer: 'bull',
    explanation: 'Before the SEC, markets were like the Wild West — insider trading was legal, companies lied about their finances, and fraud was rampant. Regulation brought transparency and trust, which attracted more investors.',
    conceptId: 'management-consulting',
  },

  // --- POST-WAR BOOM ---
  {
    headline: '1952: Harry Markowitz publishes Modern Portfolio Theory — the math behind diversification.',
    answer: 'bull',
    explanation: 'Markowitz proved mathematically that diversifying your portfolio reduces risk without sacrificing returns. His work eventually won the Nobel Prize and remains the foundation of how professional investors build portfolios today.',
    conceptId: 'diversification',
  },
  {
    headline: '1971: Nixon takes the US off the gold standard — the dollar is no longer backed by gold.',
    answer: 'bear',
    explanation: 'Leaving the gold standard created massive uncertainty about the dollar\'s value. Inflation surged throughout the 1970s, and stocks had a terrible decade. But it also gave the Fed flexibility to manage the economy through monetary policy.',
    conceptId: 'inflation',
  },
  {
    headline: '1976: John Bogle creates the first index fund at Vanguard.',
    answer: 'bull',
    explanation: 'Wall Street laughed and called it "Bogle\'s Folly." Today, index funds hold over $11 trillion. Bogle\'s simple idea — just buy everything and hold it cheaply — revolutionized investing for ordinary people.',
    conceptId: 'index-fund',
  },

  // --- 1980s ---
  {
    headline: '1980: The Fed raises interest rates to 20% to crush runaway inflation.',
    answer: 'bear',
    explanation: 'Fed Chair Paul Volcker\'s aggressive rate hikes caused a brutal recession — unemployment hit 10.8%. But it worked: inflation dropped from 14% to 3%. The short-term pain set up the longest peacetime expansion in US history.',
    conceptId: 'fed-funds-rate',
  },
  {
    headline: 'October 1987: "Black Monday" — the Dow crashes 22.6% in a single day.',
    answer: 'bear',
    explanation: 'The largest single-day percentage drop in history, caused by computerized "portfolio insurance" trading. Yet remarkably, the market recovered all its losses within two years. Long-term investors who held through it were fine.',
    conceptId: 'time-horizon',
  },
  {
    headline: '1988: Warren Buffett begins buying Coca-Cola stock, eventually accumulating $1 billion worth.',
    answer: 'bull',
    explanation: 'Buffett saw an incredible brand that produced mountains of cash and could raise prices every year. He\'s never sold a share. That $1 billion investment is now worth over $25 billion, plus billions in dividends collected.',
    conceptId: 'value-investing',
  },

  // --- 1990s DOT-COM ---
  {
    headline: 'August 1995: Netscape goes public — the browser company soars 108% on its first day.',
    answer: 'bull',
    explanation: 'Netscape\'s IPO is considered the starting gun for the dot-com boom. A company with almost no revenue was suddenly worth $2.9 billion. It showed Wall Street that the internet was going to change everything.',
    conceptId: 'market-bubble',
  },
  {
    headline: 'December 1996: Fed Chair Greenspan warns of "irrational exuberance" in stock markets.',
    answer: 'bear',
    explanation: 'Greenspan\'s famous phrase warned that stock prices had disconnected from reality. He was right — but early. The market didn\'t peak until March 2000, another 3+ years of gains before the crash.',
    conceptId: 'market-bubble',
  },
  {
    headline: 'March 2000: The dot-com bubble peaks — the Nasdaq hits 5,048.',
    answer: 'bear',
    explanation: 'The Nasdaq fell 78% over the next 2.5 years. Companies like Pets.com, Webvan, and hundreds of other "dot-coms" went to zero. It took the Nasdaq 15 years to return to its 2000 peak.',
    conceptId: 'market-bubble',
  },
  {
    headline: 'December 2001: Enron files for bankruptcy after a massive accounting fraud is revealed.',
    answer: 'bear',
    explanation: 'Enron was the 7th largest company in America. Its executives hid billions in debt using off-balance-sheet entities. When the fraud unraveled, the stock went from $90 to $0, wiping out employees\' retirement savings.',
    conceptId: 'income-statement',
  },

  // --- 2000s ---
  {
    headline: 'August 2004: Google goes public at $85 per share through an unusual Dutch auction IPO.',
    answer: 'bull',
    explanation: 'Many thought $85 was too high for a "search engine." Google closed at $100 on day one and never looked back. A $10,000 investment at IPO would be worth over $4 million today. Sometimes the market underestimates transformative companies.',
    conceptId: 'valuation',
  },
  {
    headline: '2005: Housing prices are rising 15% per year. Banks are giving mortgages to people with no income verification.',
    answer: 'bear',
    explanation: 'The "no-doc" loans and skyrocketing prices were classic bubble signs. When housing prices stopped rising, borrowers defaulted, mortgage-backed securities collapsed, and it triggered the 2008 financial crisis.',
    conceptId: 'market-bubble',
  },
  {
    headline: 'March 2008: Bear Stearns collapses and is acquired by JPMorgan for $2 per share (down from $170).',
    answer: 'bear',
    explanation: 'Bear Stearns was the canary in the coal mine for the 2008 crisis. An 85-year-old Wall Street bank destroyed in days because of exposure to subprime mortgages. It foreshadowed what would happen to Lehman Brothers six months later.',
    conceptId: 'risk-return',
  },

  // --- MAJOR COMPANIES ---
  {
    headline: 'June 2007: Apple releases the first iPhone.',
    answer: 'bull',
    explanation: 'The iPhone created an entirely new product category and eventually became the most profitable product in history. Apple\'s stock has risen over 6,000% since the iPhone launch. "Buy what you know" — if you used an iPhone, you understood.',
    conceptId: 'capital-gain',
  },
  {
    headline: 'September 2011: Reed Hastings splits Netflix into a DVD-by-mail company and a streaming company.',
    answer: 'bear',
    explanation: 'The "Qwikster" debacle was one of the worst corporate decisions in years. Netflix lost 800,000 subscribers and the stock dropped 77%. Hastings reversed the decision, but it took years to recover customer trust.',
    conceptId: 'macro-vs-micro',
  },
  {
    headline: '2014: Alibaba, the "Amazon of China," goes public on the NYSE.',
    answer: 'bull',
    explanation: 'At $25 billion raised, it was the largest IPO ever. Investors saw a way to bet on China\'s massive consumer economy. The stock popped 38% on day one. However, Chinese regulatory crackdowns years later would complicate the story.',
    conceptId: 'stock',
  },
  {
    headline: '2015: Volkswagen admits to cheating on diesel emissions tests for 11 million cars worldwide.',
    answer: 'bear',
    explanation: 'The "Dieselgate" scandal wiped 30% off VW\'s stock in two days and eventually cost the company over $33 billion in fines and settlements. Corporate fraud always destroys shareholder value — it\'s never "priced in."',
    conceptId: 'operational-risk',
  },
  {
    headline: 'Wells Fargo employees are caught creating 3.5 million fake bank accounts without customers\' consent.',
    answer: 'bear',
    explanation: 'Wells Fargo paid over $3 billion in fines and its CEO was forced to resign. The scandal became a textbook case for why compliance matters — and why banks hire risk consultants to prevent exactly this kind of operational failure.',
    conceptId: 'management-consulting',
  },
  {
    headline: '2018: Amazon\'s market cap crosses $1 trillion for the first time.',
    answer: 'bull',
    explanation: 'Joining the trillion-dollar club confirmed Amazon\'s dominance across e-commerce, cloud computing (AWS), and increasingly every other industry. At the time, only Apple had reached this milestone before.',
    conceptId: 'market-cap-weight',
  },
  {
    headline: 'March 2023: ChatGPT reaches 100 million users in two months — the fastest-growing app in history.',
    answer: 'bull',
    explanation: 'AI\'s "iPhone moment" — it proved that artificial intelligence was real, useful, and ready for consumers. Every company connected to AI (especially NVIDIA, Microsoft, and cloud providers) surged as investors priced in the AI revolution.',
    conceptId: 'sector',
  },
  {
    headline: 'December 2022: Sam Bankman-Fried is arrested in the Bahamas for fraud after FTX\'s collapse.',
    answer: 'bear',
    explanation: 'SBF was a 30-year-old billionaire on the cover of Forbes. Then $8 billion in customer funds went missing. His arrest crystallized everything wrong with the crypto bubble — lack of regulation, lack of controls, and lack of accountability.',
    conceptId: 'operational-risk',
  },
  {
    headline: '1997: The Asian Financial Crisis spreads across Thailand, South Korea, and Indonesia.',
    answer: 'bear',
    explanation: 'Currency collapses in Asia triggered a global sell-off. It showed how interconnected global markets had become — a crisis in Bangkok could crash stocks in New York. Contagion risk is why diversification across geographies matters.',
    conceptId: 'geopolitical-risk',
  },
  {
    headline: '1998: Long-Term Capital Management (LTCM), a hedge fund run by Nobel Prize winners, nearly collapses and has to be bailed out.',
    answer: 'bear',
    explanation: 'LTCM used massive leverage (borrowing $25 for every $1 of capital) to make "safe" bets. When Russia defaulted on its debt, their models broke and they lost $4.6 billion in weeks. The Fed organized a bailout to prevent a financial meltdown.',
    conceptId: 'hedge-fund',
  },
  {
    headline: 'September 2001: The stock market closes for 4 days after the 9/11 terrorist attacks.',
    answer: 'bear',
    explanation: 'When markets reopened on September 17, the Dow fell 684 points — the largest one-day point drop in history at the time. The S&P 500 fell 12% that week. But by the end of 2001, markets had largely recovered.',
    conceptId: 'geopolitical-risk',
  },
  {
    headline: 'Berkshire Hathaway\'s stock price reaches $500,000 per share — the most expensive stock in the world.',
    answer: 'bull',
    explanation: 'Buffett has never split Berkshire\'s stock because he wants long-term owners, not short-term traders. A $10,000 investment in Berkshire in 1965 would be worth over $300 million today. Patience pays.',
    conceptId: 'compound-interest',
  },
  {
    headline: '2013: The "Taper Tantrum" — the Fed hints it might slow down bond purchases.',
    answer: 'bear',
    explanation: 'Just the suggestion that the Fed might reduce stimulus caused a sharp sell-off. Bond yields spiked, stocks dropped, and emerging market currencies crashed. It showed how addicted markets had become to Fed support.',
    conceptId: 'federal-reserve',
  },
  {
    headline: '2020: Hertz declares bankruptcy, but retail traders on Robinhood bid the stock up 800% anyway.',
    answer: 'bull',
    explanation: 'A bankrupt company\'s stock going up 800% makes no rational sense — equity is typically worthless in bankruptcy. This was peak 2020 speculation, fueled by stimulus checks, boredom, and commission-free trading.',
    conceptId: 'meme-stock',
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
