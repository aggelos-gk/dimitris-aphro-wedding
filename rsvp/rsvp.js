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

    // ====== FORMSPREE SUBMISSION ======
    const rsvpForm = document.getElementById('rsvpForm');
    
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Αποτρέπει το default Formspree redirect
            
            const form = this;
            const submitBtn = form.querySelector('.submit-button');
            const originalBtnText = submitBtn.textContent;
            
            // Show loading
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const attendance = document.querySelector('input[name="attendance"]:checked');
            
            // Simple validation
            if (!attendance) {
                alert('Please select your attendance status.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                return;
            }
            
            try {
                if (attendance.value === 'attending') {
                    // Check welcome party selection
                    const welcomeParty = document.querySelector('input[name="welcomeParty"]:checked');
                    if (!welcomeParty) {
                        alert('Please let us know about the Welcome Party.');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                        return;
                    }
                    
                    // Check if guest names are required but not provided
                    if (bringGuestsCheckbox.checked && !guestNamesTextarea.value.trim()) {
                        alert('Please provide the names of your adult guests.');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                        return;
                    }
                    
                    // Check if children names are required but not provided
                    if (bringChildrenCheckbox.checked && !childrenNamesTextarea.value.trim()) {
                        alert('Please provide the names and ages of children.');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                        return;
                    }
                }
                
                // ====== ΔΟΜΟΥΜΕ ΤΟ FORMATTED MESSAGE ======
                const welcomeParty = attendance.value === 'attending' ? 
                    document.querySelector('input[name="welcomeParty"]:checked') : null;
                const bringGuests = attendance.value === 'attending' ? bringGuestsCheckbox.checked : false;
                const numberOfGuests = bringGuests ? document.getElementById('numberOfGuests').value : '0';
                const guestNames = bringGuests ? document.getElementById('guestNames').value : '';
                const bringChildren = attendance.value === 'attending' ? bringChildrenCheckbox.checked : false;
                const numberOfChildren = bringChildren ? document.getElementById('numberOfChildren').value : '0';
                const childrenNames = bringChildren ? document.getElementById('childrenNames').value : '';
                const message = document.getElementById('message').value;
                
                // Δημιουργούμε το formatted message
                let formattedMessage = '';
                formattedMessage += `🎉 RSVP SUBMISSION 🎉\n`;
                formattedMessage += `=====================\n\n`;
                formattedMessage += `👤 NAME: ${fullName}\n`;
                formattedMessage += `📧 EMAIL: ${email}\n`;
                formattedMessage += `📞 PHONE: ${phone}\n`;
                formattedMessage += `\n--- WEDDING RESPONSE ---\n`;
                formattedMessage += `💒 WEDDING: ${attendance.value === 'attending' ? '✅ ACCEPT' : '❌ DECLINE'}\n`;
                
                if (attendance.value === 'attending') {
                    formattedMessage += `🎉 WELCOME PARTY: ${welcomeParty.value === 'yes' ? '✅ ACCEPT' : '❌ DECLINE'}\n\n`;
                    
                    formattedMessage += `--- GUEST INFORMATION ---\n`;
                    formattedMessage += `👥 ADULT GUESTS: ${numberOfGuests}\n`;
                    if (bringGuests && guestNames.trim()) {
                        formattedMessage += `📝 GUEST NAMES:\n${guestNames}\n`;
                    }
                    
                    formattedMessage += `\n👶 CHILDREN: ${numberOfChildren}\n`;
                    if (bringChildren && childrenNames.trim()) {
                        formattedMessage += `📝 CHILDREN NAMES & AGES:\n${childrenNames}\n`;
                    }
                } else {
                    // Αν είναι DECLINE, βάζουμε defaults
                    formattedMessage += `🎉 WELCOME PARTY: ❌ DECLINE (not attending wedding)\n`;
                    formattedMessage += `👥 ADULT GUESTS: 0\n`;
                    formattedMessage += `👶 CHILDREN: 0\n`;
                }
                
                formattedMessage += `\n--- MESSAGE FOR THE COUPLE ---\n`;
                formattedMessage += message ? `${message}\n` : '(No message provided)\n';
                
                // ====== ΣΤΕΛΝΟΥΜΕ ΣΤΟ FORMSPREE ======
                const formData = new FormData(form);
                formData.append('formattedMessage', formattedMessage);
                formData.append('_subject', `RSVP: ${fullName} - ${attendance.value === 'attending' ? 'ACCEPT' : 'DECLINE'}`);
                
                console.log('Sending to Formspree:', form.action); // Debug
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                console.log('Formspree response:', response.status); // Debug
                
                if (response.ok) {
                    // Success
                    if (attendance.value === 'attending') {
                        const welcomeMessage = welcomeParty.value === 'yes' 
                            ? 'We\'re delighted you\'ll join us for the Welcome Party too!'
                            : 'We look forward to celebrating with you at the wedding.';
                        alert(`Thank you, ${fullName}!\n\nWe are thrilled you will be joining us in Crete!\n\n${welcomeMessage}\n\nWe have received your RSVP.`);
                    } else {
                        alert(`Thank you, ${fullName}!\n\nWe regret that you cannot join us, but thank you for letting us know.\n\nWe have received your RSVP.`);
                    }
                    
                    // Reset form
                    form.reset();
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
                } else {
                    // Error - debugging
                    try {
                        const errorData = await response.json();
                        console.error('Formspree error details:', errorData);
                        alert('Formspree Error: ' + (errorData.error || 'Unknown error'));
                    } catch {
                        alert('Error status: ' + response.status + ' - Please check console for details');
                    }
                }
            } catch (error) {
                console.error('Network error:', error);
                alert('Network error. Please try again.');
            } finally {
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
    
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