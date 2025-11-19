# Git Activity Integration

## Overview

This document describes the Git Activity section that displays contribution graphs from both GitLab and GitHub profiles on your personal website. The graphs automatically update and provide visual insight into your development activity across both platforms.

## Features

- **GitLab Contribution Graph**: Displays your GitLab activity calendar using GitLab's built-in SVG endpoint
- **GitHub Contribution Graph**: Shows your GitHub contributions using the ghchart.rshah.org service
- **Automatic Updates**: Both graphs update automatically - no manual intervention required
- **Direct Profile Links**: Quick access to your GitLab and GitHub profiles
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Hover Effects**: Interactive cards with smooth animations

## How It Works

### GitLab Activity

The GitLab contribution graph is fetched directly from GitLab's API:

```
https://gitlab.com/users/[username]/calendar.svg
```

This endpoint provides an SVG visualization of your contributions over the past year. It updates automatically as you make commits, create issues, merge requests, etc.

**Current Configuration:**
- Username: `berkelem`
- URL: https://gitlab.com/users/berkelem/calendar.svg

### GitHub Activity

The GitHub contribution graph uses the ghchart.rshah.org service:

```
https://ghchart.rshah.org/[username]
```

This service generates a contribution chart similar to GitHub's profile page contribution graph, showing activity over the past year.

**Current Configuration:**
- Username: `berkelem`
- URL: https://ghchart.rshah.org/berkelem

## Customization

### Changing Your Username

To update your GitLab or GitHub username, edit the `index.html` file:

**For GitLab:**
```html
<img src="https://gitlab.com/users/YOUR_USERNAME/calendar.svg" 
     alt="GitLab Contribution Graph" 
     class="contribution-graph">
```

**For GitHub:**
```html
<img src="https://ghchart.rshah.org/YOUR_USERNAME" 
     alt="GitHub Contribution Graph" 
     class="contribution-graph">
```

### Styling the Graphs

The contribution graphs can be styled by modifying the `.contribution-graph` class in `styles.css`:

```css
.contribution-graph {
    width: 100%;
    height: auto;
    border-radius: 8px;
    background: #f6f8fa;
    padding: 1rem;
}
```

### Changing Colors

The icon colors are defined in the CSS:

**GitLab (Orange):**
```css
.gitlab-icon {
    background: linear-gradient(135deg, #fc6d26 0%, #fca326 100%);
}
```

**GitHub (Dark Gray):**
```css
.github-icon {
    background: linear-gradient(135deg, #333 0%, #24292e 100%);
}
```

## Technical Details

### File Structure

The Git Activity integration consists of:

1. **HTML Structure** (`index.html`)
   - Section container with `.git-activity` class
   - Two activity cards (GitLab and GitHub)
   - Contribution graph images
   - Profile links and statistics

2. **CSS Styling** (`styles.css`)
   - Card layouts with hover effects
   - Responsive grid system
   - Icon styling with gradients
   - Mobile-first responsive design

3. **Documentation** (`GIT_ACTIVITY_INTEGRATION.md`)
   - This file with usage instructions

### Browser Compatibility

The graphs are displayed as images (SVG/PNG), ensuring compatibility with all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

### Performance

- **Lightweight**: Uses direct image URLs, no JavaScript required
- **Cached**: Browsers cache the graphs for improved performance
- **Auto-updating**: Graphs refresh automatically on page reload

## Privacy Considerations

- GitLab calendar endpoint is **public** - visible to anyone with the URL
- GitHub chart service is **public** - displays public contributions only
- No authentication required
- No data is stored on your website
- Graphs reflect only public repository activity

## Troubleshooting

### Graph Not Displaying

**Check if:**
1. Your GitLab/GitHub username is correct
2. Your profile is public (not private)
3. You have internet connectivity
4. The external services are online

### Graph Shows "User Not Found"

- Verify your username spelling
- Ensure your account exists on the platform
- Check if your profile is public

### Graph Appears Stretched or Distorted

- Clear your browser cache
- Check the CSS styling for `.contribution-graph`
- Ensure responsive styles are properly applied

### Old Data Displayed

- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Wait a few minutes - GitLab/GitHub may take time to update

## Alternative Services

If you want to use different services for displaying contribution graphs:

### For GitHub:
- **GitHub Readme Stats**: https://github.com/anuraghazra/github-readme-stats
- **GitHub Chart API**: https://ghchart.rshah.org/
- **GitHub Contributions Calendar**: https://github-contributions-api.deno.dev/

### For GitLab:
- **GitLab Activity Calendar**: https://gitlab.com/users/[username]/calendar.svg (official)
- **Custom API Integration**: Use GitLab's REST API for custom visualizations

## Adding More Statistics

You can extend the activity cards with additional stats using GitLab and GitHub APIs:

**Potential additions:**
- Total commits this year
- Number of repositories
- Pull/Merge requests created
- Issues opened/closed
- Stars received
- Contribution streaks

Example API endpoints:
- GitLab API: https://docs.gitlab.com/ee/api/
- GitHub API: https://docs.github.com/en/rest

## Future Enhancements

Possible improvements for future versions:
- Real-time contribution statistics using APIs
- Combined activity heatmap from both platforms
- Language breakdown (most used languages)
- Repository showcase
- Contribution comparison charts
- Activity streak tracking

## Support

The contribution graphs are provided by:
- **GitLab**: Official GitLab calendar endpoint
- **GitHub Chart**: https://ghchart.rshah.org/ by Rushi Shah

If graphs fail to load:
1. Check if the services are online
2. Verify your profile is public
3. Try a different browser
4. Clear cache and reload

## Credits

- GitLab contribution calendar by GitLab Inc.
- GitHub contribution chart by ghchart.rshah.org
- Icons by Font Awesome
- Design inspired by modern portfolio aesthetics

## License

This integration uses publicly available data from GitLab and GitHub. Ensure compliance with their terms of service when displaying activity graphs.
