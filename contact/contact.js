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
    
    // Form submission with AJAX (no redirect)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent default Formspree redirect
            
            const form = this;
            const submitBtn = form.querySelector('.submit-button');
            const originalBtnText = submitBtn.textContent;
            
            // Show loading
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            try {
                // Submit to Formspree
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success - show your own message
                    alert('Thank you! Your message has been sent successfully.');
                    form.reset(); // Clear form
                } else {
                    // Error
                    const errorData = await response.json();
                    console.error('Formspree error:', errorData);
                    alert('There was an error sending your message. Please try again.');
                }
            } catch (error) {
                console.error('Submission error:', error);
                alert('Network error. Please try again.');
            } finally {
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
    
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