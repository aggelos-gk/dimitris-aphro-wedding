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
      window.open('https://www.google.com/maps/search/?api=1&query=Ktima+Ippikou+Omilou+Irakleiou', '_blank');
    });
  }
  
  const weddingIcon = document.getElementById('weddingIcon');
  if (weddingIcon) {
    weddingIcon.addEventListener('click', function() {

      window.open('https://www.google.com/maps/place/%CE%9A%CF%84%CE%AE%CE%BC%CE%B1+%CE%A0%CE%B1%CF%85%CE%BB%CE%AC%CE%BA%CE%B7/@35.364429,24.4170456,17z/data=!4m10!1m2!2m1!1zzprPhM6uzrzOsSDOoM6xz4XOu86szrrOtywgR2VmeXJhIFpvaXJpZGEsIFJldGhpbW5vIDc0MSA1MA!3m6!1s0x149b76878a1f5bf3:0x8c9407e365e1336b!8m2!3d35.3662182!4d24.4187595!15sCjrOms-Ezq7OvM6xIM6gzrHPhc67zqzOus63LCBHZWZ5cmEgWm9pcmlkYSwgUmV0aGltbm8gNzQxIDUwWjoiOM66z4TOrs68zrEgz4DOsc-FzrvOrM66zrcgZ2VmeXJhIHpvaXJpZGEgcmV0aGltbm8gNzQxIDUwkgEMYmFucXVldF9oYWxsmgEjQ2haRFNVaE5NRzluUzBWSlEwRm5TVVJsZFUxVExWcG5FQUXgAQD6AQQIABA4!16s%2Fg%2F11bx3m56yb?entry=ttu', '_blank');
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