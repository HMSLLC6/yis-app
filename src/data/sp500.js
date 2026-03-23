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

// Monthly S&P 500 index levels (approximate close) for more granular birthday calculation
// First of each month, 2000-2025
export const SP500_MONTHLY = [
  // 2000
  { date: '2000-01-01', value: 1469.25 }, { date: '2000-04-01', value: 1498.58 },
  { date: '2000-07-01', value: 1454.60 }, { date: '2000-10-01', value: 1429.40 },
  // 2001
  { date: '2001-01-01', value: 1320.28 }, { date: '2001-04-01', value: 1160.33 },
  { date: '2001-07-01', value: 1211.23 }, { date: '2001-10-01', value: 1059.78 },
  // 2002
  { date: '2002-01-01', value: 1148.08 }, { date: '2002-04-01', value: 1147.39 },
  { date: '2002-07-01', value: 989.82 }, { date: '2002-10-01', value: 885.76 },
  // 2003
  { date: '2003-01-01', value: 879.82 }, { date: '2003-04-01', value: 848.18 },
  { date: '2003-07-01', value: 990.31 }, { date: '2003-10-01', value: 1050.71 },
  // 2004
  { date: '2004-01-01', value: 1131.13 }, { date: '2004-04-01', value: 1126.21 },
  { date: '2004-07-01', value: 1101.72 }, { date: '2004-10-01', value: 1130.20 },
  // 2005
  { date: '2005-01-01', value: 1181.27 }, { date: '2005-04-01', value: 1180.59 },
  { date: '2005-07-01', value: 1234.18 }, { date: '2005-10-01', value: 1207.01 },
  // 2006
  { date: '2006-01-01', value: 1248.29 }, { date: '2006-04-01', value: 1294.87 },
  { date: '2006-07-01', value: 1270.20 }, { date: '2006-10-01', value: 1377.94 },
  // 2007
  { date: '2007-01-01', value: 1418.30 }, { date: '2007-04-01', value: 1420.86 },
  { date: '2007-07-01', value: 1503.35 }, { date: '2007-10-01', value: 1549.38 },
  // 2008
  { date: '2008-01-01', value: 1468.36 }, { date: '2008-04-01', value: 1322.70 },
  { date: '2008-07-01', value: 1280.00 }, { date: '2008-10-01', value: 968.75 },
  // 2009
  { date: '2009-01-01', value: 903.25 }, { date: '2009-04-01', value: 797.87 },
  { date: '2009-07-01', value: 987.48 }, { date: '2009-10-01', value: 1057.08 },
  // 2010
  { date: '2010-01-01', value: 1115.10 }, { date: '2010-04-01', value: 1169.43 },
  { date: '2010-07-01', value: 1030.71 }, { date: '2010-10-01', value: 1183.26 },
  // 2011
  { date: '2011-01-01', value: 1257.62 }, { date: '2011-04-01', value: 1325.83 },
  { date: '2011-07-01', value: 1292.28 }, { date: '2011-10-01', value: 1253.30 },
  // 2012
  { date: '2012-01-01', value: 1257.60 }, { date: '2012-04-01', value: 1408.47 },
  { date: '2012-07-01', value: 1362.16 }, { date: '2012-10-01', value: 1412.16 },
  // 2013
  { date: '2013-01-01', value: 1426.19 }, { date: '2013-04-01', value: 1569.19 },
  { date: '2013-07-01', value: 1685.73 }, { date: '2013-10-01', value: 1756.54 },
  // 2014
  { date: '2014-01-01', value: 1848.36 }, { date: '2014-04-01', value: 1872.34 },
  { date: '2014-07-01', value: 1930.67 }, { date: '2014-10-01', value: 2018.05 },
  // 2015
  { date: '2015-01-01', value: 2058.90 }, { date: '2015-04-01', value: 2067.89 },
  { date: '2015-07-01', value: 2103.84 }, { date: '2015-10-01', value: 2079.36 },
  // 2016
  { date: '2016-01-01', value: 2043.94 }, { date: '2016-04-01', value: 2059.74 },
  { date: '2016-07-01', value: 2098.86 }, { date: '2016-10-01', value: 2168.27 },
  // 2017
  { date: '2017-01-01', value: 2238.83 }, { date: '2017-04-01', value: 2362.72 },
  { date: '2017-07-01', value: 2470.30 }, { date: '2017-10-01', value: 2575.26 },
  // 2018
  { date: '2018-01-01', value: 2673.61 }, { date: '2018-04-01', value: 2640.87 },
  { date: '2018-07-01', value: 2816.29 }, { date: '2018-10-01', value: 2711.74 },
  // 2019
  { date: '2019-01-01', value: 2506.85 }, { date: '2019-04-01', value: 2834.40 },
  { date: '2019-07-01', value: 2980.38 }, { date: '2019-10-01', value: 3037.56 },
  // 2020
  { date: '2020-01-01', value: 3225.52 }, { date: '2020-04-01', value: 2584.59 },
  { date: '2020-07-01', value: 3100.29 }, { date: '2020-10-01', value: 3363.00 },
  // 2021
  { date: '2021-01-01', value: 3714.24 }, { date: '2021-04-01', value: 3972.89 },
  { date: '2021-07-01', value: 4395.26 }, { date: '2021-10-01', value: 4357.04 },
  // 2022
  { date: '2022-01-01', value: 4766.18 }, { date: '2022-04-01', value: 4530.41 },
  { date: '2022-07-01', value: 3785.38 }, { date: '2022-10-01', value: 3871.98 },
  // 2023
  { date: '2023-01-01', value: 3839.50 }, { date: '2023-04-01', value: 4109.31 },
  { date: '2023-07-01', value: 4450.38 }, { date: '2023-10-01', value: 4288.05 },
  // 2024
  { date: '2024-01-01', value: 4769.83 }, { date: '2024-04-01', value: 5254.35 },
  { date: '2024-07-01', value: 5460.48 }, { date: '2024-10-01', value: 5762.48 },
  // 2025
  { date: '2025-01-01', value: 5881.63 }, { date: '2025-03-01', value: 5954.50 },
];

