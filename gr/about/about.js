// About page specific functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize background image
  const bgImage = document.getElementById('bg-image');
  if (bgImage) {
    const imageUrl = bgImage.getAttribute('data-image');
    if (imageUrl) {
      bgImage.style.backgroundImage = `url('${imageUrl}')`;
      
      // Fallback if image doesn't load
      setTimeout(() => {
        const hasBackground = getComputedStyle(bgImage).backgroundImage !== 'none';
        if (!hasBackground || bgImage.style.backgroundImage.includes('undefined')) {
          bgImage.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        }
      }, 1000);
    }
  }
  
  // Set overlay opacity
  const bgOverlay = document.getElementById('bg-overlay');
  if (bgOverlay) {
    const opacity = bgOverlay.getAttribute('data-opacity') || '0.7';
    bgOverlay.style.background = `linear-gradient(rgba(0,0,0,${opacity}), rgba(0,0,0,0.65))`;
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
  
  // Add subtle animation to timeline icons
  const timelineIcons = document.querySelectorAll('.timeline-icon');
  
  timelineIcons.forEach((icon, index) => {
    // Add delay for each icon
    setTimeout(() => {
      icon.style.transform = 'scale(1.1)';
      setTimeout(() => {
        icon.style.transform = 'scale(1)';
      }, 300);
    }, index * 200);
  });
  
  // Add hover effect to passion items
  const passionItems = document.querySelectorAll('.passion-item');
  passionItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transition = 'all 0.5s ease';
    });
  });
  
  // Add click effect to timeline items
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach(item => {
    item.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    });
  });
});