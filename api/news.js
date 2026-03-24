// Vercel serverless function — fetches financial news from free RSS feeds
// Returns JSON array of articles with title, url, image, source, date

const FEEDS = [
  {
    url: 'https://finance.yahoo.com/news/rssindex',
    source: 'Yahoo Finance',
  },
  {
    url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=100003114',
    source: 'CNBC',
  },
  {
    url: 'https://feeds.reuters.com/reuters/businessNews',
    source: 'Reuters',
  },
  {
    url: 'https://www.investopedia.com/feedbuilder/feed/getfeed/?feedName=rss_headline',
    source: 'Investopedia',
  },
  {
    url: 'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGx6TVdZU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US:en',
    source: 'Google News',
  },
  {
    url: 'https://feeds.feedburner.com/APNewsBusinessHeadlines',
    source: 'AP News',
  },
  {
    url: 'https://www.fool.com/feeds/index.aspx',
    source: 'Motley Fool',
  },
];

// Simple XML value extractor (no dependencies needed)
function extractTag(xml, tag) {
  const regex = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([^<]*)</${tag}>`);
  const match = xml.match(regex);
  return match ? (match[1] || match[2] || '').trim() : '';
}

function extractAttr(xml, tag, attr) {
  const regex = new RegExp(`<${tag}[^>]*${attr}=["']([^"']+)["']`);
  const match = xml.match(regex);
  return match ? match[1] : '';
}

function extractItems(xml) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    items.push(match[1]);
  }
  return items;
}

function parseItem(itemXml, source) {
  const title = extractTag(itemXml, 'title');
  const link = extractTag(itemXml, 'link');
  const pubDate = extractTag(itemXml, 'pubDate');

  // Try multiple image sources in RSS
  let image = extractAttr(itemXml, 'media:content', 'url')
    || extractAttr(itemXml, 'media:thumbnail', 'url')
    || extractAttr(itemXml, 'enclosure', 'url')
    || '';

  if (!title || !link) return null;

  return {
    title,
    url: link,
    image,
    source,
    date: pubDate ? new Date(pubDate).toISOString() : null,
  };
}

async function fetchFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; YIS-News/1.0)' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = extractItems(xml);
    return items
      .map(item => parseItem(item, feed.source))
      .filter(Boolean)
      .slice(0, 10);
  } catch {
    return [];
  }
}

// For articles missing images, try to fetch og:image from the article URL
async function fetchOgImage(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; YIS-News/1.0)' },
      signal: AbortSignal.timeout(5000),
      redirect: 'follow',
    });
    if (!res.ok) return '';
    const html = await res.text().then(t => t.slice(0, 50000)); // only need the <head>
    const match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
    return match ? match[1] : '';
  } catch {
    return '';
  }
}

export default async function handler(req, res) {
  // Cache for 15 minutes
  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=1800');
  res.setHeader('Access-Control-Allow-Origin', '*');

  try {
    // Fetch all feeds in parallel
    const results = await Promise.all(FEEDS.map(fetchFeed));
    let articles = results.flat();

    // Sort by date descending
    articles.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return new Date(b.date) - new Date(a.date);
    });

    // Deduplicate by title similarity
    const seen = new Set();
    articles = articles.filter(a => {
      const key = a.title.toLowerCase().slice(0, 50);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Fetch og:images for articles missing images (up to 12 at a time)
    const needImages = articles.filter(a => !a.image).slice(0, 12);
    if (needImages.length > 0) {
      const ogResults = await Promise.all(
        needImages.map(a => fetchOgImage(a.url))
      );
      needImages.forEach((a, i) => {
        if (ogResults[i]) a.image = ogResults[i];
      });
    }

    // Return top 30 with images prioritized
    const withImages = articles.filter(a => a.image);
    const withoutImages = articles.filter(a => !a.image);
    const final = [...withImages, ...withoutImages].slice(0, 30);

    res.status(200).json({ articles: final });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news', detail: err.message });
  }
}
