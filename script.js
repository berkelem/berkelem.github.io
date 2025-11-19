// ===== Navigation & Mobile Menu =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Active Navigation Highlighting =====
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.project-card, .interest-card, .cv-item, .about-content, .contact-content'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===== Smooth Scrolling Enhancement =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Contact Form Handling =====
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', { name, email, subject, message });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== Notification System =====
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add notification animations to document
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Typing Effect for Hero Text =====
const heroTitle = document.querySelector('.hero-title span:last-child');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typingSpeed = 50;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// ===== Skill Tags Animation =====
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.style.animation = 'fadeInUp 0.5s ease forwards';
});

// ===== Project Cards Hover Effect Enhancement =====
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Particle Background Effect (Optional Enhancement) =====
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        hero.appendChild(particle);
    }
}

// Add float animation for particles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) translateX(0);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-10px) translateX(-10px);
        }
        75% {
            transform: translateY(-30px) translateX(5px);
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles on page load
window.addEventListener('load', createParticles);

// ===== Counter Animation for Stats (Optional Enhancement) =====
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ===== Scroll Progress Indicator =====
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create progress bar if it doesn't exist
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
    }
    
    progressBar.style.width = scrolled + '%';
});

// ===== Back to Top Button =====
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'scale(1.1) translateY(-5px)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'scale(1) translateY(0)';
});

// ===== Console Message =====
console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cInterested in the code? Check out the source!', 'font-size: 14px; color: #764ba2;');

// ===== Goodreads Integration =====
const GOODREADS_USER_ID = '6157820-matthew'; // Your Goodreads user ID

// CORS proxy for fetching Goodreads RSS feeds
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Function to parse Goodreads RSS feed XML
function parseGoodreadsXML(xmlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');
    
    const books = [];
    items.forEach(item => {
        // Extract book details from RSS feed
        const title = item.querySelector('title')?.textContent || 'Unknown Title';
        const link = item.querySelector('link')?.textContent || '';
        const author = item.querySelector('author_name')?.textContent || 'Unknown Author';
        const bookId = item.querySelector('book_id')?.textContent || '';
        const userRating = item.querySelector('user_rating')?.textContent || '0';
        const userReview = item.querySelector('user_review')?.textContent || '';
        const bookLargeImageUrl = item.querySelector('book_large_image_url')?.textContent || '';
        const bookMediumImageUrl = item.querySelector('book_medium_image_url')?.textContent || '';
        const bookSmallImageUrl = item.querySelector('book_small_image_url')?.textContent || '';
        const averageRating = item.querySelector('average_rating')?.textContent || '0';
        const bookPublished = item.querySelector('book_published')?.textContent || '';
        const description = item.querySelector('book_description')?.textContent || '';
        
        // Use the best available image
        const coverUrl = bookLargeImageUrl || bookMediumImageUrl || bookSmallImageUrl;
        
        // Clean up the review text (remove HTML tags if present)
        const cleanReview = userReview.replace(/<[^>]*>/g, '').trim();
        
        books.push({
            title,
            author,
            link,
            bookId,
            rating: parseFloat(userRating),
            review: cleanReview,
            cover: coverUrl,
            averageRating: parseFloat(averageRating),
            published: bookPublished,
            description: description.replace(/<[^>]*>/g, '').trim()
        });
    });
    
    return books;
}

