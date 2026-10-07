const GOODREADS_USER_ID = '6157820-matthew';
const FEED_BASE_URL = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}`;

function decodeXml(value) {
    return value
        .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
        .replace(/&#x([\da-f]+);/gi, (_, codePoint) => String.fromCodePoint(parseInt(codePoint, 16)))
        .replace(/&#(\d+);/g, (_, codePoint) => String.fromCodePoint(Number(codePoint)))
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .trim();
}

function getField(item, tagName) {
    const match = item.match(new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, 'i'));
    return match ? decodeXml(match[1]) : '';
}

function parseGoodreadsFeed(xml) {
    if (!/<rss\b/i.test(xml)) {
        throw new Error('Goodreads returned a response that is not an RSS feed.');
    }

    return [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)].map(([, item]) => {
        const review = getField(item, 'user_review').replace(/<[^>]*>/g, '').trim();
        const cover = getField(item, 'book_large_image_url')
            || getField(item, 'book_medium_image_url')
            || getField(item, 'book_small_image_url');

        return {
            title: getField(item, 'title') || 'Unknown Title',
            author: getField(item, 'author_name') || 'Unknown Author',
            link: getField(item, 'link'),
            rating: Number.parseFloat(getField(item, 'user_rating')) || 0,
            review: review.length > 150 ? `${review.slice(0, 150)}...` : review,
            cover,
            averageRating: Number.parseFloat(getField(item, 'average_rating')) || 0
        };
    });
}

async function fetchShelf(shelf, limit) {
    const url = `${FEED_BASE_URL}?shelf=${encodeURIComponent(shelf)}&per_page=${limit}`;
    const response = await fetch(url, {
        headers: { 'User-Agent': 'berkelem.github.io Goodreads snapshot updater' },
        signal: AbortSignal.timeout(20000)
    });

    if (!response.ok) {
        throw new Error(`Goodreads ${shelf} feed returned HTTP ${response.status}`);
    }

    return parseGoodreadsFeed(await response.text());
}

const [currentlyReading, recentReviews] = await Promise.all([
    fetchShelf('currently-reading', 5),
    fetchShelf('read', 6)
]);

process.stdout.write(`${JSON.stringify({ currentlyReading, recentReviews }, null, 2)}\n`);
