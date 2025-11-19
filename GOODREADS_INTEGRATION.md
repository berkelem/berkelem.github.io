# Goodreads Integration Guide

This guide explains how the automatic Goodreads RSS integration works on your personal website.

## 📚 Overview

The reading section **automatically** displays:
- **Currently Reading**: Books from your "currently-reading" shelf (up to 5 books)
- **Recent Reviews**: Books from your "read" shelf with ratings/reviews (up to 6 books)

## ✅ What's Already Working

Your website is now configured to:
- ✅ Automatically fetch books from your Goodreads RSS feed
- ✅ Display book covers, titles, authors, and ratings
- ✅ Show your reviews for recently read books
- ✅ Refresh data every 30 minutes
- ✅ Handle loading states and errors gracefully

## 🔧 Current Configuration

**Your Goodreads User ID:** `6157820-matthew`

The system fetches data from:
- Currently Reading: `https://www.goodreads.com/review/list_rss/6157820-matthew?shelf=currently-reading`
- Recent Reviews: `https://www.goodreads.com/review/list_rss/6157820-matthew?shelf=read`

## 🎯 How It Works

### RSS Feed Integration

1. **CORS Proxy**: Uses `api.allorigins.win` to bypass browser CORS restrictions
2. **XML Parsing**: Parses Goodreads RSS feeds to extract book data
3. **Dynamic Rendering**: Automatically creates book cards with covers, ratings, and reviews
4. **Auto-Refresh**: Updates every 30 minutes to stay current with your Goodreads activity

### Data Flow

```
Your Goodreads Shelf → RSS Feed → CORS Proxy → XML Parser → Website Display
```

## 📝 To Update Your Books

Simply update your Goodreads shelves:

1. **Add to "currently-reading" shelf** → Appears in "Currently Reading" section
2. **Mark as "read" with rating/review** → Appears in "Recent Reviews" section
3. **Wait a moment** → Website automatically fetches and displays (or refresh the page)

No code changes needed! 🎉

## 🔄 Manual Refresh

If you just updated your Goodreads and want to see changes immediately:
1. Open browser console (F12)
2. The data refreshes automatically, or reload the page

## 🎨 What Gets Displayed

### Currently Reading Section
- Book cover image
- Book title
- Author name
- Average rating (from Goodreads community)
- Link to Goodreads page

### Recent Reviews Section
- Book cover image
- Book title
- Author name
- Your star rating (1-5 stars)
- Your review (first 150 characters)
- Link to read full review on Goodreads

## 🔧 Technical Details

### How the RSS Feed Parser Works

The integration uses these key components:

1. **CORS Proxy**: `api.allorigins.win` to fetch RSS feeds
2. **XML Parser**: Browser's native DOMParser to parse XML
3. **Data Extraction**: Queries specific XML nodes for book data
4. **Error Handling**: Graceful fallbacks if data can't be loaded

### Code Structure

```javascript
// In script.js
const GOODREADS_USER_ID = '6157820-matthew';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Fetches and parses RSS feed
async function fetchGoodreadsRSS(shelf, limit) { ... }

// Generates star rating HTML
function generateStarRating(rating) { ... }

// Renders books in the DOM
async function renderCurrentlyReading() { ... }
async function renderRecentReviews() { ... }
```

## 🎨 Customization Options

### Change Number of Books Displayed

In `script.js`, modify the function calls:

```javascript
const books = await fetchGoodreadsRSS('currently-reading', 10); // Show 10 instead of 5
const books = await fetchGoodreadsRSS('read', 12); // Show 12 reviews instead of 6
```

### Change Refresh Interval

In `script.js`, modify the interval:

```javascript
// Refresh every 15 minutes instead of 30
setInterval(() => {
    renderCurrentlyReading();
    renderRecentReviews();
}, 15 * 60 * 1000);
```

### Display Different Shelves

You can fetch from any Goodreads shelf:

