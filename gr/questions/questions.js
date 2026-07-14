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
    
    // Toggle FAQ answers - REMOVED automatic opening of first question
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const questionHeaders = document.querySelectorAll('.question-header');
    
    // Function to close all answers except the clicked one
    function closeAllAnswers(exceptIndex) {
        toggleButtons.forEach((btn, index) => {
            if (index !== exceptIndex) {
                btn.classList.remove('active');
                btn.textContent = '+';
                btn.parentElement.nextElementSibling.classList.remove('active');
            }
        });
    }
    
    // Add click event to each toggle button
    toggleButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const answerContent = this.parentElement.nextElementSibling;
            
            // Toggle active state
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.textContent = '+';
                answerContent.classList.remove('active');
            } else {
                closeAllAnswers(index);
                this.classList.add('active');
                this.textContent = '×';
                answerContent.classList.add('active');
            }
        });
    });
    
    // Add click event to question headers
    questionHeaders.forEach((header, index) => {
        header.addEventListener('click', function() {
            const toggleBtn = this.querySelector('.toggle-btn');
            const answerContent = this.nextElementSibling;
            
            // Toggle active state
            if (toggleBtn.classList.contains('active')) {
                toggleBtn.classList.remove('active');
                toggleBtn.textContent = '+';
                answerContent.classList.remove('active');
            } else {
                closeAllAnswers(index);
                toggleBtn.classList.add('active');
                toggleBtn.textContent = '×';
                answerContent.classList.add('active');
            }
        });
    });
    
    // REMOVED: Initially open first question
    // All questions now start closed by default
    
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