// Historical average annual return (used for projections)
export const HISTORICAL_AVG_RETURN = 0.1026; // ~10.26% average since 1950
export const HISTORICAL_MEDIAN_RETURN = 0.1315;
export const INFLATION_AVG = 0.031; // ~3.1% average inflation

// Calculate growth of an investment from a start date to today using quarterly data
export function calculateGrowth(startDate, amount) {
  const start = new Date(startDate);
  const now = new Date();

  // Find the nearest quarterly data point at or after start date
  let startIdx = SP500_MONTHLY.findIndex(p => new Date(p.date) >= start);
  if (startIdx === -1) return null; // date too recent or not in range

  const startValue = SP500_MONTHLY[startIdx].value;
  const endValue = SP500_MONTHLY[SP500_MONTHLY.length - 1].value;

  // Price return ratio
  const priceRatio = endValue / startValue;

  // Add approximate dividend return (~2% annual) for total return
  const years = (now - new Date(SP500_MONTHLY[startIdx].date)) / (365.25 * 24 * 60 * 60 * 1000);
  const dividendMultiplier = Math.pow(1.02, years);

  const totalReturn = priceRatio * dividendMultiplier;
  const finalValue = amount * totalReturn;
  const annualizedReturn = (Math.pow(totalReturn, 1 / Math.max(years, 0.1)) - 1);

  return {
    startDate: SP500_MONTHLY[startIdx].date,
    startValue,
    endValue,
    years: Math.round(years * 10) / 10,
    invested: amount,
    finalValue: Math.round(finalValue * 100) / 100,
    totalReturn: (totalReturn - 1),
    annualizedReturn,
    priceRatio,
  };
}

// Project future value with compound growth
export function projectFuture(amount, years, annualReturn) {
  const points = [];
  for (let y = 0; y <= years; y++) {
    points.push({
      year: y,
      value: Math.round(amount * Math.pow(1 + annualReturn, y) * 100) / 100,
    });
  }
  return points;
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
