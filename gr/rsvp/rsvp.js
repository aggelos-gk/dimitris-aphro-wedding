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
    const transportationSection = document.getElementById('transportationSection');
    const bringGuestsCheckbox = document.getElementById('bringGuests');
    const bringChildrenCheckbox = document.getElementById('bringChildren');
    const guestDetails = document.getElementById('guestDetails');
    const childrenDetails = document.getElementById('childrenDetails');
    const guestNamesTextarea = document.getElementById('guestNames');
    const childrenNamesTextarea = document.getElementById('childrenNames');
    const welcomeYesRadio = document.getElementById('welcomeYes');
    const welcomeNoRadio = document.getElementById('welcomeNo');
    
    // Transportation elements
    const transportYesRadio = document.getElementById('transportYes');
    const transportNoRadio = document.getElementById('transportNo');
    const transportNotSureRadio = document.getElementById('transportNotSure');

    // Both checkboxes unchecked by default
    bringGuestsCheckbox.checked = false;
    bringChildrenCheckbox.checked = false;

    // Attendance radio button functionality
    attendingRadio.addEventListener('change', function() {
        if (this.checked) {
            guestSection.style.display = 'block';
            welcomePartySection.style.display = 'block';
            transportationSection.style.display = 'block';
            // Make welcome party required if attending
            welcomeYesRadio.required = true;
            welcomeNoRadio.required = true;
            // Make transportation required if attending
            transportYesRadio.required = true;
            transportNoRadio.required = true;
            transportNotSureRadio.required = true;
        }
    });

    notAttendingRadio.addEventListener('change', function() {
        if (this.checked) {
            guestSection.style.display = 'none';
            welcomePartySection.style.display = 'none';
            transportationSection.style.display = 'none';
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
            // Remove required from transportation
            transportYesRadio.required = false;
            transportNoRadio.required = false;
            transportNotSureRadio.required = false;
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
            submitBtn.textContent = 'Αποστολή...';
            submitBtn.disabled = true;
            
            // Get form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const attendance = document.querySelector('input[name="attendance"]:checked');
            
            // Simple validation
            if (!attendance) {
                alert('Παρακαλούμε επιλέξτε αν θα παρευρεθείτε.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                return;
            }
            
            try {
                if (attendance.value === 'attending') {
                    // Check welcome party selection
                    const welcomeParty = document.querySelector('input[name="welcomeParty"]:checked');
                    if (!welcomeParty) {
                        alert('Παρακαλούμε ενημερώστε μας για το Πάρτι Καλωσορίσματος.');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                        return;
                    }
                    
                    // Check transportation selection
                    const transportation = document.querySelector('input[name="transportation"]:checked');
                    if (!transportation) {
                        alert('Παρακαλούμε ενημερώστε μας αν χρειάζεστε μεταφορά.');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                        return;
                    }
                    
                    // Check if guest names are required but not provided
                    if (bringGuestsCheckbox.checked && !guestNamesTextarea.value.trim()) {
                        alert('Παρακαλούμε συμπληρώστε τα ονόματα των ενήλικων συνοδών σας.');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                        return;
                    }
                    
                    // Check if children names are required but not provided
                    if (bringChildrenCheckbox.checked && !childrenNamesTextarea.value.trim()) {
                        alert('Παρακαλούμε συμπληρώστε τα ονόματα και τις ηλικίες των παιδιών.');
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
                
                // Transportation data
                const transportation = attendance.value === 'attending' ? 
                    document.querySelector('input[name="transportation"]:checked') : null;
                const message = document.getElementById('message').value;
                
                // Δημιουργούμε το formatted message
                let formattedMessage = '';
                formattedMessage += `🎉 ΥΠΟΒΟΛΗ RSVP 🎉\n`;
                formattedMessage += `=====================\n\n`;
                formattedMessage += `👤 ΟΝΟΜΑ: ${fullName}\n`;
                formattedMessage += `📧 EMAIL: ${email}\n`;
                formattedMessage += `📞 ΤΗΛΕΦΩΝΟ: ${phone}\n`;
                formattedMessage += `\n--- ΑΠΑΝΤΗΣΗ ΓΑΜΟΥ ---\n`;
                formattedMessage += `💒 ΓΑΜΟΣ: ${attendance.value === 'attending' ? '✅ ΑΠΟΔΟΧΗ' : '❌ ΑΡΝΗΣΗ'}\n`;
                
                if (attendance.value === 'attending') {
                    formattedMessage += `🎉 WELCOME PARTY: ${welcomeParty.value === 'yes' ? '✅ ΑΠΟΔΟΧΗ' : '❌ ΑΡΝΗΣΗ'}\n\n`;
                    
                    formattedMessage += `--- ΠΛΗΡΟΦΟΡΙΕΣ ΚΑΛΕΣΜΕΝΩΝ ---\n`;
                    formattedMessage += `👥 ΕΝΗΛΙΚΟΙ ΣΥΝΟΔΟΙ: ${numberOfGuests}\n`;
                    if (bringGuests && guestNames.trim()) {
                        formattedMessage += `📝 ΟΝΟΜΑΤΑ ΣΥΝΟΔΩΝ:\n${guestNames}\n`;
                    }
                    
                    formattedMessage += `\n👶 ΠΑΙΔΙΑ: ${numberOfChildren}\n`;
                    if (bringChildren && childrenNames.trim()) {
                        formattedMessage += `📝 ΟΝΟΜΑΤΑ & ΗΛΙΚΙΕΣ ΠΑΙΔΙΩΝ:\n${childrenNames}\n`;
                    }
                    
                    formattedMessage += `\n--- ΜΕΤΑΦΟΡΑ ---\n`;
                    if (transportation) {
                        let transportStatus = '';
                        if (transportation.value === 'yes') transportStatus = '✅ ΧΡΕΙΑΖΕΤΑΙ ΜΕΤΑΦΟΡΑ';
                        if (transportation.value === 'no') transportStatus = '🚗 ΔΙΚΟ ΤΟΥ/ΤΗΣ ΜΕΣΟ';
                        if (transportation.value === 'notSure') transportStatus = '❓ ΔΕΝ ΕΙΝΑΙ ΣΙΓΟΥΡΟΣ/Η ΑΚΟΜΑ';
                        
                        formattedMessage += `ΜΕΤΑΦΟΡΑ: ${transportStatus}\n`;
                    }
                } else {
                    // Αν είναι DECLINE, βάζουμε defaults
                    formattedMessage += `🎉 WELCOME PARTY: ❌ ΑΡΝΗΣΗ (δεν θα παρευρεθεί στον γάμο)\n`;
                    formattedMessage += `👥 ΕΝΗΛΙΚΟΙ ΣΥΝΟΔΟΙ: 0\n`;
                    formattedMessage += `👶 ΠΑΙΔΙΑ: 0\n`;
                    formattedMessage += `\n--- ΜΕΤΑΦΟΡΑ ---\n`;
                    formattedMessage += `ΜΕΤΑΦΟΡΑ: ❌ (δεν θα παρευρεθεί στον γάμο)\n`;
                }
                
                formattedMessage += `\n--- ΜΗΝΥΜΑ ΠΡΟΣ ΤΟ ΖΕΥΓΑΡΙ ---\n`;
                formattedMessage += message ? `${message}\n` : '(Δεν δόθηκε μήνυμα)\n';
                
                // ====== ΣΤΕΛΝΟΥΜΕ ΣΤΟ FORMSPREE ======
                const formData = new FormData(form);
                formData.append('formattedMessage', formattedMessage);
                formData.append('_subject', `Δήλωση συμμετοχής: ${fullName} - ${attendance.value === 'attending' ? 'ACCEPT' : 'DECLINE'}`);
                
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
                            ? 'Χαιρόμαστε πολύ που θα είστε μαζί μας και στο Πάρτι Καλωσορίσματος!'
                            : 'Ανυπομονούμε να γιορτάσουμε μαζί σας στον γάμο.';
                        alert(`Ευχαριστούμε, ${fullName}!\n\nΧαιρόμαστε πολύ που θα είστε μαζί μας στην Κρήτη!\n\n${welcomeMessage}\n\nΛάβαμε τη δήλωση συμμετοχής σας.`);
                    } else {
                        alert(`Ευχαριστούμε, ${fullName}!\n\nΛυπούμαστε που δεν θα μπορέσετε να είστε μαζί μας, αλλά σας ευχαριστούμε που μας ενημερώσατε.\n\nΛάβαμε τη δήλωση συμμετοχής σας.`);
                    }
                    
                    // Reset form
                    form.reset();
                    bringGuestsCheckbox.checked = false;
                    bringChildrenCheckbox.checked = false;
                    guestSection.style.display = 'none';
                    welcomePartySection.style.display = 'none';
                    transportationSection.style.display = 'none';
                    guestDetails.style.display = 'none';
                    childrenDetails.style.display = 'none';
                    guestNamesTextarea.required = false;
                    childrenNamesTextarea.required = false;
                    guestsNumberInput.value = '1';
                    childrenNumberInput.value = '1';
                    welcomeYesRadio.required = false;
                    welcomeNoRadio.required = false;
                    transportYesRadio.required = false;
                    transportNoRadio.required = false;
                    transportNotSureRadio.required = false;
                } else {
                    // Error - debugging
                    try {
                        const errorData = await response.json();
                        console.error('Formspree error details:', errorData);
                        alert('Σφάλμα Formspree: ' + (errorData.error || 'Άγνωστο σφάλμα'));
                    } catch {
                        alert('Κατάσταση σφάλματος: ' + response.status + ' - Παρακαλούμε ελέγξτε την κονσόλα για λεπτομέρειες');
                    }
                }
            } catch (error) {
                console.error('Network error:', error);
                alert('Σφάλμα δικτύου. Παρακαλούμε δοκιμάστε ξανά.');
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