// Set background image from data attribute
document.addEventListener('DOMContentLoaded', function() {
    // Set background image from HTML data attribute
    const bgImageElement = document.getElementById('bg-image');
    const imageUrl = bgImageElement.getAttribute('data-image');
    
    // Set background image
    if (imageUrl) {
        bgImageElement.style.backgroundImage = `url('${imageUrl}')`;
    }
    
    // Set overlay opacity from data attribute
    const bgOverlayElement = document.getElementById('bg-overlay');
    const overlayOpacity = bgOverlayElement.getAttribute('data-opacity') || '0.7';
    bgOverlayElement.style.background = `linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,0.65))`;
    
    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const name = formData.get('contactName');
        const email = formData.get('contactEmail');
        const subject = formData.get('contactSubject');
        const message = formData.get('contactMessage');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real implementation, you would send this data to a server
        // For this example, we'll just show a confirmation message
        alert(`Thank you, ${name}!\n\nYour message has been sent successfully. We will get back to you as soon as possible.`);
        
        // Reset form
        this.reset();
    });
    
    // Add animation to contact items
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        }, index * 200);
    });
    
    // Fallback background if image doesn't load
    setTimeout(() => {
        const bgImage = document.getElementById('bg-image');
        const hasBackground = getComputedStyle(bgImage).backgroundImage !== 'none';
        
        if (!hasBackground || bgImage.style.backgroundImage.includes('undefined')) {
            // Apply fallback gradient background
            bgImage.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
            bgImage.style.backgroundImage = 'none';
        }
    }, 1000);
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.style.color = '#fff';
            item.style.fontWeight = '500';
        }
    });
});