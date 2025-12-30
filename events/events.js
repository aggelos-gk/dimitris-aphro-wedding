// Events page specific functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize background image - USING data-image attribute
  const bgImage = document.getElementById('bg-image');
  if (bgImage) {
    // Get image URL from data-image attribute
    const imageUrl = bgImage.getAttribute('data-image');
    
    if (imageUrl) {
      // Set background image URL from data attribute
      bgImage.style.backgroundImage = `url('${imageUrl}')`;
      bgImage.style.backgroundSize = 'cover';
      bgImage.style.backgroundPosition = 'center';
      bgImage.style.backgroundRepeat = 'no-repeat';
      
      // Preload image for better performance
      const img = new Image();
      img.src = imageUrl;
      
      img.onerror = function() {
        // If image fails to load, use fallback
        console.warn(`Background image failed to load: ${imageUrl}`);
        bgImage.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        bgImage.style.backgroundImage = 'none';
      };
      
      // Fallback check
      setTimeout(() => {
        const hasBackground = getComputedStyle(bgImage).backgroundImage !== 'none';
        if (!hasBackground || bgImage.style.backgroundImage.includes('undefined')) {
          bgImage.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
          bgImage.style.backgroundImage = 'none';
        }
      }, 1500);
    } else {
      // No data-image attribute, use default
      bgImage.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
    }
  }
  
  // Set overlay opacity
  const bgOverlay = document.getElementById('bg-overlay');
  if (bgOverlay) {
    bgOverlay.style.background = 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.65))';
  }
  
  // Icon click functionality - opens Google Maps
  const welcomePartyIcon = document.getElementById('welcomePartyIcon');
  if (welcomePartyIcon) {
    welcomePartyIcon.addEventListener('click', function() {
      window.open('https://www.google.com/maps/place/Heraklion,+Greece', '_blank');
    });
  }
  
  const weddingIcon = document.getElementById('weddingIcon');
  if (weddingIcon) {
    weddingIcon.addEventListener('click', function() {
      window.open('https://www.google.com/maps/place/Rethymno,+Greece', '_blank');
    });
  }
  
  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    if (item.getAttribute('href') === currentPage) {
      item.style.color = '#fff';
      item.style.fontWeight = '500';
    }
  });
  
  // Add animation to event items on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe event items when DOM is loaded
  const eventItems = document.querySelectorAll('.event-item');
  
  eventItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
    
    // Trigger animation after a small delay
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 300);
  });
  
  // Enhanced icon hover effect
  document.querySelectorAll('.event-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transition = 'all 0.5s ease';
    });
  });
  
  // Add click effect to RSVP buttons
  const rsvpButtons = document.querySelectorAll('.rsvp-btn');
  rsvpButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Add click feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
});// Events page specific functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize background image - USING data-image attribute
  const bgImage = document.getElementById('bg-image');
  if (bgImage) {
    // Get image URL from data-image attribute
    const imageUrl = bgImage.getAttribute('data-image');
    
    if (imageUrl) {
      // Set background image URL from data attribute
      bgImage.style.backgroundImage = `url('${imageUrl}')`;
      bgImage.style.backgroundSize = 'cover';
      bgImage.style.backgroundPosition = 'center';
      bgImage.style.backgroundRepeat = 'no-repeat';
      
      // Preload image for better performance
      const img = new Image();
      img.src = imageUrl;
      
      img.onerror = function() {
        // If image fails to load, use fallback
        console.warn(`Background image failed to load: ${imageUrl}`);
        bgImage.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        bgImage.style.backgroundImage = 'none';
      };
      
      // Fallback check
      setTimeout(() => {
        const hasBackground = getComputedStyle(bgImage).backgroundImage !== 'none';
        if (!hasBackground || bgImage.style.backgroundImage.includes('undefined')) {
          bgImage.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
          bgImage.style.backgroundImage = 'none';
        }
      }, 1500);
    } else {
      // No data-image attribute, use default
      bgImage.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
    }
  }
  
  // Set overlay opacity
  const bgOverlay = document.getElementById('bg-overlay');
  if (bgOverlay) {
    bgOverlay.style.background = 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.65))';
  }
  
  // Icon click functionality - opens Google Maps
  const welcomePartyIcon = document.getElementById('welcomePartyIcon');
  if (welcomePartyIcon) {
    welcomePartyIcon.addEventListener('click', function() {
      window.open('https://www.google.com/maps/place/Heraklion,+Greece', '_blank');
    });
  }
  
  const weddingIcon = document.getElementById('weddingIcon');
  if (weddingIcon) {
    weddingIcon.addEventListener('click', function() {
      window.open('https://www.google.com/maps/place/Rethymno,+Greece', '_blank');
    });
  }
  
  // Highlight current page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    if (item.getAttribute('href') === currentPage) {
      item.style.color = '#fff';
      item.style.fontWeight = '500';
    }
  });
  
  // Add animation to event items on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe event items when DOM is loaded
  const eventItems = document.querySelectorAll('.event-item');
  
  eventItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
    
    // Trigger animation after a small delay
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 300);
  });
  
  // Enhanced icon hover effect
  document.querySelectorAll('.event-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transition = 'all 0.5s ease';
    });
  });
  
  // Add click effect to RSVP buttons
  const rsvpButtons = document.querySelectorAll('.rsvp-btn');
  rsvpButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Add click feedback
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
    });
  });
});