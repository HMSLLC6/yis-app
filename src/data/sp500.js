// S&P 500 Total Return (with dividends reinvested) by year
// Source: NYU Stern / Damodaran historical returns dataset
// Used for the Birthday Investor and Future Builder simulators

export const SP500_ANNUAL_RETURNS = {
  1950: 0.3171, 1951: 0.2402, 1952: 0.1837, 1953: -0.0099, 1954: 0.5262,
  1955: 0.3156, 1956: 0.0656, 1957: -0.1078, 1958: 0.4336, 1959: 0.1196,
  1960: 0.0047, 1961: 0.2689, 1962: -0.0873, 1963: 0.2280, 1964: 0.1648,
  1965: 0.1245, 1966: -0.1006, 1967: 0.2398, 1968: 0.1106, 1969: -0.0850,
  1970: 0.0401, 1971: 0.1431, 1972: 0.1898, 1973: -0.1466, 1974: -0.2647,
  1975: 0.3720, 1976: 0.2384, 1977: -0.0718, 1978: 0.0656, 1979: 0.1844,
  1980: 0.3242, 1981: -0.0491, 1982: 0.2141, 1983: 0.2251, 1984: 0.0627,
  1985: 0.3173, 1986: 0.1867, 1987: 0.0525, 1988: 0.1661, 1989: 0.3169,
  1990: -0.0310, 1991: 0.3047, 1992: 0.0762, 1993: 0.1008, 1994: 0.0132,
  1995: 0.3758, 1996: 0.2296, 1997: 0.3336, 1998: 0.2858, 1999: 0.2104,
  2000: -0.0910, 2001: -0.1189, 2002: -0.2210, 2003: 0.2889, 2004: 0.1088,
  2005: 0.0491, 2006: 0.1579, 2007: 0.0549, 2008: -0.3700, 2009: 0.2646,
  2010: 0.1506, 2011: 0.0211, 2012: 0.1600, 2013: 0.3239, 2014: 0.1369,
  2015: 0.0138, 2016: 0.1196, 2017: 0.2183, 2018: -0.0438, 2019: 0.3149,
  2020: 0.1840, 2021: 0.2871, 2022: -0.1811, 2023: 0.2640, 2024: 0.2502,
  2025: 0.0200,  // partial year estimate through Q1
};

// Historical average annual return (used for projections)
export const HISTORICAL_AVG_RETURN = 0.1026; // ~10.26% average since 1950

// Calculate growth of an investment from a start date to today
// Uses actual year-by-year S&P 500 total returns (dividends reinvested)
export function calculateGrowth(startDate, amount) {
  const start = new Date(startDate);
  const now = new Date();
  const startYear = start.getFullYear();
  const currentYear = now.getFullYear();

  // Validate: must be within our data range and not in the future
  if (startYear < 1950 || start > now) return null;

  const years = (now - start) / (365.25 * 24 * 60 * 60 * 1000);
  let value = amount;

  // Chart data: one point per year
  const dataPoints = [{ year: startYear, value: Math.round(amount) }];

  // Partial first year: proportion of year remaining after the start date
  const startDayOfYear = Math.floor(
    (start - new Date(startYear, 0, 1)) / (24 * 60 * 60 * 1000)
  );
  const daysInStartYear = ((startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0) ? 366 : 365;
  const firstYearFraction = (daysInStartYear - startDayOfYear) / daysInStartYear;

  if (SP500_ANNUAL_RETURNS[startYear] !== undefined) {
    // Apply the proportional share of that year's total return
    value *= (1 + SP500_ANNUAL_RETURNS[startYear] * firstYearFraction);
  }

  // Full calendar years from startYear+1 through currentYear-1
  for (let y = startYear + 1; y < currentYear; y++) {
    const ret = SP500_ANNUAL_RETURNS[y];
    if (ret !== undefined) {
      value *= (1 + ret);
    }
    dataPoints.push({ year: y, value: Math.round(value) });
  }

  // Partial current year: proportion of year elapsed so far
  if (currentYear > startYear) {
    const currentDayOfYear = Math.floor(
      (now - new Date(currentYear, 0, 1)) / (24 * 60 * 60 * 1000)
    );
    const daysInCurrentYear = ((currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0) ? 366 : 365;
    const currentYearFraction = currentDayOfYear / daysInCurrentYear;
    const currentRet = SP500_ANNUAL_RETURNS[currentYear] || 0;
    value *= (1 + currentRet * currentYearFraction);
    dataPoints.push({ year: currentYear, value: Math.round(value) });
  }

  const totalReturn = (value / amount) - 1;
  const annualizedReturn = years > 0.1
    ? Math.pow(value / amount, 1 / years) - 1
    : totalReturn;

  return {
    startDate,
    years: Math.round(years * 10) / 10,
    invested: amount,
    finalValue: Math.round(value * 100) / 100,
    totalReturn,
    annualizedReturn,
    dataPoints,
  };
}

// Buffett quotes for display throughout the app
export const BUFFETT_QUOTES = [
  { quote: "The stock market is a device for transferring money from the impatient to the patient.", source: "Warren Buffett" },
  { quote: "Our favorite holding period is forever.", source: "Warren Buffett" },
  { quote: "Price is what you pay. Value is what you get.", source: "Warren Buffett" },
  { quote: "Be fearful when others are greedy and greedy when others are fearful.", source: "Warren Buffett" },
  { quote: "The most important investment you can make is in yourself.", source: "Warren Buffett" },
  { quote: "Risk comes from not knowing what you're doing.", source: "Warren Buffett" },
  { quote: "It's far better to buy a wonderful company at a fair price than a fair company at a wonderful price.", source: "Warren Buffett" },
  { quote: "Someone's sitting in the shade today because someone planted a tree a long time ago.", source: "Warren Buffett" },
  { quote: "The best investment you can make is in your own abilities.", source: "Warren Buffett" },
  { quote: "Do not save what is left after spending; instead spend what is left after saving.", source: "Warren Buffett" },
  { quote: "If you don't find a way to make money while you sleep, you will work until you die.", source: "Warren Buffett" },
  { quote: "Wide diversification is only required when investors do not understand what they are doing.", source: "Warren Buffett" },
  { quote: "The investor of today does not profit from yesterday's growth.", source: "Warren Buffett" },
  { quote: "Time is the friend of the wonderful company, the enemy of the mediocre.", source: "Warren Buffett" },
  { quote: "Never invest in a business you cannot understand.", source: "Warren Buffett" },
  { quote: "I will tell you how to become rich. Be fearful when others are greedy. Be greedy when others are fearful.", source: "Warren Buffett" },
  { quote: "The difference between successful people and really successful people is that really successful people say no to almost everything.", source: "Warren Buffett" },
  { quote: "Chains of habit are too light to be felt until they are too heavy to be broken.", source: "Warren Buffett" },
  { quote: "Only buy something that you'd be perfectly happy to hold if the market shut down for 10 years.", source: "Warren Buffett" },
  { quote: "Predicting rain doesn't count. Building arks does.", source: "Warren Buffett" },
];
