// Enhanced mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  
  // Add CSS for pulse animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
  
  if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenuOverlay.classList.toggle('active');
      
      // Prevent scrolling when menu is open
      if (mobileMenuOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        // Add subtle vibration effect to button
        this.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
          this.style.animation = '';
        }, 300);
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking on a link
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click feedback
        this.style.transform = 'scale(0.95)';
        this.style.opacity = '0.7';
        setTimeout(() => {
          this.style.transform = '';
          this.style.opacity = '';
        }, 200);
        
        // Close menu with delay for animation
        setTimeout(() => {
          mobileMenuBtn.classList.remove('active');
          mobileMenuOverlay.classList.remove('active');
          document.body.style.overflow = '';
          
          // Navigate to the page
          const href = this.getAttribute('href');
          if (href) {
            window.location.href = href;
          }
        }, 300);
      });
    });
    
    // Close menu when clicking outside
    mobileMenuOverlay.addEventListener('click', function(e) {
      if (e.target === mobileMenuOverlay) {
        mobileMenuBtn.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Add closing animation
        mobileMenuOverlay.style.opacity = '0';
        setTimeout(() => {
          mobileMenuOverlay.style.opacity = '';
        }, 500);
      }
    });
  }
  
  // Add resize listener to ensure proper layout on window resize
  window.addEventListener('resize', function() {
    // This forces a reflow to ensure media queries apply correctly
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
  });
});