```javascript
// Want-to-read shelf
const books = await fetchGoodreadsRSS('to-read', 5);

// Custom shelf (e.g., "favorites")
const books = await fetchGoodreadsRSS('favorites', 5);
```

## 🚀 Advanced Options

### Option 1: Add More Book Details

The RSS feed includes these additional fields you can display:
- `book_published` - Publication year
- `average_rating` - Community average rating
- `book_description` - Book description
- `isbn` - Book ISBN

### Option 2: Cache Data in LocalStorage

Reduce API calls by caching:

```javascript
function getCachedBooks(shelf) {
    const cached = localStorage.getItem(`goodreads_${shelf}`);
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        // Use cache if less than 1 hour old
        if (Date.now() - timestamp < 60 * 60 * 1000) {
            return data;
        }
    }
    return null;
}

function cacheBooks(shelf, books) {
    localStorage.setItem(`goodreads_${shelf}`, JSON.stringify({
        data: books,
        timestamp: Date.now()
    }));
}
```

### Option 3: Backend Proxy (More Reliable)

For production use, consider setting up your own backend:

**Benefits:**
- More reliable than public CORS proxy
- Can add caching
- Better performance
- More control

**Example with Netlify Functions:**

```javascript
// netlify/functions/goodreads.js
const fetch = require('node-fetch');

exports.handler = async (event) => {
    const { shelf, userId } = event.queryStringParameters;
    const rssUrl = `https://www.goodreads.com/review/list_rss/${userId}?shelf=${shelf}`;
    
    try {
        const response = await fetch(rssUrl);
        const text = await response.text();
        
        return {
            statusCode: 200,
            body: text,
            headers: { 'Content-Type': 'application/xml' }
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch' })
        };
    }
};
```

## 📝 Tips for Best Results

1. **Write Reviews**: Books with reviews show up in "Recent Reviews" section
2. **Rate Books**: Add star ratings to make reviews more meaningful
3. **Keep Shelves Updated**: Move books to appropriate shelves (currently-reading, read)
4. **Quality Over Quantity**: Your most recent 5-6 books will be most visible
5. **Check Console**: Open browser console to see loading status and any errors

## 🔗 Useful Resources

- [Goodreads RSS Feed Format](https://www.goodreads.com/review/list_rss/)
- [API AllOrigins CORS Proxy](https://allorigins.win/)
- [DOMParser API](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser)
- [Font Awesome Icons](https://fontawesome.com/icons?d=gallery&q=book)

## 🐛 Troubleshooting

### Books Not Loading?

**Check browser console for errors:**
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for error messages

**Common issues:**
- CORS proxy is down → Try alternative proxy
- Goodreads RSS feed format changed → Check console for parsing errors
- Network connectivity issues → Check internet connection

### Wrong Books Showing?

- Verify your Goodreads shelves are correctly organized
- Check that `GOODREADS_USER_ID` matches your profile
- Clear browser cache and reload

### Images Not Loading?

- Goodreads image URLs may expire or change
- The code has fallback placeholders for missing images
- Images load from Goodreads CDN (should be reliable)

### CORS Errors?

If `api.allorigins.win` is down, try alternatives:
- `https://corsproxy.io/?` 
- `https://cors-anywhere.herokuapp.com/`
- Set up your own backend proxy (recommended for production)

## 🔄 Updating Your User ID

If you need to change the Goodreads user ID:

1. Open `script.js`
2. Find: `const GOODREADS_USER_ID = '6157820-matthew';`
3. Replace with your ID: `const GOODREADS_USER_ID = 'YOUR_ID';`
4. Update the profile link in `index.html` to match

## ✨ Future Enhancements

Consider adding:
- Reading statistics (books read this year, pages read, etc.)
- Reading challenge progress bar
- Favorite genres visualization
- Book recommendations section
- Reading streak tracker
- Monthly reading goals

---

**Your Goodreads integration is now live and automatic!** 🎉  
Just keep your Goodreads profile updated and your website will reflect the changes.
