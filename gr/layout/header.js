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
  


  function createLanguageSwitcher() {
    if (document.querySelector('.language-switcher')) return;

    const currentLang = document.documentElement.lang === 'el' ? 'gr' : 'en';
    const path = window.location.pathname;
    const search = window.location.search || '';
    const hash = window.location.hash || '';

    function cleanRoute(currentPath) {
      let cleanPath = currentPath || '/';
      cleanPath = cleanPath.replace(/\/index\.html$/, '/');
      cleanPath = cleanPath.replace(/\.html$/, '');
      cleanPath = cleanPath.replace(/\/$/, '');
      return cleanPath || '/';
    }

    function toGreekPath(currentPath) {
      const cleanPath = cleanRoute(currentPath);
      if (cleanPath === '/') return '/gr/';
      if (cleanPath === '/gr') return '/gr/';
      if (cleanPath.startsWith('/gr/')) return cleanPath;
      return `/gr${cleanPath}`;
    }

    function toEnglishPath(currentPath) {
      const cleanPath = cleanRoute(currentPath);
      if (cleanPath === '/gr' || cleanPath === '/gr/') return '/';
      if (cleanPath.startsWith('/gr/')) return cleanPath.replace(/^\/gr/, '') || '/';
      return cleanPath || '/';
    }

    function navigateTo(lang) {
      const nextPath = lang === 'gr' ? toGreekPath(path) : toEnglishPath(path);
      window.location.href = `${nextPath}${search}${hash}`;
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'language-switcher';

    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'language-trigger';
    trigger.setAttribute('aria-label', 'Change language');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.textContent = currentLang.toUpperCase();

    const menu = document.createElement('div');
    menu.className = 'language-menu';
    menu.setAttribute('role', 'menu');

    ['en', 'gr'].forEach((lang) => {
      const option = document.createElement('button');
      option.type = 'button';
      option.className = 'language-option';
      option.dataset.lang = lang;
      option.textContent = lang.toUpperCase();
      option.setAttribute('role', 'menuitem');
      if (lang === currentLang) option.classList.add('active');
      option.addEventListener('click', () => {
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
        if (lang !== currentLang) navigateTo(lang);
      });
      menu.appendChild(option);
    });

    trigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = wrapper.classList.toggle('open');
      trigger.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!wrapper.contains(event.target)) {
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });

    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);
    document.body.appendChild(wrapper);
  }

  createLanguageSwitcher();

  // Add resize listener to ensure proper layout on window resize
  window.addEventListener('resize', function() {
    // This forces a reflow to ensure media queries apply correctly
    document.body.style.display = 'none';
    document.body.offsetHeight; // Trigger reflow
    document.body.style.display = '';
  });
});