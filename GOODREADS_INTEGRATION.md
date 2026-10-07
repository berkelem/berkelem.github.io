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

1. **Scheduled fetch**: GitHub Actions reads the public Goodreads RSS feeds every six hours
2. **Same-origin snapshot**: The workflow commits parsed data to `goodreads.json`
3. **Dynamic rendering**: The website loads that JSON from its own GitHub Pages origin
4. **Auto-Refresh**: The page checks for an updated snapshot every 30 minutes

### Data Flow

```
Your Goodreads Shelf → RSS Feed → GitHub Actions → goodreads.json → Website Display
```

## 📝 To Update Your Books

Simply update your Goodreads shelves:

1. **Add to "currently-reading" shelf** → Appears in "Currently Reading" section
2. **Mark as "read" with rating/review** → Appears in "Recent Reviews" section
3. **Wait for the scheduled workflow** (up to six hours), or run **Update Goodreads data** manually from the repository's Actions tab

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

The GitHub Actions updater in `scripts/update-goodreads.mjs` fetches and parses the public RSS feeds. The browser reads the generated `goodreads.json` from the same origin, avoiding browser CORS restrictions and unreliable public CORS proxies.

### Code Structure

```javascript
// In script.js
const GOODREADS_USER_ID = '6157820-matthew';
// Data is read from the same-origin goodreads.json snapshot.

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

### Automated updates

The `Update Goodreads data` workflow can also be run manually from the GitHub Actions tab. It fetches both shelves and commits a new snapshot only when the data changes. The workflow needs repository Contents write permission to push the update.

## 📝 Tips for Best Results

1. **Write Reviews**: Books with reviews show up in "Recent Reviews" section
2. **Rate Books**: Add star ratings to make reviews more meaningful
3. **Keep Shelves Updated**: Move books to appropriate shelves (currently-reading, read)
4. **Quality Over Quantity**: Your most recent 5-6 books will be most visible
5. **Check Console**: Open browser console to see loading status and any errors

## 🔗 Useful Resources

- [Goodreads RSS Feed Format](https://www.goodreads.com/review/list_rss/)
- [GitHub Actions scheduled workflows](https://docs.github.com/actions/using-workflows/events-that-trigger-workflows#schedule)
- [Font Awesome Icons](https://fontawesome.com/icons?d=gallery&q=book)

## 🐛 Troubleshooting

### Books Not Loading?

**Check browser console for errors:**
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for error messages

**Common issues:**
- No snapshot yet → Run **Update Goodreads data** from the repository's Actions tab
- Workflow failed → Check the latest workflow run for Goodreads or push-permission errors
- Network connectivity issues → Check the browser connection and reload

### Wrong Books Showing?

- Verify your Goodreads shelves are correctly organized
- Check that `GOODREADS_USER_ID` matches your profile
- Clear browser cache and reload

### Images Not Loading?

- Goodreads image URLs may expire or change
- The code has fallback placeholders for missing images
- Images load from Goodreads CDN (should be reliable)

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