// Function to fetch Goodreads RSS feed
async function fetchGoodreadsRSS(shelf = 'currently-reading', limit = 10) {
    const rssUrl = `https://www.goodreads.com/review/list_rss/${GOODREADS_USER_ID}?shelf=${shelf}&per_page=${limit}`;
    const proxiedUrl = CORS_PROXY + encodeURIComponent(rssUrl);
    
    try {
        console.log(`Fetching Goodreads ${shelf} shelf...`);
        const response = await fetch(proxiedUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const xmlText = await response.text();
        const books = parseGoodreadsXML(xmlText);
        
        console.log(`✓ Loaded ${books.length} books from ${shelf} shelf`);
        return books;
    } catch (error) {
        console.error(`Error fetching Goodreads ${shelf} shelf:`, error);
        return [];
    }
}

// Function to generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Function to render currently reading books
async function renderCurrentlyReading() {
    const container = document.getElementById('currently-reading');
    
    // Show loading state
    container.innerHTML = `
        <div class="book-card loading">
            <div class="book-cover-placeholder">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div class="book-info">
                <h5>Loading books...</h5>
                <p class="book-author">Fetching from Goodreads</p>
            </div>
        </div>
    `;
    
    try {
        const books = await fetchGoodreadsRSS('currently-reading', 5);
        
        if (books.length === 0) {
            container.innerHTML = `
                <div class="book-card loading">
                    <div class="book-cover-placeholder">
                        <i class="fas fa-book-open"></i>
                    </div>
                    <div class="book-info">
                        <h5>No books currently reading</h5>
                        <p class="book-author">Check back soon!</p>
                    </div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = books.map(book => `
            <div class="book-card">
                <div class="book-cover">
                    ${book.cover ? 
                        `<img src="${book.cover}" alt="${book.title}" onerror="this.parentElement.innerHTML='<div class=\\'book-cover-placeholder\\'><i class=\\'fas fa-book\\'></i></div>'">` :
                        `<div class="book-cover-placeholder"><i class="fas fa-book"></i></div>`
                    }
                </div>
                <div class="book-info">
                    <h5>${book.title}</h5>
                    <p class="book-author">by ${book.author}</p>
                    ${book.averageRating > 0 ? `
                        <div class="book-rating">
                            ${generateStarRating(book.averageRating)}
                            <span>${book.averageRating.toFixed(1)}/5</span>
                        </div>
                    ` : ''}
                    ${book.link ? `<a href="${book.link}" class="book-link" target="_blank">View on Goodreads →</a>` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering currently reading:', error);
        container.innerHTML = `
            <div class="book-card loading">
                <div class="book-cover-placeholder">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="book-info">
                    <h5>Error loading books</h5>
                    <p class="book-author">Please try again later</p>
                </div>
            </div>
        `;
    }
}

// Function to render recent reviews
async function renderRecentReviews() {
    const container = document.getElementById('recent-reviews');
    
    // Show loading state
    container.innerHTML = `
        <div class="book-card loading">
            <div class="book-cover-placeholder">
                <i class="fas fa-spinner fa-spin"></i>
            </div>
            <div class="book-info">
                <h5>Loading reviews...</h5>
                <p class="book-author">Fetching from Goodreads</p>
            </div>
        </div>
    `;
    
    try {
        const books = await fetchGoodreadsRSS('read', 6);
        
        // Filter books that have reviews and ratings
        const reviewedBooks = books.filter(book => book.rating > 0 || book.review);
        
        if (reviewedBooks.length === 0) {
            container.innerHTML = `
                <div class="book-card loading">
                    <div class="book-cover-placeholder">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="book-info">
                        <h5>No reviews yet</h5>
                        <p class="book-author">Check back soon!</p>
                    </div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = reviewedBooks.slice(0, 6).map(book => {
            // Truncate review to ~150 characters for card display
            const truncatedReview = book.review.length > 150 ? 
                book.review.substring(0, 150) + '...' : 
                book.review;
            
            return `
                <div class="book-card">
                    <div class="book-cover">
                        ${book.cover ? 
                            `<img src="${book.cover}" alt="${book.title}" onerror="this.parentElement.innerHTML='<div class=\\'book-cover-placeholder\\'><i class=\\'fas fa-book\\'></i></div>'">` :
                            `<div class="book-cover-placeholder"><i class="fas fa-book"></i></div>`
                        }
                    </div>
                    <div class="book-info">
                        <h5>${book.title}</h5>
                        <p class="book-author">by ${book.author}</p>
                        ${book.rating > 0 ? `
                            <div class="book-rating">
                                ${generateStarRating(book.rating)}
                                <span>${book.rating}/5</span>
                            </div>
                        ` : ''}
                        ${truncatedReview ? `<p class="book-review">"${truncatedReview}"</p>` : ''}
                        ${book.link ? `<a href="${book.link}" class="book-link" target="_blank">Read Full Review →</a>` : ''}
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error rendering recent reviews:', error);
        container.innerHTML = `
            <div class="book-card loading">
                <div class="book-cover-placeholder">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="book-info">
                    <h5>Error loading reviews</h5>
                    <p class="book-author">Please try again later</p>
                </div>
            </div>
        `;
    }
}

// Initialize Goodreads data on page load
document.addEventListener('DOMContentLoaded', () => {
    // Load books with a slight delay to not block other page loads
    setTimeout(() => {
        renderCurrentlyReading();
        renderRecentReviews();
    }, 500);
});

// Optional: Refresh data periodically (every 30 minutes)
setInterval(() => {
    console.log('Refreshing Goodreads data...');
    renderCurrentlyReading();
    renderRecentReviews();
}, 30 * 60 * 1000); // 30 minutes

// Instructions for users:
console.log('%c📚 Goodreads Integration Active!', 'font-size: 14px; font-weight: bold; color: #553b08;');
console.log('✓ Your currently reading books and recent reviews will load automatically');
console.log('✓ Data refreshes every 30 minutes');
console.log(`✓ Using Goodreads User ID: ${GOODREADS_USER_ID}`);

// ===== GitLab Activity Calendar =====
const GITLAB_USERNAME = 'berkelem';
const GITLAB_CALENDAR_URL = `https://gitlab.com/users/${GITLAB_USERNAME}/calendar.json`;

// Fetch and render GitLab contributions
async function fetchGitLabContributions() {
    try {
        // Use CORS proxy to bypass CORS restrictions
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(GITLAB_CALENDAR_URL)}`;
        
        console.log('Fetching GitLab contributions...');
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch GitLab data');
        }
        
        const data = await response.json();
        console.log('✓ GitLab data loaded successfully');
        
        // Debug: Check what dates are in the data
        const dates = Object.keys(data).sort();
        console.log('📊 GitLab data date range:', dates[0], 'to', dates[dates.length - 1]);
        console.log('📊 Total dates with data:', dates.length);
        
        // Debug: Show recent contributions (Sep-Oct 2025)
        const recentDates = dates.filter(d => d >= '2025-09-01');
        if (recentDates.length > 0) {
            console.log('⚠️  Dates >= 2025-09-01 in GitLab data:', recentDates);
            recentDates.forEach(d => {
                if (data[d] > 0) {
                    console.log(`   ${d}: ${data[d]} contributions`);
                }
            });
        }
        
        renderGitLabCalendar(data);
    } catch (error) {
        console.error('Error fetching GitLab contributions:', error);
        document.getElementById('gitlab-calendar').innerHTML = `
            <div class="calendar-loading">
                <i class="fas fa-exclamation-circle"></i>
                <p>Unable to load GitLab activity</p>
                <a href="https://gitlab.com/${GITLAB_USERNAME}" target="_blank" class="btn btn-primary" style="margin-top: 1rem;">
                    View on GitLab
                </a>
            </div>
        `;
    }
}

// Render the contribution calendar
function renderGitLabCalendar(contributions) {
    const calendarContainer = document.getElementById('gitlab-calendar');
    calendarContainer.innerHTML = ''; // Clear loading message
    calendarContainer.className = 'gitlab-calendar-container';
    
    // Calculate date range (last 365 days)
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(today.getDate() - 364);
    
    // Find the most recent Sunday to start the calendar grid
    const startDate = new Date(oneYearAgo);
    const dayOfWeek = startDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    startDate.setDate(startDate.getDate() - dayOfWeek); // Go back to Sunday
    
    console.log('📅 Calendar Date Range:');
    console.log('  Today:', today.toISOString().split('T')[0]);
    console.log('  One year ago:', oneYearAgo.toISOString().split('T')[0]);
    console.log('  Start date (Sunday):', startDate.toISOString().split('T')[0]);
    
    // Get all contribution values ONLY from our date range for level calculation
    const values = [];
    let totalContributions = 0;
    
    // First pass: collect values only from our display range
    for (let week = 0; week < 53; week++) {
        for (let day = 0; day < 7; day++) {
            const daysToAdd = (week * 7) + day;
            const currentDate = new Date(startDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
            
            if (currentDate <= today) {
                const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
                const count = contributions[dateString] || 0;
                if (count > 0) {
                    values.push(count);
                }
                totalContributions += count;
            }
        }
    }
    
    const maxContributions = Math.max(...values, 1);
    console.log('  Max contributions in range:', maxContributions);
    console.log('  Total contributions:', totalContributions);
    
    // Create month labels with absolute positioning
    const monthsDiv = document.createElement('div');
    monthsDiv.className = 'calendar-months-labels';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let currentMonth = -1;
    let lastLabelWeek = -3; // Track last label position to avoid overlaps
    
    for (let week = 0; week < 53; week++) {
        const daysToAdd = week * 7;
        const weekDate = new Date(startDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
        const weekMonth = weekDate.getMonth();
        
        // Only add label when month changes AND there's enough space since last label
        if (weekMonth !== currentMonth && week < 52 && (week - lastLabelWeek) >= 2) {
            const label = document.createElement('span');
            label.textContent = months[weekMonth];
            // Position label at the start of this week (as percentage of total width)
            label.style.left = `${(week / 53) * 100}%`;
            monthsDiv.appendChild(label);
            currentMonth = weekMonth;
            lastLabelWeek = week;
        }
    }
    
    // Create wrapper for days labels and calendar
    const calendarWrapper = document.createElement('div');
    calendarWrapper.className = 'calendar-wrapper';
    
    // Create day labels (Mon, Wed, Fri) - labels on rows 2, 4, 6 (Monday=1, Wednesday=3, Friday=5)
    // Grid rows are: 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
    const daysLabels = document.createElement('div');
    daysLabels.className = 'calendar-days-labels';
    const dayNames = ['', 'Mon', '', 'Wed', '', 'Fri', ''];
    dayNames.forEach(day => {
        const label = document.createElement('div');
        label.textContent = day;
        daysLabels.appendChild(label);
    });
    
    // Create calendar container
    const graphContainer = document.createElement('div');
    graphContainer.className = 'gitlab-graph-container';
    
    const calendar = document.createElement('div');
    calendar.className = 'gitlab-graph';
    
    // Generate calendar grid (53 weeks x 7 days, filled column by column)
    const days = [];
    
    // Fill column by column (week by week), not row by row
    for (let week = 0; week < 53; week++) {
        for (let day = 0; day < 7; day++) {
            const daysToAdd = (week * 7) + day;
            const currentDate = new Date(startDate.getTime() + (daysToAdd * 24 * 60 * 60 * 1000));
            
            // Skip if date is in the future
            if (currentDate > today) {
                const emptyDay = document.createElement('div');
                emptyDay.className = 'calendar-day';
                emptyDay.style.opacity = '0';
                days.push(emptyDay);
                continue;
            }
            
            const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
            const count = contributions[dateString] || 0;
            
            // Debug: Log contributions found in Sep-Oct 2025
            if (count > 0 && dateString >= '2025-09-01') {
                console.log(`⚠️  Found contribution on ${dateString}: ${count}`);
            }
            
            // Calculate contribution level (0-4)
            let level = 0;
            if (count > 0) {
                level = Math.min(4, Math.ceil((count / maxContributions) * 4));
            }
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.setAttribute('data-level', level);
            dayElement.setAttribute('data-date', dateString);
            dayElement.setAttribute('data-count', count);
            dayElement.title = `${dateString}: ${count} contribution${count !== 1 ? 's' : ''}`;
            
            days.push(dayElement);
        }
    }
    
    // Append days in the correct order for column-first layout
    days.forEach(day => calendar.appendChild(day));
    
    graphContainer.appendChild(calendar);
    calendarWrapper.appendChild(daysLabels);
    calendarWrapper.appendChild(graphContainer);
    
    calendarContainer.appendChild(monthsDiv);
    calendarContainer.appendChild(calendarWrapper);
    
    // Update total contributions
    document.getElementById('gitlab-total').textContent = totalContributions;
}

// Load GitLab calendar on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchGitLabContributions();
    fetchGitHubContributions();
});

console.log('%c🦊 GitLab Activity Calendar Active!', 'font-size: 14px; font-weight: bold; color: #fc6d26;');
console.log(`✓ Loading activity for: ${GITLAB_USERNAME}`);
console.log('✓ Displaying last 365 days of contributions');

// ===== GitHub Activity Stats =====
const GITHUB_USERNAME = 'berkelem';

// Fetch GitHub contributions count
async function fetchGitHubContributions() {
    try {
        // GitHub doesn't provide a simple public API for contributions
        // We'll scrape the ghchart data or use GitHub's contribution graph
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch GitHub data');
        }
        
        const data = await response.json();
        
        // Calculate total contributions from the last year
        let totalContributions = 0;
        if (data.contributions) {
            data.contributions.forEach(contribution => {
                totalContributions += contribution.count;
            });
        }
        
        document.getElementById('github-total').textContent = totalContributions;
        console.log('✓ GitHub contributions loaded:', totalContributions);
    } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
        document.getElementById('github-total').textContent = 'N/A';
    }
}

console.log('%c🐙 GitHub Activity Stats Active!', 'font-size: 14px; font-weight: bold; color: #333;');
console.log(`✓ Loading contributions for: ${GITHUB_USERNAME}`);
