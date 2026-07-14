// Gallery page specific functionality
document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize background image from data-image attribute
  const bgImage = document.getElementById('bg-image');
  if (bgImage) {
    const imageUrl = bgImage.getAttribute('data-image');
    if (imageUrl) {
      bgImage.style.backgroundImage = `url('${imageUrl}')`;
      bgImage.style.backgroundSize = 'cover';
      bgImage.style.backgroundPosition = 'center';
      bgImage.style.backgroundRepeat = 'no-repeat';
      
      // Fallback if image doesn't load
      setTimeout(() => {
        const hasBackground = getComputedStyle(bgImage).backgroundImage !== 'none';
        if (!hasBackground || bgImage.style.backgroundImage.includes('undefined')) {
          bgImage.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
          bgImage.style.backgroundImage = 'none';
        }
      }, 1000);
    }
  }
  
  // Set overlay opacity
  const bgOverlay = document.getElementById('bg-overlay');
  if (bgOverlay) {
    bgOverlay.style.background = 'linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.65))';
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
  
  // Gallery data - 24 images from your folder
  const galleryData = [
    { id: 1, title: 'Βαρκελώνη, Ισπανία', filename: 'gallery01.webp' },
    { id: 2, title: 'Αποφοίτηση Αφροδίτης', filename: 'gallery02.webp' },
    { id: 3, title: 'Σαν Φρανσίσκο', filename: 'gallery03.webp' },
    { id: 4, title: 'Αποφοίτηση Δημήτρη', filename: 'gallery04.webp' },
    { id: 5, title: 'Μήλος, Ελλάδα', filename: 'gallery05.webp' },
    { id: 6, title: 'Σίφνος, Ελλάδα', filename: 'gallery06.webp' },
    { id: 7, title: 'Μήλος, Ελλάδα', filename: 'gallery07.webp' },
    { id: 8, title: 'Θάσος - Πρόταση γάμου', filename: 'gallery08.webp' },
    { id: 9, title: 'Καστοριά, Ελλάδα', filename: 'gallery09.webp' },
    { id: 10, title: 'Μπάνσκο, Βουλγαρία', filename: 'gallery10.webp' },
    { id: 11, title: 'Μπανγκόκ, Ταϊλάνδη', filename: 'gallery11.webp' },
    { id: 12, title: 'Τσιάνγκ Μάι, Ταϊλάνδη', filename: 'gallery12.webp' },
    { id: 13, title: 'Νότια Ταϊλάνδη', filename: 'gallery13.webp' },
    { id: 14, title: 'Βόρειο Μπαλί, Ινδονησία', filename: 'gallery14.webp' },
    { id: 15, title: 'Μπαλί, Ινδονησία', filename: 'gallery15.webp' },
    { id: 16, title: 'Μπαλί, Ινδονησία', filename: 'gallery16.webp' },
    { id: 17, title: 'Κουάλα Λουμπούρ, Μαλαισία', filename: 'gallery17.webp' },
    { id: 18, title: 'Σιγκαπούρη', filename: 'gallery18.webp' },
    { id: 19, title: 'Σιγκαπούρη', filename: 'gallery19.webp' },
    { id: 20, title: 'Χανιά, Ελλάδα', filename: 'gallery20.webp' },
    { id: 21, title: 'Φλωρεντία, Ιταλία', filename: 'gallery21.webp' },
    { id: 22, title: 'Ανακοίνωση εγκυμοσύνης', filename: 'gallery22.webp' },
    { id: 23, title: 'Ιταλία', filename: 'gallery23.webp' },
    { id: 24, title: 'Ρώμη, Ιταλία', filename: 'gallery24.webp' }
  ];

  // Function to generate image URL
  function generateImageUrl(filename) {
    return `images/${filename}`;
  }

  // Initialize gallery - SIMPLE VERSION
  function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    galleryData.forEach((item) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = `gallery-item`;
      galleryItem.dataset.id = item.id;
      
      galleryItem.innerHTML = `
        <img class="gallery-image" src="${generateImageUrl(item.filename)}" alt="${item.title}" loading="lazy">
        <div class="image-overlay">
          <div class="image-title">${item.title}</div>
          <div class="image-number">Φωτογραφία ${item.id.toString().padStart(2, '0')}/24</div>
        </div>
      `;
      
      galleryGrid.appendChild(galleryItem);
    });
    
    // Add click events to gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.dataset.id) - 1; // Convert to 0-based index
        openLightbox(id);
      });
    });
  }

  // Lightbox functionality
  let currentImageIndex = 0;

  function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    const item = galleryData[index];
    
    // Set image source
    lightboxImage.src = generateImageUrl(item.filename);
    lightboxImage.alt = item.title;
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryData.length;
    openLightbox(currentImageIndex);
  }

  function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
    openLightbox(currentImageIndex);
  }

  // Handle image loading errors
  function handleImageError(img) {
    console.error(`Failed to load image: ${img.src}`);
    img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23222"/><text x="300" y="200" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dy=".3em">Η εικόνα δεν βρέθηκε</text><text x="300" y="230" font-family="Arial" font-size="16" fill="%23aaa" text-anchor="middle">' + img.alt + '</text></svg>';
  }

  // Keyboard navigation for lightbox
  function handleKeyDown(e) {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    
    switch(e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowRight':
        showNextImage();
        break;
      case 'ArrowLeft':
        showPrevImage();
        break;
    }
  }

  // Initialize everything
  initGallery();
  
  // Lightbox controls
  document.getElementById('closeBtn').addEventListener('click', closeLightbox);
  document.getElementById('prevBtn').addEventListener('click', showPrevImage);
  document.getElementById('nextBtn').addEventListener('click', showNextImage);
  
  // Close lightbox when clicking outside the image
  document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
      closeLightbox();
    }
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', handleKeyDown);
  
  // Handle image loading errors
  document.querySelectorAll('.gallery-image').forEach(img => {
    img.onerror = () => handleImageError(img);
  });
});