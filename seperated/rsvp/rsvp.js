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
    
    // DOM Elements
    const attendingRadio = document.getElementById('attending');
    const notAttendingRadio = document.getElementById('notAttending');
    const guestSection = document.getElementById('guestSection');
    const welcomePartySection = document.getElementById('welcomePartySection');
    const bringGuestsCheckbox = document.getElementById('bringGuests');
    const bringChildrenCheckbox = document.getElementById('bringChildren');
    const guestDetails = document.getElementById('guestDetails');
    const childrenDetails = document.getElementById('childrenDetails');
    const guestNamesTextarea = document.getElementById('guestNames');
    const childrenNamesTextarea = document.getElementById('childrenNames');
    const welcomeYesRadio = document.getElementById('welcomeYes');
    const welcomeNoRadio = document.getElementById('welcomeNo');

    // Both checkboxes unchecked by default
    bringGuestsCheckbox.checked = false;
    bringChildrenCheckbox.checked = false;

    // Attendance radio button functionality
    attendingRadio.addEventListener('change', function() {
        if (this.checked) {
            guestSection.style.display = 'block';
            welcomePartySection.style.display = 'block';
            // Make welcome party required if attending
            welcomeYesRadio.required = true;
            welcomeNoRadio.required = true;
        }
    });

    notAttendingRadio.addEventListener('change', function() {
        if (this.checked) {
            guestSection.style.display = 'none';
            welcomePartySection.style.display = 'none';
            // Hide guest/children details
            guestDetails.style.display = 'none';
            childrenDetails.style.display = 'none';
            // Uncheck checkboxes
            bringGuestsCheckbox.checked = false;
            bringChildrenCheckbox.checked = false;
            // Remove required from guest/children fields
            guestNamesTextarea.required = false;
            childrenNamesTextarea.required = false;
            // Remove required from welcome party
            welcomeYesRadio.required = false;
            welcomeNoRadio.required = false;
        }
    });

    // Guests checkbox functionality
    bringGuestsCheckbox.addEventListener('change', function() {
        if (this.checked) {
            guestDetails.style.display = 'block';
            guestNamesTextarea.required = true;
        } else {
            guestDetails.style.display = 'none';
            guestNamesTextarea.required = false;
            guestNamesTextarea.value = '';
            guestsNumberInput.value = '1';
        }
    });

    // Children checkbox functionality
    bringChildrenCheckbox.addEventListener('change', function() {
        if (this.checked) {
            childrenDetails.style.display = 'block';
            childrenNamesTextarea.required = true;
        } else {
            childrenDetails.style.display = 'none';
            childrenNamesTextarea.required = false;
            childrenNamesTextarea.value = '';
            childrenNumberInput.value = '1';
        }
    });

    // Number input functionality for guests
    const guestsMinusBtn = document.getElementById('guestsMinusBtn');
    const guestsPlusBtn = document.getElementById('guestsPlusBtn');
    const guestsNumberInput = document.getElementById('numberOfGuests');

    guestsMinusBtn.addEventListener('click', function() {
        let value = parseInt(guestsNumberInput.value);
        if (value > 1) {
            guestsNumberInput.value = value - 1;
        }
    });

    guestsPlusBtn.addEventListener('click', function() {
        let value = parseInt(guestsNumberInput.value);
        if (value < 20) {
            guestsNumberInput.value = value + 1;
        }
    });

    // Number input functionality for children
    const childrenMinusBtn = document.getElementById('childrenMinusBtn');
    const childrenPlusBtn = document.getElementById('childrenPlusBtn');
    const childrenNumberInput = document.getElementById('numberOfChildren');

    childrenMinusBtn.addEventListener('click', function() {
        let value = parseInt(childrenNumberInput.value);
        if (value > 1) {
            childrenNumberInput.value = value - 1;
        }
    });

    childrenPlusBtn.addEventListener('click', function() {
        let value = parseInt(childrenNumberInput.value);
        if (value < 20) {
            childrenNumberInput.value = value + 1;
        }
    });

    // Form submission
    document.getElementById('rsvpForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const attendance = formData.get('attendance');
        const fullName = formData.get('fullName');
        
        // Simple validation
        if (!attendance) {
            alert('Please select your attendance status.');
            return;
        }
        
        if (attendance === 'attending') {
            // Check welcome party selection
            const welcomeParty = formData.get('welcomeParty');
            if (!welcomeParty) {
                alert('Please let us know about the Welcome Party.');
                return;
            }
            
            // Check if guest names are required but not provided
            if (bringGuestsCheckbox.checked && !guestNamesTextarea.value.trim()) {
                alert('Please provide the names of your adult guests.');
                return;
            }
            
            // Check if children names are required but not provided
            if (bringChildrenCheckbox.checked && !childrenNamesTextarea.value.trim()) {
                alert('Please provide the names and ages of children.');
                return;
            }
            
            const welcomeMessage = welcomeParty === 'yes' 
                ? 'We\'re delighted you\'ll join us for the Welcome Party too!'
                : 'We look forward to celebrating with you at the wedding.';
            
            alert(`Thank you, ${fullName}!\n\nWe are thrilled you will be joining us in Crete!\n\n${welcomeMessage}\n\nWe have received your RSVP.`);
        } else {
            alert(`Thank you, ${fullName}!\n\nWe regret that you cannot join us, but thank you for letting us know.\n\nWe have received your RSVP.`);
        }
        
        // Reset form
        this.reset();
        bringGuestsCheckbox.checked = false;
        bringChildrenCheckbox.checked = false;
        guestSection.style.display = 'none';
        welcomePartySection.style.display = 'none';
        guestDetails.style.display = 'none';
        childrenDetails.style.display = 'none';
        guestNamesTextarea.required = false;
        childrenNamesTextarea.required = false;
        guestsNumberInput.value = '1';
        childrenNumberInput.value = '1';
        welcomeYesRadio.required = false;
        welcomeNoRadio.required = false;
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