# Personal Website - M. Berkeley

A 
## 📚 Goodreads Integration

This website features **automatic integration with your Goodreads profile**!

- ✅ Automatically fetches your currently reading books
- ✅ Displays recent book reviews with ratings
- ✅ Updates every 30 minutes
- ✅ No manual updates needed - just update your Goodreads!

**See [GOODREADS_INTEGRATION.md](GOODREADS_INTEGRATION.md) for complete documentation.**

## 💻 Git Activity Integration

Your website automatically displays **live contribution graphs** from your GitLab and GitHub profiles!

- ✅ Real-time GitLab contribution calendar
- ✅ GitHub activity heatmap
- ✅ Automatic updates - no manual intervention
- ✅ Direct links to your profiles
- ✅ Responsive design for all devices

**See [GIT_ACTIVITY_INTEGRATION.md](GIT_ACTIVITY_INTEGRATION.md) for complete documentation.**

## 📝 Customization Guidensive personal portfolio website to showcase your CV, projects, and interests.

## 🌟 Features

- **Responsive Design**: Fully responsive layout that works perfectly on all devices
- **Modern UI/UX**: Beautiful gradient effects, smooth animations, and interactive elements
- **Dynamic Navigation**: Active section highlighting and smooth scrolling
- **Interactive Sections**:
  - Hero section with animated greeting and profile photo
  - About section with skills showcase
  - Comprehensive CV with experience, education, and certifications
  - Featured projects with technology tags
  - **Git Activity**: Automatic contribution graphs from GitLab and GitHub
  - Interests & hobbies display
  - **Goodreads Integration**: Automatically displays currently reading books and recent reviews
  - Contact form with validation
- **Visual Effects**: 
  - Scroll animations
  - Hover effects with 3D transforms
  - Particle background in hero section
  - Progress indicator
  - Back to top button
- **Live Data**: 
  - Automatic Goodreads RSS feed integration
  - Real-time book updates from your Goodreads profile
  - Auto-refresh every 30 minutes
  - GitLab and GitHub contribution graphs
  - Automatic activity updates

## 🚀 Getting Started

1. **Open the website**: Simply open `index.html` in your web browser
2. **Customize content**: Edit the HTML file to add your personal information
3. **Deploy**: Upload the files to any web hosting service

## � Goodreads Integration

This website features **automatic integration with your Goodreads profile**!

- ✅ Automatically fetches your currently reading books
- ✅ Displays recent book reviews with ratings
- ✅ Updates every 30 minutes
- ✅ No manual updates needed - just update your Goodreads!

**See [GOODREADS_INTEGRATION.md](GOODREADS_INTEGRATION.md) for complete documentation.**

## �📝 Customization Guide

### Update Personal Information

1. **Hero Section**: Update your name, title, and description in the `<section id="home">` section
2. **Profile Photo**: Replace `images/matthew_headshot.jpeg` with your own photo
3. **About Section**: Replace the placeholder text with your own bio and skills
4. **CV Section**: Add your work experience, education, and certifications
5. **Projects**: Customize the project cards with your own projects
6. **Interests**: Update the interest cards to reflect your hobbies
7. **Git Activity**: Update GitLab and GitHub usernames in the activity section images
8. **Contact Info**: Change email, phone, and location in the contact section
9. **Goodreads**: Update your user ID in `script.js` to link your Goodreads profile

### Change Colors

Edit the CSS variables in `styles.css` under `:root`:

```css
--primary-color: #6366f1;  /* Main brand color */
--secondary-color: #ec4899; /* Accent color */
--accent-color: #f59e0b;   /* Additional accent */
```

### Add Your Photo

Replace the profile image placeholder in the About section:

```html
<div class="about-image">
    <img src="your-photo.jpg" alt="Your Name">
</div>
```

### Connect Social Media

Update the social media links in both the hero and contact sections:

```html
<a href="https://github.com/yourusername" class="social-icon">
    <i class="fab fa-github"></i>
</a>
```

## 📁 File Structure

```
personal_website/
├── index.html      # Main HTML file with all content
├── styles.css      # All styling and animations
├── script.js       # Interactive features and functionality
└── README.md       # This file
```

## 🎨 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript**: Interactive features and animations
- **Font Awesome**: Icons library

## 🌐 Deployment Options

### GitHub Pages (Free)
1. Create a GitHub repository
2. Upload these files
3. Go to Settings > Pages
4. Select main branch and save
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify (Free)
1. Create account at netlify.com
2. Drag and drop your folder
3. Get instant deployment

### Vercel (Free)
1. Create account at vercel.com
2. Import your project
3. Deploy with one click

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## ✨ Features to Add

Consider enhancing your website with:

- [ ] Blog section for articles
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Analytics integration
- [ ] Backend for contact form
- [ ] Project filtering
- [ ] Testimonials section
- [ ] Resume download functionality

## 📄 License

Feel free to use this template for your personal website. No attribution required!

## 🤝 Contributing

This is a personal template, but suggestions are welcome! Feel free to fork and customize.

---

**Built with ❤️ and passion for clean code**
